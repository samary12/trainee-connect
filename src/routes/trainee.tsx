import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  Building2,
  CalendarClock,
  Download,
  FileUp,
  Send,
  Sparkles,
  UploadCloud,
  User,
  UserCheck,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/trainee")({
  head: () => ({
    meta: [
      { title: "Trainee Dashboard — TMS" },
      {
        name: "description",
        content: "View your assigned task, deadline, and submit deliverables to your supervisor.",
      },
      { property: "og:title", content: "Trainee Dashboard — TMS" },
      { property: "og:description", content: "Track your task and submit deliverables." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: TraineeDashboard,
});

function TraineeDashboard() {
  const [file, setFile] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const submit = () => {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b bg-card/80 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Users className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-bold leading-tight">Trainee Dashboard</p>
              <p className="text-xs text-muted-foreground">Welcome back, Sarah</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/">
              <ArrowLeft className="mr-1.5 h-4 w-4" /> Sign out
            </Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl space-y-6 px-4 py-8">
        {/* Profile & Supervisor Info */}
        <Card className="shadow-md shadow-slate-200/60">
          <CardContent className="flex flex-wrap items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold">Sarah Al-Otaibi</p>
              <p className="flex items-center gap-1 text-sm text-muted-foreground">
                <Building2 className="h-3.5 w-3.5" /> Acme Corp · Trainee
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-lg border bg-muted/40 px-3 py-2">
              <UserCheck className="h-4 w-4 text-primary" />
              <div className="text-sm">
                <p className="font-medium leading-tight">Omar Khalid</p>
                <p className="text-xs text-muted-foreground">Your Supervisor</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Assigned Task */}
        <Card className="border-primary/20 shadow-md shadow-slate-200/60">
          <CardHeader>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <CardTitle className="text-lg">Data Analysis Report</CardTitle>
                <CardDescription className="mt-1">Assigned by Omar Khalid (Supervisor)</CardDescription>
              </div>
              <Badge variant="secondary" className="gap-1.5">
                <CalendarClock className="h-3.5 w-3.5" /> Due Sep 7, 2026 · 5:00 PM — 3 days left
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-muted/60 p-4 text-sm leading-relaxed text-foreground/90">
              Analyze the Q2 sales dataset and produce a summary report highlighting top-performing
              regions, month-over-month trends, and at least three actionable recommendations.
              Follow the attached reporting guidelines.
            </div>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" /> Download Guidelines.pdf
            </Button>
          </CardContent>
        </Card>

        {/* AI Weekly Planning placeholder */}
        <Card className="border-dashed shadow-md shadow-slate-200/60">
          <CardContent className="flex flex-col items-center gap-3 p-8 text-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <p className="font-semibold">AI Weekly Planning</p>
            <p className="max-w-sm text-sm text-muted-foreground">
              Coming soon — generate a smart day-by-day work plan based on this task's scope and
              deadline.
            </p>
            <Button variant="outline" disabled>
              <Sparkles className="mr-2 h-4 w-4" /> Generate Weekly Plan (AI)
            </Button>
          </CardContent>
        </Card>

        {/* Submit Deliverables */}
        <Card className="shadow-md shadow-slate-200/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileUp className="h-5 w-5 text-primary" /> Submit Deliverables
            </CardTitle>
            <CardDescription>Upload your completed work for review.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <button
              onClick={() => setFile(file ? null : "analysis-report-final.pdf")}
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                setFile("analysis-report-final.pdf");
              }}
              className={cn(
                "flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-4 py-10 text-center transition-colors",
                dragging || file
                  ? "border-primary/60 bg-primary/5"
                  : "border-border hover:border-primary/40 hover:bg-muted/50"
              )}
            >
              <UploadCloud className="h-8 w-8 text-primary" />
              {file ? (
                <p className="text-sm font-medium text-primary">{file} — click to remove</p>
              ) : (
                <>
                  <p className="text-sm font-medium">Drag &amp; drop your file here, or click to browse</p>
                  <p className="text-xs text-muted-foreground">PDF, DOCX, XLSX up to 25MB</p>
                </>
              )}
            </button>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes / comments for your supervisor</Label>
              <Textarea
                id="notes"
                placeholder="Briefly describe what you completed and any questions you have..."
                rows={3}
              />
            </div>

            <Button onClick={submit} disabled={!file || submitted} className="w-full sm:w-auto">
              {submitted ? (
                <>✅ Task Submitted for Review</>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" /> Submit Task
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
