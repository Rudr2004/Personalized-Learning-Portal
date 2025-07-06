import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  progress?: {
    value: number;
    max?: number;
    label?: string;
  };
  className?: string;
}

export const StatCard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend, 
  progress,
  className 
}: StatCardProps) => {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4" />}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground flex items-center gap-2">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>
        
        {subtitle && (
          <div className="text-sm text-muted-foreground mt-1">{subtitle}</div>
        )}
        
        {trend && (
          <div className={`flex items-center gap-1 text-sm mt-1 ${
            trend.isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            <span>{trend.value}</span>
          </div>
        )}
        
        {progress && (
          <div className="mt-2">
            <Progress value={progress.value} className="h-2" />
            {progress.label && (
              <p className="text-xs text-muted-foreground mt-1">
                {progress.label}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};