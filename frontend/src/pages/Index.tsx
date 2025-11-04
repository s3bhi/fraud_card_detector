import { useState } from "react";
import AnimatedBackground from "@/components/AnimatedBackground";
import TransactionForm from "@/components/TransactionForm";
import ResultDisplay from "@/components/ResultDisplay";
import StatsCards from "@/components/StatsCards";
import RecentTransactions from "@/components/RecentTransactions";
import VisualizationCharts from "@/components/VisualizationCharts";
import { Card } from "@/components/ui/card";
import { Shield, Lock, Zap } from "lucide-react";

interface Transaction {
  id: string;
  amount: number;
  timestamp: Date;
  isFraud: boolean;
  confidence: number;
}

interface AnalysisResult {
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

const Index = () => {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState({
    totalChecked: 0,
    fraudDetected: 0,
    safeTransactions: 0,
  });

  const handleResult = (newResult: AnalysisResult) => {
    setResult(newResult);

    // Add to transactions history
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      amount: parseFloat(newResult.data.amount),
      timestamp: new Date(),
      isFraud: newResult.prediction === 1,
      confidence: newResult.confidence,
    };
    
    setTransactions(prev => [newTransaction, ...prev].slice(0, 10));

    // Update stats
    setStats(prev => ({
      totalChecked: prev.totalChecked + 1,
      fraudDetected: prev.fraudDetected + (newResult.prediction === 1 ? 1 : 0),
      safeTransactions: prev.safeTransactions + (newResult.prediction === 0 ? 1 : 0),
    }));
  };

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="h-12 w-12 text-primary animate-pulse-neon" />
            <h1 className="text-5xl md:text-6xl font-bold text-gradient neon-text">
              Fraud Detection AI
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real-time transaction analysis powered by machine learning
          </p>
          
          <div className="flex items-center justify-center gap-8 mt-6">
            <Feature icon={<Lock className="h-5 w-5" />} text="Secure" />
            <Feature icon={<Zap className="h-5 w-5" />} text="Instant" />
            <Feature icon={<Shield className="h-5 w-5" />} text="Accurate" />
          </div>
        </header>

        {/* Stats */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <StatsCards
            totalChecked={stats.totalChecked}
            fraudDetected={stats.fraudDetected}
            safeTransactions={stats.safeTransactions}
          />
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Form */}
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <TransactionForm onResult={handleResult} />
          </div>

          {/* Result */}
          <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            {result ? (
              <ResultDisplay
                prediction={result.prediction}
                confidence={result.confidence}
                data={result.data}
              />
            ) : (
              <div className="h-full flex items-center justify-center">
                <Card className="backdrop-blur-strong shadow-lg neon-border p-12 hover-glow">
                  <div className="text-center text-muted-foreground">
                    <Shield className="h-24 w-24 mx-auto mb-4 opacity-30 animate-pulse-neon text-primary" />
                    <p className="text-lg">Enter transaction details to begin analysis</p>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>

        {/* Visualizations */}
        <div className="animate-fade-in mb-8" style={{ animationDelay: "0.4s" }}>
          <VisualizationCharts transactions={transactions} />
        </div>

        {/* Recent Transactions */}
        <div className="animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <RecentTransactions transactions={transactions} />
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 text-sm text-muted-foreground">
          <p>Protected by AI-powered fraud detection algorithms</p>
        </footer>
      </div>
    </div>
  );
};

const Feature = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="group flex items-center gap-2 text-primary hover:text-accent transition-colors duration-300 cursor-pointer">
    <div className="transform group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300">
      {icon}
    </div>
    <span className="font-semibold group-hover:tracking-wide transition-all duration-300">{text}</span>
  </div>
);

export default Index;
