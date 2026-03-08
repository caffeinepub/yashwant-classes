import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  useAddImportantQuestion,
  useAddQuiz,
  useAddQuizQuestion,
  useAddSubject,
  useAllSubjects,
  useDeleteImportantQuestion,
  useDeleteQuiz,
  useDeleteSubject,
  useImportantQuestionsBySubject,
  useQuizzesBySubject,
  useUpdateImportantQuestion,
  useUpdateQuiz,
  useUpdateQuizQuestion,
  useUpdateSubject,
} from "@/hooks/useQueries";
import {
  AlertTriangle,
  Loader2,
  Pencil,
  Plus,
  Shield,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type {
  ImportantQuestion,
  Quiz,
  QuizQuestion,
  Subject,
} from "../backend.d";

// ─── Types ─────────────────────────────────────────────────────────────────

interface SubjectFormData {
  name: string;
  description: string;
}

interface IQFormData {
  subjectId: string;
  questionText: string;
  answer: string;
  explanation: string;
  topic: string;
}

interface QQFormData {
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctOption: string;
  explanation: string;
}

interface QuizFormData {
  title: string;
  subjectId: string;
  description: string;
  timeLimitMinutes: string;
  questionIds: string[];
}

// ─── Subject Tab ─────────────────────────────────────────────────────────────

function SubjectsTab() {
  const { data: subjects = [], isLoading } = useAllSubjects();
  const addMutation = useAddSubject();
  const updateMutation = useUpdateSubject();
  const deleteMutation = useDeleteSubject();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<bigint | null>(null);
  const [editSubject, setEditSubject] = useState<Subject | null>(null);
  const [form, setForm] = useState<SubjectFormData>({
    name: "",
    description: "",
  });

  const openAdd = () => {
    setEditSubject(null);
    setForm({ name: "", description: "" });
    setDialogOpen(true);
  };

  const openEdit = (subject: Subject) => {
    setEditSubject(subject);
    setForm({ name: subject.name, description: subject.description });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) return toast.error("Subject name is required");
    try {
      if (editSubject) {
        await updateMutation.mutateAsync({ id: editSubject.id, ...form });
        toast.success("Subject updated!");
      } else {
        await addMutation.mutateAsync(form);
        toast.success("Subject added!");
      }
      setDialogOpen(false);
    } catch {
      toast.error("Failed to save subject");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteMutation.mutateAsync(deleteId);
      toast.success("Subject deleted");
      setDeleteId(null);
    } catch {
      toast.error("Failed to delete subject");
    }
  };

  const isPending = addMutation.isPending || updateMutation.isPending;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-lg font-bold">
          Subjects ({subjects.length})
        </h2>
        <Button
          size="sm"
          onClick={openAdd}
          data-ocid="admin.add_button"
          className="bg-primary text-primary-foreground"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Subject
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-14 rounded-xl" />
          ))}
        </div>
      ) : subjects.length === 0 ? (
        <div
          data-ocid="subject.empty_state"
          className="text-center py-12 text-muted-foreground"
        >
          <p className="text-sm">No subjects yet. Add your first subject.</p>
        </div>
      ) : (
        <div className="rounded-xl border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold hidden sm:table-cell">
                  Description
                </TableHead>
                <TableHead className="w-24 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subjects.map((subject, i) => (
                <TableRow
                  key={subject.id.toString()}
                  data-ocid={`subject.item.${i + 1}`}
                >
                  <TableCell className="font-medium">{subject.name}</TableCell>
                  <TableCell className="text-muted-foreground text-sm hidden sm:table-cell truncate max-w-xs">
                    {subject.description}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => openEdit(subject)}
                        className="h-8 w-8"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setDeleteId(subject.id)}
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        data-ocid={`admin.delete_button.${i + 1}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent data-ocid="admin.dialog">
          <DialogHeader>
            <DialogTitle className="font-display">
              {editSubject ? "Edit Subject" : "Add Subject"}
            </DialogTitle>
            <DialogDescription>
              Fill in the subject details below.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="subj-name">Name *</Label>
              <Input
                id="subj-name"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                placeholder="e.g., Mathematics"
                className="mt-1"
                data-ocid="admin.input"
              />
            </div>
            <div>
              <Label htmlFor="subj-desc">Description</Label>
              <Textarea
                id="subj-desc"
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                placeholder="Brief description..."
                className="mt-1 resize-none"
                rows={2}
                data-ocid="admin.textarea"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              data-ocid="admin.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isPending}
              data-ocid="admin.save_button"
            >
              {isPending && <Loader2 className="w-4 h-4 mr-1 animate-spin" />}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!deleteId}
        onOpenChange={(o) => !o && setDeleteId(null)}
      >
        <AlertDialogContent data-ocid="admin.dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Subject?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the subject and all its questions.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="admin.cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-ocid="admin.confirm_button"
            >
              {deleteMutation.isPending && (
                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
              )}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// ─── Important Questions Tab ─────────────────────────────────────────────────

function ImportantQuestionsTab() {
  const { data: subjects = [] } = useAllSubjects();
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("");
  const currentSubjectId = selectedSubjectId
    ? BigInt(selectedSubjectId)
    : (subjects[0]?.id ?? null);

  const { data: questions = [], isLoading } =
    useImportantQuestionsBySubject(currentSubjectId);
  const addMutation = useAddImportantQuestion();
  const updateMutation = useUpdateImportantQuestion();
  const deleteMutation = useDeleteImportantQuestion();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<{
    id: bigint;
    subjectId: bigint;
  } | null>(null);
  const [editQ, setEditQ] = useState<ImportantQuestion | null>(null);
  const [form, setForm] = useState<IQFormData>({
    subjectId: "",
    questionText: "",
    answer: "",
    explanation: "",
    topic: "",
  });

  const openAdd = () => {
    setEditQ(null);
    setForm({
      subjectId: currentSubjectId?.toString() ?? "",
      questionText: "",
      answer: "",
      explanation: "",
      topic: "",
    });
    setDialogOpen(true);
  };

  const openEdit = (q: ImportantQuestion) => {
    setEditQ(q);
    setForm({
      subjectId: q.subjectId.toString(),
      questionText: q.questionText,
      answer: q.answer,
      explanation: q.explanation,
      topic: q.topic,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.questionText.trim() || !form.answer.trim() || !form.subjectId)
      return toast.error("Fill required fields");
    try {
      if (editQ) {
        await updateMutation.mutateAsync({
          id: editQ.id,
          subjectId: BigInt(form.subjectId),
          questionText: form.questionText,
          answer: form.answer,
          explanation: form.explanation,
          topic: form.topic,
        });
        toast.success("Question updated!");
      } else {
        await addMutation.mutateAsync({
          subjectId: BigInt(form.subjectId),
          questionText: form.questionText,
          answer: form.answer,
          explanation: form.explanation,
          topic: form.topic,
        });
        toast.success("Question added!");
      }
      setDialogOpen(false);
    } catch {
      toast.error("Failed to save question");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteMutation.mutateAsync(deleteId);
      toast.success("Question deleted");
      setDeleteId(null);
    } catch {
      toast.error("Failed to delete question");
    }
  };

  const isPending = addMutation.isPending || updateMutation.isPending;

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <h2 className="font-display text-lg font-bold">Important Questions</h2>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Select
            value={selectedSubjectId || currentSubjectId?.toString() || ""}
            onValueChange={setSelectedSubjectId}
          >
            <SelectTrigger className="w-48" data-ocid="admin.select">
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((s) => (
                <SelectItem key={s.id.toString()} value={s.id.toString()}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            size="sm"
            onClick={openAdd}
            data-ocid="admin.add_button"
            className="bg-primary text-primary-foreground flex-shrink-0"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-16 rounded-xl" />
          ))}
        </div>
      ) : questions.length === 0 ? (
        <div
          data-ocid="question.empty_state"
          className="text-center py-12 text-muted-foreground text-sm"
        >
          No questions for this subject yet.
        </div>
      ) : (
        <div className="rounded-xl border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Question</TableHead>
                <TableHead className="font-semibold hidden md:table-cell w-32">
                  Topic
                </TableHead>
                <TableHead className="w-24 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {questions.map((q, qi) => (
                <TableRow
                  key={q.id.toString()}
                  data-ocid={`question.item.${qi + 1}`}
                >
                  <TableCell className="font-medium text-sm max-w-xs truncate">
                    {q.questionText}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="secondary" className="text-xs">
                      {q.topic || "General"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => openEdit(q)}
                        className="h-8 w-8"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() =>
                          setDeleteId({ id: q.id, subjectId: q.subjectId })
                        }
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        data-ocid={`admin.delete_button.${qi + 1}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          className="max-w-lg max-h-[90vh] overflow-y-auto"
          data-ocid="admin.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display">
              {editQ ? "Edit Question" : "Add Important Question"}
            </DialogTitle>
            <DialogDescription>Fill in all required fields.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Subject *</Label>
              <Select
                value={form.subjectId}
                onValueChange={(v) => setForm((f) => ({ ...f, subjectId: v }))}
              >
                <SelectTrigger className="mt-1" data-ocid="admin.select">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((s) => (
                    <SelectItem key={s.id.toString()} value={s.id.toString()}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Topic</Label>
              <Input
                value={form.topic}
                onChange={(e) =>
                  setForm((f) => ({ ...f, topic: e.target.value }))
                }
                placeholder="e.g., Algebra"
                className="mt-1"
                data-ocid="admin.input"
              />
            </div>
            <div>
              <Label>Question *</Label>
              <Textarea
                value={form.questionText}
                onChange={(e) =>
                  setForm((f) => ({ ...f, questionText: e.target.value }))
                }
                placeholder="Enter question..."
                className="mt-1 resize-none"
                rows={3}
                data-ocid="admin.textarea"
              />
            </div>
            <div>
              <Label>Answer *</Label>
              <Textarea
                value={form.answer}
                onChange={(e) =>
                  setForm((f) => ({ ...f, answer: e.target.value }))
                }
                placeholder="Enter answer..."
                className="mt-1 resize-none"
                rows={2}
              />
            </div>
            <div>
              <Label>Explanation</Label>
              <Textarea
                value={form.explanation}
                onChange={(e) =>
                  setForm((f) => ({ ...f, explanation: e.target.value }))
                }
                placeholder="Detailed explanation..."
                className="mt-1 resize-none"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              data-ocid="admin.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isPending}
              data-ocid="admin.save_button"
            >
              {isPending && <Loader2 className="w-4 h-4 mr-1 animate-spin" />}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!deleteId}
        onOpenChange={(o) => !o && setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Question?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="admin.cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground"
              data-ocid="admin.confirm_button"
            >
              {deleteMutation.isPending && (
                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
              )}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// ─── Quiz Questions Tab ───────────────────────────────────────────────────────

function QuizQuestionsTab() {
  const addMutation = useAddQuizQuestion();
  const updateMutation = useUpdateQuizQuestion();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editQ, setEditQ] = useState<QuizQuestion | null>(null);
  const [form, setForm] = useState<QQFormData>({
    questionText: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctOption: "A",
    explanation: "",
  });

  const openAdd = () => {
    setEditQ(null);
    setForm({
      questionText: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      correctOption: "A",
      explanation: "",
    });
    setDialogOpen(true);
  };

  const _openEdit = (q: QuizQuestion) => {
    setEditQ(q);
    setForm({
      questionText: q.questionText,
      optionA: q.optionA,
      optionB: q.optionB,
      optionC: q.optionC,
      optionD: q.optionD,
      correctOption: q.correctOption,
      explanation: q.explanation,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (
      !form.questionText.trim() ||
      !form.optionA ||
      !form.optionB ||
      !form.optionC ||
      !form.optionD
    ) {
      return toast.error("Fill all required fields");
    }
    try {
      if (editQ) {
        await updateMutation.mutateAsync({ id: editQ.id, ...form });
        toast.success("Question updated!");
      } else {
        await addMutation.mutateAsync(form);
        toast.success("MCQ question added!");
      }
      setDialogOpen(false);
    } catch {
      toast.error("Failed to save question");
    }
  };

  const isPending = addMutation.isPending || updateMutation.isPending;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-display text-lg font-bold">Quiz Question Bank</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Add MCQ questions to use in quizzes
          </p>
        </div>
        <Button
          size="sm"
          onClick={openAdd}
          data-ocid="admin.add_button"
          className="bg-primary text-primary-foreground"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add MCQ
        </Button>
      </div>

      <Card className="bg-muted/40 border-dashed">
        <CardContent className="p-6 text-center">
          <AlertTriangle className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-50" />
          <p className="text-sm text-muted-foreground mb-3">
            Questions added here go into the question bank. Use the Quizzes tab
            to assemble them into a quiz.
          </p>
          <Button
            size="sm"
            onClick={openAdd}
            variant="outline"
            data-ocid="admin.add_button"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add New MCQ Question
          </Button>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          className="max-w-lg max-h-[90vh] overflow-y-auto"
          data-ocid="admin.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display">
              {editQ ? "Edit MCQ" : "Add MCQ Question"}
            </DialogTitle>
            <DialogDescription>
              Create a multiple choice question for the quiz bank.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Question *</Label>
              <Textarea
                value={form.questionText}
                onChange={(e) =>
                  setForm((f) => ({ ...f, questionText: e.target.value }))
                }
                placeholder="Enter question text..."
                className="mt-1 resize-none"
                rows={3}
                data-ocid="admin.textarea"
              />
            </div>
            {(["A", "B", "C", "D"] as const).map((opt) => (
              <div key={opt}>
                <Label>Option {opt} *</Label>
                <Input
                  value={form[`option${opt}` as keyof QQFormData] as string}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, [`option${opt}`]: e.target.value }))
                  }
                  placeholder={`Option ${opt}...`}
                  className="mt-1"
                  data-ocid="admin.input"
                />
              </div>
            ))}
            <div>
              <Label>Correct Answer *</Label>
              <Select
                value={form.correctOption}
                onValueChange={(v) =>
                  setForm((f) => ({ ...f, correctOption: v }))
                }
              >
                <SelectTrigger className="mt-1" data-ocid="admin.select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["A", "B", "C", "D"].map((o) => (
                    <SelectItem key={o} value={o}>
                      Option {o}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Explanation</Label>
              <Textarea
                value={form.explanation}
                onChange={(e) =>
                  setForm((f) => ({ ...f, explanation: e.target.value }))
                }
                placeholder="Why is this the correct answer?"
                className="mt-1 resize-none"
                rows={2}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              data-ocid="admin.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isPending}
              data-ocid="admin.save_button"
            >
              {isPending && <Loader2 className="w-4 h-4 mr-1 animate-spin" />}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── Quizzes Tab ─────────────────────────────────────────────────────────────

function QuizzesAdminTab() {
  const { data: subjects = [] } = useAllSubjects();
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("");
  const currentSubjectId = selectedSubjectId
    ? BigInt(selectedSubjectId)
    : (subjects[0]?.id ?? null);

  const { data: quizzes = [], isLoading } =
    useQuizzesBySubject(currentSubjectId);
  const addMutation = useAddQuiz();
  const updateMutation = useUpdateQuiz();
  const deleteMutation = useDeleteQuiz();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<bigint | null>(null);
  const [editQuiz, setEditQuiz] = useState<Quiz | null>(null);
  const [form, setForm] = useState<QuizFormData>({
    title: "",
    subjectId: "",
    description: "",
    timeLimitMinutes: "15",
    questionIds: [],
  });

  const openAdd = () => {
    setEditQuiz(null);
    setForm({
      title: "",
      subjectId: currentSubjectId?.toString() ?? "",
      description: "",
      timeLimitMinutes: "15",
      questionIds: [],
    });
    setDialogOpen(true);
  };

  const openEdit = (quiz: Quiz) => {
    setEditQuiz(quiz);
    setForm({
      title: quiz.title,
      subjectId: quiz.subjectId.toString(),
      description: quiz.description,
      timeLimitMinutes: quiz.timeLimitMinutes.toString(),
      questionIds: quiz.questionIds.map((id) => id.toString()),
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.subjectId)
      return toast.error("Fill required fields");
    const questionIds = form.questionIds.map((id) => BigInt(id));
    try {
      if (editQuiz) {
        await updateMutation.mutateAsync({
          id: editQuiz.id,
          title: form.title,
          subjectId: BigInt(form.subjectId),
          description: form.description,
          timeLimitMinutes: BigInt(form.timeLimitMinutes || "15"),
          questionIds,
        });
        toast.success("Quiz updated!");
      } else {
        await addMutation.mutateAsync({
          title: form.title,
          subjectId: BigInt(form.subjectId),
          description: form.description,
          timeLimitMinutes: BigInt(form.timeLimitMinutes || "15"),
          questionIds,
        });
        toast.success("Quiz created!");
      }
      setDialogOpen(false);
    } catch {
      toast.error("Failed to save quiz");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteMutation.mutateAsync(deleteId);
      toast.success("Quiz deleted");
      setDeleteId(null);
    } catch {
      toast.error("Failed to delete quiz");
    }
  };

  const isPending = addMutation.isPending || updateMutation.isPending;

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <h2 className="font-display text-lg font-bold">Quizzes</h2>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Select
            value={selectedSubjectId || currentSubjectId?.toString() || ""}
            onValueChange={setSelectedSubjectId}
          >
            <SelectTrigger className="w-48" data-ocid="admin.select">
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((s) => (
                <SelectItem key={s.id.toString()} value={s.id.toString()}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            size="sm"
            onClick={openAdd}
            data-ocid="admin.add_button"
            className="bg-primary text-primary-foreground flex-shrink-0"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Quiz
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {[1, 2].map((i) => (
            <Skeleton key={i} className="h-14 rounded-xl" />
          ))}
        </div>
      ) : quizzes.length === 0 ? (
        <div
          data-ocid="quiz.empty_state"
          className="text-center py-12 text-muted-foreground text-sm"
        >
          No quizzes for this subject.
        </div>
      ) : (
        <div className="rounded-xl border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Title</TableHead>
                <TableHead className="font-semibold hidden sm:table-cell">
                  Questions
                </TableHead>
                <TableHead className="font-semibold hidden sm:table-cell">
                  Time
                </TableHead>
                <TableHead className="w-24 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quizzes.map((quiz, qi) => (
                <TableRow
                  key={quiz.id.toString()}
                  data-ocid={`quiz.item.${qi + 1}`}
                >
                  <TableCell className="font-medium">{quiz.title}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant="secondary">
                      {quiz.questionIds.length} Qs
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-muted-foreground text-sm">
                    {quiz.timeLimitMinutes.toString()} min
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => openEdit(quiz)}
                        className="h-8 w-8"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setDeleteId(quiz.id)}
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        data-ocid={`admin.delete_button.${qi + 1}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md" data-ocid="admin.dialog">
          <DialogHeader>
            <DialogTitle className="font-display">
              {editQuiz ? "Edit Quiz" : "Create Quiz"}
            </DialogTitle>
            <DialogDescription>
              Set up the quiz details and time limit.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Title *</Label>
              <Input
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                placeholder="Quiz title..."
                className="mt-1"
                data-ocid="admin.input"
              />
            </div>
            <div>
              <Label>Subject *</Label>
              <Select
                value={form.subjectId}
                onValueChange={(v) => setForm((f) => ({ ...f, subjectId: v }))}
              >
                <SelectTrigger className="mt-1" data-ocid="admin.select">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((s) => (
                    <SelectItem key={s.id.toString()} value={s.id.toString()}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                placeholder="Short description..."
                className="mt-1 resize-none"
                rows={2}
              />
            </div>
            <div>
              <Label>Time Limit (minutes)</Label>
              <Input
                type="number"
                min="1"
                max="180"
                value={form.timeLimitMinutes}
                onChange={(e) =>
                  setForm((f) => ({ ...f, timeLimitMinutes: e.target.value }))
                }
                className="mt-1"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Note: To add questions to a quiz, first add them to the Question
              Bank, then reference them here by providing comma-separated
              question IDs.
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              data-ocid="admin.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isPending}
              data-ocid="admin.save_button"
            >
              {isPending && <Loader2 className="w-4 h-4 mr-1 animate-spin" />}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!deleteId}
        onOpenChange={(o) => !o && setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Quiz?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the quiz.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="admin.cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground"
              data-ocid="admin.confirm_button"
            >
              {deleteMutation.isPending && (
                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
              )}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// ─── Main Admin Page ──────────────────────────────────────────────────────────

export function AdminPage() {
  return (
    <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-brand-saffron/10 flex items-center justify-center">
          <Shield className="w-5 h-5 text-brand-saffron" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Admin Panel
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage subjects, questions, and quizzes
          </p>
        </div>
      </div>

      <Tabs defaultValue="subjects">
        <TabsList className="mb-6 bg-muted p-1 rounded-xl flex-wrap h-auto gap-1">
          <TabsTrigger
            value="subjects"
            data-ocid="admin.subject_tab"
            className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-xs"
          >
            Subjects
          </TabsTrigger>
          <TabsTrigger
            value="questions"
            data-ocid="admin.questions_tab"
            className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-xs"
          >
            Important Questions
          </TabsTrigger>
          <TabsTrigger
            value="quiz-questions"
            data-ocid="admin.quiz_tab"
            className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-xs"
          >
            Quiz Questions
          </TabsTrigger>
          <TabsTrigger
            value="quizzes"
            data-ocid="admin.quiz_tab"
            className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-xs"
          >
            Quizzes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="subjects">
          <SubjectsTab />
        </TabsContent>
        <TabsContent value="questions">
          <ImportantQuestionsTab />
        </TabsContent>
        <TabsContent value="quiz-questions">
          <QuizQuestionsTab />
        </TabsContent>
        <TabsContent value="quizzes">
          <QuizzesAdminTab />
        </TabsContent>
      </Tabs>
    </main>
  );
}
