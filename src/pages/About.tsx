import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Target, Heart, Globe, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const values = [
  { icon: Target, title: "Our Mission", desc: "To bridge the gap between talented professionals and great companies, making job searching and hiring effortless and transparent." },
  { icon: Heart, title: "Our Values", desc: "We believe in fairness, accessibility, and empowerment. Every feature is designed to give both seekers and companies equal opportunity." },
  { icon: Globe, title: "Our Vision", desc: "A world where finding the perfect job—or the perfect candidate—is as simple as a few clicks, powered by smart technology." },
];

const About = () => (
  <div className="container mx-auto px-4 py-10">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto text-center mb-16"
    >
      <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">About JobConnect</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        JobConnect is a modern job platform built by a team of 7 passionate engineers and designers. 
        We combine smart matching algorithms with a clean, intuitive interface to make the hiring process better for everyone.
      </p>
    </motion.div>

    <div className="grid gap-8 md:grid-cols-3 mb-20">
      {values.map((v, i) => (
        <motion.div
          key={v.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, duration: 0.5 }}
          className="rounded-xl border border-border bg-card p-8 text-center card-elevated"
        >
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
            <v.icon className="h-7 w-7 text-primary" />
          </div>
          <h3 className="font-display text-xl font-semibold text-card-foreground">{v.title}</h3>
          <p className="mt-3 text-sm text-muted-foreground">{v.desc}</p>
        </motion.div>
      ))}
    </div>

    <div className="rounded-2xl hero-gradient p-10 md:p-16 text-center">
      <h2 className="font-display text-3xl font-bold text-primary-foreground">Want to learn more?</h2>
      <p className="mt-3 text-primary-foreground/80 max-w-md mx-auto">Check out our team page or start exploring opportunities.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link to="/team"><Button size="lg" variant="secondary" className="gap-2">Meet the Team</Button></Link>
        <Link to="/jobs"><Button size="lg" variant="outline" className="gap-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">Browse Jobs <ArrowRight className="h-4 w-4" /></Button></Link>
      </div>
    </div>
  </div>
);

export default About;
