import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { useIsAdmin } from "@/hooks/useQueries";
import {
  BookOpen,
  GraduationCap,
  Home,
  LayoutDashboard,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: isAdmin } = useIsAdmin();
  const { login, clear, loginStatus, identity } = useInternetIdentity();

  const isLoggedIn = loginStatus === "success" || !!identity;

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "questions", label: "Questions", icon: BookOpen },
    { id: "quizzes", label: "Quizzes", icon: GraduationCap },
    ...(isAdmin
      ? [{ id: "admin", label: "Admin", icon: LayoutDashboard }]
      : []),
  ];

  const handleNav = (page: string) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-brand-navy shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            type="button"
            onClick={() => handleNav("home")}
            className="flex items-center gap-3 group"
            data-ocid="nav.home_link"
          >
            <img
              src="/assets/generated/yashwant-logo-transparent.dim_200x200.png"
              alt="Yashwant Classes"
              className="w-9 h-9 rounded-lg object-cover"
            />
            <div className="flex flex-col">
              <span className="font-display text-lg font-bold text-white leading-tight">
                Yashwant Classes
              </span>
              <span className="text-xs text-white/50 font-body hidden sm:block">
                Excellence in Education
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  data-ocid={`nav.${item.id}_link`}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-brand-saffron text-white"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Auth + Mobile */}
          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              {isLoggedIn ? (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={clear}
                  className="border-white/20 text-white hover:bg-white/10 text-xs"
                >
                  Logout
                </Button>
              ) : (
                <Button
                  size="sm"
                  onClick={login}
                  disabled={loginStatus === "logging-in"}
                  className="bg-brand-saffron hover:bg-brand-saffron/90 text-white text-xs"
                >
                  Login
                </Button>
              )}
            </div>

            {/* Mobile menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="md:hidden text-white hover:bg-white/10"
                >
                  {mobileOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-72 bg-brand-navy border-l border-white/10 p-0"
                data-ocid="nav.sheet"
              >
                <SheetHeader className="p-6 border-b border-white/10">
                  <SheetTitle className="text-white font-display text-left">
                    Menu
                  </SheetTitle>
                </SheetHeader>
                <nav className="p-4 space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPage === item.id;
                    return (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => handleNav(item.id)}
                        data-ocid={`nav.${item.id}_link`}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                          isActive
                            ? "bg-brand-saffron text-white"
                            : "text-white/70 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {item.label}
                      </button>
                    );
                  })}
                </nav>
                <div className="p-4 border-t border-white/10">
                  {isLoggedIn ? (
                    <Button
                      className="w-full border-white/20 text-white hover:bg-white/10"
                      variant="outline"
                      onClick={() => {
                        clear();
                        setMobileOpen(false);
                      }}
                    >
                      Logout
                    </Button>
                  ) : (
                    <Button
                      className="w-full bg-brand-saffron hover:bg-brand-saffron/90 text-white"
                      onClick={() => {
                        login();
                        setMobileOpen(false);
                      }}
                      disabled={loginStatus === "logging-in"}
                    >
                      Login
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
