import { Link } from 'react-router-dom';
import { Clock, Users, BookOpen } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  instructor: string;
  students: number;
  lessons: number;
  duration: string;
  level: string;
  category: string;
  price?: string;
}

const CourseCard = ({
  id,
  title,
  description,
  image,
  instructor,
  students,
  lessons,
  duration,
  level,
  category,
  price = 'Free',
}: CourseCardProps) => {
  const { t } = useLanguage();

  return (
    <Card className="overflow-hidden hover-lift card-gradient border-border">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <Badge className="absolute top-3 right-3 bg-secondary text-secondary-foreground">
          {category}
        </Badge>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline">{level}</Badge>
          <span className="text-lg font-bold text-secondary">{price}</span>
        </div>
        
        <h3 className="text-xl font-bold mb-2 line-clamp-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>
        
        <div className="flex items-center space-x-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{students.toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <BookOpen className="h-4 w-4" />
            <span>{lessons} {t('lessons')}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">by {instructor}</span>
          <Link to={`/courses/${id}`}>
            <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
              {t('enrollNow')}
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default CourseCard;
