import { useState } from "react";
import {
  CalendarClock,
  ClipboardList,
  Download,
  FileUp,
  Loader2,
  Send,
  Sparkles,
  UploadCloud,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type PlanItem = { id: string; label: string; priority: "High" | "Medium" | "Low" };

const PLAN: { day: string; items: PlanItem[] }[] = [
  {
    day: "Day 1",
    items: [
      { id: "d1-1", label: "Review supervisor guidelines & dataset", priority: "High" },
      { id: "d1-2", label: "Set up analysis workspace", priority: "Medium" },
    ],
  },
  {
    day: "Day 2",
    items: [
      { id: "d2-1", label: "Draft preliminary findings", priority: "High" },
      { id: "d2-2", label: "Cross-check data sources", priority: "Medium" },
    ],
  },
  {
    day: "Day 3",
    items: [
      { id: "d3-1", label: "Write summary notes", priority: "Low" },
      { id: "d3-2", label: "Finalize and submit deliverables", priority: "High" },
    ],
  },
];

const PRIORITY_STYLES: Record<PlanItem["priority"], string> = {
  High: "bg-red-100 text-red-700 border-red-200",
  Medium: "bg-amber-100 text-amber-700 border-amber-200",
  Low: "bg-slate-100 text-slate-600 border-slate-200",
};

export function TraineeDashboard() {
  const [generating, setGenerating] = useState(false);
  const [planVisible, setPlanVisible] = useState(true);
  const [checked, setChecked] = useState<Set<string>>(new Set(["d1-2"]));
  const [file, setFile] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggle = (id: string) =>
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const generatePlan = () => {
    setGenerating(true);
    setPlanVisible(false);
    setTimeout(() => {
      setGenerating(false);
      setPlanVisible(true);
    }, 1500);
  };

  const submit = () => {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Trainee Dashboard</h1>
        <p className="text-sm text-muted-foreground">Welcome back, Sarah. Here's your current work.</p>
      </div>

      {/* Current Task */}
      <Card className="border-primary/20 shadow-md shadow-slate-200/60">
        <CardHeader>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <CardTitle className="text-lg">Data Analysis Report</CardTitle>
              <CardDescription className="mt-1">Assigned by Omar Khalid (Supervisor)</CardDescription>
            </div>
            <Badge variant="secondary" className="gap-1.5">
              <CalendarClock className="h-3.5 w-3.5" /> 3 days left
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted/60 p-4 text-sm leading-relaxed text-foreground/90">
            Analyze the Q2 sales dataset and produce a summary report highlighting top-performing
            regions, month-over-month trends, and at least three actionable recommendations.
            Follow the attached reporting guidelines.
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" /> View Attachment (Guidelines.pdf)
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Task Breakdown Plan */}
      <Card className="shadow-md shadow-slate-200/60">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <ClipboardList className="h-5 w-5 text-primary" /> Task Breakdown Plan
          </CardTitle>
          <CardDescription>
            Generate a smart day-by-day plan for this task. (AI placeholder)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <Button onClick={generatePlan} disabled={generating} className="w-full sm:w-auto">
            {generating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating plan…
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" /> Generate Study/Work Plan (AI)
              </>
            )}
          </Button>

          {planVisible && (
            <div className="space-y-4">
              {PLAN.map((day) => (
                <div key={day.day} className="rounded-lg border p-4">
                  <p className="mb-3 text-sm font-semibold text-foreground">{day.day}</p>
                  <div className="space-y-2.5">
                    {day.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <Checkbox
                          id={item.id}
                          checked={checked.has(item.id)}
                          onCheckedChange={() => toggle(item.id)}
                        />
                        <Label
                          htmlFor={item.id}
                          className={cn(
                            "flex-1 cursor-pointer text-sm font-normal",
                            checked.has(item.id) && "text-muted-foreground line-through"
                          )}
                        >
                          {item.label}
                        </Label>
                        <span
                          className={cn(
                            "shrink-0 rounded-full border px-2 py-0.5 text-[11px] font-medium",
                            PRIORITY_STYLES[item.priority]
                          )}
                        >
                          {item.priority}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
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
                <p className="text-sm font-medium">Drag & drop your file here, or click to browse</p>
                <p className="text-xs text-muted-foreground">PDF, DOCX, XLSX up to 25MB</p>
              </>
            )}
          </button>

          <div className="space-y-2">
            <Label htmlFor="notes">Summary notes for your supervisor</Label>
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
    </div>
  );
}
