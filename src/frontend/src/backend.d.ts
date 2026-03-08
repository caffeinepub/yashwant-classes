import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface QuizAttempt {
    id: bigint;
    completedAt: bigint;
    userId: Principal;
    answers: Array<[bigint, string]>;
    score: bigint;
    totalQuestions: bigint;
    quizId: bigint;
}
export interface ImportantQuestion {
    id: bigint;
    topic: string;
    explanation: string;
    answer: string;
    questionText: string;
    subjectId: bigint;
}
export interface QuizQuestion {
    id: bigint;
    correctOption: string;
    explanation: string;
    questionText: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
}
export interface Quiz {
    id: bigint;
    title: string;
    description: string;
    timeLimitMinutes: bigint;
    subjectId: bigint;
    questionIds: Array<bigint>;
}
export interface Subject {
    id: bigint;
    name: string;
    description: string;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addImportantQuestion(subjectId: bigint, questionText: string, answer: string, explanation: string, topic: string): Promise<bigint>;
    addQuiz(title: string, subjectId: bigint, description: string, timeLimitMinutes: bigint, questionIds: Array<bigint>): Promise<bigint>;
    addQuizQuestion(questionText: string, optionA: string, optionB: string, optionC: string, optionD: string, correctOption: string, explanation: string): Promise<bigint>;
    addSubject(name: string, description: string): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteImportantQuestion(id: bigint): Promise<void>;
    deleteQuiz(id: bigint): Promise<void>;
    deleteQuizQuestion(id: bigint): Promise<void>;
    deleteSubject(id: bigint): Promise<void>;
    getAllSubjects(): Promise<Array<Subject>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getImportantQuestionsBySubject(subjectId: bigint): Promise<Array<ImportantQuestion>>;
    getQuizWithQuestions(quizId: bigint): Promise<{
        quiz?: Quiz;
        questions: Array<QuizQuestion>;
    }>;
    getQuizzesBySubject(subjectId: bigint): Promise<Array<Quiz>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getUserQuizAttempts(userId: Principal): Promise<Array<QuizAttempt>>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitQuizAttempt(quizId: bigint, answers: Array<[bigint, string]>): Promise<bigint>;
    updateImportantQuestion(id: bigint, subjectId: bigint, questionText: string, answer: string, explanation: string, topic: string): Promise<void>;
    updateQuiz(id: bigint, title: string, subjectId: bigint, description: string, timeLimitMinutes: bigint, questionIds: Array<bigint>): Promise<void>;
    updateQuizQuestion(id: bigint, questionText: string, optionA: string, optionB: string, optionC: string, optionD: string, correctOption: string, explanation: string): Promise<void>;
    updateSubject(id: bigint, name: string, description: string): Promise<void>;
}
