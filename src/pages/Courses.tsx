import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import CourseCard from '@/components/CourseCard';
import { useLanguage } from '@/contexts/LanguageContext';

const Courses = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [level, setLevel] = useState('all');

  const courses = [
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
    {
      id: 'graphic-design',
      title: 'Graphic Design Fundamentals',
      description: 'Learn design principles, Adobe Photoshop, Illustrator, and create stunning visuals.',
      image: '/placeholder.svg',
      instructor: 'Emily Davis',
      students: 9870,
      lessons: 28,
      duration: '8h',
      level: 'Beginner',
      category: 'Design',
      price: '$44.99',
    },
    {
      id: 'mobile-dev',
      title: 'Mobile App Development with React Native',
      description: 'Build cross-platform mobile applications for iOS and Android.',
      image: '/placeholder.svg',
      instructor: 'David Wilson',
      students: 11230,
      lessons: 42,
      duration: '14h',
      level: 'Intermediate',
      category: 'Development',
      price: '$54.99',
    },
    {
      id: 'business-analysis',
      title: 'Business Analysis & Requirements',
      description: 'Master business analysis techniques, requirement gathering, and stakeholder management.',
      image: '/placeholder.svg',
      instructor: 'Lisa Anderson',
      students: 7650,
      lessons: 25,
      duration: '9h',
      level: 'Beginner',
      category: 'Business',
      price: '$34.99',
    },
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === 'all' || course.category === category;
    const matchesLevel = level === 'all' || course.level === level;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('courses')}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our comprehensive collection of courses designed to help you achieve your goals.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card"
              />
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full md:w-[200px] bg-card">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-popover z-50">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Development">Development</SelectItem>
                <SelectItem value="Data Science">Data Science</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
              </SelectContent>
            </Select>
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger className="w-full md:w-[200px] bg-card">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent className="bg-popover z-50">
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        <div className="mb-8">
          <p className="text-muted-foreground">
            Showing {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'}
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No courses found matching your criteria. Try adjusting your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
