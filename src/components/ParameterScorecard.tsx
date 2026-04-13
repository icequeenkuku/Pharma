import { CheckCircle2, XCircle } from "lucide-react";
import type { ParameterScore } from "@/data/mockData";

export function ParameterScorecard({ scores }: { scores: ParameterScore[] }) {
  const overallScore = Math.round(
    (scores.filter((s) => s.passed).length / scores.length) * 100
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-lg">Parameter Scorecard</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Overall Match:</span>
          <span className={`text-lg font-bold ${overallScore >= 70 ? "text-success" : overallScore >= 50 ? "text-warning" : "text-destructive"}`}>
            {overallScore}%
          </span>
        </div>
      </div>

      <div className="space-y-2">
        {scores.map((param, i) => (
          <div
            key={i}
            className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 border border-border/30"
          >
            {param.passed ? (
              <CheckCircle2 className="w-5 h-5 text-success mt-0.5 shrink-0" />
            ) : (
              <XCircle className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{param.name}</span>
                {param.score !== undefined && (
                  <span className="text-sm text-muted-foreground">{param.score}/{param.maxScore}</span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{param.explanation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
