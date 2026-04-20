import { teamMembers } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Linkedin, Facebook, MessageCircle, Crown } from "lucide-react";

const Team = () => (
  <div className="container mx-auto px-4 py-10">
    <div className="text-center mb-14">
      <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">Meet Our Team</h1>
      <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
        A talented group of 7 passionate individuals building the future of job recruitment.
      </p>
    </div>

    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {teamMembers.map((member, i) => (
        <motion.div
          key={member.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.5 }}
          className={`relative rounded-xl border bg-card p-6 card-elevated ${
            member.isLeader ? "border-primary/40 ring-1 ring-primary/20" : "border-border"
          }`}
        >
          {member.isLeader && (
            <Badge className="absolute -top-2.5 left-4 gap-1 bg-accent text-accent-foreground">
              <Crown className="h-3 w-3" /> Team Leader
            </Badge>
          )}
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 font-display text-xl font-bold text-primary">
            {member.name.split(" ").map(n => n[0]).join("")}
          </div>
          <h3 className="font-display text-lg font-semibold text-card-foreground">{member.name}</h3>
          <p className="text-sm text-primary font-medium">{member.role}</p>
          <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>
          <div className="mt-4 flex gap-3">
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href={member.facebook} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Facebook className="h-4 w-4" />
            </a>
            <a href={member.whatsapp} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

export default Team;
