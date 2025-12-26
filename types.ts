
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  speaker: string;
  image: string;
  category: 'Workshop' | 'Seminar' | 'Networking' | 'Competition';
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  submittedDate: string;
}

export interface Member {
  id: string;
  name: string;
  department: string;
  year: string;
  email: string;
  phone: string;
  motivation: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  appliedDate: string;
}

export interface Program {
  title: string;
  purpose: string;
  skills: string[];
  audience: string;
  icon: string;
}

export type AdminTab = 'Dashboard' | 'Events' | 'Blog' | 'Members';
