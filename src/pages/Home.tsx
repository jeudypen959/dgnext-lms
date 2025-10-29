import { Link } from 'react-router-dom';
import { BookOpen, Users, Award, Clock, ArrowRight, GraduationCap, Target, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import CourseCard from '@/components/CourseCard';
import { useLanguage } from '@/contexts/LanguageContext';
import heroImage from '@/assets/hero-image.jpg';

const Home = () => {
  const { t } = useLanguage();

  const stats = [
    { icon: Users, label: t('activeStudents'), value: '50,000+' },
    { icon: GraduationCap, label: t('expertInstructors'), value: '200+' },
    { icon: BookOpen, label: t('coursesAvailable'), value: '500+' },
    { icon: Award, label: t('successRate'), value: '95%' },
  ];

  const features = [
    {
      icon: GraduationCap,
      title: t('feature1Title'),
      description: t('feature1Desc'),
    },
    {
      icon: Clock,
      title: t('feature2Title'),
      description: t('feature2Desc'),
    },
    {
      icon: Award,
      title: t('feature3Title'),
      description: t('feature3Desc'),
    },
    {
      icon: Zap,
      title: t('feature4Title'),
      description: t('feature4Desc'),
    },
  ];

  const featuredCourses = [
    {
      id: 'web-dev-101',
      title: 'Complete Web Development Bootcamp',
      description: 'Master HTML, CSS, JavaScript, React, Node.js, and more in this comprehensive course.',
      image: '/placeholder.svg',
      instructor: 'John Smith',
      students: 15420,
      lessons: 45,
      duration: '12h',
      level: 'Beginner',
      category: 'Development',
      price: '$49.99',
    },
    {
      id: 'data-science',
      title: 'Data Science & Machine Learning',
      description: 'Learn Python, statistics, machine learning algorithms, and data visualization.',
      image: '/placeholder.svg',
      instructor: 'Sarah Johnson',
      students: 12890,
      lessons: 38,
      duration: '15h',
      level: 'Intermediate',
      category: 'Data Science',
      price: '$59.99',
    },
    {
      id: 'digital-marketing',
      title: 'Digital Marketing Mastery',
      description: 'Complete guide to SEO, social media marketing, content marketing, and more.',
      image: '/placeholder.svg',
      instructor: 'Michael Brown',
      students: 18340,
      lessons: 32,
      duration: '10h',
      level: 'Beginner',
      category: 'Marketing',
      price: '$39.99',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative hero-gradient text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={heroImage} alt="Hero" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('heroTitle')}
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-accent font-semibold">
              {t('heroSubtitle')}
            </p>
            <p className="text-lg mb-8 opacity-90">
              {t('heroDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/courses">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-glow">
                  {t('getStarted')} <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/courses">
                <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-primary">
                  {t('exploreCourses')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 text-secondary mb-4">
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('featuresTitle')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 text-center hover-lift card-gradient border-border"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full accent-gradient text-primary mb-4">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">{t('popularCourses')}</h2>
            <Link to="/courses">
              <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
                {t('viewAll')} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Your Learning Journey Today
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of students worldwide and unlock your potential with our expert-led courses.
          </p>
          <Link to="/courses">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-glow">
              Browse All Courses <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
