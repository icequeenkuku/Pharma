import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { StatCard } from "@/components/StatCard";
import { ClientCard } from "@/components/ClientCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DollarSign, TrendingUp, Shield, Users, Search } from "lucide-react";
import { mockClients, portfolioStats } from "@/data/mockData";

export default function DonorDashboard() {
  const [search, setSearch] = useState("");
  const [sectorFilter, setSectorFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = mockClients.filter((c) => {
    if (search && !c.companyName.toLowerCase().includes(search.toLowerCase())) return false;
    if (sectorFilter !== "all" && c.sector !== sectorFilter) return false;
    if (statusFilter !== "all" && c.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold">Donor Dashboard</h1>
          <p className="text-muted-foreground mt-1">Overview of your investment portfolio and applicants</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Popover>
            <PopoverTrigger asChild>
              <div className="cursor-pointer transition-transform hover:scale-[1.02]">
                <StatCard title="Capital" value={`$${(portfolioStats.totalCapitalDeployed / 1000).toFixed(0)}K`} icon={DollarSign} />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-72 p-4">
              <h4 className="font-semibold text-sm mb-3">Capital Breakdown</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Gross Capital:</span>
                  <span className="font-medium">$1,500,000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Capital Deployed:</span>
                  <span className="font-medium">${portfolioStats.totalCapitalDeployed.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-border/50">
                  <span className="text-muted-foreground">Net Available:</span>
                  <span className="font-medium text-success">${(1500000 - portfolioStats.totalCapitalDeployed).toLocaleString()}</span>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <StatCard title="Total Repaid" value={`$${(portfolioStats.totalRepaid / 1000).toFixed(0)}K`} icon={TrendingUp} />
          <StatCard title="Avg Risk Score" value={`${portfolioStats.averageRiskScore}%`} icon={Shield} />
          <StatCard title="Active Clients" value={String(portfolioStats.activeClients)} icon={Users} />
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search companies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-secondary/30"
            />
          </div>
          <Select value={sectorFilter} onValueChange={setSectorFilter}>
            <SelectTrigger className="w-[160px] bg-secondary/30">
              <SelectValue placeholder="Sector" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sectors</SelectItem>
              <SelectItem value="Generics">Generics</SelectItem>
              <SelectItem value="Vaccines">Vaccines</SelectItem>
              <SelectItem value="Diagnostics">Diagnostics</SelectItem>
              <SelectItem value="Herbal">Herbal</SelectItem>
              <SelectItem value="Biologics">Biologics</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[160px] bg-secondary/30">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="New">New</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Under Review">Under Review</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Client Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            No clients match your filters
          </div>
        )}
      </div>
    </div>
  );
}
