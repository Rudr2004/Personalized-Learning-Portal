import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Mail, 
  Calendar, 
  MapPin, 
  Trophy, 
  BookOpen, 
  Clock, 
  Star,
  Settings,
  Bell,
  Shield,
  Bookmark,
  Award,
  TrendingUp
} from "lucide-react";
import { toast } from "sonner";

const userStats = {
  totalXP: 2450,
  lessonsCompleted: 34,
  coursesCompleted: 3,
  currentStreak: 7,
  longestStreak: 15,
  hoursLearned: 42,
  level: 5,
  nextLevelXP: 3000
};

const completedCourses = [
  {
    id: 1,
    title: "JavaScript Fundamentals",
    completedAt: "2024-02-15",
    grade: "A+",
    certificate: true
  },
  {
    id: 2,
    title: "React Basics",
    completedAt: "2024-03-10",
    grade: "A",
    certificate: true
  },
  {
    id: 3,
    title: "CSS Grid & Flexbox",
    completedAt: "2024-03-25",
    grade: "B+",
    certificate: false
  }
];

const bookmarkedLessons = [
  {
    id: 1,
    title: "Advanced React Patterns",
    type: "video",
    duration: "45 min",
    bookmarkedAt: "2024-03-20"
  },
  {
    id: 2,
    title: "Node.js Performance Optimization",
    type: "article",
    duration: "30 min",
    bookmarkedAt: "2024-03-18"
  },
  {
    id: 3,
    title: "Database Design Principles",
    type: "quiz",
    duration: "15 min",
    bookmarkedAt: "2024-03-15"
  }
];

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Rudra",
    email: "rudra@example.com",
    bio: "Passionate full-stack developer learning new technologies every day. Love solving complex problems and building amazing user experiences.",
    location: "San Francisco, CA",
    website: "https://rudra.dev",
    joinedDate: "January 2024"
  });

  const [notifications, setNotifications] = useState({
    emailWeeklyReport: true,
    emailNewCourses: false,
    emailAchievements: true,
    pushReminders: true
  });

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    toast.success("Notification preferences updated!");
  };

  const xpProgress = (userStats.totalXP / userStats.nextLevelXP) * 100;

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Profile</h1>
        <p className="text-muted-foreground">
          Manage your account settings and track your learning progress.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Overview */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src="/placeholder-avatar.jpg" alt={profileData.name} />
                <AvatarFallback className="text-2xl">{profileData.name[0]}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl">{profileData.name}</CardTitle>
              <CardDescription>{profileData.email}</CardDescription>
              
              <div className="space-y-2 mt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Level {userStats.level}</span>
                  <span className="font-medium">{userStats.totalXP}/{userStats.nextLevelXP} XP</span>
                </div>
                <Progress value={xpProgress} className="h-2" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">{userStats.lessonsCompleted}</div>
                    <div className="text-xs text-muted-foreground">Lessons</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">{userStats.currentStreak}</div>
                    <div className="text-xs text-muted-foreground">Day Streak</div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{profileData.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>Joined {profileData.joinedDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{userStats.hoursLearned} hours learned</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Profile Info */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Your public profile details</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <User className="w-4 h-4 mr-2" />
                    {isEditing ? 'Cancel' : 'Edit'}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                      disabled={!isEditing}
                      rows={3}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={profileData.website}
                        onChange={(e) => setProfileData(prev => ({ ...prev, website: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  
                  {isEditing && (
                    <div className="flex gap-2">
                      <Button onClick={handleSaveProfile}>Save Changes</Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Learning Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Learning Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 rounded-lg bg-primary/5">
                      <Trophy className="w-8 h-8 text-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold">{userStats.totalXP}</div>
                      <div className="text-sm text-muted-foreground">Total XP</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-green-500/5">
                      <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold">{userStats.coursesCompleted}</div>
                      <div className="text-sm text-muted-foreground">Courses</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-orange-500/5">
                      <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold">{userStats.hoursLearned}</div>
                      <div className="text-sm text-muted-foreground">Hours</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-blue-500/5">
                      <Star className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold">{userStats.longestStreak}</div>
                      <div className="text-sm text-muted-foreground">Best Streak</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="courses" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Completed Courses
                  </CardTitle>
                  <CardDescription>Courses you've successfully completed</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {completedCourses.map((course) => (
                      <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-semibold">{course.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            Completed on {new Date(course.completedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary">Grade: {course.grade}</Badge>
                          {course.certificate && (
                            <Button variant="outline" size="sm">
                              <Award className="w-4 h-4 mr-2" />
                              Certificate
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bookmarks" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bookmark className="w-5 h-5" />
                    Bookmarked Lessons
                  </CardTitle>
                  <CardDescription>Lessons you've saved for later</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {bookmarkedLessons.map((lesson) => (
                      <div key={lesson.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-semibold">{lesson.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Badge variant="outline" className="capitalize">{lesson.type}</Badge>
                            <span>•</span>
                            <span>{lesson.duration}</span>
                            <span>•</span>
                            <span>Saved {new Date(lesson.bookmarkedAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm">Continue</Button>
                          <Button variant="outline" size="sm">
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              {/* Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>Choose how you want to be notified</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="weekly-report">Weekly Progress Report</Label>
                      <p className="text-sm text-muted-foreground">Get a summary of your learning progress</p>
                    </div>
                    <Switch
                      id="weekly-report"
                      checked={notifications.emailWeeklyReport}
                      onCheckedChange={(checked) => handleNotificationChange('emailWeeklyReport', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="new-courses">New Course Announcements</Label>
                      <p className="text-sm text-muted-foreground">Be notified when new courses are added</p>
                    </div>
                    <Switch
                      id="new-courses"
                      checked={notifications.emailNewCourses}
                      onCheckedChange={(checked) => handleNotificationChange('emailNewCourses', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="achievements">Achievement Notifications</Label>
                      <p className="text-sm text-muted-foreground">Celebrate your learning milestones</p>
                    </div>
                    <Switch
                      id="achievements"
                      checked={notifications.emailAchievements}
                      onCheckedChange={(checked) => handleNotificationChange('emailAchievements', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="reminders">Learning Reminders</Label>
                      <p className="text-sm text-muted-foreground">Daily reminders to keep your streak</p>
                    </div>
                    <Switch
                      id="reminders"
                      checked={notifications.pushReminders}
                      onCheckedChange={(checked) => handleNotificationChange('pushReminders', checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Account Security */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Account Security
                  </CardTitle>
                  <CardDescription>Manage your account security settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="w-4 h-4 mr-2" />
                    Change Email Address
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="w-4 h-4 mr-2" />
                    Two-Factor Authentication
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;