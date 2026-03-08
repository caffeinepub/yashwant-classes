import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  ImportantQuestion,
  Quiz,
  QuizQuestion,
  Subject,
  UserRole,
} from "../backend.d";
import { useActor } from "./useActor";

// ─── Subjects ──────────────────────────────────────────────────────────────

export function useAllSubjects() {
  const { actor, isFetching } = useActor();
  return useQuery<Subject[]>({
    queryKey: ["subjects"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllSubjects();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddSubject() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      description,
    }: { name: string; description: string }) => {
      if (!actor) throw new Error("No actor");
      return actor.addSubject(name, description);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["subjects"] }),
  });
}

export function useUpdateSubject() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      name,
      description,
    }: { id: bigint; name: string; description: string }) => {
      if (!actor) throw new Error("No actor");
      return actor.updateSubject(id, name, description);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["subjects"] }),
  });
}

export function useDeleteSubject() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.deleteSubject(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["subjects"] }),
  });
}

// ─── Important Questions ───────────────────────────────────────────────────

export function useImportantQuestionsBySubject(subjectId: bigint | null) {
  const { actor, isFetching } = useActor();
  return useQuery<ImportantQuestion[]>({
    queryKey: ["importantQuestions", subjectId?.toString()],
    queryFn: async () => {
      if (!actor || subjectId === null) return [];
      return actor.getImportantQuestionsBySubject(subjectId);
    },
    enabled: !!actor && !isFetching && subjectId !== null,
  });
}

export function useAddImportantQuestion() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      subjectId: bigint;
      questionText: string;
      answer: string;
      explanation: string;
      topic: string;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.addImportantQuestion(
        args.subjectId,
        args.questionText,
        args.answer,
        args.explanation,
        args.topic,
      );
    },
    onSuccess: (_, vars) =>
      qc.invalidateQueries({
        queryKey: ["importantQuestions", vars.subjectId.toString()],
      }),
  });
}

export function useUpdateImportantQuestion() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      id: bigint;
      subjectId: bigint;
      questionText: string;
      answer: string;
      explanation: string;
      topic: string;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.updateImportantQuestion(
        args.id,
        args.subjectId,
        args.questionText,
        args.answer,
        args.explanation,
        args.topic,
      );
    },
    onSuccess: (_, vars) =>
      qc.invalidateQueries({
        queryKey: ["importantQuestions", vars.subjectId.toString()],
      }),
  });
}

export function useDeleteImportantQuestion() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      subjectId: _subjectId,
    }: { id: bigint; subjectId: bigint }) => {
      if (!actor) throw new Error("No actor");
      return actor.deleteImportantQuestion(id);
    },
    onSuccess: (_, vars) =>
      qc.invalidateQueries({
        queryKey: ["importantQuestions", vars.subjectId.toString()],
      }),
  });
}

// ─── Quiz Questions ────────────────────────────────────────────────────────

export function useAddQuizQuestion() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      questionText: string;
      optionA: string;
      optionB: string;
      optionC: string;
      optionD: string;
      correctOption: string;
      explanation: string;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.addQuizQuestion(
        args.questionText,
        args.optionA,
        args.optionB,
        args.optionC,
        args.optionD,
        args.correctOption,
        args.explanation,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["quizQuestions"] }),
  });
}

export function useUpdateQuizQuestion() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      id: bigint;
      questionText: string;
      optionA: string;
      optionB: string;
      optionC: string;
      optionD: string;
      correctOption: string;
      explanation: string;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.updateQuizQuestion(
        args.id,
        args.questionText,
        args.optionA,
        args.optionB,
        args.optionC,
        args.optionD,
        args.correctOption,
        args.explanation,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["quizQuestions"] }),
  });
}

export function useDeleteQuizQuestion() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.deleteQuizQuestion(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["quizQuestions"] }),
  });
}

// ─── Quizzes ───────────────────────────────────────────────────────────────

export function useQuizzesBySubject(subjectId: bigint | null) {
  const { actor, isFetching } = useActor();
  return useQuery<Quiz[]>({
    queryKey: ["quizzes", subjectId?.toString()],
    queryFn: async () => {
      if (!actor || subjectId === null) return [];
      return actor.getQuizzesBySubject(subjectId);
    },
    enabled: !!actor && !isFetching && subjectId !== null,
  });
}

export function useQuizWithQuestions(quizId: bigint | null) {
  const { actor, isFetching } = useActor();
  return useQuery<{ quiz?: Quiz; questions: QuizQuestion[] }>({
    queryKey: ["quizWithQuestions", quizId?.toString()],
    queryFn: async () => {
      if (!actor || quizId === null) return { questions: [] };
      return actor.getQuizWithQuestions(quizId);
    },
    enabled: !!actor && !isFetching && quizId !== null,
  });
}

export function useAddQuiz() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      title: string;
      subjectId: bigint;
      description: string;
      timeLimitMinutes: bigint;
      questionIds: bigint[];
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.addQuiz(
        args.title,
        args.subjectId,
        args.description,
        args.timeLimitMinutes,
        args.questionIds,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["quizzes"] }),
  });
}

export function useUpdateQuiz() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      id: bigint;
      title: string;
      subjectId: bigint;
      description: string;
      timeLimitMinutes: bigint;
      questionIds: bigint[];
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.updateQuiz(
        args.id,
        args.title,
        args.subjectId,
        args.description,
        args.timeLimitMinutes,
        args.questionIds,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["quizzes"] }),
  });
}

export function useDeleteQuiz() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.deleteQuiz(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["quizzes"] }),
  });
}

// ─── Quiz Attempts ─────────────────────────────────────────────────────────

export function useSubmitQuizAttempt() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      quizId: bigint;
      answers: Array<[bigint, string]>;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.submitQuizAttempt(args.quizId, args.answers);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["quizAttempts"] }),
  });
}

// ─── Admin / Auth ──────────────────────────────────────────────────────────

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCallerRole() {
  const { actor, isFetching } = useActor();
  return useQuery<UserRole>({
    queryKey: ["callerRole"],
    queryFn: async () => {
      if (!actor) return "guest" as UserRole;
      return actor.getCallerUserRole();
    },
    enabled: !!actor && !isFetching,
  });
}
