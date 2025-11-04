import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, CheckCircle, Clock } from "lucide-react";

interface Transaction {
  id: string;
  amount: number;
  timestamp: Date;
  isFraud: boolean;
  confidence: number;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const RecentTransactions = ({ transactions }: RecentTransactionsProps) => {
  return (
    <Card className="p-6 backdrop-blur-strong shadow-lg neon-border hover-glow">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Clock className="h-5 w-5 text-primary animate-pulse-neon" />
        <span className="text-gradient">Recent Activity</span>
      </h3>
      
      <ScrollArea className="h-[400px] pr-4">
        {transactions.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Activity className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No transactions analyzed yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.map((txn) => (
              <div
                key={txn.id}
                className="group p-4 rounded-lg backdrop-blur-glass neon-border hover:border-primary transition-all duration-500 hover-lift cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {txn.isFraud ? (
                      <AlertCircle className="h-5 w-5 text-destructive" />
                    ) : (
                      <CheckCircle className="h-5 w-5 text-success" />
                    )}
                    <span className="font-semibold">${txn.amount.toFixed(2)}</span>
                  </div>
                  <Badge
                    variant={txn.isFraud ? "destructive" : "default"}
                    className={txn.isFraud ? "bg-destructive/80" : "bg-success/80"}
                  >
                    {txn.isFraud ? "FRAUD" : "SAFE"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{txn.timestamp.toLocaleTimeString()}</span>
                  <span>Confidence: {(txn.confidence * 100).toFixed(0)}%</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </Card>
  );
};

// Fallback icon if not imported
const Activity = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

export default RecentTransactions;
