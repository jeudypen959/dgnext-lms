import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'kh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    home: 'Home',
    courses: 'Courses',
    about: 'About',
    contact: 'Contact',
    dashboard: 'Dashboard',
    
    // Hero
    heroTitle: 'Transform Your Future',
    heroSubtitle: 'Learn New Skills, Advance Your Career',
    heroDescription: 'Join thousands of students mastering in-demand skills with DGNext\'s world-class online courses.',
    getStarted: 'Get Started',
    exploreCourses: 'Explore Courses',
    
    // Features
    featuresTitle: 'Why Choose DGNext?',
    feature1Title: 'Expert Instructors',
    feature1Desc: 'Learn from industry professionals',
    feature2Title: 'Flexible Learning',
    feature2Desc: 'Study at your own pace',
    feature3Title: 'Certificates',
    feature3Desc: 'Earn recognized certifications',
    feature4Title: '24/7 Support',
    feature4Desc: 'Get help whenever you need',
    
    // Courses
    popularCourses: 'Popular Courses',
    viewAll: 'View All Courses',
    enrollNow: 'Enroll Now',
    students: 'Students',
    lessons: 'Lessons',
    hours: 'Hours',
    
    // Stats
    activeStudents: 'Active Students',
    expertInstructors: 'Expert Instructors',
    coursesAvailable: 'Courses Available',
    successRate: 'Success Rate',
    
    // Footer
    footerAbout: 'About DGNext',
    footerAboutText: 'Empowering learners worldwide with quality education and professional development opportunities.',
    quickLinks: 'Quick Links',
    contactUs: 'Contact Us',
    allRights: 'All rights reserved.',
  },
  kh: {
    // Navigation
    home: 'ទំព័រដើម',
    courses: 'វគ្គសិក្សា',
    about: 'អំពីយើង',
    contact: 'ទំនាក់ទំនង',
    dashboard: 'ផ្ទាំងគ្រប់គ្រង',
    
    // Hero
    heroTitle: 'ផ្លាស់ប្តូរអនាគតរបស់អ្នក',
    heroSubtitle: 'រៀនជំនាញថ្មី ជឿនលឿនអាជីព',
    heroDescription: 'ចូលរួមជាមួយនិស្សិតរាប់ពាន់នាក់ក្នុងការទទួលបានជំនាញតាមតម្រូវការជាមួយវគ្គសិក្សាអនឡាញកម្រិតពិភពលោករបស់ DGNext។',
    getStarted: 'ចាប់ផ្តើម',
    exploreCourses: 'ស្វែងរកវគ្គសិក្សា',
    
    // Features
    featuresTitle: 'ហេតុអ្វីត្រូវជ្រើសរើស DGNext?',
    feature1Title: 'គ្រូបង្រៀនជំនាញ',
    feature1Desc: 'រៀនពីអ្នកជំនាញឧស្សាហកម្ម',
    feature2Title: 'ការរៀនបត់បែន',
    feature2Desc: 'សិក្សាតាមល្បឿនផ្ទាល់ខ្លួន',
    feature3Title: 'វិញ្ញាបនបត្រ',
    feature3Desc: 'ទទួលបានវិញ្ញាបនបត្រដែលទទួលស្គាល់',
    feature4Title: 'ជំនួយ ២៤/៧',
    feature4Desc: 'ទទួលបានជំនួយពេលណាក៏បាន',
    
    // Courses
    popularCourses: 'វគ្គសិក្សាពេញនិយម',
    viewAll: 'មើលវគ្គសិក្សាទាំងអស់',
    enrollNow: 'ចុះឈ្មោះឥឡូវ',
    students: 'និស្សិត',
    lessons: 'មេរៀន',
    hours: 'ម៉ោង',
    
    // Stats
    activeStudents: 'និស្សិតសកម្ម',
    expertInstructors: 'គ្រូបង្រៀនជំនាញ',
    coursesAvailable: 'វគ្គសិក្សាដែលមាន',
    successRate: 'អត្រាជោគជ័យ',
    
    // Footer
    footerAbout: 'អំពី DGNext',
    footerAboutText: 'ផ្តល់សិទ្ធិអំណាចដល់អ្នករៀននៅទូទាំងពិភពលោកជាមួយការអប់រំគុណភាព និងឱកាសអភិវឌ្ឍន៍វិជ្ជាជីវៈ។',
    quickLinks: 'តំណរហ័ស',
    contactUs: 'ទាក់ទងយើង',
    allRights: 'រក្សាសិទ្ធិគ្រប់យ៉ាង។',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
