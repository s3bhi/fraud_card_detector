import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ResultDisplayProps {
  prediction: number;
  confidence: number;
  data: {
    amount: string;
    timeSinceLastTxn: string;
    numTxnsLastHour: string;
    avgAmountLastHour: string;
    isInternational: string;
    deviceType: string;
  };
}

const ResultDisplay = ({ prediction, confidence, data }: ResultDisplayProps) => {
  const isFraud = prediction === 1;
  const confidencePercent = (confidence * 100).toFixed(1);

  return (
    <div className="space-y-4">
      <Card
        className={`p-8 backdrop-blur-strong shadow-xl neon-border transition-all duration-500 ${
          isFraud
            ? "border-destructive card-danger-glow hover-lift"
            : "border-success card-success-glow hover-lift"
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {isFraud ? (
              <AlertCircle className="h-12 w-12 text-destructive animate-pulse" />
            ) : (
              <CheckCircle className="h-12 w-12 text-success" />
            )}
            <div>
              <h3 className="text-2xl font-bold">
                {isFraud ? "Fraud Detected" : "Transaction Safe"}
              </h3>
              <p className="text-muted-foreground">
                {isFraud
                  ? "Suspicious activity identified"
                  : "No fraudulent patterns detected"}
              </p>
            </div>
          </div>
          <Badge
            variant={isFraud ? "destructive" : "default"}
            className={`text-lg px-4 py-2 ${
              isFraud ? "bg-destructive" : "bg-success"
            }`}
          >
            {isFraud ? "HIGH RISK" : "SAFE"}
          </Badge>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Confidence Score
            </span>
            <span className="text-sm font-bold">{confidencePercent}%</span>
          </div>
          <Progress
            value={confidence * 100}
            className={`h-2 ${isFraud ? "bg-destructive/20" : "bg-success/20"}`}
          />
        </div>
      </Card>

      <Card className="p-6 backdrop-blur-strong shadow-lg neon-border hover-glow">
        <h4 className="text-lg font-semibold mb-4 text-gradient">Transaction Details</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <DetailItem label="Amount" value={`$${parseFloat(data.amount).toFixed(2)}`} />
          <DetailItem
            label="Time Since Last"
            value={`${Math.floor(parseInt(data.timeSinceLastTxn) / 60)} min`}
          />
          <DetailItem label="Txns/Hour" value={data.numTxnsLastHour} />
          <DetailItem
            label="Avg Amount/Hour"
            value={`$${parseFloat(data.avgAmountLastHour).toFixed(2)}`}
          />
          <DetailItem
            label="International"
            value={data.isInternational === "1" ? "Yes" : "No"}
          />
          <DetailItem
            label="Device"
            value={data.deviceType === "0" ? "Mobile" : "Desktop"}
          />
        </div>
      </Card>
    </div>
  );
};

const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-1">
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className="text-sm font-semibold">{value}</p>
  </div>
);

export default ResultDisplay;
