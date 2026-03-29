import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Newspaper, BookOpen, Calendar, CheckSquare, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import UserProfileBadge from "@/components/shared/UserProfileBadge";

const NAV_ITEMS = [
  { path: "/app/feed", label: "Feed", icon: Newspaper },
  { path: "/app/tools", label: "Tools", icon: Wrench },
  { path: "/app/calendar", label: "Calendar", icon: Calendar },
  { path: "/app/learn", label: "Learn", icon: BookOpen },
  { path: "/app/actions", label: "My Actions", icon: CheckSquare },
];

export default function AppLayout() {
  const location = useLocation();
  // AppLayout can't access userProfile directly — UserProfileBadge fetches it internally

  return (
    <div className="min-h-screen bg-background">
      {/* Luxembourg flag banner */}
      <div className="h-1.5 w-full flex">
        <div className="flex-1 bg-lux-red" />
        <div className="flex-1" style={{ backgroundColor: "#EEF2F5" }} />
        <div className="flex-1 bg-lux-blue" />
      </div>

      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/app/feed" className="flex items-center gap-2.5">
            <img src="/logo.svg" alt="LetzComply Logo" className="w-11 h-11 rounded-lg object-cover" />
            <div>
              <h1 className="text-lg font-bold tracking-tight text-foreground leading-none">LetzComply</h1>
              <p className="text-[10px] text-muted-foreground leading-none mt-0.5">Luxembourg Fund Regulations</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-1 mr-2">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path || (item.path === "/app/feed" && location.pathname === "/app");
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <UserProfileBadge />
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 pb-24 sm:pb-6">
        <Outlet />
      </main>

      {/* Mobile bottom nav */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t z-50">
        <div className="flex items-center justify-around py-2">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path || (item.path === "/app/feed" && location.pathname === "/app");
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-all",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive && "text-primary")} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}