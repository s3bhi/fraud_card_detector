import { Card } from "@/components/ui/card";
import { Activity, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";

interface StatsCardsProps {
  totalChecked: number;
  fraudDetected: number;
  safeTransactions: number;
}

const StatsCards = ({ totalChecked, fraudDetected, safeTransactions }: StatsCardsProps) => {
  const detectionRate = totalChecked > 0 ? ((fraudDetected / totalChecked) * 100).toFixed(1) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        icon={<Activity className="h-6 w-6" />}
        label="Total Analyzed"
        value={totalChecked}
        gradient="from-primary/20 to-accent/20"
        iconColor="text-primary"
      />
      <StatCard
        icon={<AlertTriangle className="h-6 w-6" />}
        label="Fraud Detected"
        value={fraudDetected}
        gradient="from-destructive/20 to-warning/20"
        iconColor="text-destructive"
      />
      <StatCard
        icon={<CheckCircle className="h-6 w-6" />}
        label="Safe Transactions"
        value={safeTransactions}
        gradient="from-success/20 to-primary/20"
        iconColor="text-success"
      />
      <StatCard
        icon={<TrendingUp className="h-6 w-6" />}
        label="Detection Rate"
        value={`${detectionRate}%`}
        gradient="from-accent/20 to-primary/20"
        iconColor="text-accent"
      />
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  gradient: string;
  iconColor: string;
}

const StatCard = ({ icon, label, value, gradient, iconColor }: StatCardProps) => (
  <Card className="group p-6 backdrop-blur-strong shadow-lg neon-border hover:border-primary transition-all duration-500 hover-lift hover-glow overflow-hidden relative">
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-lg opacity-40 group-hover:opacity-60 transition-opacity duration-500`} />
    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative">
      <div className={`${iconColor} mb-3 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500`}>
        {icon}
      </div>
      <p className="text-sm text-muted-foreground mb-1 group-hover:text-foreground transition-colors">{label}</p>
      <p className="text-3xl font-bold group-hover:text-primary transition-colors duration-500">{value}</p>
    </div>
  </Card>
);

export default StatsCards;
