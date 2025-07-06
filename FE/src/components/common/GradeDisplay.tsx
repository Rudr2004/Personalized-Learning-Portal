import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface GradeDisplayProps {
  grade: string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

export const GradeDisplay = ({ 
  grade, 
  size = 'md', 
  showIcon = true,
  className 
}: GradeDisplayProps) => {
  const getGradeColor = (grade: string) => {
    const normalizedGrade = grade.replace('+', '').replace('-', '');
    switch (normalizedGrade) {
      case 'A': return 'bg-green-500 hover:bg-green-600 text-white';
      case 'B': return 'bg-blue-500 hover:bg-blue-600 text-white';
      case 'C': return 'bg-yellow-500 hover:bg-yellow-600 text-white';
      case 'D': return 'bg-orange-500 hover:bg-orange-600 text-white';
      case 'F': return 'bg-red-500 hover:bg-red-600 text-white';
      default: return 'bg-gray-500 hover:bg-gray-600 text-white';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'text-xs px-2 py-1';
      case 'lg': return 'text-base px-4 py-2';
      default: return 'text-sm px-3 py-1';
    }
  };

  return (
    <Badge 
      className={`${getGradeColor(grade)} ${getSizeClasses()} font-bold ${className}`}
    >
      {showIcon && <Star className="w-3 h-3 mr-1 fill-current" />}
      {grade}
    </Badge>
  );
};