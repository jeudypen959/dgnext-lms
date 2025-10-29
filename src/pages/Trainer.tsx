import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, Users, BookOpen, Award, Mail, Linkedin, Twitter } from 'lucide-react';

const Trainer = () => {
  const trainers = [
    {
      id: 1,
      name: 'John Smith',
      title: 'Senior Full Stack Developer',
      bio: '15+ years of experience in web development. Specialized in React, Node.js, and cloud architecture.',
      image: '/placeholder.svg',
      rating: 4.9,
      students: 50000,
      courses: 12,
      skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
      social: {
        email: 'john@dgnext.com',
        linkedin: '#',
        twitter: '#',
      }
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      title: 'Data Science Expert',
      bio: 'PhD in Computer Science with focus on Machine Learning and AI. Former researcher at top tech companies.',
      image: '/placeholder.svg',
      rating: 4.8,
      students: 38000,
      courses: 8,
      skills: ['Python', 'TensorFlow', 'Data Analysis', 'ML'],
      social: {
        email: 'sarah@dgnext.com',
        linkedin: '#',
        twitter: '#',
      }
    },
    {
      id: 3,
      name: 'Michael Brown',
      title: 'Digital Marketing Specialist',
      bio: 'Helped over 200 businesses grow their online presence. Expert in SEO, content marketing, and analytics.',
      image: '/placeholder.svg',
      rating: 4.7,
      students: 45000,
      courses: 10,
      skills: ['SEO', 'Content Marketing', 'Google Analytics', 'Social Media'],
      social: {
        email: 'michael@dgnext.com',
        linkedin: '#',
        twitter: '#',
      }
    },
    {
      id: 4,
      name: 'Emily Davis',
      title: 'UX/UI Design Lead',
      bio: 'Award-winning designer with 10+ years creating beautiful, user-centered digital experiences.',
      image: '/placeholder.svg',
      rating: 4.9,
      students: 32000,
      courses: 9,
      skills: ['Figma', 'Adobe XD', 'UI Design', 'User Research'],
      social: {
        email: 'emily@dgnext.com',
        linkedin: '#',
        twitter: '#',
      }
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Expert Trainers</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn from industry professionals with years of real-world experience
          </p>
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {trainers.map((trainer) => (
            <Card key={trainer.id} className="overflow-hidden hover-lift card-gradient border-border">
              <div className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={trainer.image} />
                    <AvatarFallback className="text-2xl bg-secondary text-secondary-foreground">
                      {trainer.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">{trainer.name}</h3>
                    <p className="text-secondary font-semibold mb-2">{trainer.title}</p>
                    <div className="flex items-center space-x-1 mb-2">
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      <span className="font-semibold">{trainer.rating}</span>
                      <span className="text-sm text-muted-foreground">rating</span>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4">{trainer.bio}</p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {trainer.skills.map((skill, index) => (
                    <Badge key={index} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4 py-4 border-y">
                  <div className="text-center">
                    <Users className="h-5 w-5 mx-auto mb-1 text-secondary" />
                    <div className="text-lg font-bold">{trainer.students.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Students</div>
                  </div>
                  <div className="text-center">
                    <BookOpen className="h-5 w-5 mx-auto mb-1 text-accent" />
                    <div className="text-lg font-bold">{trainer.courses}</div>
                    <div className="text-xs text-muted-foreground">Courses</div>
                  </div>
                  <div className="text-center">
                    <Award className="h-5 w-5 mx-auto mb-1 text-success" />
                    <div className="text-lg font-bold">{trainer.rating}</div>
                    <div className="text-xs text-muted-foreground">Rating</div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <Button size="icon" variant="outline" asChild>
                      <a href={`mailto:${trainer.social.email}`}>
                        <Mail className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button size="icon" variant="outline" asChild>
                      <a href={trainer.social.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button size="icon" variant="outline" asChild>
                      <a href={trainer.social.twitter} target="_blank" rel="noopener noreferrer">
                        <Twitter className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                  <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                    View Courses
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <Card className="p-12 hero-gradient text-primary-foreground max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Become a Trainer</h2>
            <p className="text-xl mb-8 opacity-90">
              Share your knowledge and help thousands of students achieve their goals
            </p>
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-glow">
              Apply to Teach
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Trainer;
