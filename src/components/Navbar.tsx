import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Briefcase, LogOut } from "lucide-react";
import { Button } from "@/Components/button";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/Contexts/AuthContext";
import { toast } from "sonner";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { userRole, isLoggedIn, logout } = useAuth();

  const navLinks = [
    { to: "/", label: "Home", show: true },
    {
      to: "/jobs",
      label: "Find Jobs",
      show: !isLoggedIn || userRole === "seeker",
    },
    { to: "/about", label: "About", show: true },
    { to: "/team", label: "Team", show: true },
  ];

  const visibleLinks = navLinks.filter((l) => l.show);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/");
    setOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          to="/"
          className="flex items-center gap-2 font-display text-xl font-bold text-foreground"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg hero-gradient">
            <Briefcase className="h-5 w-5 text-primary-foreground" />
          </div>
          JobConnect
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 md:flex">
          {visibleLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {isLoggedIn ? (
            <>
              {userRole === "seeker" && (
                <Link to="/seeker-dashboard">
                  <Button variant="ghost" size="sm">
                    My Dashboard
                  </Button>
                </Link>
              )}
              {userRole === "company" && (
                <Link to="/company-dashboard">
                  <Button variant="ghost" size="sm">
                    Company Dashboard
                  </Button>
                </Link>
              )}
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" /> Log Out
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Log In
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Get Started</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-foreground"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              {visibleLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-4 py-3 text-sm font-medium ${
                    location.pathname === link.to
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 flex flex-col gap-2">
                {isLoggedIn ? (
                  <>
                    {userRole === "seeker" && (
                      <Link
                        to="/seeker-dashboard"
                        onClick={() => setOpen(false)}
                      >
                        <Button variant="outline" className="w-full">
                          My Dashboard
                        </Button>
                      </Link>
                    )}
                    {userRole === "company" && (
                      <Link
                        to="/company-dashboard"
                        onClick={() => setOpen(false)}
                      >
                        <Button variant="outline" className="w-full">
                          Company Dashboard
                        </Button>
                      </Link>
                    )}
                    <Button
                      className="w-full gap-2"
                      variant="destructive"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4" /> Log Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setOpen(false)}>
                      <Button variant="outline" className="w-full">
                        Log In
                      </Button>
                    </Link>
                    <Link to="/register" onClick={() => setOpen(false)}>
                      <Button className="w-full">Get Started</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
