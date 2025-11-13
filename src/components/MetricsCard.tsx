import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface MetricsCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: LucideIcon;
}

export default function MetricsCard({ title, value, change, trend, icon: Icon }: MetricsCardProps) {
  const trendColor = trend === "up" ? "text-success" : trend === "down" ? "text-destructive" : "text-muted-foreground";

  return (
    <Card className="p-6 transition-all hover:shadow-soft">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          <p className={`text-sm font-medium ${trendColor}`}>
            {change}
          </p>
        </div>
        <div className="p-3 bg-accent rounded-lg">
          <Icon className="text-primary" size={24} />
        </div>
      </div>
    </Card>
  );
}
