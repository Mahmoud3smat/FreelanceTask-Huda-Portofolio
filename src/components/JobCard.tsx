import { Link } from "react-router-dom";
import { MapPin, Clock, DollarSign, Building2, Bookmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  category: string;
  postedAt: string;
  description: string;
  benefits: string[];
  experience?: string;
  skills?: string[];
}

const JobCard = ({ job, index = 0 }: { job: Job; index?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05, duration: 0.4 }}
  >
    <div className="rounded-xl border border-border bg-card p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <Building2 className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-display text-lg font-semibold text-card-foreground">{job.title}</h3>
              <p className="text-sm text-muted-foreground">{job.company}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="font-semibold text-primary">{job.salary}</p>
              <p className="text-xs text-muted-foreground mt-0.5">~{job.postedAt}</p>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="outline" className="gap-1 font-normal">
              <MapPin className="h-3 w-3" /> {job.location}
            </Badge>
            <Badge variant="outline" className="gap-1 font-normal">
              <Clock className="h-3 w-3" /> {job.type}
            </Badge>
            {job.experience && (
              <Badge variant="outline" className="gap-1 font-normal">
                {job.experience}
              </Badge>
            )}
          </div>

          <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{job.description}</p>

          {job.skills && job.skills.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {job.skills.slice(0, 3).map((s) => (
                <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
              ))}
              {job.skills.length > 3 && (
                <Badge variant="secondary" className="text-xs">+{job.skills.length - 3}</Badge>
              )}
            </div>
          )}

          <div className="mt-4 flex items-center justify-end gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Bookmark className="h-4 w-4" />
            </Button>
            <Link to={`/jobs/${job.id}`}>
              <Button size="sm">Apply</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

export default JobCard;
