import { StatCard, AchievementCard } from "@/components/common";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import {
  Trophy,
  TrendingUp,
  Clock,
  Target,
  Award,
  Calendar,
  BookOpen,
  Zap
} from "lucide-react";

// Mock data
const xpGrowthData = [
  { month: 'Jan', xp: 400 },
  { month: 'Feb', xp: 650 },
  { month: 'Mar', xp: 900 },
  { month: 'Apr', xp: 1200 },
  { month: 'May', xp: 1600 },
  { month: 'Jun', xp: 2100 },
  { month: 'Jul', xp: 2450 }
];

const categoryData = [
  { name: 'Frontend', value: 40, color: '#3b82f6' },
  { name: 'Backend', value: 30, color: '#10b981' },
  { name: 'Database', value: 20, color: '#f59e0b' },
  { name: 'DevOps', value: 10, color: '#ef4444' }
];

const weeklyActivity = [
  { day: 'Mon', lessons: 2 },
  { day: 'Tue', lessons: 3 },
  { day: 'Wed', lessons: 1 },
  { day: 'Thu', lessons: 4 },
  { day: 'Fri', lessons: 2 },
  { day: 'Sat', lessons: 3 },
  { day: 'Sun', lessons: 1 }
];

const achievements = [
  { id: 1, name: 'First Steps', description: 'Complete your first lesson', icon: '🎯', earned: true, date: '2024-01-15' },
  { id: 2, name: 'Week Warrior', description: 'Maintain a 7-day streak', icon: '🔥', earned: true, date: '2024-02-01' },
  { id: 3, name: 'Knowledge Seeker', description: 'Complete 25 lessons', icon: '📚', earned: true, date: '2024-02-20' },
  { id: 4, name: 'Speed Learner', description: 'Complete 5 lessons in one day', icon: '⚡', earned: true, date: '2024-03-05' },
  { id: 5, name: 'Master Student', description: 'Complete 50 lessons', icon: '🎓', earned: false },
  { id: 6, name: 'Streak Master', description: 'Maintain a 30-day streak', icon: '👑', earned: false },
  { id: 7, name: 'Quiz Champion', description: 'Score 100% on 10 quizzes', icon: '🏆', earned: false },
  { id: 8, name: 'Path Completionist', description: 'Complete an entire learning path', icon: '🌟', earned: false }
];

// Generate calendar data for last 12 weeks
const generateCalendarData = () => {
  const data = [];
  const today = new Date();
  
  for (let i = 83; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const activity = Math.random() > 0.3 ? Math.floor(Math.random() * 4) + 1 : 0;
    data.push({
      date: date.toISOString().split('T')[0],
      count: activity
    });
  }
  
  return data;
};

const calendarData = generateCalendarData();

const Analytics = () => {
  const totalXP = 2450;
  const currentStreak = 7;
  const longestStreak = 15;
  const lessonsCompleted = 34;
  const earnedBadges = achievements.filter(a => a.earned).length;
  const totalBadges = achievements.length;

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Learning Analytics</h1>
        <p className="text-muted-foreground">
          Track your progress and see how you're improving over time.
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={Trophy}
          title="Total XP"
          value={totalXP}
          trend={{ value: "+350 this week", isPositive: true }}
        />
        
        <StatCard
          icon={Zap}
          title="Current Streak"
          value={`${currentStreak} 🔥`}
          subtitle={`Best: ${longestStreak} days`}
        />
        
        <StatCard
          icon={BookOpen}
          title="Lessons Completed"
          value={lessonsCompleted}
          subtitle="This month"
        />
        
        <StatCard
          icon={Award}
          title="Badges Earned"
          value={`${earnedBadges}/${totalBadges}`}
          progress={{
            value: (earnedBadges / totalBadges) * 100,
            label: `${totalBadges - earnedBadges} more to unlock`
          }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* XP Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle>XP Growth Over Time</CardTitle>
            <CardDescription>Your learning progress this year</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={xpGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="xp" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Learning Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Learning Focus</CardTitle>
            <CardDescription>Time spent by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Weekly Activity */}
        <Card>
          <CardHeader>
            <CardTitle>This Week's Activity</CardTitle>
            <CardDescription>Lessons completed per day</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weeklyActivity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="lessons" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Activity Calendar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Activity Calendar
            </CardTitle>
            <CardDescription>Your learning activity over the past 12 weeks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1">
              {calendarData.map((day, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-sm ${
                    day.count === 0 ? 'bg-muted' :
                    day.count === 1 ? 'bg-primary/30' :
                    day.count === 2 ? 'bg-primary/50' :
                    day.count === 3 ? 'bg-primary/70' :
                    'bg-primary'
                  }`}
                  title={`${day.date}: ${day.count} lessons`}
                />
              ))}
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
              <span>Less</span>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-muted rounded-sm" />
                <div className="w-3 h-3 bg-primary/30 rounded-sm" />
                <div className="w-3 h-3 bg-primary/50 rounded-sm" />
                <div className="w-3 h-3 bg-primary/70 rounded-sm" />
                <div className="w-3 h-3 bg-primary rounded-sm" />
              </div>
              <span>More</span>
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
            <CardDescription>Badges you've earned and goals to unlock</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {achievements.map((achievement) => (
                <AchievementCard
                  key={achievement.id}
                  id={achievement.id}
                  name={achievement.name}
                  description={achievement.description}
                  icon={achievement.icon}
                  earned={achievement.earned}
                  date={achievement.date}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;