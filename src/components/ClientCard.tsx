import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MapPin, DollarSign } from "lucide-react";
import type { Client, ClientStatus } from "@/data/mockData";

const statusVariant: Record<ClientStatus, "info" | "warning" | "success" | "destructive" | "secondary"> = {
  New: "info",
  Pending: "warning",
  "Under Review": "warning",
  Approved: "success",
  Rejected: "destructive",
};

export function ClientCard({ client }: { client: Client }) {
  const fundingPercent = Math.round((client.amountFunded / client.amountRequested) * 100);
  const passedParams = client.parameterScores.filter((p) => p.passed).length;

  return (
    <Link to={`/donor/client/${client.id}`}>
      <Card className="glass-card hover:glow-border transition-all duration-300 cursor-pointer group">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-display font-semibold text-lg group-hover:text-primary transition-colors">
                {client.companyName}
              </h3>
              <p className="text-sm text-muted-foreground">{client.contactPerson}</p>
            </div>
            <Badge variant={statusVariant[client.status]}>{client.status}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {client.location}
            </span>
            <Badge variant="outline" className="text-xs">{client.sector}</Badge>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-1 text-muted-foreground">
                <DollarSign className="w-3.5 h-3.5" />
                ${client.amountRequested.toLocaleString()}
              </span>
              <span className="text-primary font-medium">{fundingPercent}%</span>
            </div>
            <Progress value={fundingPercent} className="h-2" />
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {client.parameterScores.map((p, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${p.passed ? "bg-success" : "bg-destructive"}`}
                title={p.name}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-1">{passedParams}/5 Assessment</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
