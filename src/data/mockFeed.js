import {
  Brain,
  Trophy,
  Briefcase,
} from "lucide-react";

export const mockFeed = [
  {
    id: 1,
    category: "AI UPDATE",
    categoryColor: "text-teal-400",
    title: "GPT-6 released with major reasoning improvements.",
    summary:
      "OpenAI introduces stronger reasoning, coding and multimodal capabilities.",
    subtitle: "2 min read",
    source: "OpenAI",
    trending: true,
    icon: Brain,
  },

  {
    id: 2,
    category: "HACKATHON",
    categoryColor: "text-amber-400",
    title: "Smart India Hackathon 2026 registrations open.",
    summary:
      "Government announces registrations for India's biggest innovation challenge.",
    subtitle: "Ends in 14 Days",
    source: "SIH",
    trending: false,
    icon: Trophy,
  },

  {
    id: 3,
    category: "INTERNSHIP",
    categoryColor: "text-blue-400",
    title: "Google Software Engineering Internship",
    summary:
      "Applications are now open for software engineering interns worldwide.",
    subtitle: "₹80,000 / month",
    source: "Google",
    trending: true,
    icon: Briefcase,
  },
];