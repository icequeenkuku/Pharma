import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/StatCard";
import { Badge } from "@/components/ui/badge";
import { Shield, TrendingUp, Users, DollarSign, ArrowRight, Pill, FlaskConical, Microscope, Leaf } from "lucide-react";

const sectors = [
  { name: "Generics", icon: Pill, count: 12 },
  { name: "Vaccines", icon: FlaskConical, count: 5 },
  { name: "Diagnostics", icon: Microscope, count: 8 },
  { name: "Herbal", icon: Leaf, count: 6 },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 py-24 relative">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-slide-up">
            <Badge variant="outline" className="border-primary/30 text-primary">
              Reducing Zimbabwe's Dependency on Imported Medicine
            </Badge>
            <h1 className="text-5xl md:text-6xl font-display font-bold leading-tight">
              Invest in Zimbabwe's{" "}
              <span className="gradient-text">Pharmaceutical Future</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              ZimPharma connects investors with local pharmaceutical manufacturers, using AI-powered risk assessment to fund companies building Zimbabwe's healthcare independence.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link to="/client" className="w-full sm:w-auto">
                <Button variant="hero" size="lg" className="w-full sm:w-auto">
                  Apply for Funding
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/donor" className="w-full sm:w-auto">
                <Button variant="outline" size="lg">
                  Donor Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard title="Capital Deployed" value="$1.1M" subtitle="Across 5 companies" icon={DollarSign} />
          <StatCard title="Total Repaid" value="$430K" subtitle="38.6% repaid" icon={TrendingUp} />
          <StatCard title="Active Companies" value="5" subtitle="3 sectors" icon={Users} />
          <StatCard title="Avg Risk Score" value="64%" subtitle="Portfolio average" icon={Shield} />
        </div>
      </section> */}

      {/* Sectors */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold">Pharmaceutical Sectors</h2>
          <p className="text-muted-foreground mt-2">Supporting diverse areas of local medicine production</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {sectors.map((sector) => (
            <div
              key={sector.name}
              className="glass-card rounded-xl p-6 text-center hover:glow-border transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <sector.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold">{sector.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{sector.count} companies</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold">How It Works</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { step: "01", title: "Apply", desc: "Pharmaceutical companies submit applications with financial data and compliance documents" },
            { step: "02", title: "Assess", desc: "AI-powered 4-stage risk assessment evaluates every application against preset parameters" },
            { step: "03", title: "Fund", desc: "Approved companies receive funding with transparent repayment tracking" },
          ].map((item) => (
            <div key={item.step} className="text-center space-y-3">
              <div className="text-4xl font-display font-bold gradient-text">{item.step}</div>
              <h3 className="text-lg font-display font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2026 ZimPharma Investment Platform. Building Zimbabwe's pharmaceutical independence.</p>
        </div>
      </footer>
    </div>
  );
}
