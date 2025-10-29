import { Target, Eye, Heart, Users, Award, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To democratize education and make quality learning accessible to everyone, everywhere.',
    },
    {
      icon: Eye,
      title: 'Our Vision',
      description: 'To become the world\'s leading platform for online education and skill development.',
    },
    {
      icon: Heart,
      title: 'Our Values',
      description: 'Excellence, innovation, integrity, and student success drive everything we do.',
    },
  ];

  const team = [
    {
      name: 'John Smith',
      role: 'CEO & Founder',
      image: '/placeholder.svg',
      bio: '15+ years in education technology',
    },
    {
      name: 'Sarah Johnson',
      role: 'Head of Curriculum',
      image: '/placeholder.svg',
      bio: 'Former university professor',
    },
    {
      name: 'Michael Brown',
      role: 'Chief Technology Officer',
      image: '/placeholder.svg',
      bio: 'Expert in EdTech platforms',
    },
    {
      name: 'Emily Davis',
      role: 'Head of Student Success',
      image: '/placeholder.svg',
      bio: 'Passionate about learner outcomes',
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('about')}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            DGNext is dedicated to empowering learners worldwide through accessible, 
            high-quality online education that transforms lives and careers.
          </p>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {values.map((value, index) => (
            <Card key={index} className="p-8 text-center hover-lift card-gradient border-border">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full accent-gradient text-primary mb-6">
                <value.icon className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </Card>
          ))}
        </div>

        {/* Story Section */}
        <div className="mb-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Founded in 2020, DGNext began with a simple but powerful idea: quality education 
                should be accessible to everyone, regardless of location or background. What started 
                as a small team of passionate educators has grown into a thriving community of over 
                50,000 learners worldwide.
              </p>
              <p>
                Our platform brings together expert instructors, cutting-edge curriculum, and 
                innovative learning technology to create an unparalleled educational experience. 
                We've helped thousands of students advance their careers, switch industries, and 
                achieve their personal and professional goals.
              </p>
              <p>
                Today, we continue to expand our course offerings, improve our platform, and most 
                importantly, support our students in their learning journeys. Our commitment to 
                excellence and student success remains unwavering.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="overflow-hidden hover-lift card-gradient border-border">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-secondary font-semibold mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="hero-gradient text-primary-foreground rounded-lg p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <Users className="h-12 w-12 mx-auto mb-4 text-accent" />
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="text-sm opacity-90">Students</div>
            </div>
            <div>
              <Award className="h-12 w-12 mx-auto mb-4 text-accent" />
              <div className="text-4xl font-bold mb-2">200+</div>
              <div className="text-sm opacity-90">Instructors</div>
            </div>
            <div>
              <Zap className="h-12 w-12 mx-auto mb-4 text-accent" />
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-sm opacity-90">Courses</div>
            </div>
            <div>
              <Target className="h-12 w-12 mx-auto mb-4 text-accent" />
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-sm opacity-90">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
