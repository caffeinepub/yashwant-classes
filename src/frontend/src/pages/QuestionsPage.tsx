import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useAllSubjects,
  useImportantQuestionsBySubject,
} from "@/hooks/useQueries";
import { BookOpen, ChevronDown, Lightbulb, Menu, Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { ImportantQuestion } from "../backend.d";

const SUBJECT_COLORS = [
  {
    bg: "bg-blue-50 border-blue-200 hover:border-blue-400",
    active: "bg-blue-600 text-white border-blue-600",
    dot: "bg-blue-500",
    badge: "bg-blue-100 text-blue-700",
  },
  {
    bg: "bg-green-50 border-green-200 hover:border-green-400",
    active: "bg-green-600 text-white border-green-600",
    dot: "bg-green-500",
    badge: "bg-green-100 text-green-700",
  },
  {
    bg: "bg-orange-50 border-orange-200 hover:border-orange-400",
    active: "bg-orange-500 text-white border-orange-500",
    dot: "bg-orange-500",
    badge: "bg-orange-100 text-orange-700",
  },
  {
    bg: "bg-purple-50 border-purple-200 hover:border-purple-400",
    active: "bg-purple-600 text-white border-purple-600",
    dot: "bg-purple-500",
    badge: "bg-purple-100 text-purple-700",
  },
  {
    bg: "bg-red-50 border-red-200 hover:border-red-400",
    active: "bg-red-600 text-white border-red-600",
    dot: "bg-red-500",
    badge: "bg-red-100 text-red-700",
  },
  {
    bg: "bg-teal-50 border-teal-200 hover:border-teal-400",
    active: "bg-teal-600 text-white border-teal-600",
    dot: "bg-teal-500",
    badge: "bg-teal-100 text-teal-700",
  },
];

const SUBJECT_ICONS = ["📐", "🔬", "📚", "🏛️", "🌍", "⚗️"];

function groupByTopic(
  questions: ImportantQuestion[],
): Record<string, ImportantQuestion[]> {
  return questions.reduce(
    (acc, q) => {
      const topic = q.topic || "General";
      if (!acc[topic]) acc[topic] = [];
      acc[topic].push(q);
      return acc;
    },
    {} as Record<string, ImportantQuestion[]>,
  );
}

interface SubjectSidebarProps {
  subjects: Array<{ id: bigint; name: string; description: string }>;
  selectedId: bigint | null;
  onSelect: (id: bigint) => void;
  isLoading: boolean;
}

function SubjectSidebar({
  subjects,
  selectedId,
  onSelect,
  isLoading,
}: SubjectSidebarProps) {
  return (
    <aside className="w-full">
      <h2 className="font-display font-bold text-base text-foreground mb-3 px-1">
        Subjects
      </h2>
      {isLoading ? (
        <div className="space-y-2">
          {["sk1", "sk2", "sk3", "sk4"].map((k) => (
            <Skeleton key={k} className="h-12 rounded-xl" />
          ))}
        </div>
      ) : (
        <ul className="space-y-1.5">
          {subjects.map((subject, i) => {
            const colors = SUBJECT_COLORS[i % SUBJECT_COLORS.length];
            const isActive = selectedId === subject.id;
            return (
              <li key={subject.id.toString()}>
                <button
                  type="button"
                  data-ocid={`subject.item.${i + 1}`}
                  onClick={() => onSelect(subject.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border-2 text-left transition-all duration-200 ${
                    isActive ? colors.active : `${colors.bg} text-foreground`
                  }`}
                >
                  <span className="text-xl">
                    {SUBJECT_ICONS[i % SUBJECT_ICONS.length]}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">
                      {subject.name}
                    </p>
                  </div>
                  {isActive && (
                    <div className="w-2 h-2 rounded-full bg-white/70 flex-shrink-0" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </aside>
  );
}

export function QuestionsPage() {
  const { data: subjects = [], isLoading: subjectsLoading } = useAllSubjects();
  const [selectedSubjectId, setSelectedSubjectId] = useState<bigint | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");

  const currentSubjectId = selectedSubjectId ?? subjects[0]?.id ?? null;
  const currentSubjectIndex = subjects.findIndex(
    (s) => s.id === currentSubjectId,
  );
  const currentColors =
    SUBJECT_COLORS[
      currentSubjectIndex >= 0 ? currentSubjectIndex % SUBJECT_COLORS.length : 0
    ];

  const { data: questions = [], isLoading: questionsLoading } =
    useImportantQuestionsBySubject(currentSubjectId);

  const filteredQuestions = questions.filter(
    (q) =>
      !searchQuery ||
      q.questionText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const groupedQuestions = groupByTopic(filteredQuestions);
  const topics = Object.keys(groupedQuestions);

  const currentSubject = subjects.find((s) => s.id === currentSubjectId);

  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-8">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-56 flex-shrink-0">
          <ScrollArea className="h-[calc(100vh-9rem)] pr-2">
            <SubjectSidebar
              subjects={subjects}
              selectedId={currentSubjectId}
              onSelect={(id) => setSelectedSubjectId(id)}
              isLoading={subjectsLoading}
            />
          </ScrollArea>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Top bar */}
          <div className="flex items-center gap-3 mb-6">
            {/* Mobile subject selector */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  className="lg:hidden flex-shrink-0"
                >
                  <Menu className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-64 p-6"
                data-ocid="subject.sheet"
              >
                <SheetHeader className="mb-4">
                  <SheetTitle className="font-display text-left">
                    Choose Subject
                  </SheetTitle>
                </SheetHeader>
                <SubjectSidebar
                  subjects={subjects}
                  selectedId={currentSubjectId}
                  onSelect={(id) => setSelectedSubjectId(id)}
                  isLoading={subjectsLoading}
                />
              </SheetContent>
            </Sheet>

            <div className="flex-1">
              <h1 className="font-display text-xl sm:text-2xl font-bold text-foreground">
                {currentSubject?.name ?? "Important Questions"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {filteredQuestions.length} questions
              </p>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search questions, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-ocid="question.search_input"
            />
          </div>

          {/* Questions */}
          {questionsLoading ? (
            <div className="space-y-3" data-ocid="question.loading_state">
              {["q1", "q2", "q3", "q4"].map((k) => (
                <Skeleton key={k} className="h-16 rounded-xl" />
              ))}
            </div>
          ) : filteredQuestions.length === 0 ? (
            <div data-ocid="question.empty_state" className="text-center py-20">
              <BookOpen className="w-14 h-14 mx-auto mb-4 text-muted-foreground/40" />
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {searchQuery ? "No matching questions" : "No questions yet"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {searchQuery
                  ? "Try a different search term"
                  : "Questions for this subject will appear here"}
              </p>
              {searchQuery && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchQuery("")}
                  className="mt-4"
                >
                  Clear Search
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-8">
              {topics.map((topic) => (
                <section key={topic}>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge
                      className={`${currentColors.badge} border-0 font-semibold px-3 py-1`}
                    >
                      {topic}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {groupedQuestions[topic].length} questions
                    </span>
                  </div>

                  <Accordion type="multiple" className="space-y-2">
                    {groupedQuestions[topic].map((question, qi) => {
                      const globalIndex =
                        filteredQuestions.findIndex(
                          (q) => q.id === question.id,
                        ) + 1;
                      return (
                        <AccordionItem
                          key={question.id.toString()}
                          value={question.id.toString()}
                          data-ocid={`question.item.${globalIndex}`}
                          className="bg-card border border-border rounded-xl overflow-hidden shadow-xs hover:shadow-card transition-shadow"
                        >
                          <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-accent/50 transition-colors [&[data-state=open]]:bg-accent/30">
                            <div className="flex items-start gap-3 text-left w-full">
                              <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary mt-0.5">
                                {qi + 1}
                              </span>
                              <span className="font-body text-sm font-medium text-foreground leading-relaxed">
                                {question.questionText}
                              </span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <AnimatePresence>
                              <motion.div
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.25 }}
                                className="px-5 pb-5"
                              >
                                {/* Answer */}
                                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-3">
                                  <div className="flex items-center gap-2 mb-2">
                                    <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                                      <span className="text-white text-xs font-bold">
                                        ✓
                                      </span>
                                    </div>
                                    <span className="text-xs font-bold text-green-700 uppercase tracking-wide">
                                      Answer
                                    </span>
                                  </div>
                                  <p className="text-sm text-green-800 leading-relaxed font-medium">
                                    {question.answer}
                                  </p>
                                </div>

                                {/* Explanation */}
                                {question.explanation && (
                                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                      <Lightbulb className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                      <span className="text-xs font-bold text-blue-700 uppercase tracking-wide">
                                        Explanation
                                      </span>
                                    </div>
                                    <p className="text-sm text-blue-800 leading-relaxed">
                                      {question.explanation}
                                    </p>
                                  </div>
                                )}
                              </motion.div>
                            </AnimatePresence>
                          </AccordionContent>
                        </AccordionItem>
                      );
                    })}
                  </Accordion>
                </section>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
