import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import {
  User, Briefcase, GraduationCap, Award, BookOpen, Star, Clock,
  Users, CheckCircle, Play, ChevronRight, Edit, Save, X
} from "lucide-react";
import JobCard from "@/components/JobCard";
import { mockJobs, jobCategories, skillTests, courses } from "@/data/mockData";
import { toast } from "sonner";

const SeekerDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Mahmoud Esmat",
    email: "mahmoud@example.com",
    title: "Frontend Engineer",
    location: "Cairo, Egypt",
    experience: "3 years",
    education: "BSc Electrical Engineering (Communications & Electronics)",
    skills: ["React", "TypeScript", "Tailwind CSS", "JavaScript", "HTML/CSS"],
    certifications: ["AWS Certified Developer", "Meta Frontend Certificate"],
    preferredField: "Frontend",
    bio: "Passionate frontend engineer with experience building scalable web applications using React and TypeScript.",
  });
  const [newSkill, setNewSkill] = useState("");
  const [testDialog, setTestDialog] = useState<string | null>(null);
  const [enrollDialog, setEnrollDialog] = useState<string | null>(null);

  const recommendedJobs = mockJobs.filter(
    (j) => j.category === profile.preferredField || profile.skills.some((s) => j.description.toLowerCase().includes(s.toLowerCase()))
  );

  const addSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile({ ...profile, skills: [...profile.skills, newSkill.trim()] });
      setNewSkill("");
      toast.success("Skill added!");
    }
  };

  const removeSkill = (skill: string) => {
    setProfile({ ...profile, skills: profile.skills.filter((s) => s !== skill) });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">Welcome back, {profile.name.split(" ")[0]}!</h1>
            <p className="text-muted-foreground">Manage your profile and discover opportunities</p>
          </div>
          <Badge variant="outline" className="w-fit gap-1.5 px-3 py-1.5 text-sm">
            <User className="h-3.5 w-3.5" /> Job Seeker
          </Badge>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8 flex w-full flex-wrap justify-start gap-1 bg-transparent p-0">
            {[
              { value: "overview", icon: Briefcase, label: "Overview" },
              { value: "profile", icon: User, label: "Profile" },
              { value: "tests", icon: Award, label: "Skill Tests" },
              { value: "courses", icon: BookOpen, label: "Courses" },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="gap-2 rounded-lg border border-transparent px-4 py-2.5 data-[state=active]:border-border data-[state=active]:bg-card data-[state=active]:shadow-sm"
              >
                <tab.icon className="h-4 w-4" /> {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* OVERVIEW TAB */}
          <TabsContent value="overview">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
              {[
                { label: "Profile Completion", value: "85%", icon: User, color: "text-primary" },
                { label: "Matching Jobs", value: String(recommendedJobs.length), icon: Briefcase, color: "text-accent" },
                { label: "Tests Completed", value: "2", icon: Award, color: "text-primary" },
                { label: "Courses Enrolled", value: "1", icon: BookOpen, color: "text-accent" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl border border-border bg-card p-5 card-elevated">
                  <div className="flex items-center justify-between">
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    <span className="font-display text-2xl font-bold text-card-foreground">{stat.value}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">Recommended for You</h2>
              {recommendedJobs.length === 0 ? (
                <p className="text-muted-foreground">Update your profile to get personalized recommendations.</p>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {recommendedJobs.map((job, i) => (
                    <JobCard key={job.id} job={job} index={i} />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* PROFILE TAB */}
          <TabsContent value="profile">
            <div className="max-w-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-semibold text-foreground">Your Profile</h2>
                <Button
                  variant={isEditing ? "default" : "outline"}
                  size="sm"
                  className="gap-2"
                  onClick={() => {
                    if (isEditing) toast.success("Profile saved!");
                    setIsEditing(!isEditing);
                  }}
                >
                  {isEditing ? <><Save className="h-4 w-4" /> Save</> : <><Edit className="h-4 w-4" /> Edit</>}
                </Button>
              </div>

              <div className="space-y-6 rounded-xl border border-border bg-card p-6 card-elevated">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label>Full Name</Label>
                    <Input disabled={!isEditing} value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input disabled={!isEditing} value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
                  </div>
                  <div>
                    <Label>Job Title</Label>
                    <Input disabled={!isEditing} value={profile.title} onChange={(e) => setProfile({ ...profile, title: e.target.value })} />
                  </div>
                  <div>
                    <Label>Location</Label>
                    <Input disabled={!isEditing} value={profile.location} onChange={(e) => setProfile({ ...profile, location: e.target.value })} />
                  </div>
                  <div>
                    <Label>Experience</Label>
                    <Input disabled={!isEditing} value={profile.experience} onChange={(e) => setProfile({ ...profile, experience: e.target.value })} />
                  </div>
                  <div>
                    <Label>Preferred Job Field</Label>
                    <Select disabled={!isEditing} value={profile.preferredField} onValueChange={(v) => setProfile({ ...profile, preferredField: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {jobCategories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Education</Label>
                  <Input disabled={!isEditing} value={profile.education} onChange={(e) => setProfile({ ...profile, education: e.target.value })} />
                </div>

                <div>
                  <Label>Bio</Label>
                  <Textarea disabled={!isEditing} value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} rows={3} />
                </div>

                <div>
                  <Label className="mb-2 block">Skills</Label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {profile.skills.map((s) => (
                      <Badge key={s} variant="secondary" className="gap-1 pr-1.5">
                        {s}
                        {isEditing && (
                          <button onClick={() => removeSkill(s)} className="ml-1 rounded-full hover:bg-destructive/20 p-0.5">
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>
                  {isEditing && (
                    <div className="flex gap-2">
                      <Input placeholder="Add a skill..." value={newSkill} onChange={(e) => setNewSkill(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addSkill()} />
                      <Button variant="outline" onClick={addSkill}>Add</Button>
                    </div>
                  )}
                </div>

                <div>
                  <Label className="mb-2 block">Certifications</Label>
                  <div className="flex flex-wrap gap-2">
                    {profile.certifications.map((c) => (
                      <Badge key={c} variant="outline" className="gap-1">
                        <Award className="h-3 w-3" /> {c}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* SKILL TESTS TAB */}
          <TabsContent value="tests">
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">Available Skill Tests</h2>
            <p className="text-muted-foreground mb-6">Take skill assessments to validate your expertise and stand out to employers.</p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {skillTests.map((test, i) => (
                <motion.div
                  key={test.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-xl border border-border bg-card p-5 card-elevated"
                >
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="secondary">{test.category}</Badge>
                    <Badge variant="outline" className="text-xs">
                      {test.difficulty}
                    </Badge>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-card-foreground">{test.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{test.description}</p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><CheckCircle className="h-3.5 w-3.5" /> {test.questions} questions</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {test.duration}</span>
                  </div>
                  <Dialog open={testDialog === test.id} onOpenChange={(o) => setTestDialog(o ? test.id : null)}>
                    <DialogTrigger asChild>
                      <Button className="mt-4 w-full gap-2" variant="outline">
                        <Play className="h-4 w-4" /> Start Test
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="font-display">{test.title}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <p className="text-muted-foreground">{test.description}</p>
                        <div className="rounded-lg bg-muted p-4 space-y-2 text-sm">
                          <div className="flex justify-between"><span className="text-muted-foreground">Questions:</span><span className="font-medium text-foreground">{test.questions}</span></div>
                          <div className="flex justify-between"><span className="text-muted-foreground">Duration:</span><span className="font-medium text-foreground">{test.duration}</span></div>
                          <div className="flex justify-between"><span className="text-muted-foreground">Difficulty:</span><span className="font-medium text-foreground">{test.difficulty}</span></div>
                        </div>
                        <Button className="w-full" onClick={() => { setTestDialog(null); toast.success("Test started! Good luck! 🎯"); }}>
                          Begin Assessment
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* COURSES TAB */}
          <TabsContent value="courses">
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">Improve Your Skills</h2>
            <p className="text-muted-foreground mb-6">Enroll in courses to sharpen your skills and boost your career prospects.</p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course, i) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-xl border border-border bg-card p-5 card-elevated"
                >
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="secondary">{course.category}</Badge>
                    <div className="flex items-center gap-1 text-sm text-accent">
                      <Star className="h-3.5 w-3.5 fill-current" /> {course.rating}
                    </div>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-card-foreground">{course.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">by {course.instructor}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{course.description}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {course.duration}</span>
                    <span className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" /> {course.lessons} lessons</span>
                    <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {course.enrolled.toLocaleString()}</span>
                  </div>
                  <Dialog open={enrollDialog === course.id} onOpenChange={(o) => setEnrollDialog(o ? course.id : null)}>
                    <DialogTrigger asChild>
                      <Button className="mt-4 w-full gap-2">
                        <GraduationCap className="h-4 w-4" /> Enroll Now
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="font-display">{course.title}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <p className="text-muted-foreground">{course.description}</p>
                        <div className="rounded-lg bg-muted p-4 space-y-2 text-sm">
                          <div className="flex justify-between"><span className="text-muted-foreground">Instructor:</span><span className="font-medium text-foreground">{course.instructor}</span></div>
                          <div className="flex justify-between"><span className="text-muted-foreground">Duration:</span><span className="font-medium text-foreground">{course.duration}</span></div>
                          <div className="flex justify-between"><span className="text-muted-foreground">Level:</span><span className="font-medium text-foreground">{course.level}</span></div>
                          <div className="flex justify-between"><span className="text-muted-foreground">Enrolled:</span><span className="font-medium text-foreground">{course.enrolled.toLocaleString()} students</span></div>
                        </div>
                        <Button className="w-full" onClick={() => { setEnrollDialog(null); toast.success(`Enrolled in "${course.title}" 🎓`); }}>
                          Confirm Enrollment
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default SeekerDashboard;
