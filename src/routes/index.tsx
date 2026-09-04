import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap, LayoutDashboard, LogIn, UserCheck } from "lucide-react";
import { AuthView } from "@/components/auth-view";
import { SupervisorDashboard } from "@/components/supervisor-dashboard";
import { TraineeDashboard } from "@/components/trainee-dashboard";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TMS — Trainee Management System" },
      { name: "description", content: "A clean prototype for managing trainee tasks, submissions, and reviews between supervisors and trainees." },
      { property: "og:title", content: "TMS — Trainee Management System" },
      { property: "og:description", content: "Assign tasks, track submissions, and manage trainee progress in one place." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

import { useState } from "react";

const VIEWS = [
  { id: "auth", label: "Auth / Registration", icon: LogIn },
  { id: "supervisor", label: "Supervisor Dashboard", icon: UserCheck },
  { id: "trainee", label: "Trainee Dashboard", icon: LayoutDashboard },
] as const;

type ViewId = (typeof VIEWS)[number]["id"];

function Index() {
  const [view, setView] = useState<ViewId>("auth");

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b bg-card/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold leading-tight">TMS</p>
              <p className="truncate text-xs text-muted-foreground">Trainee Management System</p>
            </div>
          </div>
          <nav className="flex shrink-0 flex-wrap gap-1 rounded-lg bg-muted p-1">
            {VIEWS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setView(id)}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors sm:text-sm",
                  view === id
                    ? "bg-card text-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{label}</span>
                <span className="sm:hidden">{label.split(" ")[0]}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main>
        {view === "auth" && <AuthView />}
        {view === "supervisor" && <SupervisorDashboard />}
        {view === "trainee" && <TraineeDashboard />}
      </main>
    </div>
  );
}
