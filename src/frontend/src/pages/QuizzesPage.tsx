import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAllSubjects, useQuizzesBySubject } from "@/hooks/useQueries";
import { BookOpen, Clock, HelpCircle, PlayCircle } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { Quiz } from "../backend.d";

const SUBJECT_COLORS = [
  "from-blue-500 to-blue-600",
  "from-green-500 to-green-600",
  "from-orange-400 to-orange-500",
  "from-purple-500 to-purple-600",
  "from-red-500 to-red-600",
  "from-teal-500 to-teal-600",
];

const SUBJECT_ICONS = ["📐", "🔬", "📚", "🏛️", "🌍", "⚗️"];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

interface QuizzesPageProps {
  onStartQuiz: (quizId: bigint) => void;
}

function QuizCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="h-2 w-full" />
      <CardHeader>
        <Skeleton className="h-5 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-1/2" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-9 w-full rounded-lg" />
      </CardFooter>
    </Card>
  );
}

function SubjectQuizList({
  subjectId,
  subjectIndex,
  onStartQuiz,
  startIndex,
}: {
  subjectId: bigint;
  subjectIndex: number;
  onStartQuiz: (quizId: bigint) => void;
  startIndex: number;
}) {
  const { data: quizzes = [], isLoading } = useQuizzesBySubject(subjectId);

  if (isLoading) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {["s1", "s2"].map((k) => (
          <QuizCardSkeleton key={k} />
        ))}
      </div>
    );
  }

  if (quizzes.length === 0) return null;

  const gradient = SUBJECT_COLORS[subjectIndex % SUBJECT_COLORS.length];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
    >
      {quizzes.map((quiz: Quiz, qi: number) => (
        <motion.div
          key={quiz.id.toString()}
          variants={cardVariants}
          data-ocid={`quiz.item.${startIndex + qi + 1}`}
        >
          <Card className="overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col h-full group">
            <div className={`h-2 bg-gradient-to-r ${gradient}`} />
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="font-display text-base font-bold leading-snug group-hover:text-primary transition-colors">
                  {quiz.title}
                </CardTitle>
                <span className="text-xl flex-shrink-0 mt-0.5">
                  {SUBJECT_ICONS[subjectIndex % SUBJECT_ICONS.length]}
                </span>
              </div>
              {quiz.description && (
                <CardDescription className="text-xs leading-relaxed line-clamp-2">
                  {quiz.description}
                </CardDescription>
              )}
            </CardHeader>
            <CardContent className="pb-4 flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium">
                    {quiz.questionIds.length} Questions
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium">
                    {quiz.timeLimitMinutes.toString()} min
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => onStartQuiz(quiz.id)}
                data-ocid={`quiz.start_button.${startIndex + qi + 1}`}
              >
                <PlayCircle className="w-4 h-4 mr-2" />
                Start Quiz
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}

export function QuizzesPage({ onStartQuiz }: QuizzesPageProps) {
  const { data: subjects = [], isLoading: subjectsLoading } = useAllSubjects();
  const [selectedTab, setSelectedTab] = useState<string>("all");

  const filteredSubjects =
    selectedTab === "all"
      ? subjects
      : subjects.filter((s) => s.id.toString() === selectedTab);

  let quizStartIndex = 0;

  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">
          Practice Quizzes
        </h1>
        <p className="text-muted-foreground">
          Test your knowledge with timed MCQ quizzes. Instant results with
          explanations.
        </p>
      </div>

      {/* Subject Filter Tabs */}
      {subjectsLoading ? (
        <Skeleton className="h-10 w-full max-w-xl mb-8 rounded-xl" />
      ) : subjects.length > 0 ? (
        <div className="mb-8 overflow-x-auto pb-2">
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="inline-flex h-auto p-1 gap-1 bg-muted rounded-xl">
              <TabsTrigger
                value="all"
                data-ocid="quiz.tab"
                className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-sm px-4 py-2"
              >
                All Subjects
              </TabsTrigger>
              {subjects.map((subject, i) => (
                <TabsTrigger
                  key={subject.id.toString()}
                  value={subject.id.toString()}
                  data-ocid="quiz.subject.tab"
                  className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-sm px-4 py-2 whitespace-nowrap"
                >
                  <span className="mr-1.5">
                    {SUBJECT_ICONS[i % SUBJECT_ICONS.length]}
                  </span>
                  {subject.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      ) : null}

      {/* Quiz Listings */}
      {subjectsLoading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {["qs1", "qs2", "qs3"].map((k) => (
            <QuizCardSkeleton key={k} />
          ))}
        </div>
      ) : filteredSubjects.length === 0 ? (
        <div data-ocid="quiz.empty_state" className="text-center py-20">
          <BookOpen className="w-14 h-14 mx-auto mb-4 text-muted-foreground/40" />
          <p className="font-display text-lg font-semibold mb-1">
            No quizzes available
          </p>
          <p className="text-sm text-muted-foreground">
            Check back soon for new quizzes!
          </p>
        </div>
      ) : (
        <div className="space-y-10">
          {filteredSubjects.map((subject, si) => {
            const currentStartIndex = quizStartIndex;
            quizStartIndex += 10; // Reserve space for indices
            return (
              <div key={subject.id.toString()}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">
                    {SUBJECT_ICONS[si % SUBJECT_ICONS.length]}
                  </span>
                  <h2 className="font-display text-xl font-bold text-foreground">
                    {subject.name}
                  </h2>
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {subject.description}
                  </Badge>
                </div>
                <SubjectQuizList
                  subjectId={subject.id}
                  subjectIndex={si}
                  onStartQuiz={onStartQuiz}
                  startIndex={currentStartIndex}
                />
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
