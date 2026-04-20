import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, MapPin, SlidersHorizontal, X } from "lucide-react";
import JobCard from "@/components/JobCard";
import { mockJobs, jobCategories } from "@/data/mockData";
import { motion } from "framer-motion";

const locations = ["All Locations", "Cairo, Egypt", "Alexandria, Egypt", "Dubai, UAE", "Riyadh, Saudi Arabia", "Amman, Jordan", "Remote"];
const jobTypes = ["All Types", "Full-time", "Part-time", "Contract", "Freelance"];
const experienceLevels = ["All Levels", "0-1 years", "1-3 years", "2-4 years", "3-5 years", "4-6 years", "5+ years"];
const salaryRanges = ["All Ranges", "Under EGP 15,000", "EGP 15,000 - 25,000", "EGP 25,000 - 40,000", "Above EGP 40,000"];
const sortOptions = ["Newest First", "Salary: High to Low", "Salary: Low to High"];

const Jobs = () => {
  const [search, setSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [location, setLocation] = useState("All Locations");
  const [jobType, setJobType] = useState("All Types");
  const [experience, setExperience] = useState("All Levels");
  const [salaryRange, setSalaryRange] = useState("All Ranges");
  const [sort, setSort] = useState("Newest First");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const hasActiveFilters = location !== "All Locations" || jobType !== "All Types" || experience !== "All Levels" || salaryRange !== "All Ranges" || category !== "all";

  const clearFilters = () => {
    setLocation("All Locations");
    setJobType("All Types");
    setExperience("All Levels");
    setSalaryRange("All Ranges");
    setCategory("all");
  };

  const filtered = useMemo(() => {
    let jobs = mockJobs.filter((job) => {
      const matchSearch = !search || job.title.toLowerCase().includes(search.toLowerCase()) || job.company.toLowerCase().includes(search.toLowerCase());
      const matchLocation = location === "All Locations" || job.location === location;
      const matchLocationSearch = !locationSearch || job.location.toLowerCase().includes(locationSearch.toLowerCase());
      const matchType = jobType === "All Types" || job.type === jobType;
      const matchExp = experience === "All Levels" || job.experience === experience;
      const matchCat = category === "all" || job.category === category;

      let matchSalary = true;
      if (salaryRange !== "All Ranges") {
        const salaryNum = parseInt(job.salary.replace(/[^0-9]/g, ""));
        if (salaryRange === "Under EGP 15,000") matchSalary = salaryNum < 15000;
        else if (salaryRange === "EGP 15,000 - 25,000") matchSalary = salaryNum >= 15000 && salaryNum <= 25000;
        else if (salaryRange === "EGP 25,000 - 40,000") matchSalary = salaryNum >= 25000 && salaryNum <= 40000;
        else if (salaryRange === "Above EGP 40,000") matchSalary = salaryNum > 40000;
      }

      return matchSearch && matchLocation && matchLocationSearch && matchType && matchExp && matchCat && matchSalary;
    });

    if (sort === "Salary: High to Low") {
      jobs = [...jobs].sort((a, b) => {
        const aNum = parseInt(a.salary.replace(/[^0-9]/g, ""));
        const bNum = parseInt(b.salary.replace(/[^0-9]/g, ""));
        return bNum - aNum;
      });
    } else if (sort === "Salary: Low to High") {
      jobs = [...jobs].sort((a, b) => {
        const aNum = parseInt(a.salary.replace(/[^0-9]/g, ""));
        const bNum = parseInt(b.salary.replace(/[^0-9]/g, ""));
        return aNum - bNum;
      });
    }

    return jobs;
  }, [search, locationSearch, location, jobType, experience, salaryRange, category, sort]);

  const FilterSidebar = ({ className = "" }: { className?: string }) => (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-foreground">Filters</h2>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs text-muted-foreground h-auto p-1">
            Clear Filters
          </Button>
        )}
      </div>

      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">Location</label>
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {locations.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">Job Type</label>
        <Select value={jobType} onValueChange={setJobType}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {jobTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">Category</label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {jobCategories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">Experience Level</label>
        <Select value={experience} onValueChange={setExperience}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {experienceLevels.map((e) => <SelectItem key={e} value={e}>{e}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">Salary Range</label>
        <Select value={salaryRange} onValueChange={setSalaryRange}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {salaryRanges.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-2">
        <p className="text-sm text-primary font-medium">{filtered.length} jobs available</p>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Job title or keyword"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Location"
            value={locationSearch}
            onChange={(e) => setLocationSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button className="gap-2 px-8">
          <Search className="h-4 w-4" /> Search
        </Button>
        <Button
          variant="outline"
          className="lg:hidden gap-2"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
        >
          <SlidersHorizontal className="h-4 w-4" /> Filters
        </Button>
      </div>

      {/* Mobile Filters */}
      {showMobileFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden mb-8 rounded-xl border border-border bg-card p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold">Filters</h2>
            <Button variant="ghost" size="icon" onClick={() => setShowMobileFilters(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Location</label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{locations.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Job Type</label>
              <Select value={jobType} onValueChange={setJobType}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{jobTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Category</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {jobCategories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Experience</label>
              <Select value={experience} onValueChange={setExperience}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{experienceLevels.map((e) => <SelectItem key={e} value={e}>{e}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Salary</label>
              <Select value={salaryRange} onValueChange={setSalaryRange}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{salaryRanges.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={clearFilters} className="mt-4 w-full">Clear Filters</Button>
          )}
        </motion.div>
      )}

      {/* Main Content */}
      <div className="flex gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24 rounded-xl border border-border bg-card p-5">
            <FilterSidebar />
          </div>
        </aside>

        {/* Job Listings */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium text-foreground">{filtered.length}</span> jobs
            </p>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-52">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {filtered.length === 0 ? (
            <div className="py-20 text-center text-muted-foreground rounded-xl border border-border bg-card">
              <p className="text-lg font-medium mb-1">No jobs found</p>
              <p className="text-sm">Try adjusting your filters or search terms</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((job, i) => (
                <JobCard key={job.id} job={job} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
