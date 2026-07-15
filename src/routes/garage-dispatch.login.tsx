import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { adminLoginFn, checkAdminSession } from "@/lib/reviews";
import { Eye, EyeOff, Lock, User } from "lucide-react";

export const Route = createFileRoute("/garage-dispatch/login")({
  // If already logged in, skip the login page entirely
  beforeLoad: async () => {
    const { authenticated } = await checkAdminSession();
    if (authenticated) {
      throw redirect({ to: "/garage-dispatch/reviews" });
    }
  },
  component: AdminLogin,
});

const logoUrl = "/caas.svg";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    setLoading(true);
    setError("");
    try {
      const res = await adminLoginFn({ data: { username, password } });
      if (res.ok) {
        navigate({ to: "/garage-dispatch/reviews" });
      } else {
        setError(res.error ?? "Invalid credentials");
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      {/* Background grid */}
      <div className="absolute inset-0 hero-grid opacity-20 pointer-events-none" />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-3 mb-2">
            <img src={logoUrl} alt="CAAS" className="h-12 w-12 rounded-md object-cover ring-1 ring-primary/30" />
            <div>
              <div className="font-display text-2xl text-primary tracking-wider leading-none">CAAS</div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Control Panel</div>
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="border border-border bg-surface p-8">
          <h1 className="font-heading uppercase tracking-wider text-lg mb-1">Secure Access</h1>
          <p className="text-sm text-muted-foreground mb-6">Enter your credentials to continue.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  required
                  className="w-full bg-background border border-border pl-10 pr-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                  placeholder="username"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="w-full bg-background border border-border pl-10 pr-11 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                  placeholder="••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-xs text-red-500 border border-red-500/30 bg-red-500/10 px-4 py-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !username || !password}
              className="w-full bg-primary text-primary-foreground py-3 font-heading uppercase tracking-wider text-sm hover:btn-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "Verifying…" : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Restricted access. Unauthorised attempts are logged.
        </p>
      </div>
    </div>
  );
}
