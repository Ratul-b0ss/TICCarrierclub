
import React from 'react';

export const COLORS = {
  NAVY: '#020617',
  SURFACE: '#0F172A',
  ACCENT: '#38BDF8',
  TEXT: '#F8FAFC',
};

export interface ProgramDetail {
  overview: string;
  target: string;
  benefits: string[];
  application: string;
}

export interface Program {
  title: string;
  purpose: string;
  skills: string[];
  audience: string;
  icon: string;
  category: 'Career Development' | 'Skill Building' | 'Industry Exposure' | 'Leadership & Growth';
  duration: string;
  format: string;
  details: ProgramDetail;
}

export const INITIAL_EVENTS = [
  {
    id: '1',
    title: 'Future Leaders Summit 2024',
    description: 'A gathering of industry titans to inspire the next generation of corporate leaders in Bangladesh.',
    date: '2024-10-15',
    time: '10:00 AM',
    location: 'Main Auditorium',
    speaker: 'Mr. Zahirul Haque, CEO of Grameen Tech',
    image: 'https://images.unsplash.com/photo-1540575861501-7ad0582371f3?q=80&w=2070&auto=format&fit=crop',
    category: 'Workshop'
  },
  {
    id: '2',
    title: 'Resume & LinkedIn Mastery',
    description: 'Deep dive into building an irresistible professional presence for the global market.',
    date: '2024-11-02',
    time: '02:00 PM',
    location: 'Digital Resource Center',
    speaker: 'Nabila Karim, HR Director',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop',
    category: 'Workshop'
  }
];

export const PROGRAMS: Program[] = [
  {
    title: 'Career Workshops',
    purpose: 'Bridges the gap between academic theory and industry reality.',
    skills: ['Problem Solving', 'Teamwork', 'Communication'],
    audience: 'All Students',
    icon: '🎯',
    category: 'Career Development',
    duration: 'Ongoing',
    format: 'In-person',
    details: {
      overview: 'Interactive sessions led by industry veterans focusing on high-demand professional competencies.',
      target: 'Students looking to refine their soft skills and workplace etiquette.',
      benefits: ['Direct industry feedback', 'Practical case studies', 'Networking opportunities'],
      application: 'Register via the TIC Member Portal for upcoming sessions.'
    }
  },
  {
    title: 'Corporate Insight Tours',
    purpose: 'On-site visits to Bangladesh\'s top-tier MNCs and conglomerates.',
    skills: ['Observational Research', 'Networking', 'Industry IQ'],
    audience: 'Junior & Senior Students',
    icon: '🏢',
    category: 'Industry Exposure',
    duration: '1 Day',
    format: 'Field Visit',
    details: {
      overview: 'Get behind the scenes of major operations at companies like Unilever, Grameenphone, and BAT.',
      target: 'Students wanting to understand corporate culture and operational workflows.',
      benefits: ['Real-world observation', 'Q&A with department heads', 'Facility tours'],
      application: 'Limited spots available; selection based on academic performance and club participation.'
    }
  },
  {
    title: 'Mock Interview Panels',
    purpose: 'Simulated interview experiences with real-world HR professionals.',
    skills: ['Confidence Building', 'Articulation', 'Salary Negotiation'],
    audience: 'Final Year Students',
    icon: '🤝',
    category: 'Career Development',
    duration: '2 Weeks',
    format: 'Hybrid',
    details: {
      overview: 'Rigorous mock interview cycles followed by detailed performance analytics from guest HR managers.',
      target: 'Graduating seniors preparing for immediate recruitment cycles.',
      benefits: ['Personalized feedback report', 'Recorded session for self-review', 'CV audit'],
      application: 'Open for final year students during the spring and fall semesters.'
    }
  },
  {
    title: 'Leadership Bootcamps',
    purpose: 'Intensive residential programs focused on strategic thinking.',
    skills: ['Strategy', 'Leadership', 'EQ'],
    audience: 'Club Members Only',
    icon: '⚡',
    category: 'Leadership & Growth',
    duration: '3 Days',
    format: 'Residential',
    details: {
      overview: 'A high-intensity leadership retreat designed to test decision-making under pressure.',
      target: 'Selected club members demonstrating high leadership potential.',
      benefits: ['Intensive mentorship', 'Peer-to-peer learning', 'Strategic simulation games'],
      application: 'Nomination by the Executive Board required.'
    }
  },
  {
    title: 'Technical Masterclasses',
    purpose: 'Domain-specific skill building in finance, tech, and marketing.',
    skills: ['Python', 'Financial Modeling', 'SEO'],
    audience: 'All Students',
    icon: '💻',
    category: 'Skill Building',
    duration: '6 Weeks',
    format: 'Virtual/In-person',
    details: {
      overview: 'Deep-dive technical certifications recognized by our industrial partners.',
      target: 'Students aiming to specialize in a specific industrial vertical.',
      benefits: ['Verified certification', 'Hands-on projects', 'Portfolio building'],
      application: 'Enrollment opens every quarter.'
    }
  },
  {
    title: 'Management Trainee Prep',
    purpose: 'Specialized track for elite MNC management trainee programs.',
    skills: ['Analytical Ability', 'GD Mastery', 'Case Cracking'],
    audience: 'High Performers',
    icon: '💼',
    category: 'Industry Exposure',
    duration: '3 Months',
    format: 'Hybrid',
    details: {
      overview: 'A premium preparation track specifically designed for candidates targeting competitive MT roles.',
      target: 'Top 5% performers in the institute.',
      benefits: ['Exclusive MT alumni mentorship', 'Previous year case studies', 'Direct referral opportunities'],
      application: 'Selection through the MT Entrance Exam conducted by TIC.'
    }
  }
];
