import { StatCard, LessonCard, ActivityCalendar } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Calendar, User, Book } from "lucide-react";

// Mock data
const userData = {
  name: "Rudra",
  xp: 2450,
  nextLevelXp: 3000,
  streak: 7,
  badges: 12,
  completedLessons: 34
};

const recommendedLessons = [
  {
    id: 1,
    title: "Advanced React Patterns",
    type: "video",
    duration: "45 min",
    xp: 150,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=240&fit=crop",
    category: "Frontend",
    difficulty: "Advanced"
  },
  {
    id: 2,
    title: "Node.js API Development", 
    type: "article",
    duration: "30 min",
    xp: 120,
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=240&fit=crop",
    category: "Backend",
    difficulty: "Intermediate"
  },
  {
    id: 3,
    title: "Database Design Principles",
    type: "quiz",
    duration: "25 min",
    xp: 100,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=240&fit=crop",
    category: "Database", 
    difficulty: "Beginner"
  }
];

const recentActivity = Array.from({ length: 7 }, (_, i) => ({
  day: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
  completed: Math.floor(Math.random() * 4) + (i < 3 ? 1 : 0) // More recent activity
}));

const Index = () => {
  const xpProgress = (userData.xp / userData.nextLevelXp) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Learning Hub</h1>
                <p className="text-sm text-muted-foreground">Dashboard</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              View Schedule
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Hey {userData.name}, ready to continue your learning journey? 🌱
          </h2>
          <p className="text-muted-foreground">Keep up the great work! You're on a {userData.streak}-day streak.</p>
        </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total XP"
          value={userData.xp}
          progress={{
            value: xpProgress,
            label: `${userData.nextLevelXp - userData.xp} XP to next level`
          }}
        />
        
        <StatCard
          title="Current Streak"
          value={`${userData.streak} 🔥`}
          subtitle="days in a row"
        />
        
        <StatCard
          title="Badges Earned"
          value={userData.badges}
          subtitle="achievements unlocked"
        />
        
        <StatCard
          title="Lessons Completed"
          value={userData.completedLessons}
          subtitle="this month"
        />
      </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
              <Book className="w-5 h-5" />
              Recommended for You
            </h3>
            <p className="text-muted-foreground">
              Continue your learning with these personalized recommendations
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {recommendedLessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                id={lesson.id}
                title={lesson.title}
                type={lesson.type as 'video' | 'article' | 'quiz'}
                duration={lesson.duration}
                category={lesson.category}
                level={lesson.difficulty}
                xp={lesson.xp}
                image={lesson.image}
                className="hover:scale-[1.02] transition-transform"
                onAction={() => console.log(`Starting lesson ${lesson.id}`)}
              />
            ))}
          </div>
        </div>

        {/* Activity Calendar */}
        <ActivityCalendar
          data={recentActivity.map((day, i) => ({
            date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            count: day.completed
          }))}
          title="Recent Activity"
          description="Your learning activity this week"
        />
        </div>
      </div>
    </div>
  );
};

export default Index;
