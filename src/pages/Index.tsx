import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, Users, Building2, GraduationCap, Shield, Zap } from "lucide-react";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import JobCard from "@/components/JobCard";
import { mockJobs } from "@/data/mockData";

const features = [
  { icon: Search, title: "Smart Matching", desc: "AI-powered job recommendations based on your skills and preferences." },
  { icon: GraduationCap, title: "Skill Tests & Courses", desc: "Validate your skills with tests and enroll in courses to grow." },
  { icon: Building2, title: "Company Profiles", desc: "Companies showcase their culture, benefits, and open positions." },
  { icon: Shield, title: "Verified Listings", desc: "All job postings are verified for quality and authenticity." },
  { icon: Users, title: "Candidate Filtering", desc: "Companies filter candidates by skills, location, and experience." },
  { icon: Zap, title: "Fast & Simple", desc: "Clean interface designed for speed and ease of use." },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const Index = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-foreground/70" />
        </div>
        <div className="container relative z-10 mx-auto px-4 py-24 md:py-36">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="font-display text-4xl font-bold leading-tight text-primary-foreground md:text-6xl">
              Find Your Dream Job <span className="text-accent">Today</span>
            </h1>
            <p className="mt-5 text-lg text-primary-foreground/80 md:text-xl">
              Connect with top companies, showcase your skills, and land the perfect role. For job seekers and employers alike.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/register">
                <Button size="lg" className="gap-2 text-base">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/jobs">
                <Button size="lg" variant="outline" className="gap-2 text-base border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                  Browse Jobs
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">Why JobConnect?</h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">Everything you need to find or fill the perfect position, all in one platform.</p>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="rounded-xl border border-border bg-card p-6 card-elevated"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-card-foreground">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground">Featured Jobs</h2>
              <p className="mt-2 text-muted-foreground">Latest opportunities from top companies</p>
            </div>
            <Link to="/jobs" className="hidden md:block">
              <Button variant="outline" className="gap-2">View All <ArrowRight className="h-4 w-4" /></Button>
            </Link>
          </motion.div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockJobs.slice(0, 3).map((job, i) => (
              <JobCard key={job.id} job={job} index={i} />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link to="/jobs"><Button variant="outline" className="gap-2">View All Jobs <ArrowRight className="h-4 w-4" /></Button></Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="rounded-2xl hero-gradient p-10 md:p-16 text-center">
            <h2 className="font-display text-3xl font-bold text-primary-foreground md:text-4xl">Ready to Take the Next Step?</h2>
            <p className="mt-4 text-primary-foreground/80 max-w-lg mx-auto">Whether you're looking for your next opportunity or your next great hire, JobConnect has you covered.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/register">
                <Button size="lg" variant="secondary" className="gap-2 text-base">
                  I'm a Job Seeker
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" variant="outline" className="gap-2 text-base border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                  I'm a Company
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
