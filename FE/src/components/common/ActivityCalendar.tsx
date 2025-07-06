import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

interface ActivityData {
  date: string;
  count: number;
}

interface ActivityCalendarProps {
  data: ActivityData[];
  title?: string;
  description?: string;
  className?: string;
}

export const ActivityCalendar = ({ 
  data, 
  title = "Activity Calendar", 
  description = "Your learning activity over time",
  className 
}: ActivityCalendarProps) => {
  const getIntensityClass = (count: number) => {
    if (count === 0) return 'bg-muted hover:bg-muted/80';
    if (count === 1) return 'bg-primary/20 hover:bg-primary/30';
    if (count === 2) return 'bg-primary/40 hover:bg-primary/50';
    if (count === 3) return 'bg-primary/60 hover:bg-primary/70';
    return 'bg-primary hover:bg-primary/90';
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {data.map((day, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-sm cursor-pointer transition-colors ${getIntensityClass(day.count)}`}
                title={`${day.date}: ${day.count} activities`}
              />
            ))}
          </div>
          
          {/* Legend */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Less</span>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-muted rounded-sm" />
              <div className="w-3 h-3 bg-primary/20 rounded-sm" />
              <div className="w-3 h-3 bg-primary/40 rounded-sm" />
              <div className="w-3 h-3 bg-primary/60 rounded-sm" />
              <div className="w-3 h-3 bg-primary rounded-sm" />
            </div>
            <span>More</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};