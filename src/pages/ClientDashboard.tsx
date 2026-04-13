import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { StatusTracker } from "@/components/StatusTracker";
import { ParameterScorecard } from "@/components/ParameterScorecard";
import { AIAssessmentPanel } from "@/components/AIAssessmentPanel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, FileText, CheckCircle2 } from "lucide-react";
import { mockClients } from "@/data/mockData";
import type { ClientStatus } from "@/data/mockData";

const requiredDocuments = [
  "Government ID / Director ID",
  "MCAZ License / Compliance Certificate",
  "Bank Statements (last 12 months)",
  "Business Registration Documents",
  "Proof of Income / Revenue Statements",
  "Repayment Schedule",
  "Business Plan",
];

export default function ClientDashboard() {
  const [submitted, setSubmitted] = useState(false);
  // Use first mock client as the "current" client for demo
  const demoClient = mockClients[0];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold">Client Portal</h1>
          <p className="text-muted-foreground mt-1">Apply for investment funding for your pharmaceutical company</p>
        </div>

        <Tabs defaultValue={submitted ? "status" : "apply"} className="space-y-6">
          <TabsList className="bg-secondary/50">
            <TabsTrigger value="apply">Application Form</TabsTrigger>
            <TabsTrigger value="status">Status & Assessment</TabsTrigger>
          </TabsList>

          <TabsContent value="apply" className="space-y-6">
            {/* Company Info */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="font-display text-lg">Company Information</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Company Name</Label>
                  <Input placeholder="e.g. ZimGeneric Pharma" className="bg-secondary/30" />
                </div>
                <div className="space-y-2">
                  <Label>Contact Person</Label>
                  <Input placeholder="Full name" className="bg-secondary/30" />
                </div>
                <div className="space-y-2">
                  <Label>Sector</Label>
                  <Select>
                    <SelectTrigger className="bg-secondary/30">
                      <SelectValue placeholder="Select sector" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="generics">Generics</SelectItem>
                      <SelectItem value="vaccines">Vaccines</SelectItem>
                      <SelectItem value="diagnostics">Diagnostics</SelectItem>
                      <SelectItem value="herbal">Herbal</SelectItem>
                      <SelectItem value="biologics">Biologics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input placeholder="City, Zimbabwe" className="bg-secondary/30" />
                </div>
                <div className="space-y-2">
                  <Label>Amount Requested (USD)</Label>
                  <Input type="number" placeholder="e.g. 450000" className="bg-secondary/30" />
                </div>
                <div className="space-y-2">
                  <Label>Local Sourcing Percentage</Label>
                  <Input type="number" placeholder="e.g. 65" min={0} max={100} className="bg-secondary/30" />
                </div>
              </CardContent>
            </Card>

            {/* Purpose & Capacity */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="font-display text-lg">Purpose & Capacity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Purpose / Use of Funds</Label>
                  <Textarea placeholder="Describe how the funds will be used..." className="bg-secondary/30 min-h-[100px]" />
                </div>
                <div className="space-y-2">
                  <Label>Manufacturing Capacity Description</Label>
                  <Textarea placeholder="Describe your manufacturing capacity, equipment, certifications..." className="bg-secondary/30 min-h-[80px]" />
                </div>
                <div className="flex items-center gap-3">
                  <Switch id="mcaz" />
                  <Label htmlFor="mcaz">MCAZ Compliant (Medicines Control Authority of Zimbabwe)</Label>
                </div>
              </CardContent>
            </Card>

            {/* Repayment */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="font-display text-lg">Repayment Plan</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Monthly Installment (USD)</Label>
                  <Input type="number" placeholder="e.g. 22500" className="bg-secondary/30" />
                </div>
                <div className="space-y-2">
                  <Label>Interest Rate (%)</Label>
                  <Input type="number" placeholder="e.g. 8.5" step="0.1" className="bg-secondary/30" />
                </div>
                <div className="space-y-2">
                  <Label>Timeline (months)</Label>
                  <Input type="number" placeholder="e.g. 24" className="bg-secondary/30" />
                </div>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="font-display text-lg">Document Upload</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {requiredDocuments.map((doc) => (
                  <div key={doc} className="flex items-center justify-between p-3 rounded-lg bg-secondary/20 border border-border/30">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{doc}</span>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Upload className="w-3.5 h-3.5" />
                      Upload
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Button variant="hero" size="lg" className="w-full" onClick={() => setSubmitted(true)}>
              Submit Application
            </Button>
          </TabsContent>

          <TabsContent value="status" className="space-y-6">
            <Card className="glass-card">
              <CardContent className="pt-6">
                <StatusTracker status={demoClient.status} />
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="pt-6">
                <ParameterScorecard scores={demoClient.parameterScores} />
              </CardContent>
            </Card>

            {demoClient.aiAssessment.length > 0 && (
              <Card className="glass-card">
                <CardContent className="pt-6">
                  <AIAssessmentPanel assessments={demoClient.aiAssessment} />
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
