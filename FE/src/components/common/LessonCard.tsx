import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Play, BookOpen, Users, Star, CheckCircle, Lock } from "lucide-react";

interface LessonCardProps {
  id: string | number;
  title: string;
  description?: string;
  type: 'video' | 'article' | 'quiz';
  duration: string;
  category?: string;
  level?: string;
  rating?: number;
  students?: number;
  xp?: number;
  image?: string;
  status?: 'completed' | 'current' | 'locked' | 'available';
  progress?: number;
  tags?: string[];
  onAction?: () => void;
  actionText?: string;
  className?: string;
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'video': return <Play className="w-4 h-4" />;
    case 'article': return <BookOpen className="w-4 h-4" />;
    case 'quiz': return <Users className="w-4 h-4" />;
    default: return <Play className="w-4 h-4" />;
  }
};

const getStatusIcon = (status?: string) => {
  switch (status) {
    case 'completed': return <CheckCircle className="w-5 h-5 text-green-500" />;
    case 'current': return <div className="w-3 h-3 bg-primary rounded-full" />;
    case 'locked': return <Lock className="w-4 h-4 text-muted-foreground" />;
    default: return null;
  }
};

export const LessonCard = ({
  id,
  title,
  description,
  type,
  duration,
  category,
  level,
  rating,
  students,
  xp,
  image,
  status = 'available',
  progress,
  tags,
  onAction,
  actionText,
  className
}: LessonCardProps) => {
  const getActionText = () => {
    if (actionText) return actionText;
    switch (status) {
      case 'completed': return 'Review';
      case 'current': return 'Continue';
      case 'locked': return 'Locked';
      default: return 'Start';
    }
  };

  return (
    <Card className={`overflow-hidden hover:shadow-lg transition-all duration-200 ${
      status === 'current' ? 'border-primary ring-1 ring-primary/20' : 
      status === 'completed' ? 'border-green-200 dark:border-green-800' :
      status === 'locked' ? 'opacity-60' : ''
    } ${className}`}>
      {/* Image Header */}
      {image && (
        <div className="relative">
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-2 left-2 flex gap-2">
            <Badge variant="secondary" className="capitalize">
              {type}
            </Badge>
            {level && <Badge variant="outline">{level}</Badge>}
          </div>
          {status && (
            <div className="absolute top-2 right-2">
              {getStatusIcon(status)}
            </div>
          )}
        </div>
      )}

      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg line-clamp-2">{title}</CardTitle>
            {description && (
              <CardDescription className="line-clamp-2 mt-1">
                {description}
              </CardDescription>
            )}
          </div>
          {!image && status && (
            <div className="ml-2">
              {getStatusIcon(status)}
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {/* Lesson Meta Info */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {getTypeIcon(type)}
                <span className="capitalize">{type}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {duration}
              </div>
            </div>
            
            {rating && (
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                {rating}
              </div>
            )}
          </div>

          {/* Additional Stats */}
          {(students || xp) && (
            <div className="flex items-center justify-between text-sm">
              {students && (
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="w-3 h-3" />
                  {students.toLocaleString()} students
                </div>
              )}
              {xp && (
                <div className="text-primary font-medium">+{xp} XP</div>
              )}
            </div>
          )}

          {/* Progress Bar */}
          {progress !== undefined && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{tags.length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* Category Badge */}
          {category && (
            <Badge variant="secondary">{category}</Badge>
          )}

          {/* Action Button */}
          <Button 
            className="w-full" 
            onClick={onAction}
            disabled={status === 'locked'}
            variant={status === 'completed' ? 'outline' : 'default'}
          >
            {getActionText()}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};