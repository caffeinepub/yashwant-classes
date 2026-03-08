import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAllSubjects } from "@/hooks/useQueries";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Star,
  Trophy,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import type { Variants } from "motion/react";

const SUBJECT_COLORS = [
  "from-blue-500/20 to-blue-600/10 border-blue-200 text-blue-700",
  "from-green-500/20 to-green-600/10 border-green-200 text-green-700",
  "from-orange-500/20 to-orange-600/10 border-orange-200 text-orange-700",
  "from-purple-500/20 to-purple-600/10 border-purple-200 text-purple-700",
  "from-red-500/20 to-red-600/10 border-red-200 text-red-700",
  "from-teal-500/20 to-teal-600/10 border-teal-200 text-teal-700",
];

const SUBJECT_ICONS = ["📐", "🔬", "📚", "🏛️", "🌍", "⚗️"];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { data: subjects, isLoading } = useAllSubjects();

  const stats = [
    { label: "Subjects", value: subjects?.length ?? "...", icon: BookOpen },
    { label: "Students", value: "2,400+", icon: Users },
    { label: "Questions", value: "500+", icon: Star },
    { label: "Success Rate", value: "94%", icon: Trophy },
  ];

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-brand-navy py-16 sm:py-24 lg:py-32">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-brand-saffron/10 -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/4" />
        <div className="absolute top-1/2 left-1/2 w-32 h-32 rounded-full bg-brand-saffron/5" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center"
          >
            <Badge className="mb-6 bg-brand-saffron/20 text-brand-saffron border-brand-saffron/30 text-sm px-4 py-1">
              🎓 Quality Education Since 1995
            </Badge>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Yashwant
              <span className="block text-brand-saffron">Classes</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 font-body leading-relaxed">
              Master your subjects with important questions, detailed answers,
              and interactive quizzes designed for academic success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => onNavigate("questions")}
                data-ocid="nav.questions_link"
                className="bg-brand-saffron hover:bg-brand-saffron/90 text-white font-semibold shadow-saffron px-8 py-6 text-base"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Important Questions
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate("quizzes")}
                data-ocid="nav.quiz_link"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-base"
              >
                <GraduationCap className="w-5 h-5 mr-2" />
                Take a Quiz
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="flex flex-col items-center py-6 px-4 gap-1"
                >
                  <Icon className="w-5 h-5 text-brand-saffron mb-1" />
                  <span className="font-display text-2xl font-bold text-foreground">
                    {stat.value}
                  </span>
                  <span className="text-xs text-muted-foreground font-body">
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section cards */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6 mb-16"
          >
            {/* Important Questions Card */}
            <motion.div variants={itemVariants}>
              <Card
                className="overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer group h-full"
                onClick={() => onNavigate("questions")}
              >
                <div className="h-2 bg-gradient-to-r from-brand-saffron to-brand-gold" />
                <CardContent className="p-8">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-brand-saffron/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-saffron/20 transition-colors">
                      <BookOpen className="w-7 h-7 text-brand-saffron" />
                    </div>
                    <div className="flex-1">
                      <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                        Important Questions
                      </h2>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                        Curated exam-focused questions with detailed answers and
                        explanations across all subjects. Study smart, not hard.
                      </p>
                      <Button
                        variant="outline"
                        className="group-hover:bg-brand-saffron group-hover:text-white group-hover:border-brand-saffron transition-all"
                        data-ocid="nav.questions_link"
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate("questions");
                        }}
                      >
                        Browse Questions
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quiz Card */}
            <motion.div variants={itemVariants}>
              <Card
                className="overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer group h-full"
                onClick={() => onNavigate("quizzes")}
              >
                <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-600" />
                <CardContent className="p-8">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 transition-colors">
                      <GraduationCap className="w-7 h-7 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                        Practice Quizzes
                      </h2>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                        Test yourself with timed MCQ quizzes. Instant feedback
                        with explanations helps you learn from every attempt.
                      </p>
                      <Button
                        variant="outline"
                        className="group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all"
                        data-ocid="nav.quiz_link"
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate("quizzes");
                        }}
                      >
                        Start Quizzing
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Subjects Grid */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold text-foreground">
              Our Subjects
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate("questions")}
              className="text-brand-saffron hover:text-brand-saffron hover:bg-brand-saffron/10"
            >
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {["h1", "h2", "h3", "h4"].map((k) => (
                <Skeleton key={k} className="h-24 rounded-xl" />
              ))}
            </div>
          ) : subjects && subjects.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {subjects.map((subject, i) => (
                <motion.div key={subject.id.toString()} variants={itemVariants}>
                  <button
                    type="button"
                    data-ocid={`subject.item.${i + 1}`}
                    onClick={() => onNavigate("questions")}
                    className={`w-full p-5 rounded-xl border-2 bg-gradient-to-br ${SUBJECT_COLORS[i % SUBJECT_COLORS.length]} hover:shadow-card transition-all duration-200 text-left group`}
                  >
                    <div className="text-3xl mb-3">
                      {SUBJECT_ICONS[i % SUBJECT_ICONS.length]}
                    </div>
                    <p className="font-display font-bold text-sm leading-snug">
                      {subject.name}
                    </p>
                    <p className="text-xs mt-1 opacity-70 line-clamp-2">
                      {subject.description}
                    </p>
                  </button>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div
              data-ocid="subject.empty_state"
              className="text-center py-12 text-muted-foreground"
            >
              <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm">
                No subjects available yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-gradient-to-br from-brand-saffron to-brand-gold">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Excel?
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Start with important questions or jump straight into a quiz. Your
              success story begins here.
            </p>
            <Button
              size="lg"
              onClick={() => onNavigate("quizzes")}
              className="bg-white text-brand-saffron hover:bg-white/90 font-semibold px-8 py-6 text-base shadow-lg"
            >
              Take a Free Quiz Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
