import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Briefcase, User, Building2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { jobCategories } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";

const Register = () => {
  const [seekerData, setSeekerData] = useState({ name: "", email: "", password: "", field: "" });
  const [companyData, setCompanyData] = useState({ name: "", email: "", password: "", industry: "", location: "" });
  const navigate = useNavigate();
  const { login } = useAuth();

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl hero-gradient">
            <Briefcase className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">Create your account</h1>
          <p className="mt-1 text-muted-foreground">Join JobConnect today</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 card-elevated">
          <Tabs defaultValue="seeker">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="seeker" className="gap-2"><User className="h-4 w-4" /> Job Seeker</TabsTrigger>
              <TabsTrigger value="company" className="gap-2"><Building2 className="h-4 w-4" /> Company</TabsTrigger>
            </TabsList>

            <TabsContent value="seeker">
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); login("seeker"); toast.success("Account created!"); navigate("/seeker-dashboard"); }}>
                <div>
                  <Label>Full Name</Label>
                  <Input placeholder="John Doe" value={seekerData.name} onChange={(e) => setSeekerData({ ...seekerData, name: e.target.value })} />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" placeholder="you@example.com" value={seekerData.email} onChange={(e) => setSeekerData({ ...seekerData, email: e.target.value })} />
                </div>
                <div>
                  <Label>Password</Label>
                  <Input type="password" placeholder="••••••••" value={seekerData.password} onChange={(e) => setSeekerData({ ...seekerData, password: e.target.value })} />
                </div>
                <div>
                  <Label>Preferred Field</Label>
                  <Select value={seekerData.field} onValueChange={(v) => setSeekerData({ ...seekerData, field: v })}>
                    <SelectTrigger><SelectValue placeholder="Select a field" /></SelectTrigger>
                    <SelectContent>
                      {jobCategories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full" type="submit">Create Job Seeker Account</Button>
              </form>
            </TabsContent>

            <TabsContent value="company">
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); login("company"); toast.success("Account created!"); navigate("/company-dashboard"); }}>
                <div>
                  <Label>Company Name</Label>
                  <Input placeholder="Acme Inc." value={companyData.name} onChange={(e) => setCompanyData({ ...companyData, name: e.target.value })} />
                </div>
                <div>
                  <Label>Company Email</Label>
                  <Input type="email" placeholder="hr@company.com" value={companyData.email} onChange={(e) => setCompanyData({ ...companyData, email: e.target.value })} />
                </div>
                <div>
                  <Label>Password</Label>
                  <Input type="password" placeholder="••••••••" value={companyData.password} onChange={(e) => setCompanyData({ ...companyData, password: e.target.value })} />
                </div>
                <div>
                  <Label>Industry</Label>
                  <Input placeholder="Technology" value={companyData.industry} onChange={(e) => setCompanyData({ ...companyData, industry: e.target.value })} />
                </div>
                <div>
                  <Label>Location</Label>
                  <Input placeholder="Cairo, Egypt" value={companyData.location} onChange={(e) => setCompanyData({ ...companyData, location: e.target.value })} />
                </div>
                <Button className="w-full" type="submit">Create Company Account</Button>
              </form>
            </TabsContent>
          </Tabs>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
