import { CheckCircle2, Circle, Clock } from "lucide-react";
import type { ClientStatus } from "@/data/mockData";

const stages = ["Submitted", "Under Review", "AI Assessment", "Decision"];

const statusToStage: Record<ClientStatus, number> = {
  New: 0,
  Pending: 1,
  "Under Review": 1,
  Approved: 3,
  Rejected: 3,
};

export function StatusTracker({ status }: { status: ClientStatus }) {
  const currentStage = statusToStage[status];

  return (
    <div className="space-y-3">
      <h3 className="font-display font-semibold text-lg">Application Status</h3>
      <div className="flex items-center gap-2">
        {stages.map((stage, i) => (
          <div key={stage} className="flex items-center gap-2 flex-1">
            <div className="flex flex-col items-center gap-1">
              {i < currentStage ? (
                <CheckCircle2 className="w-6 h-6 text-success" />
              ) : i === currentStage ? (
                <Clock className="w-6 h-6 text-primary animate-pulse-glow" />
              ) : (
                <Circle className="w-6 h-6 text-muted-foreground/30" />
              )}
              <span className={`text-xs text-center ${i <= currentStage ? "text-foreground" : "text-muted-foreground/50"}`}>
                {stage}
              </span>
            </div>
            {i < stages.length - 1 && (
              <div className={`flex-1 h-0.5 rounded ${i < currentStage ? "bg-success" : "bg-border"}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
