import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { format } from "date-fns";
import {
  ArrowLeft,
  CalendarIcon,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  FileText,
  Paperclip,
  RotateCcw,
  Send,
  UserCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/supervisor")({
  head: () => ({
    meta: [
      { title: "Supervisor Dashboard — TMS" },
      {
        name: "description",
        content: "Assign tasks with deadlines, review trainee submissions, and leave feedback.",
      },
      { property: "og:title", content: "Supervisor Dashboard — TMS" },
      { property: "og:description", content: "Assign tasks and review trainee submissions." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: SupervisorDashboard,
});

const TRAINEES = ["Sarah Al-Otaibi", "Omar Haddad", "Lina Mansour", "Yousef Nasser"];

type Submission = {
  id: number;
  trainee: string;
  task: string;
  date: string;
  file: string;
  status: "Pending" | "Approved" | "Changes Requested";
  feedback: string;
};

const INITIAL_SUBMISSIONS: Submission[] = [
  { id: 1, trainee: "Sarah Al-Otaibi", task: "Onboarding Checklist", date: "Sep 4, 2026", file: "onboarding-summary.pdf", status: "Pending", feedback: "" },
  { id: 2, trainee: "Omar Haddad", task: "Data Analysis Report", date: "Sep 4, 2026", file: "analysis-report.xlsx", status: "Pending", feedback: "" },
  { id: 3, trainee: "Lina Mansour", task: "UI Wireframe Draft", date: "Aug 29, 2026", file: "wireframe-v1.fig", status: "Approved", feedback: "Clean layout, great work." },
  { id: 4, trainee: "Yousef Nasser", task: "Market Research Brief", date: "Aug 27, 2026", file: "research-brief.docx", status: "Approved", feedback: "Solid sources." },
];

function SupervisorDashboard() {
  const [trainee, setTrainee] = useState("");
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [deadline, setDeadline] = useState<Date>();
  const [dueTime, setDueTime] = useState("");
  const [attached, setAttached] = useState(false);
  const [sent, setSent] = useState(false);
  const [missingDeadline, setMissingDeadline] = useState(false);
  const [submissions, setSubmissions] = useState(INITIAL_SUBMISSIONS);

  const canSend = Boolean(trainee && title.trim() && deadline && dueTime);

  const sendTask = () => {
    if (!deadline || !dueTime) {
      setMissingDeadline(true);
      return;
    }
    setMissingDeadline(false);
    setSent(true);
    setTimeout(() => setSent(false), 2000);
  };

  const updateStatus = (id: number, status: Submission["status"]) =>
    setSubmissions((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));

  const setFeedback = (id: number, feedback: string) =>
    setSubmissions((prev) => prev.map((s) => (s.id === id ? { ...s, feedback } : s)));

  const completed = submissions.filter((s) => s.status === "Approved").length;
  const today = submissions.filter((s) => s.date === "Sep 4, 2026").length;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b bg-card/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <UserCheck className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-bold leading-tight">Supervisor Dashboard</p>
              <p className="text-xs text-muted-foreground">Welcome back, Omar Khalid</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/">
              <ArrowLeft className="mr-1.5 h-4 w-4" /> Sign out
            </Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-6 px-4 py-8">
        {/* Overview metrics */}
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="shadow-md shadow-slate-200/60">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                <ClipboardCheck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{completed}</p>
                <p className="text-sm text-muted-foreground">Completed Tasks</p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-md shadow-slate-200/60">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{today}</p>
                <p className="text-sm text-muted-foreground">Tasks Done Today</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Assign New Task */}
        <Card className="shadow-md shadow-slate-200/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Send className="h-5 w-5 text-primary" /> Assign New Task
            </CardTitle>
            <CardDescription>Select a trainee and define the task details.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Trainee</Label>
              <Select value={trainee} onValueChange={setTrainee}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a trainee" />
                </SelectTrigger>
                <SelectContent>
                  {TRAINEES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>
                Deadline — Date &amp; Time <span className="text-destructive">*</span>
              </Label>
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "flex-1 justify-start font-normal",
                        !deadline && "text-muted-foreground",
                        missingDeadline && !deadline && "border-destructive"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {deadline ? format(deadline, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={deadline}
                      onSelect={(d) => {
                        setDeadline(d);
                        setMissingDeadline(false);
                      }}
                      className="pointer-events-auto p-3"
                    />
                  </PopoverContent>
                </Popover>
                <Input
                  type="time"
                  value={dueTime}
                  onChange={(e) => {
                    setDueTime(e.target.value);
                    setMissingDeadline(false);
                  }}
                  className={cn("w-28", missingDeadline && !dueTime && "border-destructive")}
                />
              </div>
              {missingDeadline && (
                <p className="text-xs text-destructive">A deadline date and time are required.</p>
              )}
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="task-title">Task Title</Label>
              <Input
                id="task-title"
                placeholder="e.g. Weekly Sales Report Analysis"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="instructions">Instructions</Label>
              <Textarea
                id="instructions"
                placeholder="Describe what the trainee should deliver, acceptance criteria, and resources..."
                rows={4}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
              <Button
                variant="outline"
                onClick={() => setAttached(!attached)}
                className={cn(attached && "border-primary/50 bg-primary/5 text-primary")}
              >
                <Paperclip className="mr-2 h-4 w-4" />
                {attached ? "Guidelines.pdf attached ✓" : "Attach Guidelines File"}
              </Button>
              <Button onClick={sendTask} disabled={sent || !canSend} className="ml-auto">
                {sent ? (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" /> Task Sent!
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" /> Send Task to Trainee
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Review Submissions */}
        <Card className="shadow-md shadow-slate-200/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="h-5 w-5 text-primary" /> Review Submissions
            </CardTitle>
            <CardDescription>Review deliverables, leave feedback, and approve work.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="overflow-x-auto rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Trainee</TableHead>
                    <TableHead>Task Title</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Solution File</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell className="font-medium">{s.trainee}</TableCell>
                      <TableCell>{s.task}</TableCell>
                      <TableCell className="text-muted-foreground">{s.date}</TableCell>
                      <TableCell>
                        <button className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
                          <FileText className="h-4 w-4" />
                          {s.file}
                        </button>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            s.status === "Approved"
                              ? "default"
                              : s.status === "Pending"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {s.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="space-y-3">
              {submissions
                .filter((s) => s.status !== "Approved")
                .map((s) => (
                  <div
                    key={s.id}
                    className="grid items-center gap-3 rounded-lg border bg-muted/40 p-3 sm:grid-cols-[minmax(0,1fr)_auto]"
                  >
                    <div className="min-w-0 space-y-1">
                      <p className="truncate text-sm font-medium">
                        {s.trainee} — {s.task}
                      </p>
                      <Input
                        placeholder="Write feedback for the trainee..."
                        value={s.feedback}
                        onChange={(e) => setFeedback(s.id, e.target.value)}
                      />
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <Button size="sm" onClick={() => updateStatus(s.id, "Approved")}>
                        <CheckCircle2 className="mr-1.5 h-4 w-4" /> Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateStatus(s.id, "Changes Requested")}
                      >
                        <RotateCcw className="mr-1.5 h-4 w-4" /> Request Changes
                      </Button>
                    </div>
                  </div>
                ))}
              {submissions.every((s) => s.status === "Approved") && (
                <p className="py-4 text-center text-sm text-muted-foreground">
                  All submissions reviewed. Nice work! 🎉
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
