import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  Play, 
  Pause, 
  BookOpen, 
  Bookmark, 
  MessageSquare, 
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Volume2
} from "lucide-react";
import { toast } from "sonner";

const lessonData = {
  video: {
    id: 1,
    title: "React Component Lifecycle",
    type: "video",
    duration: "24:30",
    transcript: `
Welcome to React Component Lifecycle lesson. In this video, we'll explore how React components are created, updated, and destroyed.

React component lifecycle consists of three main phases:
1. Mounting - when component is being created
2. Updating - when component is re-rendered
3. Unmounting - when component is being removed

Let's dive deeper into each phase and the methods available...
    `,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  },
  quiz: {
    id: 2,
    title: "JavaScript ES6+ Features Quiz",
    type: "quiz",
    duration: "10:00",
    questions: [
      {
        id: 1,
        question: "Which of the following is NOT a new feature in ES6?",
        options: [
          "Arrow functions",
          "Template literals", 
          "var keyword",
          "Destructuring"
        ],
        correct: 2
      },
      {
        id: 2,
        question: "What does the spread operator (...) do?",
        options: [
          "Creates a new array",
          "Expands iterables into individual elements",
          "Combines two arrays",
          "Filters array elements"
        ],
        correct: 1
      }
    ]
  }
};

const LessonPlayer = () => {
  const [currentLesson, setCurrentLesson] = useState<'video' | 'quiz'>('video');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState("02:45");
  const [progress, setProgress] = useState(15);
  const [note, setNote] = useState("");
  const [bookmarked, setBookmarked] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<{[key: number]: number}>({});
  const [showResults, setShowResults] = useState(false);

  const lesson = lessonData[currentLesson];

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    toast.success(bookmarked ? "Bookmark removed" : "Lesson bookmarked!");
  };

  const handleQuizSubmit = () => {
    setShowResults(true);
    const correctAnswers = lessonData.quiz.questions.filter(
      (q, index) => quizAnswers[index] === q.correct
    ).length;
    
    if (correctAnswers === lessonData.quiz.questions.length) {
      toast.success("🎉 Perfect score! Well done!");
    } else {
      toast("Keep practicing! You can retake this quiz anytime.");
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="sm">
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Path
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{lesson.title}</h1>
          <div className="flex items-center gap-4 mt-1">
            <Badge variant="secondary" className="capitalize">
              {lesson.type}
            </Badge>
            {'duration' in lesson && (
              <span className="text-sm text-muted-foreground">{lesson.duration}</span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              {currentLesson === 'video' ? (
                <div className="space-y-4">
                  {/* Video Player */}
                  <div className="relative bg-black rounded-t-lg aspect-video flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                        {isPlaying ? (
                          <Pause className="w-8 h-8" />
                        ) : (
                          <Play className="w-8 h-8 ml-1" />
                        )}
                      </div>
                      <p className="text-sm opacity-80">Click to {isPlaying ? 'pause' : 'play'}</p>
                    </div>
                  </div>
                  
                  {/* Video Controls */}
                  <div className="p-4 space-y-4">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsPlaying(!isPlaying)}
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                      
                      <div className="flex-1">
                        <Progress value={progress} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>{currentTime}</span>
                          <span>{lessonData.video.duration}</span>
                        </div>
                      </div>
                      
                      <Button variant="outline" size="sm">
                        <Volume2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6">
                  <div className="space-y-6">
                    {lessonData.quiz.questions.map((question, index) => (
                      <Card key={question.id}>
                        <CardHeader>
                          <CardTitle className="text-lg">
                            Question {index + 1}: {question.question}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <RadioGroup
                            value={quizAnswers[index]?.toString()}
                            onValueChange={(value) => 
                              setQuizAnswers(prev => ({...prev, [index]: parseInt(value)}))
                            }
                          >
                            {question.options.map((option, optionIndex) => (
                              <div key={optionIndex} className="flex items-center space-x-2">
                                <RadioGroupItem 
                                  value={optionIndex.toString()} 
                                  id={`q${index}o${optionIndex}`}
                                />
                                <Label 
                                  htmlFor={`q${index}o${optionIndex}`}
                                  className={`flex-1 ${
                                    showResults 
                                      ? optionIndex === question.correct
                                        ? 'text-green-600 font-medium'
                                        : quizAnswers[index] === optionIndex && optionIndex !== question.correct
                                          ? 'text-red-600'
                                          : ''
                                      : ''
                                  }`}
                                >
                                  {option}
                                  {showResults && optionIndex === question.correct && (
                                    <CheckCircle className="w-4 h-4 text-green-600 ml-2" />
                                  )}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </CardContent>
                      </Card>
                    ))}
                    
                    <div className="flex justify-center">
                      <Button 
                        onClick={handleQuizSubmit}
                        disabled={Object.keys(quizAnswers).length < lessonData.quiz.questions.length}
                        className="px-8"
                      >
                        Submit Quiz
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Lesson Switching */}
          <div className="flex gap-4 mt-6">
            <Button
              variant={currentLesson === 'video' ? 'default' : 'outline'}
              onClick={() => setCurrentLesson('video')}
            >
              <Play className="w-4 h-4 mr-2" />
              Video Lesson
            </Button>
            <Button
              variant={currentLesson === 'quiz' ? 'default' : 'outline'}
              onClick={() => setCurrentLesson('quiz')}
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Quiz
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Lesson Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={handleBookmark}
              >
                <Bookmark className={`w-4 h-4 mr-2 ${bookmarked ? 'fill-current' : ''}`} />
                {bookmarked ? 'Bookmarked' : 'Add Bookmark'}
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="w-4 h-4 mr-2" />
                Discussion
              </Button>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">My Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Take notes about this lesson..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="min-h-[100px]"
              />
              <Button className="w-full mt-3" size="sm">
                Save Note
              </Button>
            </CardContent>
          </Card>

          {/* Transcript (for video lessons) */}
          {currentLesson === 'video' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Transcript</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground leading-relaxed max-h-60 overflow-y-auto">
                  {lessonData.video.transcript.trim().split('\n').map((line, index) => (
                    <p key={index} className="mb-2">{line}</p>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <Button variant="outline" size="sm">
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                <Button size="sm">
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LessonPlayer;