import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  Building2,
  GraduationCap,
  Loader2,
  Lock,
  Mail,
  User,
  UserCheck,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Register — TMS" },
      {
        name: "description",
        content: "Register as a trainee or supervisor to access your TMS dashboard.",
      },
      { property: "og:title", content: "Register — TMS" },
      { property: "og:description", content: "Choose your role and create your TMS account." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: AuthPage,
});

type Role = "trainee" | "supervisor";

function AuthPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role | null>(null);
  const [registering, setRegistering] = useState(false);

  const register = (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) return;
    setRegistering(true);
    setTimeout(() => {
      navigate({ to: role === "supervisor" ? "/supervisor" : "/trainee" });
    }, 900);
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-background px-4 py-10">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>

        <Card className="shadow-lg shadow-slate-200/60">
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">Create your account</CardTitle>
            <CardDescription>
              {role ? "Fill in your details to continue." : "First, choose how you'll use TMS."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Step 1: role choice */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole("trainee")}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-sm font-medium transition-colors",
                  role === "trainee"
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border hover:border-primary/40"
                )}
              >
                <Users className="h-6 w-6" />
                Register as Trainee
              </button>
              <button
                type="button"
                onClick={() => setRole("supervisor")}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-sm font-medium transition-colors",
                  role === "supervisor"
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border hover:border-primary/40"
                )}
              >
                <UserCheck className="h-6 w-6" />
                Register as Supervisor
              </button>
            </div>

            {/* Step 2: form */}
            {role && (
              <form onSubmit={register} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="name" placeholder="Sarah Al-Otaibi" className="pl-9" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="email" type="email" placeholder="you@company.com" className="pl-9" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="password" type="password" placeholder="••••••••" className="pl-9" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <div className="relative">
                    <Building2 className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="company" placeholder="Acme Corp" className="pl-9" required />
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={registering}>
                  {registering ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating account…
                    </>
                  ) : (
                    <>Register as {role === "trainee" ? "Trainee" : "Supervisor"}</>
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
