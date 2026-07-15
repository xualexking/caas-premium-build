import {
  createFileRoute,
  Outlet,
  Link,
  useNavigate,
  useRouterState,
  redirect,
} from "@tanstack/react-router";
import { useState } from "react";
import { adminLogoutFn, checkAdminSession } from "@/lib/reviews";
import { LayoutDashboard, Star, LogOut, Menu, X, ChevronRight, Image as ImageIcon } from "lucide-react";

export const Route = createFileRoute("/garage-dispatch")({
  head: () => ({
    meta: [{ name: "robots", content: "noindex, nofollow" }],
  }),
  // Check session on the server before rendering — eliminates the client spinner
  beforeLoad: async ({ location }) => {
    // Login page never needs an auth check
    if (location.pathname === "/garage-dispatch/login") return;
    const { authenticated } = await checkAdminSession();
    if (!authenticated) {
      throw redirect({ to: "/garage-dispatch/login" });
    }
  },
  component: AdminLayout,
});

const logoUrl = "/kobby.svg";

const nav = [
  { to: "/garage-dispatch/reviews", label: "Reviews", icon: Star },
  { to: "/garage-dispatch/gallery", label: "Gallery", icon: ImageIcon },
];

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { location } = useRouterState();

  // Login page skips the shell entirely
  if (location.pathname === "/garage-dispatch/login") {
    return <Outlet />;
  }

  const handleLogout = async () => {
    await adminLogoutFn();
    navigate({ to: "/garage-dispatch/login" });
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-surface border-r border-border flex flex-col transform transition-transform duration-200
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-border">
          <img src={logoUrl} alt="CAAS" className="h-9 w-9 rounded-md object-cover" />
          <div>
            <div className="font-display text-xl text-primary tracking-wider leading-none">CAAS</div>
            <div className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground">Control Panel</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          <div className="px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Management</div>
          {nav.map((item) => {
            const active = location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors
                  ${active
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/70 hover:bg-primary/10 hover:text-foreground"
                  }`}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {item.label}
                {active && <ChevronRight className="h-3.5 w-3.5 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-border">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-3 py-2.5 rounded-md text-sm text-foreground/70 hover:bg-destructive/10 hover:text-red-500 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-20 h-14 border-b border-border bg-background/90 backdrop-blur flex items-center px-4 gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 text-foreground/70"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <LayoutDashboard className="h-4 w-4" />
            <span className="font-heading uppercase tracking-wider text-xs">Admin Dashboard</span>
          </div>
          <div className="ml-auto">
            <Link
              to="/"
              className="text-xs text-muted-foreground hover:text-primary transition-colors font-heading uppercase tracking-wider"
            >
              ← View Site
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
