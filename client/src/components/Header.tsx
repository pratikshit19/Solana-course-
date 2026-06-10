import { Link, useLocation } from "wouter";
import { useTheme } from "@/contexts/ThemeContext";
import { Sun, Moon, Zap, Trophy, Calendar, BookOpen } from "lucide-react";

export default function Header() {
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md transition-colors duration-200">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo and Brand */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent shadow-md group-hover:scale-105 transition-transform duration-200">
            <Zap className="h-5 w-5 text-white" />
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary to-accent blur-sm opacity-50 group-hover:opacity-85 transition-opacity" />
          </div>
          <span className="font-bold text-lg md:text-xl tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Solana Mastery Hub
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={`flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary ${
              location === "/" ? "text-primary font-semibold" : "text-foreground/75"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Curriculum
          </Link>
          <Link
            href="/schedule"
            className={`flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary ${
              location === "/schedule" ? "text-primary font-semibold" : "text-foreground/75"
            }`}
          >
            <Calendar className="w-4 h-4" />
            Daily Schedule
          </Link>
          <Link
            href="/projects"
            className={`flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary ${
              location === "/projects" ? "text-primary font-semibold" : "text-foreground/75"
            }`}
          >
            <Trophy className="w-4 h-4" />
            Capstone Projects
          </Link>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Mobile navigation shortcuts */}
          <div className="flex md:hidden items-center gap-2 mr-2">
            <Link
              href="/"
              title="Curriculum"
              className={`p-2 rounded-lg hover:bg-secondary transition-colors ${
                location === "/" ? "text-primary bg-primary/10" : "text-foreground/70"
              }`}
            >
              <BookOpen className="w-5 h-5" />
            </Link>
            <Link
              href="/schedule"
              title="Daily Schedule"
              className={`p-2 rounded-lg hover:bg-secondary transition-colors ${
                location === "/schedule" ? "text-primary bg-primary/10" : "text-foreground/70"
              }`}
            >
              <Calendar className="w-5 h-5" />
            </Link>
            <Link
              href="/projects"
              title="Capstone Projects"
              className={`p-2 rounded-lg hover:bg-secondary transition-colors ${
                location === "/projects" ? "text-primary bg-primary/10" : "text-foreground/70"
              }`}
            >
              <Trophy className="w-5 h-5" />
            </Link>
          </div>

          {/* Theme Toggler */}
          {toggleTheme && (
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-foreground hover:bg-secondary transition-all hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-[1.2rem] w-[1.2rem] text-accent animate-pulse" />
              ) : (
                <Moon className="h-[1.2rem] w-[1.2rem] text-primary" />
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
