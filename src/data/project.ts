import { UnifiedProject } from "@/Shared/ProjectCard/ProjectCard";
import { bg } from "@/assets/import";

export const projects: UnifiedProject[] = [
  {
    id: 1,
    name: "Aset",
    startDate: "04.2026",
    endDate: "Present",
    liveLink: "https://aset.elitedev.space/",
    githubLink: "https://github.com/AshutoshDM1/Aset",
    projectIcon: "https://aset.elitedev.space/favicon/favicon.ico",
    projectImage: "/project/aset.png",
    shortDescription:
      "Modern cloud-native file storage and management platform inspired by Google Drive with end-to-end type safety.",
    description: `Modern cloud-native file storage and management platform inspired by Google Drive with end-to-end type safety.

- Secure authentication with Clerk
- File & folder management with nested structure support
- Cloudflare R2 object storage integration
- Smart views for recent, starred, shared, and trash
- Monorepo architecture with shared tRPC API types
- CI/CD ready with Docker, Jenkins, and Vercel deployment`,
    skills: [
      "React 19",
      "TypeScript",
      "Vite",
      "Node.js",
      "Express",
      "tRPC",
      "Prisma",
      "PostgreSQL",
      "Cloudflare R2",
      "Tailwind CSS",
      "Shadcn UI",
      "Docker",
      "Jenkins",
      "pnpm",
    ],
    background: bg.image5,
    pinned: true,
    topLabel: "Aset",
    status: "Live",
  },
  {
    id: 10,
    name: "Morax",
    startDate: "2025",
    endDate: "Present",
    liveLink: "https://morax.elitedev.space/",
    githubLink: "https://github.com/AshutoshDM1/Morax",
    projectIcon: "https://morax.elitedev.space/favicon.ico",
    projectImage: "/project/morax.png",
    shortDescription: "The Fastest Way to Start a Monorepo PNPM Workspaces",
    description: `A highly polished, interactive CLI that bootstraps custom, modern, high-performance pnpm workspaces in seconds.

- Interactive command-line interface
- Modern loaders and animations
- Fast developer utilities
- Lightweight CLI architecture
- Cross-platform support`,
    skills: [
      "Node.js",
      "TypeScript",
      "Commander.js",
      "Ora",
      "Chalk",
      "CLI Development",
    ],
    background: bg.image2,
    pinned: false,
    topLabel: "Completed",
  },
  {
    id: 4,
    name: "Manga Heaven",
    startDate: "08.2024",
    endDate: "Present",
    liveLink: "https://mangaheaven.app",
    githubLink: "https://github.com/AshutoshDM1/MangaHaven",
    projectIcon: "https://mangaheaven.app/favicon.ico",
    projectImage: "/project/mangahaven.png",
    shortDescription:
      "Modern manga reading platform with immersive UI, scalable architecture, and a powerful admin management system.",
    description: `Modern manga reading platform with immersive UI, scalable architecture, and a powerful admin management system.

- Advanced manga search, filtering, and pagination
- Personalized reading progress and collections
- Full admin dashboard for manga/chapter management
- AWS EC2 + Docker deployment with CI/CD pipelines
- Zustand-powered modular frontend architecture
- Smooth responsive animations and optimized reading experience`,
    skills: [
      "Next.js 15",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Docker",
      "AWS EC2",
      "Nginx",
      "GitHub Actions",
      "Tailwind CSS",
      "Framer Motion",
      "Zustand",
    ],
    background: bg.image3,
    pinned: false,
    topLabel: "Manga Heaven",
  },
  {
    id: 3,
    name: "Mochi",
    startDate: "09.2025",
    endDate: "04.2026",
    liveLink: "https://mochi.elitedev.space/",
    githubLink: "https://github.com/AshutoshDM1/mochi",
    projectIcon: "https://mochi.elitedev.space/favicon/favicon.ico",
    projectImage: "/project/mochi.png",
    shortDescription:
      "Crypto portfolio and market intelligence platform focused on tracking, analytics, and AI-powered insights.",
    description: `Crypto portfolio and market intelligence platform focused on tracking, analytics, and AI-powered insights.

- Real-time crypto portfolio tracking
- Market analytics and asset monitoring
- AI-powered insights and summaries
- Modern responsive dashboard
- Built for performance and scalability`,
    skills: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
      "Prisma",
      "Docker",
      "AI",
    ],
    background: bg.image2,
    pinned: false,
    topLabel: "Completed",
  },
  {
    id: 2,
    name: "XContext",
    startDate: "11.2025",
    endDate: "Present",
    liveLink: "https://xcontext.elitedev.space/",
    githubLink: "https://github.com/AshutoshDM1/XContext",
    projectIcon: "https://xcontext.elitedev.space/favicon.ico",
    projectImage: "/project/xcontext.png",
    shortDescription:
      "AI-powered interview and codebase analysis platform designed for technical assessments and developer contests.",
    description: `AI-powered interview and codebase analysis platform designed for technical assessments and developer contests.

- AI-generated JavaScript and TypeScript interview questions
- Codebase upload and inspection system
- Contest and interview workflow support
- Google OAuth authentication with Better Auth
- Vercel AI Gateway integration for AI generation
- Full-stack architecture using Bun, Express, and Next.js`,
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn UI",
      "Bun",
      "Express",
      "PostgreSQL",
      "Drizzle ORM",
      "Better Auth",
      "Vercel AI SDK",
      "Neon DB",
    ],
    background: bg.image1,
    pinned: true,
    topLabel: "Coming Soon",
    status: "Building",
  },
  {
    id: 5,
    name: "Insight AI",
    startDate: "07.2024",
    endDate: "08.2024",
    liveLink: "https://insight-ai.elitedev.space/",
    githubLink: "https://github.com/AshutoshDM1/InsightAI",
    projectIcon: "https://insight-ai.elitedev.space/InsightAI_favicon.png",
    projectImage: "/project/insightai.png",
    shortDescription:
      "AI chatbot platform inspired by modern conversational AI systems with real-time interactions and modern UI design.",
    description: `AI chatbot platform inspired by modern conversational AI systems with real-time interactions and modern UI design.

- Real-time AI conversations
- Interactive chat interface
- Markdown rendering support
- Responsive UI experience
- Optimized AI response workflow`,
    skills: ["Next.js", "TypeScript", "Tailwind CSS", "OpenAI", "AI SDK"],
    background: bg.image4,
    pinned: false,
    topLabel: "Completed",
  },
  {
    id: 6,
    name: "CodeGen",
    startDate: "12.2024",
    endDate: "04.2025",
    liveLink: "https://codegen.elitedev.space/",
    githubLink: "https://github.com/AshutoshDM1/CodeGen",
    projectIcon: "https://codegen.elitedev.space/codegen.png",
    projectImage: "/project/codegen.png",
    shortDescription:
      "AI-assisted code generation platform built for developers to rapidly prototype and generate code using modern AI workflows.",
    description: `AI-assisted code generation platform built for developers to rapidly prototype and generate code using modern AI workflows.

- AI-powered code generation
- Fast developer workflow
- Interactive UI experience
- Backend API integration
- Optimized frontend architecture`,
    skills: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "AI",
      "Docker",
    ],
    background: bg.image6,
    pinned: false,
    topLabel: "Completed",
  },
  {
    id: 7,
    name: "Kiro",
    startDate: "2026",
    endDate: "Present",
    liveLink: "https://kiro.elitedev.space",
    githubLink: "https://github.com/AshutoshDM1/Kiro",
    projectIcon: "https://kiro.elitedev.space/favicon.ico",
    projectImage: "/project/kiro.png",
    shortDescription:
      "AI-powered terminal-first Solana assistant built for secure wallet management and blockchain interactions using natural language.",
    description: `AI-powered terminal-first Solana assistant built for secure wallet management and blockchain interactions using natural language.

- Gemini-powered AI agent with tool calling
- Secure encrypted local wallet keystore
- Real-time Solana portfolio tracking
- Rich interactive terminal UI experience
- Guardrailed transaction execution and simulation
- Monorepo architecture with CLI and Next.js dashboard`,
    skills: [
      "TypeScript",
      "Node.js",
      "Solana Web3.js",
      "Gemini AI",
      "Next.js",
      "pnpm Workspaces",
      "CLI Development",
      "Tailwind CSS",
      "TUI",
      "Web3",
    ],
    background: bg.image7,
    pinned: false,
    topLabel: "Kiro",
  },
  {
    id: 8,
    name: "Web3Wallet",
    startDate: "08.2024",
    endDate: "09.2025",
    liveLink: "https://web3-wallet-v1-0-0.vercel.app",
    githubLink: "https://github.com/AshutoshDM1/Web3Wallet",
    projectIcon:
      "https://web3-wallet-v1-0-0.vercel.app/Web3%20Wallet%20Favicon.png",
    projectImage: "/project/web3wallet.png",
    shortDescription:
      "Solana wallet application with blockchain interaction, wallet management, and key generation support.",
    description: `Solana wallet application with blockchain interaction, wallet management, and key generation support.

- Solana wallet integration
- Public/private key generation
- Wallet balance tracking
- Blockchain transaction interaction
- Lightweight responsive interface`,
    skills: ["React", "TypeScript", "Solana Web3.js", "Tailwind CSS", "Web3"],
    background: bg.image8,
    pinned: false,
    topLabel: "Completed",
  },
  {
    id: 9,
    name: "RPS",
    startDate: "08.2024",
    endDate: "09.2025",
    liveLink: "https://rps-web-sage.vercel.app",
    githubLink: "https://github.com/AshutoshDM1/RPS",
    projectIcon:
      "https://static.vecteezy.com/system/resources/previews/047/825/978/non_2x/3d-cube-icon-against-transparent-background-free-png.png",
    projectImage: "/project/rps.png",
    shortDescription:
      "Real-time multiplayer Rock Paper Scissors game using socket-based communication and room matchmaking.",
    description: `Real-time multiplayer Rock Paper Scissors game using socket-based communication and room matchmaking.

- Multiplayer room system
- Real-time gameplay synchronization
- Fast socket communication
- Interactive responsive UI
- Live game state updates`,
    skills: ["React", "Node.js", "Express", "Socket.io", "TypeScript"],
    background: bg.image1,
    pinned: false,
    topLabel: "Completed",
  },
];
