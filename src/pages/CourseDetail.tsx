import { useParams, Link } from 'react-router-dom';
import { Clock, Users, BookOpen, Award, Star, Play, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useLanguage } from '@/contexts/LanguageContext';

const CourseDetail = () => {
  const { id } = useParams();
  const { t } = useLanguage();

  // Mock data - in real app, fetch based on id
  const course = {
    title: 'Complete Web Development Bootcamp',
    description: 'Master HTML, CSS, JavaScript, React, Node.js, and more in this comprehensive course.',
    longDescription: 'This comprehensive web development bootcamp will take you from beginner to advanced level. You\'ll learn modern web technologies including HTML5, CSS3, JavaScript ES6+, React, Node.js, Express, MongoDB, and more. Build real-world projects and deploy them to production.',
    image: '/placeholder.svg',
    instructor: {
      name: 'John Smith',
      bio: 'Senior Full Stack Developer with 10+ years of experience',
      image: '/placeholder.svg',
      rating: 4.8,
      students: 50000,
      courses: 12,
    },
    price: '$49.99',
    rating: 4.7,
    reviews: 1250,
    students: 15420,
    lessons: 45,
    duration: '12 hours',
    level: 'Beginner',
    category: 'Development',
    language: 'English',
    lastUpdated: 'October 2024',
    curriculum: [
      {
        title: 'Introduction to Web Development',
        lessons: [
          { title: 'Welcome to the Course', duration: '5:30', type: 'video' },
          { title: 'Setting Up Your Environment', duration: '10:45', type: 'video' },
          { title: 'Web Development Basics', duration: '15:20', type: 'video' },
        ],
      },
      {
        title: 'HTML Fundamentals',
        lessons: [
          { title: 'HTML Structure', duration: '12:15', type: 'video' },
          { title: 'Common HTML Tags', duration: '18:30', type: 'video' },
          { title: 'Forms and Inputs', duration: '20:10', type: 'video' },
          { title: 'HTML Practice Quiz', duration: '10:00', type: 'quiz' },
        ],
      },
      {
        title: 'CSS Styling',
        lessons: [
          { title: 'CSS Basics', duration: '15:45', type: 'video' },
          { title: 'Flexbox Layout', duration: '22:30', type: 'video' },
          { title: 'Grid System', duration: '25:15', type: 'video' },
          { title: 'Responsive Design', duration: '20:40', type: 'video' },
        ],
      },
    ],
    features: [
      '45 video lessons',
      'Lifetime access',
      'Certificate of completion',
      'Access on mobile and desktop',
      'Downloadable resources',
      'Code exercises',
    ],
    requirements: [
      'Basic computer skills',
      'No prior programming experience required',
      'A computer with internet connection',
    ],
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="hero-gradient text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Badge className="bg-secondary text-secondary-foreground">{course.category}</Badge>
                <Badge variant="outline" className="border-accent text-accent">{course.level}</Badge>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-lg opacity-90 mb-6">{course.description}</p>
              
              <div className="flex flex-wrap items-center gap-6 text-sm mb-6">
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 fill-accent text-accent" />
                  <span className="font-semibold">{course.rating}</span>
                  <span className="opacity-75">({course.reviews} reviews)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-5 w-5" />
                  <span>{course.students.toLocaleString()} students</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-5 w-5" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <BookOpen className="h-5 w-5" />
                  <span>{course.lessons} lessons</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <img
                  src={course.instructor.image}
                  alt={course.instructor.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="text-sm opacity-75">Created by</p>
                  <p className="font-semibold">{course.instructor.name}</p>
                </div>
              </div>
            </div>

            {/* Course Card */}
            <div className="lg:col-span-1">
              <Card className="sticky top-20 overflow-hidden card-gradient border-border">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="text-3xl font-bold text-secondary mb-4">{course.price}</div>
                  <Button 
                    className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground mb-3" 
                    size="lg"
                    onClick={() => window.location.href = `/checkout?course=${id}&title=${encodeURIComponent(course.title)}&price=${encodeURIComponent(course.price)}`}
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Enroll Now
                  </Button>
                  <Button variant="outline" className="w-full mb-6">
                    Add to Wishlist
                  </Button>
                  
                  <div className="space-y-3 text-sm">
                    <h4 className="font-semibold">This course includes:</h4>
                    {course.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-success" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Course Details */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-muted">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <Card className="p-6 card-gradient border-border">
                  <h2 className="text-2xl font-bold mb-4">About this course</h2>
                  <p className="text-muted-foreground mb-6">{course.longDescription}</p>
                  
                  <h3 className="text-xl font-bold mb-3">What you'll learn</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                    {course.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-xl font-bold mb-3">Requirements</h3>
                  <ul className="space-y-2">
                    {course.requirements.map((req, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-muted-foreground">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </TabsContent>

              <TabsContent value="curriculum" className="mt-6">
                <Card className="p-6 card-gradient border-border">
                  <h2 className="text-2xl font-bold mb-4">Course Curriculum</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {course.curriculum.map((section, index) => (
                      <AccordionItem key={index} value={`section-${index}`}>
                        <AccordionTrigger className="text-left">
                          <div>
                            <h3 className="font-semibold">{section.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {section.lessons.length} lessons
                            </p>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-3">
                            {section.lessons.map((lesson, lessonIndex) => (
                              <li key={lessonIndex} className="flex items-center justify-between py-2 border-b last:border-0">
                                <div className="flex items-center space-x-3">
                                  <Play className="h-4 w-4 text-muted-foreground" />
                                  <span>{lesson.title}</span>
                                </div>
                                <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </Card>
              </TabsContent>

              <TabsContent value="instructor" className="mt-6">
                <Card className="p-6 card-gradient border-border">
                  <div className="flex items-start space-x-4 mb-6">
                    <img
                      src={course.instructor.image}
                      alt={course.instructor.name}
                      className="w-24 h-24 rounded-full"
                    />
                    <div>
                      <h2 className="text-2xl font-bold mb-2">{course.instructor.name}</h2>
                      <p className="text-muted-foreground mb-4">{course.instructor.bio}</p>
                      
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold">{course.instructor.rating}</div>
                          <div className="text-sm text-muted-foreground">Rating</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold">{course.instructor.students.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">Students</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold">{course.instructor.courses}</div>
                          <div className="text-sm text-muted-foreground">Courses</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar with related courses could go here */}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
