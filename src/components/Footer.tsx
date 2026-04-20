import { Link } from "react-router-dom";
import { Briefcase } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-card">
    <div className="container mx-auto px-4 py-12">
      <div className="grid gap-8 md:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg hero-gradient">
              <Briefcase className="h-4 w-4 text-primary-foreground" />
            </div>
            JobConnect
          </Link>
          <p className="mt-3 text-sm text-muted-foreground">
            Connecting talent with opportunity. Your next career move starts here.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold text-foreground mb-3">For Job Seekers</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <Link to="/jobs" className="hover:text-primary transition-colors">Browse Jobs</Link>
            <Link to="/register" className="hover:text-primary transition-colors">Create Profile</Link>
            <span className="cursor-default">Skill Tests</span>
            <span className="cursor-default">Courses</span>
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold text-foreground mb-3">For Companies</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <Link to="/register" className="hover:text-primary transition-colors">Post a Job</Link>
            <span className="cursor-default">Find Candidates</span>
            <span className="cursor-default">Pricing</span>
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold text-foreground mb-3">Company</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <Link to="/about" className="hover:text-primary transition-colors">About Us</Link>
            <Link to="/team" className="hover:text-primary transition-colors">Our Team</Link>
          </div>
        </div>
      </div>
      <div className="mt-10 border-t border-border pt-6 text-center text-sm text-muted-foreground">
        © 2026 JobConnect. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
