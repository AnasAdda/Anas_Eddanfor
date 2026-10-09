import { topLevelCount } from './lib/useCertificates.js';

export const profile = {
  name: 'Anas M. Eddanfor',
  location: 'Misurata, Libya',
  email: 'anas.addanfor@gmail.com',
  linkedin: 'https://www.linkedin.com/in/anas-eddanfor-bb068420b/',
  github: 'https://github.com/AnasAdda',
  cv: 'assets/Anas_Eddanfor_CV.pdf',
  photo: 'assets/profile.png',
  heroBg: 'assets/hero-bg.jpg',
  roles: ['Control & Automation', 'Data Center', 'Marketing & Design'],
  intro:
    'I build reliable systems, from industrial robots and control loops to virtualized data centers, and I design the visuals that explain them.',
};

export const stats = [
  { label: 'Experience', value: '5+', unit: 'yrs' },
  { label: 'GPA', value: '3.58', unit: '/4' },
  { label: 'Certificates', value: String(topLevelCount) },
  { label: 'Languages', value: 'AR · EN' },
];

export const education = {
  degree: 'Electrical & Electronic Engineering, Control & Automation',
  level: 'B.Sc.',
  school: 'Misurata University',
  period: 'Fall 2024–2025',
  gpa: '3.58 / 4',
  project:
    'Enhancing the Performance of Industrial Robots Powered by Servo Motors Using the CANopen Protocol.',
};

export const experience = [
  {
    role: 'Marketing Team Member', org: 'Libyan Academy for Telecom and Informatics (LATI)', period: '2025 — Present',
    points: [
      "Promote the academy's ICT training programs and communicate with prospective trainees.",
      'Create visual and digital marketing content for campaigns and social media.',
      "Contributed to the academy's online registration platform and media archiving system.",
    ],
  },
  {
    role: 'Technical Support Officer', org: 'Dalil Shafi Company', period: '2020 — 2025',
    points: [
      'Diagnosed and resolved hardware, software and network issues for users.',
      'Worked with colleagues to understand technical problems and get them fixed.',
    ],
  },
];

export const projects = [
  {
    name: 'Online registration platform', org: 'LATI', url: 'https://register.lati.ly/',
    text: 'Lets individuals register for the academy\'s training programs online, making it easier to collect applicant information and follow up with registrants.',
  },
  {
    name: 'Media archiving system', org: 'LATI',
    text: "Stores and organizes the academy's photos in one place, so media is easier to find and share and teams communicate better.",
  },
];

export const skills = [
  { title: 'Engineering', icon: 'chip', items: ['Industrial Control Systems', 'Embedded Systems', 'PCB Design', 'AutoCAD Electrical'] },
  { title: 'Infrastructure', icon: 'server', items: ['Data Center Virtualization', 'Linux Administration', 'Network Configuration', 'SQL Databases'] },
  { title: 'Data & AI', icon: 'brain', items: ['AI / ML / DL Models', 'Python', 'Data Analysis'] },
  { title: 'Creative', icon: 'pen', items: ['Photoshop', 'Illustrator', 'Premiere Pro', 'After Effects'] },
];

export const softSkills = ['Analytical problem solving', 'Teamwork', 'Adaptability'];

export const languages = [
  { name: 'Arabic', level: 'Native', pct: 100 },
  { name: 'English', level: 'B2 · CEFR', pct: 70 },
];

export const interests = ['Artificial Intelligence', 'Robotics', 'Football', 'Swimming'];
