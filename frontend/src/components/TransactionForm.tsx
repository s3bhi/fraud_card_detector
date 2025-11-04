import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, ShieldAlert, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

interface TransactionData {
  amount: string;
  timeSinceLastTxn: string;
  numTxnsLastHour: string;
  avgAmountLastHour: string;
  isInternational: string;
  deviceType: string;
}

interface TransactionFormProps {
  onResult: (result: { prediction: number; confidence: number; data: TransactionData }) => void;
}

const TransactionForm = ({ onResult }: TransactionFormProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<TransactionData>({
    amount: "",
    timeSinceLastTxn: "",
    numTxnsLastHour: "",
    avgAmountLastHour: "",
    isInternational: "0",
    deviceType: "0",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call Flask backend API
      const response = await fetch('https://fraud-card-detector.onrender.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze transaction');
      }

      const result = await response.json();
      
      onResult({
        prediction: result.prediction,
        confidence: result.confidence,
        data: formData,
      });

      if (result.prediction === 1) {
        toast.error("Fraud Detected!", {
          description: "This transaction has been flagged as suspicious.",
        });
      } else {
        toast.success("Transaction Verified", {
          description: "No fraudulent activity detected.",
        });
      }
    } catch (error) {
      toast.error("Analysis Failed", {
        description: error instanceof Error ? error.message : "Failed to analyze transaction. Please try again.",
      });
      console.error('Prediction error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof TransactionData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="p-6 backdrop-blur-strong neon-border shadow-lg hover-glow group">
      <h2 className="text-2xl font-bold mb-6 text-gradient neon-text">Analyze Transaction</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Transaction Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="5000.00"
              value={formData.amount}
              onChange={(e) => handleInputChange("amount", e.target.value)}
              required
              className="bg-white/80 border-border backdrop-blur-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="timeSince">Time Since Last Txn (seconds)</Label>
            <Input
              id="timeSince"
              type="number"
              placeholder="3600"
              value={formData.timeSinceLastTxn}
              onChange={(e) => handleInputChange("timeSinceLastTxn", e.target.value)}
              required
              className="bg-white/80 border-border backdrop-blur-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="numTxns">Transactions Last Hour</Label>
            <Input
              id="numTxns"
              type="number"
              placeholder="3"
              value={formData.numTxnsLastHour}
              onChange={(e) => handleInputChange("numTxnsLastHour", e.target.value)}
              required
              className="bg-white/80 border-border backdrop-blur-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="avgAmount">Avg Amount Last Hour ($)</Label>
            <Input
              id="avgAmount"
              type="number"
              step="0.01"
              placeholder="2500.00"
              value={formData.avgAmountLastHour}
              onChange={(e) => handleInputChange("avgAmountLastHour", e.target.value)}
              required
              className="bg-white/80 border-border backdrop-blur-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="international">International Transaction</Label>
            <Select
              value={formData.isInternational}
              onValueChange={(value) => handleInputChange("isInternational", value)}
            >
              <SelectTrigger id="international" className="bg-white/80 border-border backdrop-blur-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white backdrop-blur-md border-border z-50">
                <SelectItem value="0">No</SelectItem>
                <SelectItem value="1">Yes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="device">Device Type</Label>
            <Select
              value={formData.deviceType}
              onValueChange={(value) => handleInputChange("deviceType", value)}
            >
              <SelectTrigger id="device" className="bg-white/80 border-border backdrop-blur-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white backdrop-blur-md border-border z-50">
                <SelectItem value="0">Mobile</SelectItem>
                <SelectItem value="1">Desktop</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 card-glow transition-all hover-lift neon-border group relative overflow-hidden"
          disabled={loading}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-20 transition-opacity" />
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <ShieldAlert className="mr-2 h-5 w-5" />
              Analyze Transaction
            </>
          )}
        </Button>
      </form>
    </Card>
  );
};

export default TransactionForm;
