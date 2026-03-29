import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function NavigationBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleLogin = () => base44.auth.redirectToLogin("/app/feed");
  const handleSignup = () => base44.auth.redirectToLogin("/app/feed");

  return (
    <>
      {/* Luxembourg flag stripe */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1.5 w-full flex">
        <div className="flex-1 bg-lux-red" />
        <div className="flex-1 bg-secondary" />
        <div className="flex-1 bg-lux-blue" />
      </div>

      <nav className={`fixed top-1.5 left-0 right-0 z-50 bg-card transition-shadow ${scrolled ? "shadow-sm border-b border-border" : "border-b border-border"}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <img src="/logo.svg" alt="LetzComply" className="w-10 h-10 rounded-lg object-cover" />
            <div>
              <span className="font-bold text-foreground text-base tracking-tight leading-none block">LetzComply</span>
              <span className="text-[10px] text-muted-foreground leading-none">Luxembourg Fund Regulations</span>
            </div>
          </div>

          {/* Center links — desktop */}
          <div className="hidden md:flex items-center gap-1">
            {["explore", "features", "pricing"].map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-sm text-muted-foreground hover:text-foreground hover:bg-secondary px-3 py-2 rounded-lg transition-all capitalize font-medium"
              >
                {id === "explore" ? "Feed" : id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ))}
          </div>

          {/* Right — desktop */}
          <div className="hidden md:flex items-center gap-2">
            <button onClick={handleLogin} className="text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-lg hover:bg-secondary font-medium">Log In</button>
            <button onClick={handleSignup} className="text-sm bg-primary text-primary-foreground font-semibold px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">Sign Up Free</button>
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <button onClick={handleSignup} className="text-xs bg-primary text-primary-foreground font-semibold px-3 py-2 rounded-lg">Sign Up Free</button>
            <button onClick={() => setMenuOpen(v => !v)} className="p-2 text-muted-foreground">
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-border bg-card px-4 py-4 flex flex-col gap-1">
            {["explore", "features", "pricing"].map((id) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-sm text-muted-foreground text-left py-2 px-3 rounded-lg hover:bg-secondary capitalize font-medium">
                {id === "explore" ? "Feed" : id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ))}
            <hr className="border-border my-1" />
            <button onClick={handleLogin} className="text-sm text-muted-foreground text-left py-2 px-3 rounded-lg hover:bg-secondary font-medium">Log In</button>
          </div>
        )}
      </nav>
    </>
  );
}