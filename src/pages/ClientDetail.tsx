import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { ParameterScorecard } from "@/components/ParameterScorecard";
import { CommentsSection } from "@/components/CommentsSection";
import { AIAssessmentPanel } from "@/components/AIAssessmentPanel";
import { StatusTracker } from "@/components/StatusTracker";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, MapPin, DollarSign, Calendar, Percent, FileText, Download, Upload, History } from "lucide-react";
import { mockClients } from "@/data/mockData";
import type { ClientStatus } from "@/data/mockData";

const statusVariant: Record<ClientStatus, "info" | "warning" | "success" | "destructive" | "secondary"> = {
  New: "info",
  Pending: "warning",
  "Under Review": "warning",
  Approved: "success",
  Rejected: "destructive",
};

export default function ClientDetail() {
  const { id } = useParams();
  const client = mockClients.find((c) => c.id === id);

  if (!client) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-muted-foreground">Client not found</p>
          <Link to="/donor"><Button variant="outline" className="mt-4">Back to Dashboard</Button></Link>
        </div>
      </div>
    );
  }

  const fundingPercent = Math.round((client.amountFunded / client.amountRequested) * 100);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Link to="/donor" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-display font-bold">{client.companyName}</h1>
              <Badge variant={statusVariant[client.status]}>{client.status}</Badge>
            </div>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{client.location}</span>
              <Badge variant="outline">{client.sector}</Badge>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />Applied {client.applicationDate}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status */}
            <Card className="glass-card">
              <CardContent className="pt-6">
                <StatusTracker status={client.status} />
              </CardContent>
            </Card>

            {/* Funding */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="font-display text-lg flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  Funding Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-2xl font-display font-bold">${client.amountFunded.toLocaleString()}</span>
                  <span className="text-muted-foreground">of ${client.amountRequested.toLocaleString()}</span>
                </div>
                <Progress value={fundingPercent} className="h-3" />
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 rounded-lg bg-secondary/20">
                    <p className="text-xs text-muted-foreground">Monthly</p>
                    <p className="font-semibold">${client.repaymentPlan.monthlyInstallment.toLocaleString()}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/20">
                    <p className="text-xs text-muted-foreground">Interest</p>
                    <p className="font-semibold">{client.repaymentPlan.interestRate}%</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/20">
                    <p className="text-xs text-muted-foreground">Timeline</p>
                    <p className="font-semibold">{client.repaymentPlan.timelineMonths}mo</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Details */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="font-display text-lg">Application Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Purpose / Use of Funds</p>
                  <p className="text-sm mt-1">{client.purpose}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Manufacturing Capacity</p>
                  <p className="text-sm mt-1">{client.manufacturingCapacity}</p>
                </div>
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Local Sourcing</p>
                    <p className="text-sm font-semibold flex items-center gap-1">
                      <Percent className="w-3.5 h-3.5" />{client.localSourcingPercentage}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">MCAZ Compliant</p>
                    <Badge variant={client.mcazCompliant ? "success" : "destructive"} className="mt-0.5">
                      {client.mcazCompliant ? "Yes" : "No"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Assessment */}
            <Card className="glass-card">
              <CardContent className="pt-6">
                <AIAssessmentPanel assessments={client.aiAssessment} />
              </CardContent>
            </Card>

            {/* Comments */}
            <Card className="glass-card">
              <CardContent className="pt-6">
                <CommentsSection comments={client.comments} />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Parameter Scorecard */}
            <Card className="glass-card">
              <CardContent className="pt-6">
                <ParameterScorecard scores={client.parameterScores} />
              </CardContent>
            </Card>

            {/* Documents */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="font-display text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Documents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {client.documents.map((doc) => (
                  <div key={doc} className="flex items-center justify-between p-2.5 rounded-lg bg-secondary/20 border border-border/20">
                    <span className="text-sm">{doc}</span>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Download className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full mt-3 gap-1">
                  <Upload className="w-3.5 h-3.5" />
                  Upload Supporting Doc
                </Button>
              </CardContent>
            </Card>

            {/* Funding History */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="font-display text-lg flex items-center gap-2">
                  <History className="w-5 h-5 text-primary" />
                  Funding History
                </CardTitle>
              </CardHeader>
              <CardContent>
                {client.fundingHistory.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">No previous funding</p>
                ) : (
                  <div className="space-y-2">
                    {client.fundingHistory.map((h, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/20">
                        <div>
                          <p className="text-sm font-medium">{h.year}</p>
                          <p className="text-xs text-muted-foreground">${h.amount.toLocaleString()}</p>
                        </div>
                        <Badge variant={h.repaidOnTime ? "success" : "warning"}>
                          {h.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
