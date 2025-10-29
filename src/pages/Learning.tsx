import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Play, CheckCircle, Lock, ArrowLeft, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Learning = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [enrollment, setEnrollment] = useState<any>(null);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [loading, setLoading] = useState(true);

  // Mock course data - in real app, fetch from database
  const course = {
    id: id,
    title: 'Complete Web Development Bootcamp',
    curriculum: [
      {
        title: 'Introduction to Web Development',
        lessons: [
          { id: '1', title: 'Welcome to the Course', duration: '5:30', videoUrl: 'https://example.com/video1' },
          { id: '2', title: 'Setting Up Your Environment', duration: '10:45', videoUrl: 'https://example.com/video2' },
          { id: '3', title: 'Web Development Basics', duration: '15:20', videoUrl: 'https://example.com/video3' },
        ],
      },
      {
        title: 'HTML Fundamentals',
        lessons: [
          { id: '4', title: 'HTML Structure', duration: '12:15', videoUrl: 'https://example.com/video4' },
          { id: '5', title: 'Common HTML Tags', duration: '18:30', videoUrl: 'https://example.com/video5' },
          { id: '6', title: 'Forms and Inputs', duration: '20:10', videoUrl: 'https://example.com/video6' },
        ],
      },
    ],
  };

  useEffect(() => {
    if (!user) {
      toast.error('Please login to access this course');
      navigate('/auth');
      return;
    }

    fetchEnrollment();
  }, [user, id]);

  const fetchEnrollment = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('enrollments')
        .select('*')
        .eq('user_id', user.id)
        .eq('course_id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          toast.error('You are not enrolled in this course');
          navigate(`/courses/${id}`);
        }
        throw error;
      }

      setEnrollment(data);
    } catch (error: any) {
      console.error('Error fetching enrollment:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteLesson = async () => {
    if (!user || !enrollment) return;

    const totalLessons = course.curriculum.reduce((acc, section) => acc + section.lessons.length, 0);
    const newCompletedLessons = Math.min(enrollment.completed_lessons + 1, totalLessons);
    const newProgress = Math.round((newCompletedLessons / totalLessons) * 100);

    try {
      const { error } = await supabase
        .from('enrollments')
        .update({
          completed_lessons: newCompletedLessons,
          progress: newProgress,
          last_accessed: new Date().toISOString(),
        })
        .eq('id', enrollment.id);

      if (error) throw error;

      setEnrollment({
        ...enrollment,
        completed_lessons: newCompletedLessons,
        progress: newProgress,
      });

      toast.success('Lesson completed!');
      
      if (currentLesson < totalLessons - 1) {
        setCurrentLesson(currentLesson + 1);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Video Player Section */}
      <div className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => navigate(`/courses/${id}`)}
            className="mb-4 text-primary-foreground hover:bg-primary-foreground/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Course
          </Button>

          <div className="aspect-video bg-background/20 rounded-lg flex items-center justify-center mb-6">
            <Play className="h-20 w-20 opacity-50" />
            <p className="ml-4 text-lg">Video Player Placeholder</p>
          </div>

          <h1 className="text-2xl font-bold mb-2">{course.curriculum[0].lessons[currentLesson]?.title}</h1>
          <p className="opacity-90">{course.title}</p>
        </div>
      </div>

      {/* Course Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="p-6 mb-6 card-gradient border-border">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Your Progress</h2>
                <span className="text-sm text-muted-foreground">
                  {enrollment?.completed_lessons || 0} / {course.curriculum.reduce((acc, s) => acc + s.lessons.length, 0)} lessons
                </span>
              </div>
              <Progress value={enrollment?.progress || 0} className="h-2 mb-2" />
              <p className="text-sm text-muted-foreground">{enrollment?.progress || 0}% complete</p>
            </Card>

            <Card className="p-6 card-gradient border-border">
              <h2 className="text-2xl font-bold mb-4">About this Lesson</h2>
              <p className="text-muted-foreground mb-6">
                In this lesson, you'll learn the fundamentals and get hands-on practice with real-world examples.
              </p>

              <div className="flex gap-4">
                <Button
                  onClick={handleCompleteLesson}
                  className="bg-success hover:bg-success/90 text-success-foreground"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Complete Lesson
                </Button>
                <Button variant="outline">
                  Next Lesson
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          </div>

          {/* Curriculum Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 card-gradient border-border sticky top-20">
              <h3 className="text-xl font-bold mb-4">Course Content</h3>
              <Accordion type="single" collapsible defaultValue="section-0">
                {course.curriculum.map((section, sectionIndex) => (
                  <AccordionItem key={sectionIndex} value={`section-${sectionIndex}`}>
                    <AccordionTrigger className="text-left">
                      <div>
                        <h4 className="font-semibold">{section.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {section.lessons.length} lessons
                        </p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        {section.lessons.map((lesson, lessonIndex) => {
                          const globalIndex = course.curriculum
                            .slice(0, sectionIndex)
                            .reduce((acc, s) => acc + s.lessons.length, 0) + lessonIndex;
                          const isCompleted = globalIndex < (enrollment?.completed_lessons || 0);
                          const isActive = globalIndex === currentLesson;

                          return (
                            <li
                              key={lesson.id}
                              className={`flex items-center justify-between p-2 rounded cursor-pointer hover:bg-muted/50 ${
                                isActive ? 'bg-muted' : ''
                              }`}
                              onClick={() => setCurrentLesson(globalIndex)}
                            >
                              <div className="flex items-center space-x-2 flex-1">
                                {isCompleted ? (
                                  <CheckCircle className="h-4 w-4 text-success" />
                                ) : (
                                  <Play className="h-4 w-4 text-muted-foreground" />
                                )}
                                <span className={`text-sm ${isActive ? 'font-semibold' : ''}`}>
                                  {lesson.title}
                                </span>
                              </div>
                              <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learning;
