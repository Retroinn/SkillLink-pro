export const mockUser = {
  id: 'user-1',
  name: 'Alex Dev',
  bio: 'Building delightful experiences with React, Tailwind and Firebase. Sharing insights about design systems and full-stack tooling.',
  avatar: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=200&q=80',
  banner: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1400&q=80',
  skills: ['React', 'TypeScript', 'Tailwind', 'Firebase', 'Design Systems', 'Next.js'],
  badges: [
    { id: 'first-project', label: 'First Project', tone: 'emerald' },
    { id: 'ten-followers', label: '10 Followers', tone: 'amber' },
    { id: 'premium', label: 'Gold Creator', tone: 'yellow' },
  ],
  stats: {
    followers: 120,
    following: 86,
    likes: 240,
    saves: 52,
  },
  premium: true,
};

export const mockProjects = [
  {
    id: 'p1',
    title: 'Realtime Team Dashboard',
    description: 'A realtime dashboard for distributed product teams with granular analytics, role-based permissions, and collaborative notes.',
    tags: ['dashboard', 'collaboration', 'firebase'],
    tech: ['React', 'Tailwind', 'Firebase', 'Framer Motion'],
    category: 'Web',
    likes: 142,
    saves: 33,
    rating: 4.7,
    boost: true,
    demoUrl: 'https://example.com/demo',
    cover:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    author: mockUser,
    screenshots: [
      'https://images.unsplash.com/photo-1504805572947-34fad45aed93?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?auto=format&fit=crop&w=1200&q=80',
    ],
    codeBlocks: [
      '```tsx\nconst unsub = onSnapshot(query(projectsRef, orderBy("createdAt", "desc")), (snap) => setProjects(snap.docs.map(mapProject)));\n```',
      '```js\nconst upload = await uploadBytes(ref(storage, `screenshots/${file.name}`), file);\nconst url = await getDownloadURL(upload.ref);\n```',
    ],
    related: ['p2', 'p3'],
  },
  {
    id: 'p2',
    title: 'AI Pair Programming',
    description: 'Copilot-style AI pair programming extension with inline suggestions, chat, and repo-aware context.',
    tags: ['ai', 'developer-tools'],
    tech: ['TypeScript', 'Vite', 'OpenAI', 'Firebase'],
    category: 'AI',
    likes: 95,
    saves: 25,
    rating: 4.5,
    boost: false,
    demoUrl: 'https://example.com/ai',
    cover:
      'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80',
    author: mockUser,
    screenshots: [],
    codeBlocks: [],
    related: ['p1'],
  },
  {
    id: 'p3',
    title: 'Design System Starter',
    description: 'A Figma + React starter with tokens, components, and analytics hooks for product teams.',
    tags: ['design', 'system'],
    tech: ['React', 'Tailwind', 'Storybook'],
    category: 'Web',
    likes: 76,
    saves: 12,
    rating: 4.2,
    boost: false,
    demoUrl: 'https://example.com/design',
    cover:
      'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1200&q=80',
    author: mockUser,
    screenshots: [],
    codeBlocks: [],
    related: ['p1'],
  },
];

export const mockNotifications = [
  { id: 'n1', type: 'like', message: 'Sam liked your project Realtime Dashboard', time: '2m' },
  { id: 'n2', type: 'follow', message: 'Jamie started following you', time: '10m' },
  { id: 'n3', type: 'comment', message: 'Taylor commented on AI Pair Programming', time: '1h' },
];

export const mockPosts = [
  {
    id: 'b1',
    title: 'Building a realtime creator stack with Firebase + Vite',
    excerpt: 'How SkillLink Pro wires up auth, storage uploads, and optimistic UI for creators.',
    author: mockUser,
    tags: ['Firebase', 'Vite', 'Frontend'],
    content:
      '# Realtime creation\n\nWe use Firestore listeners for feeds and Storage resumable uploads for screenshots.\n\n```js\nconst unsub = onSnapshot(collection(db, "projects"), (snap) => setProjects(snap.docs.map(mapProject)))\n```',
  },
];
