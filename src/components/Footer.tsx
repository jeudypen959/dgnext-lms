import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-accent">{t('footerAbout')}</h3>
            <p className="text-sm opacity-90">{t('footerAboutText')}</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-accent">{t('quickLinks')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-accent transition-colors">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-accent transition-colors">
                  {t('courses')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-accent transition-colors">
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-accent transition-colors">
                  {t('contact')}
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-accent transition-colors">
                  {t('dashboard')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Courses */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-accent">{t('popularCourses')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/courses/web-development" className="hover:text-accent transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link to="/courses/data-science" className="hover:text-accent transition-colors">
                  Data Science
                </Link>
              </li>
              <li>
                <Link to="/courses/digital-marketing" className="hover:text-accent transition-colors">
                  Digital Marketing
                </Link>
              </li>
              <li>
                <Link to="/courses/graphic-design" className="hover:text-accent transition-colors">
                  Graphic Design
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-accent">{t('contactUs')}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>Phnom Penh, Cambodia</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span>+855 12 345 678</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <span>info@dgnext.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2024 DGNext. {t('allRights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
