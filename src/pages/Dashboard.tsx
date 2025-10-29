import { BookOpen, Award, Clock, TrendingUp, Play } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const Dashboard = () => {
  const { t } = useLanguage();

  const enrolledCourses = [
    {
      id: 1,
      title: 'Complete Web Development Bootcamp',
      progress: 65,
      totalLessons: 45,
      completedLessons: 29,
      lastAccessed: '2 hours ago',
      thumbnail: '/placeholder.svg',
    },
    {
      id: 2,
      title: 'Digital Marketing Mastery',
      progress: 40,
      totalLessons: 32,
      completedLessons: 13,
      lastAccessed: '1 day ago',
      thumbnail: '/placeholder.svg',
    },
    {
      id: 3,
      title: 'Graphic Design Fundamentals',
      progress: 85,
      totalLessons: 28,
      completedLessons: 24,
      lastAccessed: '3 days ago',
      thumbnail: '/placeholder.svg',
    },
  ];

  const stats = [
    {
      icon: BookOpen,
      label: 'Courses Enrolled',
      value: '3',
      color: 'text-secondary',
    },
    {
      icon: Award,
      label: 'Certificates Earned',
      value: '1',
      color: 'text-success',
    },
    {
      icon: Clock,
      label: 'Learning Hours',
      value: '47h',
      color: 'text-accent',
    },
    {
      icon: TrendingUp,
      label: 'Average Progress',
      value: '63%',
      color: 'text-primary',
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Welcome back, Student!</h1>
          <p className="text-muted-foreground">Continue your learning journey</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 card-gradient border-border">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-full bg-${stat.color}/10 flex items-center justify-center`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Enrolled Courses */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">My Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden hover-lift card-gradient border-border">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-bold mb-4 line-clamp-2">{course.title}</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-semibold">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>

                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                      <span>{course.lastAccessed}</span>
                    </div>

                    <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                      <Play className="mr-2 h-4 w-4" />
                      Continue Learning
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
          <Card className="p-6 card-gradient border-border">
            <div className="space-y-4">
              {[
                {
                  action: 'Completed lesson',
                  course: 'Complete Web Development Bootcamp',
                  lesson: 'React Hooks in Depth',
                  time: '2 hours ago',
                },
                {
                  action: 'Earned certificate',
                  course: 'Graphic Design Fundamentals',
                  lesson: 'Final Project Completion',
                  time: '1 day ago',
                },
                {
                  action: 'Started new course',
                  course: 'Digital Marketing Mastery',
                  lesson: 'Introduction to SEO',
                  time: '3 days ago',
                },
              ].map((activity, index) => (
                <div key={index} className="flex items-start space-x-4 pb-4 border-b last:border-0 last:pb-0">
                  <div className="w-10 h-10 rounded-full accent-gradient flex items-center justify-center flex-shrink-0">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.course}</p>
                    <p className="text-sm text-muted-foreground">{activity.lesson}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
