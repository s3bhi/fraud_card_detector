import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from "recharts";

interface Transaction {
  id: string;
  amount: number;
  timestamp: Date;
  isFraud: boolean;
  confidence: number;
}

interface VisualizationChartsProps {
  transactions: Transaction[];
}

const VisualizationCharts = ({ transactions }: VisualizationChartsProps) => {
  // Prepare data for fraud distribution pie chart
  const fraudCount = transactions.filter(t => t.isFraud).length;
  const safeCount = transactions.filter(t => !t.isFraud).length;
  
  const pieData = [
    { name: "Safe", value: safeCount, color: "hsl(var(--success))" },
    { name: "Fraud", value: fraudCount, color: "hsl(var(--destructive))" },
  ];

  // Prepare data for timeline
  const timelineData = transactions.slice(0, 10).reverse().map(t => ({
    time: new Date(t.timestamp).toLocaleTimeString(),
    amount: t.amount,
    confidence: Math.round(t.confidence * 100),
    status: t.isFraud ? "Fraud" : "Safe",
  }));

  // Prepare data for confidence distribution
  const confidenceRanges = [
    { range: "0-20%", count: 0 },
    { range: "20-40%", count: 0 },
    { range: "40-60%", count: 0 },
    { range: "60-80%", count: 0 },
    { range: "80-100%", count: 0 },
  ];

  transactions.forEach(t => {
    const conf = t.confidence * 100;
    if (conf <= 20) confidenceRanges[0].count++;
    else if (conf <= 40) confidenceRanges[1].count++;
    else if (conf <= 60) confidenceRanges[2].count++;
    else if (conf <= 80) confidenceRanges[3].count++;
    else confidenceRanges[4].count++;
  });

  if (transactions.length === 0) {
    return (
      <Card className="backdrop-blur-strong shadow-lg neon-border hover-glow">
        <CardHeader>
          <CardTitle className="text-gradient">Analytics Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64 text-muted-foreground">
          No transaction data available yet. Start analyzing transactions to see visualizations.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Fraud Distribution Pie Chart */}
      <Card className="backdrop-blur-strong shadow-lg neon-border hover-glow hover-lift transition-all duration-500">
        <CardHeader>
          <CardTitle className="text-lg text-gradient">Fraud Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Transaction Timeline */}
      <Card className="backdrop-blur-strong shadow-lg neon-border hover-glow hover-lift transition-all duration-500">
        <CardHeader>
          <CardTitle className="text-lg text-gradient">Transaction Amounts</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--background))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={{ fill: "hsl(var(--primary))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Confidence Distribution Bar Chart */}
      <Card className="backdrop-blur-strong shadow-lg neon-border hover-glow hover-lift transition-all duration-500">
        <CardHeader>
          <CardTitle className="text-lg text-gradient">Confidence Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={confidenceRanges}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="range" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--background))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
              />
              <Bar dataKey="count" fill="hsl(var(--accent))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Confidence Timeline */}
      <Card className="backdrop-blur-strong shadow-lg neon-border hover-glow hover-lift transition-all duration-500">
        <CardHeader>
          <CardTitle className="text-lg text-gradient">Confidence Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--background))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="confidence" 
                stroke="hsl(var(--success))" 
                strokeWidth={2}
                dot={{ fill: "hsl(var(--success))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default VisualizationCharts;
