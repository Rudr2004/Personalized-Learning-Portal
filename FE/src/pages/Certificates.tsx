import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Download, 
  Award, 
  Calendar, 
  User, 
  Share2, 
  Search,
  ExternalLink,
  Trophy,
  Star,
  CheckCircle
} from "lucide-react";
import { toast } from "sonner";

const certificates = [
  {
    id: 1,
    title: "JavaScript Fundamentals",
    issueDate: "2024-02-15",
    completionDate: "2024-02-14",
    grade: "A+",
    credentialId: "JS-2024-001234",
    skills: ["JavaScript", "ES6", "DOM Manipulation", "Async Programming"],
    hours: 24,
    status: "earned",
    verifyUrl: "https://learninghub.com/verify/js-001234"
  },
  {
    id: 2,
    title: "React Development",
    issueDate: "2024-03-10",
    completionDate: "2024-03-09",
    grade: "A",
    credentialId: "REACT-2024-005678",
    skills: ["React", "JSX", "Hooks", "State Management"],
    hours: 32,
    status: "earned",
    verifyUrl: "https://learninghub.com/verify/react-005678"
  },
  {
    id: 3,
    title: "Advanced CSS & Design",
    issueDate: "2024-03-25",
    completionDate: "2024-03-24",
    grade: "B+",
    credentialId: "CSS-2024-009012",
    skills: ["CSS Grid", "Flexbox", "Animations", "Responsive Design"],
    hours: 18,
    status: "earned",
    verifyUrl: "https://learninghub.com/verify/css-009012"
  },
  {
    id: 4,
    title: "Node.js Backend Development",
    issueDate: null,
    completionDate: null,
    grade: null,
    credentialId: null,
    skills: ["Node.js", "Express", "MongoDB", "REST APIs"],
    hours: 40,
    status: "in-progress",
    progress: 75
  },
  {
    id: 5,
    title: "Full Stack Web Development",
    issueDate: null,
    completionDate: null,
    grade: null,
    credentialId: null,
    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Database"],
    hours: 120,
    status: "locked",
    requiresCompletion: ["JavaScript Fundamentals", "React Development", "Node.js Backend Development"]
  }
];

const Certificates = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredCertificates = certificates.filter(cert =>
    cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cert.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleDownload = (certificate: any) => {
    // In a real app, this would generate and download a PDF certificate
    toast.success(`Certificate for "${certificate.title}" downloaded!`);
  };

  const handleShare = (certificate: any) => {
    // In a real app, this would open a share dialog or copy to clipboard
    navigator.clipboard.writeText(certificate.verifyUrl);
    toast.success("Certificate verification link copied to clipboard!");
  };

  const handleVerify = (certificate: any) => {
    window.open(certificate.verifyUrl, '_blank');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'earned':
        return <Badge className="bg-green-500 hover:bg-green-600"><CheckCircle className="w-3 h-3 mr-1" />Earned</Badge>;
      case 'in-progress':
        return <Badge variant="secondary">In Progress</Badge>;
      case 'locked':
        return <Badge variant="outline">Locked</Badge>;
      default:
        return null;
    }
  };

  const earnedCount = certificates.filter(c => c.status === 'earned').length;
  const inProgressCount = certificates.filter(c => c.status === 'in-progress').length;
  const totalHours = certificates.filter(c => c.status === 'earned').reduce((sum, cert) => sum + cert.hours, 0);

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Certificates & Achievements</h1>
        <p className="text-muted-foreground">
          Track your learning achievements and download official certificates.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Certificates Earned
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{earnedCount}</div>
            <div className="text-sm text-muted-foreground">out of {certificates.length} available</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Award className="w-4 h-4" />
              In Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{inProgressCount}</div>
            <div className="text-sm text-muted-foreground">courses underway</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Learning Hours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalHours}</div>
            <div className="text-sm text-muted-foreground">certified hours</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Star className="w-4 h-4" />
              Average Grade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">A-</div>
            <div className="text-sm text-muted-foreground">across all courses</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search certificates by name or skills..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCertificates.map((certificate) => (
          <Card key={certificate.id} className={`relative overflow-hidden ${
            certificate.status === 'earned' 
              ? 'border-green-200 dark:border-green-800' 
              : certificate.status === 'in-progress'
                ? 'border-blue-200 dark:border-blue-800'
                : 'border-muted opacity-60'
          }`}>
            {/* Certificate Header */}
            <div className={`h-24 ${
              certificate.status === 'earned' 
                ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
                : certificate.status === 'in-progress'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-600'
                  : 'bg-gradient-to-r from-gray-400 to-gray-500'
            } relative`}>
              <div className="absolute inset-0 bg-black/10" />
              <div className="absolute top-4 left-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div className="absolute top-4 right-4">
                {getStatusBadge(certificate.status)}
              </div>
            </div>

            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{certificate.title}</CardTitle>
              <CardDescription>
                {certificate.status === 'earned' 
                  ? `Completed on ${new Date(certificate.completionDate!).toLocaleDateString()}`
                  : certificate.status === 'in-progress'
                    ? `${certificate.progress}% complete`
                    : 'Requirements not met'
                }
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                {/* Certificate Details */}
                {certificate.status === 'earned' && (
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Grade:</span>
                      <Badge variant="secondary">{certificate.grade}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Hours:</span>
                      <span className="font-medium">{certificate.hours}h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Credential ID:</span>
                      <span className="font-mono text-xs">{certificate.credentialId}</span>
                    </div>
                  </div>
                )}

                {/* Progress Bar for In-Progress */}
                {certificate.status === 'in-progress' && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{certificate.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all"
                        style={{ width: `${certificate.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Requirements for Locked */}
                {certificate.status === 'locked' && (
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Requirements:</div>
                    <div className="space-y-1">
                      {certificate.requiresCompletion?.map((req, index) => (
                        <div key={index} className="text-xs bg-muted p-2 rounded">
                          Complete: {req}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skills */}
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Skills Covered:</div>
                  <div className="flex flex-wrap gap-1">
                    {certificate.skills.slice(0, 4).map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {certificate.skills.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{certificate.skills.length - 4} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  {certificate.status === 'earned' && (
                    <>
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleDownload(certificate)}
                      >
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleShare(certificate)}
                      >
                        <Share2 className="w-3 h-3" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleVerify(certificate)}
                      >
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </>
                  )}
                  
                  {certificate.status === 'in-progress' && (
                    <Button size="sm" className="w-full">
                      Continue Course
                    </Button>
                  )}
                  
                  {certificate.status === 'locked' && (
                    <Button variant="outline" size="sm" className="w-full" disabled>
                      Complete Prerequisites
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCertificates.length === 0 && (
        <div className="text-center py-12">
          <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No certificates found</h3>
          <p className="text-muted-foreground">
            {searchQuery ? "Try adjusting your search terms" : "Complete courses to earn certificates"}
          </p>
        </div>
      )}
    </div>
  );
};

export default Certificates;