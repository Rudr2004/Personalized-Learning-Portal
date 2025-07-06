import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

interface AchievementCardProps {
  id: string | number;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  date?: string;
  className?: string;
}

export const AchievementCard = ({
  name,
  description,
  icon,
  earned,
  date,
  className
}: AchievementCardProps) => {
  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
        earned 
          ? 'bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900' 
          : 'bg-muted/50 opacity-60 hover:opacity-80'
      } ${className}`}
    >
      <div className="text-2xl flex-shrink-0">{icon}</div>
      
      <div className="flex-1 min-w-0">
        <h4 className={`font-medium text-sm ${
          earned ? 'text-foreground' : 'text-muted-foreground'
        }`}>
          {name}
        </h4>
        <p className="text-xs text-muted-foreground line-clamp-2">
          {description}
        </p>
        {earned && date && (
          <p className="text-xs text-green-600 dark:text-green-400 mt-1">
            Earned on {new Date(date).toLocaleDateString()}
          </p>
        )}
      </div>
      
      <div className="flex-shrink-0">
        {earned ? (
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <Badge variant="secondary" className="text-xs">
              Earned
            </Badge>
          </div>
        ) : (
          <Badge variant="outline" className="text-xs opacity-50">
            Locked
          </Badge>
        )}
      </div>
    </div>
  );
};