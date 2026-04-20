import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import {
  Building2, Briefcase, Users, MapPin, Edit, Save, Plus, Trash2,
  Clock, DollarSign, CalendarDays, AlertTriangle, Search, Star, X
} from "lucide-react";
import { jobCategories, mockCandidates } from "@/data/mockData";
import { toast } from "sonner";

interface JobPosting {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  type: string;
  salaryMin: string;
  salaryMax: string;
  workHours: string;
  benefits: string[];
  expiryDate: string;
  active: boolean;
  createdAt: string;
}

const benefitOptions = [
  "Housing Allowance",
  "Transport Allowance",
  "Medical Insurance",
  "Social Insurance",
  "Annual Bonus",
  "Remote Friendly",
  "Flexible Hours",
  "Training Budget",
];

const CompanyDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [company, setCompany] = useState({
    name: "TechVision Inc.",
    email: "hr@techvision.com",
    industry: "Technology",
    location: "Cairo, Egypt",
    phone: "+20 100 123 4567",
    website: "techvision.com",
    description: "A leading technology company building innovative solutions for the MENA region.",
  });

  const [postings, setPostings] = useState<JobPosting[]>([
    {
      id: "p1",
      title: "Senior Frontend Engineer",
      description: "Lead our web platform team with React, TypeScript, and modern CSS.",
      category: "Frontend",
      location: "Cairo, Egypt",
      type: "Full-time",
      salaryMin: "3000",
      salaryMax: "5000",
      workHours: "9 AM - 5 PM",
      benefits: ["Medical Insurance", "Housing Allowance", "Remote Friendly"],
      expiryDate: "2026-04-15",
      active: true,
      createdAt: "2 days ago",
    },
    {
      id: "p2",
      title: "Backend Developer",
      description: "Build scalable APIs and microservices using Node.js.",
      category: "Backend",
      location: "Cairo, Egypt",
      type: "Full-time",
      salaryMin: "2500",
      salaryMax: "4000",
      workHours: "9 AM - 5 PM",
      benefits: ["Social Insurance", "Transport Allowance"],
      expiryDate: "2026-03-20",
      active: true,
      createdAt: "5 days ago",
    },
  ]);

  const [newPosting, setNewPosting] = useState<Omit<JobPosting, "id" | "createdAt">>({
    title: "",
    description: "",
    category: "",
    location: "",
    type: "Full-time",
    salaryMin: "",
    salaryMax: "",
    workHours: "9 AM - 5 PM",
    benefits: [],
    expiryDate: "",
    active: true,
  });

  const [showNewPostDialog, setShowNewPostDialog] = useState(false);
  const [candidateSearch, setCandidateSearch] = useState("");
  const [candidateLocationFilter, setCandidateLocationFilter] = useState("all");
  const [customField, setCustomField] = useState("");

  const handleCreatePost = () => {
    if (!newPosting.title || !newPosting.category || !newPosting.location) {
      toast.error("Please fill in all required fields");
      return;
    }
    const post: JobPosting = {
      ...newPosting,
      id: `p${Date.now()}`,
      createdAt: "Just now",
    };
    setPostings([post, ...postings]);
    setNewPosting({ title: "", description: "", category: "", location: "", type: "Full-time", salaryMin: "", salaryMax: "", workHours: "9 AM - 5 PM", benefits: [], expiryDate: "", active: true });
    setShowNewPostDialog(false);
    toast.success("Job posted successfully! 🎉");
  };

  const cancelPosting = (id: string) => {
    setPostings(postings.map((p) => (p.id === id ? { ...p, active: false } : p)));
    toast.info("Job posting cancelled");
  };

  const deletePosting = (id: string) => {
    setPostings(postings.filter((p) => p.id !== id));
    toast.success("Posting deleted");
  };

  const toggleBenefit = (benefit: string) => {
    setNewPosting({
      ...newPosting,
      benefits: newPosting.benefits.includes(benefit)
        ? newPosting.benefits.filter((b) => b !== benefit)
        : [...newPosting.benefits, benefit],
    });
  };

  const addCustomCategory = () => {
    if (customField.trim() && !jobCategories.includes(customField.trim())) {
      jobCategories.push(customField.trim());
      setNewPosting({ ...newPosting, category: customField.trim() });
      setCustomField("");
      toast.success("New field added!");
    } else if (jobCategories.includes(customField.trim())) {
      toast.error("This field already exists");
    }
  };

  const filteredCandidates = mockCandidates.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(candidateSearch.toLowerCase()) ||
      c.skills.some((s) => s.toLowerCase().includes(candidateSearch.toLowerCase()));
    const matchLocation = candidateLocationFilter === "all" || c.location.toLowerCase().includes(candidateLocationFilter.toLowerCase());
    return matchSearch && matchLocation;
  });

  const uniqueLocations = [...new Set(mockCandidates.map((c) => c.location))];

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">{company.name}</h1>
            <p className="text-muted-foreground">Manage your company and job postings</p>
          </div>
          <Badge variant="outline" className="w-fit gap-1.5 px-3 py-1.5 text-sm">
            <Building2 className="h-3.5 w-3.5" /> Company
          </Badge>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8 flex w-full flex-wrap justify-start gap-1 bg-transparent p-0">
            {[
              { value: "overview", icon: Briefcase, label: "Overview" },
              { value: "profile", icon: Building2, label: "Company Profile" },
              { value: "postings", icon: Briefcase, label: "Job Postings" },
              { value: "candidates", icon: Users, label: "Candidates" },
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

          {/* OVERVIEW */}
          <TabsContent value="overview">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
              {[
                { label: "Active Postings", value: String(postings.filter((p) => p.active).length), icon: Briefcase, color: "text-primary" },
                { label: "Total Candidates", value: String(mockCandidates.length), icon: Users, color: "text-accent" },
                { label: "Expiring Soon", value: "1", icon: AlertTriangle, color: "text-destructive" },
                { label: "Avg Match Score", value: "86%", icon: Star, color: "text-primary" },
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

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-6 card-elevated">
                <h3 className="font-display text-lg font-semibold text-card-foreground mb-4">Recent Postings</h3>
                <div className="space-y-3">
                  {postings.slice(0, 3).map((p) => (
                    <div key={p.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                      <div>
                        <p className="font-medium text-foreground">{p.title}</p>
                        <p className="text-xs text-muted-foreground">{p.createdAt}</p>
                      </div>
                      <Badge variant={p.active ? "default" : "secondary"}>{p.active ? "Active" : "Closed"}</Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-6 card-elevated">
                <h3 className="font-display text-lg font-semibold text-card-foreground mb-4">Top Candidates</h3>
                <div className="space-y-3">
                  {mockCandidates.slice(0, 3).map((c) => (
                    <div key={c.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                      <div>
                        <p className="font-medium text-foreground">{c.name}</p>
                        <p className="text-xs text-muted-foreground">{c.title} • {c.location}</p>
                      </div>
                      <Badge variant="outline">{c.matchScore}% match</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* COMPANY PROFILE */}
          <TabsContent value="profile">
            <div className="max-w-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-semibold text-foreground">Company Profile</h2>
                <Button
                  variant={isEditing ? "default" : "outline"}
                  size="sm"
                  className="gap-2"
                  onClick={() => {
                    if (isEditing) toast.success("Company profile saved!");
                    setIsEditing(!isEditing);
                  }}
                >
                  {isEditing ? <><Save className="h-4 w-4" /> Save</> : <><Edit className="h-4 w-4" /> Edit</>}
                </Button>
              </div>

              <div className="space-y-4 rounded-xl border border-border bg-card p-6 card-elevated">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label>Company Name</Label>
                    <Input disabled={!isEditing} value={company.name} onChange={(e) => setCompany({ ...company, name: e.target.value })} />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input disabled={!isEditing} value={company.email} onChange={(e) => setCompany({ ...company, email: e.target.value })} />
                  </div>
                  <div>
                    <Label>Industry</Label>
                    <Input disabled={!isEditing} value={company.industry} onChange={(e) => setCompany({ ...company, industry: e.target.value })} />
                  </div>
                  <div>
                    <Label>Location</Label>
                    <Input disabled={!isEditing} value={company.location} onChange={(e) => setCompany({ ...company, location: e.target.value })} />
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <Input disabled={!isEditing} value={company.phone} onChange={(e) => setCompany({ ...company, phone: e.target.value })} />
                  </div>
                  <div>
                    <Label>Website</Label>
                    <Input disabled={!isEditing} value={company.website} onChange={(e) => setCompany({ ...company, website: e.target.value })} />
                  </div>
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea disabled={!isEditing} value={company.description} onChange={(e) => setCompany({ ...company, description: e.target.value })} rows={3} />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* JOB POSTINGS */}
          <TabsContent value="postings">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-semibold text-foreground">Job Postings</h2>
              <Dialog open={showNewPostDialog} onOpenChange={setShowNewPostDialog}>
                <DialogTrigger asChild>
                  <Button className="gap-2"><Plus className="h-4 w-4" /> New Posting</Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="font-display">Create Job Posting</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Job Title *</Label>
                      <Input value={newPosting.title} onChange={(e) => setNewPosting({ ...newPosting, title: e.target.value })} placeholder="e.g. Senior React Developer" />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea value={newPosting.description} onChange={(e) => setNewPosting({ ...newPosting, description: e.target.value })} placeholder="Describe the role..." rows={3} />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label>Category *</Label>
                        <Select value={newPosting.category} onValueChange={(v) => setNewPosting({ ...newPosting, category: v })}>
                          <SelectTrigger><SelectValue placeholder="Select field" /></SelectTrigger>
                          <SelectContent>
                            {jobCategories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        <div className="mt-2 flex gap-2">
                          <Input placeholder="Or add new..." value={customField} onChange={(e) => setCustomField(e.target.value)} className="text-xs" />
                          <Button variant="outline" size="sm" onClick={addCustomCategory}>Add</Button>
                        </div>
                      </div>
                      <div>
                        <Label>Location *</Label>
                        <Input value={newPosting.location} onChange={(e) => setNewPosting({ ...newPosting, location: e.target.value })} placeholder="e.g. Cairo, Egypt" />
                      </div>
                      <div>
                        <Label>Job Type</Label>
                        <Select value={newPosting.type} onValueChange={(v) => setNewPosting({ ...newPosting, type: v })}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Full-time">Full-time</SelectItem>
                            <SelectItem value="Part-time">Part-time</SelectItem>
                            <SelectItem value="Contract">Contract</SelectItem>
                            <SelectItem value="Freelance">Freelance</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Work Hours</Label>
                        <Input value={newPosting.workHours} onChange={(e) => setNewPosting({ ...newPosting, workHours: e.target.value })} placeholder="e.g. 9 AM - 5 PM" />
                      </div>
                      <div>
                        <Label>Salary Min ($)</Label>
                        <Input type="number" value={newPosting.salaryMin} onChange={(e) => setNewPosting({ ...newPosting, salaryMin: e.target.value })} />
                      </div>
                      <div>
                        <Label>Salary Max ($)</Label>
                        <Input type="number" value={newPosting.salaryMax} onChange={(e) => setNewPosting({ ...newPosting, salaryMax: e.target.value })} />
                      </div>
                    </div>
                    <div>
                      <Label>Expiry Date</Label>
                      <Input type="date" value={newPosting.expiryDate} onChange={(e) => setNewPosting({ ...newPosting, expiryDate: e.target.value })} />
                    </div>
                    <div>
                      <Label className="mb-2 block">Benefits</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {benefitOptions.map((b) => (
                          <label key={b} className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                            <Checkbox checked={newPosting.benefits.includes(b)} onCheckedChange={() => toggleBenefit(b)} />
                            {b}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowNewPostDialog(false)}>Cancel</Button>
                    <Button onClick={handleCreatePost}>Create Posting</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-4">
              {postings.length === 0 ? (
                <p className="text-center text-muted-foreground py-10">No job postings yet. Create your first one!</p>
              ) : (
                postings.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`rounded-xl border bg-card p-5 card-elevated ${!p.active ? "opacity-60 border-border" : "border-border"}`}
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="font-display text-lg font-semibold text-card-foreground">{p.title}</h3>
                          <Badge variant={p.active ? "default" : "secondary"}>{p.active ? "Active" : "Closed"}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{p.description}</p>
                        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {p.location}</span>
                          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {p.type}</span>
                          <span className="flex items-center gap-1"><DollarSign className="h-3.5 w-3.5" /> ${p.salaryMin} - ${p.salaryMax}/mo</span>
                          {p.expiryDate && (
                            <span className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" /> Expires: {p.expiryDate}</span>
                          )}
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {p.benefits.map((b) => (
                            <Badge key={b} variant="outline" className="text-xs">{b}</Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        {p.active && (
                          <Button variant="outline" size="sm" className="gap-1" onClick={() => cancelPosting(p.id)}>
                            <X className="h-3.5 w-3.5" /> Cancel
                          </Button>
                        )}
                        <Button variant="outline" size="sm" className="gap-1 text-destructive hover:text-destructive" onClick={() => deletePosting(p.id)}>
                          <Trash2 className="h-3.5 w-3.5" /> Delete
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </TabsContent>

          {/* CANDIDATES */}
          <TabsContent value="candidates">
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">Browse Candidates</h2>
            <div className="flex flex-col gap-4 sm:flex-row mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by name or skill..."
                  value={candidateSearch}
                  onChange={(e) => setCandidateSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={candidateLocationFilter} onValueChange={setCandidateLocationFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {uniqueLocations.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {filteredCandidates.length === 0 ? (
                <p className="col-span-full text-center text-muted-foreground py-10">No candidates match your filters.</p>
              ) : (
                filteredCandidates.map((c, i) => (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="rounded-xl border border-border bg-card p-5 card-elevated"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 font-display font-bold text-primary">
                          {c.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <h3 className="font-display font-semibold text-card-foreground">{c.name}</h3>
                          <p className="text-sm text-muted-foreground">{c.title}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="shrink-0 text-primary border-primary/30">{c.matchScore}% match</Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {c.location}</span>
                      <span>{c.experience} experience</span>
                      <span>{c.education}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {c.skills.map((s) => (
                        <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
                      ))}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default CompanyDashboard;
