import { useState } from "react";
import { format } from "date-fns";
import {
  CalendarIcon,
  CheckCircle2,
  FileText,
  Paperclip,
  RotateCcw,
  Send,
  Users,
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
  { id: 1, trainee: "Sarah Al-Otaibi", task: "Onboarding Checklist", date: "Sep 2, 2026", file: "onboarding-summary.pdf", status: "Pending", feedback: "" },
  { id: 2, trainee: "Omar Haddad", task: "Data Analysis Report", date: "Sep 1, 2026", file: "analysis-report.xlsx", status: "Pending", feedback: "" },
  { id: 3, trainee: "Lina Mansour", task: "UI Wireframe Draft", date: "Aug 29, 2026", file: "wireframe-v1.fig", status: "Approved", feedback: "Clean layout, great work." },
];

export function SupervisorDashboard() {
  const [trainee, setTrainee] = useState("");
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [deadline, setDeadline] = useState<Date>();
  const [attached, setAttached] = useState(false);
  const [sent, setSent] = useState(false);
  const [submissions, setSubmissions] = useState(INITIAL_SUBMISSIONS);

  const sendTask = () => {
    setSent(true);
    setTimeout(() => setSent(false), 2000);
  };

  const updateStatus = (id: number, status: Submission["status"]) =>
    setSubmissions((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));

  const setFeedback = (id: number, feedback: string) =>
    setSubmissions((prev) => prev.map((s) => (s.id === id ? { ...s, feedback } : s)));

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Supervisor Dashboard</h1>
        <p className="text-sm text-muted-foreground">Assign tasks and review trainee submissions.</p>
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
            <Label>Deadline</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start font-normal", !deadline && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {deadline ? format(deadline, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={deadline}
                  onSelect={setDeadline}
                  className="pointer-events-auto p-3"
                />
              </PopoverContent>
            </Popover>
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
              {attached ? "Guidelines.pdf attached ✓" : "Attach Guidelines PDF"}
            </Button>
            <Button onClick={sendTask} disabled={sent} className="ml-auto">
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

      {/* Submissions & Review */}
      <Card className="shadow-md shadow-slate-200/60">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="h-5 w-5 text-primary" /> Submissions & Review
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
    </div>
  );
}
