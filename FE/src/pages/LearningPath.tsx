import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  Circle, 
  Clock, 
  Play, 
  BookOpen, 
  Users,
  Trophy,
  Lock
} from "lucide-react";

const learningPaths = [
  {
    id: 1,
    title: "Frontend Development Mastery",
    description: "Complete path from HTML/CSS to advanced React patterns",
    progress: 65,
    totalLessons: 24,
    completedLessons: 16,
    estimatedTime: "8 weeks",
    level: "Beginner to Advanced",
    enrolled: 1247,
    lessons: [
      { id: 1, title: "HTML Fundamentals", completed: true, duration: "30 min", type: "video" },
      { id: 2, title: "CSS Grid & Flexbox", completed: true, duration: "45 min", type: "video" },
      { id: 3, title: "JavaScript ES6+", completed: true, duration: "60 min", type: "article" },
      { id: 4, title: "React Components", completed: false, current: true, duration: "40 min", type: "video" },
      { id: 5, title: "State Management", completed: false, duration: "50 min", type: "quiz" },
      { id: 6, title: "Advanced Patterns", completed: false, locked: true, duration: "35 min", type: "video" },
    ]
  },
  {
    id: 2,
    title: "Backend Development with Node.js",
    description: "Server-side JavaScript, APIs, and database integration",
    progress: 30,
    totalLessons: 18,
    completedLessons: 5,
    estimatedTime: "6 weeks",
    level: "Intermediate",
    enrolled: 892,
    lessons: [
      { id: 1, title: "Node.js Basics", completed: true, duration: "35 min", type: "video" },
      { id: 2, title: "Express.js Setup", completed: true, duration: "40 min", type: "article" },
      { id: 3, title: "REST API Design", completed: false, current: true, duration: "45 min", type: "video" },
      { id: 4, title: "Database Integration", completed: false, duration: "55 min", type: "quiz" },
      { id: 5, title: "Authentication", completed: false, locked: true, duration: "60 min", type: "video" },
    ]
  }
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'video': return <Play className="w-4 h-4" />;
    case 'article': return <BookOpen className="w-4 h-4" />;
    case 'quiz': return <Users className="w-4 h-4" />;
    default: return <Circle className="w-4 h-4" />;
  }
};

const LearningPath = () => {
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Learning Paths</h1>
        <p className="text-muted-foreground">
          Structured learning journeys to help you master new skills step by step.
        </p>
      </div>

      <div className="space-y-8">
        {learningPaths.map((path) => (
          <Card key={path.id} className="overflow-hidden">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-xl">{path.title}</CardTitle>
                  <CardDescription className="text-base">{path.description}</CardDescription>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {path.estimatedTime}
                    </div>
                    <Badge variant="secondary">{path.level}</Badge>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {path.enrolled.toLocaleString()} enrolled
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{path.progress}%</div>
                  <div className="text-sm text-muted-foreground">
                    {path.completedLessons}/{path.totalLessons} lessons
                  </div>
                </div>
              </div>
              
              <Progress value={path.progress} className="h-2" />
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground mb-3">Course Curriculum</h4>
                
                <div className="space-y-3">
                  {path.lessons.map((lesson, index) => (
                    <div
                      key={lesson.id}
                      className={`flex items-center gap-4 p-3 rounded-lg border ${
                        lesson.current 
                          ? 'border-primary bg-primary/5' 
                          : lesson.completed 
                            ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950' 
                            : lesson.locked
                              ? 'border-muted bg-muted/50 opacity-60'
                              : 'border-border bg-card hover:bg-accent/50'
                      } transition-colors`}
                    >
                      <div className="flex items-center justify-center w-8 h-8">
                        {lesson.locked ? (
                          <Lock className="w-4 h-4 text-muted-foreground" />
                        ) : lesson.completed ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : lesson.current ? (
                          <div className="w-3 h-3 bg-primary rounded-full" />
                        ) : (
                          <Circle className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            {String(index + 1).padStart(2, '0')}.
                          </span>
                          <h5 className={`font-medium ${
                            lesson.locked ? 'text-muted-foreground' : 'text-foreground'
                          }`}>
                            {lesson.title}
                          </h5>
                        </div>
                        
                        <div className="flex items-center gap-3 mt-1">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            {getTypeIcon(lesson.type)}
                            <span className="capitalize">{lesson.type}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {lesson.duration}
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        {lesson.current && !lesson.locked && (
                          <Button size="sm">Continue</Button>
                        )}
                        {!lesson.completed && !lesson.current && !lesson.locked && (
                          <Button variant="outline" size="sm">Start</Button>
                        )}
                        {lesson.completed && (
                          <Button variant="ghost" size="sm">Review</Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm text-muted-foreground">
                      Earn certificate upon completion
                    </span>
                  </div>
                  
                  <Button>
                    {path.progress > 0 ? 'Continue Learning' : 'Start Path'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LearningPath;