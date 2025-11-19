export const sampleUser = {
  id: 'demo-user',
  name: 'Avery Park',
  username: 'avery.codes',
  avatar_url: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&q=80',
  banner_url: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80',
  bio: 'Building delightful developer experiences. Full-stack + design.',
  skills: ['React', 'TypeScript', 'UI/UX', 'Node'],
  is_premium: true,
  followers: 1200,
  following: 324,
  badges: ['Gold Creator', 'Trusted Reviewer'],
};

export const mockProjects = [
  {
    id: 'p1',
    title: 'Aurora Design System',
    description: 'Composable React components with motion-first interactions.',
    tags: ['UI', 'Design System', 'Animation'],
    tech_stack: ['React', 'TypeScript', 'Framer Motion', 'Tailwind'],
    screenshots: ['https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80'],
    demo_url: 'https://aurora.design',
    likes: 124,
    author: sampleUser,
    category: 'Web',
    is_featured: true,
    rating: 4.8,
  },
  {
    id: 'p2',
    title: 'Orbit Analytics',
    description: 'Realtime Supabase analytics dashboard for product teams.',
    tags: ['Analytics', 'Dashboard'],
    tech_stack: ['React', 'Supabase', 'Tailwind'],
    screenshots: ['https://images.unsplash.com/photo-1506765515384-028b60a970df?auto=format&fit=crop&w=1200&q=80'],
    demo_url: 'https://orbit.app',
    likes: 89,
    author: sampleUser,
    category: 'AI',
    is_featured: false,
    rating: 4.4,
  },
  {
    id: 'p3',
    title: 'Pulse Mobile',
    description: 'Cross-platform wellness app with gamified streaks.',
    tags: ['Mobile', 'Health'],
    tech_stack: ['React Native', 'Expo', 'Supabase'],
    screenshots: ['https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'],
    demo_url: 'https://pulse.app',
    likes: 203,
    author: sampleUser,
    category: 'Mobile',
    is_featured: true,
    rating: 4.9,
  },
];

export const mockNotifications = [
  { id: 'n1', type: 'follow', message: 'Mia followed you', created_at: '2m', is_read: false },
  { id: 'n2', type: 'comment', message: 'Leo commented on Aurora', created_at: '1h', is_read: false },
  { id: 'n3', type: 'badge', message: 'You unlocked Gold Creator', created_at: '1d', is_read: true },
];

export const mockComments = [
  { id: 'c1', author: sampleUser, content: 'Love the motion tokens!', created_at: '3m', is_premium: true },
  { id: 'c2', author: sampleUser, content: 'The data sync story is impressive.', created_at: '1h', is_premium: false },
];

export const mockPosts = [
  {
    id: 'post-1',
    title: 'Designing micro-interactions with Framer Motion',
    content_markdown: 'Use **layoutId** + spring transitions to connect states seamlessly.',
    tags: ['Framer Motion', 'UI'],
    author: sampleUser,
    created_at: '2025-02-02',
  },
];
