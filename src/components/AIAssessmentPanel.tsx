import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, CheckCircle2, Loader2, Circle } from "lucide-react";
import type { AIAssessment } from "@/data/mockData";

interface AIAssessmentPanelProps {
  assessments: AIAssessment[];
  onRunAssessment?: () => void;
}

export function AIAssessmentPanel({ assessments, onRunAssessment }: AIAssessmentPanelProps) {
  const [running, setRunning] = useState(false);
  const [stages, setStages] = useState<AIAssessment[]>(assessments);

  const handleRun = async () => {
    if (stages.some((s) => s.status === "complete")) return;
    setRunning(true);

    const defaultStages: AIAssessment[] = [
      { stage: 1, title: "Document & Compliance Review", status: "pending" },
      { stage: 2, title: "Financial & Repayment Analysis", status: "pending" },
      { stage: 3, title: "Parameter Scoring", status: "pending" },
      { stage: 4, title: "Scenario Modeling", status: "pending" },
    ];

    setStages(defaultStages);

    for (let i = 0; i < 4; i++) {
      setStages((prev) => prev.map((s, idx) => (idx === i ? { ...s, status: "running" } : s)));
      await new Promise((r) => setTimeout(r, 1500 + Math.random() * 1000));
      setStages((prev) =>
        prev.map((s, idx) =>
          idx === i ? { ...s, status: "complete", result: `Assessment stage ${i + 1} completed successfully. Detailed analysis available.` } : s
        )
      );
    }

    setRunning(false);
    onRunAssessment?.();
  };

  const hasResults = stages.some((s) => s.status === "complete");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-accent" />
          <h3 className="font-display font-semibold text-lg">Assessment</h3>
        </div>
        {!hasResults && (
          <Button variant="glow" size="sm" onClick={handleRun} disabled={running}>
            {running && <Loader2 className="w-4 h-4 animate-spin" />}
            Run Assessment
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {stages.map((stage) => (
          <div
            key={stage.stage}
            className={`p-4 rounded-lg border transition-all duration-300 ${
              stage.status === "complete"
                ? "bg-secondary/30 border-primary/20"
                : stage.status === "running"
                ? "bg-primary/5 border-primary/30 glow-border"
                : "bg-secondary/10 border-border/20"
            }`}
          >
            <div className="flex items-center gap-3">
              {stage.status === "complete" ? (
                <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
              ) : stage.status === "running" ? (
                <Loader2 className="w-5 h-5 text-primary animate-spin shrink-0" />
              ) : (
                <Circle className="w-5 h-5 text-muted-foreground/40 shrink-0" />
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Stage {stage.stage}</span>
                  <span className="text-sm text-muted-foreground">— {stage.title}</span>
                  {stage.status === "running" && (
                    <Badge variant="info" className="text-[10px] animate-pulse-glow">Processing</Badge>
                  )}
                </div>
                {stage.result && (
                  <p className="text-sm text-foreground/70 mt-2 leading-relaxed">{stage.result}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
