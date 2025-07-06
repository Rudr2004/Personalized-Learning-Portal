import { Badge } from "@/components/ui/badge";

interface SkillTagsProps {
  skills: string[];
  maxVisible?: number;
  size?: 'sm' | 'md';
  variant?: 'default' | 'secondary' | 'outline';
  onClick?: (skill: string) => void;
  className?: string;
}

export const SkillTags = ({ 
  skills, 
  maxVisible = 4, 
  size = 'sm',
  variant = 'outline',
  onClick,
  className 
}: SkillTagsProps) => {
  const visibleSkills = skills.slice(0, maxVisible);
  const remainingCount = skills.length - maxVisible;

  const getBadgeSize = () => {
    return size === 'sm' ? 'text-xs' : 'text-sm';
  };

  return (
    <div className={`flex flex-wrap gap-1 ${className}`}>
      {visibleSkills.map((skill) => (
        <Badge 
          key={skill} 
          variant={variant} 
          className={`${getBadgeSize()} ${onClick ? 'cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors' : ''}`}
          onClick={() => onClick?.(skill)}
        >
          {skill}
        </Badge>
      ))}
      {remainingCount > 0 && (
        <Badge 
          variant={variant} 
          className={`${getBadgeSize()} opacity-70`}
        >
          +{remainingCount} more
        </Badge>
      )}
    </div>
  );
};