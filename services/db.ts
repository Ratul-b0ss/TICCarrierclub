
import { Event, BlogPost, Member } from '../types';
import { INITIAL_EVENTS } from '../constants';

const DB_KEYS = {
  EVENTS: 'apex_events',
  BLOGS: 'apex_blogs',
  MEMBERS: 'apex_members',
  ADMIN: 'apex_admin_token'
};

const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 'b1',
    title: "How to Ace Your Internship at Grameenphone",
    excerpt: "Discover the specific strategies that top candidates use to land roles in Bangladesh's leading telecom company.",
    content: "Full content here...",
    author: "Tanvir Ahmed",
    date: "Aug 12, 2024",
    category: "Interview Tips",
    image: "https://picsum.photos/seed/art1/600/400",
    status: 'Approved',
    submittedDate: new Date().toISOString()
  },
  {
    id: 'b2',
    title: "Top 5 Soft Skills Employers Look for in Dhaka",
    excerpt: "The corporate landscape is shifting. Here are the skills you need to stay competitive in the local market.",
    content: "Full content here...",
    author: "Saima Karim",
    date: "Sep 05, 2024",
    category: "Professionalism",
    image: "https://picsum.photos/seed/art2/600/400",
    status: 'Approved',
    submittedDate: new Date().toISOString()
  }
];

export const dbService = {
  // Events
  getEvents: (): Event[] => {
    const data = localStorage.getItem(DB_KEYS.EVENTS);
    if (!data) {
      localStorage.setItem(DB_KEYS.EVENTS, JSON.stringify(INITIAL_EVENTS));
      return INITIAL_EVENTS as Event[];
    }
    return JSON.parse(data);
  },
  saveEvent: (event: Event) => {
    const events = dbService.getEvents();
    const index = events.findIndex(e => e.id === event.id);
    if (index > -1) events[index] = event;
    else events.push(event);
    localStorage.setItem(DB_KEYS.EVENTS, JSON.stringify(events));
  },
  deleteEvent: (id: string) => {
    const events = dbService.getEvents().filter(e => e.id !== id);
    localStorage.setItem(DB_KEYS.EVENTS, JSON.stringify(events));
  },

  // Blog
  getBlogs: (includePending: boolean = false): BlogPost[] => {
    const data = localStorage.getItem(DB_KEYS.BLOGS);
    if (!data) {
      localStorage.setItem(DB_KEYS.BLOGS, JSON.stringify(INITIAL_BLOGS));
      return includePending ? INITIAL_BLOGS : INITIAL_BLOGS.filter(b => b.status === 'Approved');
    }
    const allBlogs: BlogPost[] = JSON.parse(data);
    return includePending ? allBlogs : allBlogs.filter(b => b.status === 'Approved');
  },
  saveBlog: (post: BlogPost) => {
    const posts = dbService.getBlogs(true);
    const index = posts.findIndex(p => p.id === post.id);
    if (index > -1) posts[index] = post;
    else posts.push(post);
    localStorage.setItem(DB_KEYS.BLOGS, JSON.stringify(posts));
  },
  updateBlogStatus: (id: string, status: BlogPost['status']) => {
    const posts = dbService.getBlogs(true);
    const index = posts.findIndex(p => p.id === id);
    if (index > -1) {
      posts[index].status = status;
      // Set the published date to now if it's being approved for the first time
      if (status === 'Approved' && !posts[index].date) {
        posts[index].date = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
      }
      localStorage.setItem(DB_KEYS.BLOGS, JSON.stringify(posts));
    }
  },
  deleteBlog: (id: string) => {
    const posts = dbService.getBlogs(true).filter(p => p.id !== id);
    localStorage.setItem(DB_KEYS.BLOGS, JSON.stringify(posts));
  },

  // Members
  getMembers: (): Member[] => {
    const data = localStorage.getItem(DB_KEYS.MEMBERS);
    return data ? JSON.parse(data) : [];
  },
  addMember: (member: Member) => {
    const members = dbService.getMembers();
    members.push(member);
    localStorage.setItem(DB_KEYS.MEMBERS, JSON.stringify(members));
  },
  updateMemberStatus: (id: string, status: Member['status']) => {
    const members = dbService.getMembers();
    const index = members.findIndex(m => m.id === id);
    if (index > -1) members[index].status = status;
    localStorage.setItem(DB_KEYS.MEMBERS, JSON.stringify(members));
  }
};
