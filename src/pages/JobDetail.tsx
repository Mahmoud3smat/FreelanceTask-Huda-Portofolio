import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Clock, DollarSign, Building2, CheckCircle } from "lucide-react";
import { mockJobs } from "@/data/mockData";
import { motion } from "framer-motion";

const JobDetail = () => {
  const { id } = useParams();
  const job = mockJobs.find((j) => j.id === id);

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-2xl font-bold text-foreground">Job not found</h1>
        <Link to="/jobs"><Button variant="outline" className="mt-4">Back to Jobs</Button></Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-10"
    >
      <Link to="/jobs" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Jobs
      </Link>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Badge variant="secondary" className="mb-3">{job.category}</Badge>
          <h1 className="font-display text-3xl font-bold text-foreground">{job.title}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-muted-foreground">
            <span className="flex items-center gap-1.5"><Building2 className="h-4 w-4" /> {job.company}</span>
            <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {job.location}</span>
            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {job.type}</span>
            <span className="flex items-center gap-1.5"><DollarSign className="h-4 w-4" /> {job.salary}</span>
          </div>

          <div className="mt-8">
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">Job Description</h2>
            <p className="text-muted-foreground leading-relaxed">{job.description}</p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              We offer a collaborative environment, competitive compensation, and the opportunity to work on impactful projects. 
              You'll be working with a team of talented professionals who are passionate about technology and innovation.
            </p>
          </div>

          <div className="mt-8">
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">Benefits</h2>
            <div className="flex flex-wrap gap-2">
              {job.benefits.map((b) => (
                <div key={b} className="flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 text-sm text-primary">
                  <CheckCircle className="h-3.5 w-3.5" /> {b}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="sticky top-24 rounded-xl border border-border bg-card p-6 card-elevated">
            <h3 className="font-display text-lg font-semibold text-card-foreground mb-4">Apply for this position</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Posted {job.postedAt}. Submit your application and we'll get back to you.
            </p>
            <Link to="/login">
              <Button className="w-full" size="lg">Apply Now</Button>
            </Link>
            <p className="mt-3 text-center text-xs text-muted-foreground">You need to be logged in to apply</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default JobDetail;
