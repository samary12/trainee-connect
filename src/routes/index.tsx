import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarClock,
  FileUp,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TMS — Trainee Management System" },
      {
        name: "description",
        content:
          "TMS bridges communication between supervisors and trainees with clear task tracking, easy file handoffs, and AI-assisted weekly planning.",
      },
      { property: "og:title", content: "TMS — Trainee Management System" },
      {
        property: "og:description",
        content:
          "Bridging communication between supervisors and trainees: task tracking, file handoffs, and AI-assisted planning.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

const BENEFITS = [
  {
    icon: CalendarClock,
    title: "Clear Task Tracking",
    text: "Every task has a title, instructions, and an exact deadline — nothing gets lost in chat threads.",
  },
  {
    icon: FileUp,
    title: "Easy File Handoffs",
    text: "Supervisors attach guidelines; trainees submit deliverables back in one shared place.",
  },
  {
    icon: Sparkles,
    title: "AI-Assisted Weekly Planning",
    text: "Trainees get a smart day-by-day work plan generated from each task's scope and due date.",
  },
];

function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b bg-card/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-bold leading-tight">TMS</p>
              <p className="text-xs text-muted-foreground">Trainee Management System</p>
            </div>
          </div>
          <Button asChild>
            <Link to="/auth">Get Started</Link>
          </Button>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:py-28">
          <p className="mx-auto mb-5 w-fit rounded-full border border-primary/30 bg-primary/5 px-4 py-1 text-xs font-medium text-primary">
            Bridging communication between supervisors and trainees
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Trainee Management System
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            One workspace where supervisors assign work with clear deadlines and
            trainees deliver with confidence — structured, transparent, and
            always on schedule.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button size="lg" asChild>
              <Link to="/auth">
                Get Started / Register <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#benefits">See how it helps</a>
            </Button>
          </div>
        </section>

        {/* Benefits */}
        <section id="benefits" className="border-t bg-muted/40 py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-center text-2xl font-bold tracking-tight">
              Everything a training program needs
            </h2>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Built for both sides of the desk.
            </p>
            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {BENEFITS.map(({ icon: Icon, title, text }) => (
                <Card key={title} className="shadow-md shadow-slate-200/60">
                  <CardContent className="space-y-3 p-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-3xl px-4 py-16 text-center">
          <h2 className="text-2xl font-bold tracking-tight">Ready to get organized?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Register as a trainee or supervisor and land straight in your dashboard.
          </p>
          <Button size="lg" className="mt-6" asChild>
            <Link to="/auth">
              Get Started / Register <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </section>
      </main>

      <footer className="border-t py-6 text-center text-xs text-muted-foreground">
        TMS — Trainee Management System · Prototype
      </footer>
    </div>
  );
}
