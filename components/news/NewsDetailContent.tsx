"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowLeft, Share2, Clock, Newspaper } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { de, enUS } from "date-fns/locale";

// Animated SVG Illustrations based on article topic
function WebsiteIllustration() {
  return (
    <div className="relative w-full h-64 md:h-80 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl overflow-hidden mb-8">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" fill="none">
        {/* Browser Window */}
        <motion.g
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <rect x="50" y="40" width="300" height="200" rx="12" fill="white" stroke="#e2e8f0" strokeWidth="2"/>
          {/* Browser Header */}
          <rect x="50" y="40" width="300" height="30" rx="12" fill="#f1f5f9"/>
          <rect x="50" y="58" width="300" height="12" fill="#f1f5f9"/>
          {/* Browser Buttons */}
          <circle cx="70" cy="55" r="5" fill="#ef4444"/>
          <circle cx="88" cy="55" r="5" fill="#eab308"/>
          <circle cx="106" cy="55" r="5" fill="#22c55e"/>
          {/* URL Bar */}
          <rect x="130" y="48" width="180" height="14" rx="7" fill="white"/>
          <text x="145" y="59" fontSize="8" fill="#64748b">praxis-amara.de</text>
        </motion.g>
        
        {/* Content Area */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Header */}
          <rect x="70" y="85" width="120" height="12" rx="2" fill="#0d9488"/>
          <rect x="70" y="103" width="200" height="8" rx="2" fill="#cbd5e1"/>
          <rect x="70" y="115" width="160" height="8" rx="2" fill="#cbd5e1"/>
        </motion.g>
        
        {/* Calendar Icon */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6, type: "spring" }}
        >
          <rect x="280" y="90" width="50" height="50" rx="8" fill="#0d9488" fillOpacity="0.1"/>
          <rect x="290" y="100" width="30" height="30" rx="4" fill="#0d9488"/>
          <rect x="290" y="100" width="30" height="8" rx="2" fill="#0f766e"/>
          <rect x="295" y="95" width="4" height="8" rx="1" fill="#0d9488"/>
          <rect x="311" y="95" width="4" height="8" rx="1" fill="#0d9488"/>
          {/* Calendar Grid */}
          <circle cx="298" cy="118" r="2" fill="white"/>
          <circle cx="305" cy="118" r="2" fill="white"/>
          <circle cx="312" cy="118" r="2" fill="white"/>
          <circle cx="298" cy="125" r="2" fill="white"/>
          <motion.circle 
            cx="305" cy="125" r="2" 
            fill="#22c55e"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <circle cx="312" cy="125" r="2" fill="white"/>
        </motion.g>
        
        {/* Cards */}
        <motion.g
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <rect x="70" y="135" width="80" height="70" rx="6" fill="white" stroke="#e2e8f0" strokeWidth="1"/>
          <rect x="78" y="143" width="64" height="30" rx="4" fill="#f1f5f9"/>
          <rect x="78" y="180" width="50" height="6" rx="2" fill="#cbd5e1"/>
          <rect x="78" y="190" width="40" height="6" rx="2" fill="#e2e8f0"/>
        </motion.g>
        
        <motion.g
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          <rect x="160" y="135" width="80" height="70" rx="6" fill="white" stroke="#e2e8f0" strokeWidth="1"/>
          <rect x="168" y="143" width="64" height="30" rx="4" fill="#f1f5f9"/>
          <rect x="168" y="180" width="50" height="6" rx="2" fill="#cbd5e1"/>
          <rect x="168" y="190" width="40" height="6" rx="2" fill="#e2e8f0"/>
        </motion.g>
        
        <motion.g
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
        >
          <rect x="250" y="135" width="80" height="70" rx="6" fill="white" stroke="#e2e8f0" strokeWidth="1"/>
          <rect x="258" y="143" width="64" height="30" rx="4" fill="#f1f5f9"/>
          <rect x="258" y="180" width="50" height="6" rx="2" fill="#cbd5e1"/>
          <rect x="258" y="190" width="40" height="6" rx="2" fill="#e2e8f0"/>
        </motion.g>
        
        {/* Floating Elements */}
        <motion.circle
          cx="40" cy="80"
          r="8"
          fill="#0d9488"
          fillOpacity="0.2"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx="370" cy="200"
          r="12"
          fill="#6366f1"
          fillOpacity="0.15"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.rect
          x="355" y="60"
          width="20"
          height="20"
          rx="4"
          fill="#f59e0b"
          fillOpacity="0.2"
          animate={{ rotate: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
      
      {/* Checkmark Animation */}
      <motion.div
        className="absolute bottom-6 right-6 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
      >
        <motion.svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.7, duration: 0.5 }}
        >
          <motion.path
            d="M5 13l4 4L19 7"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.7, duration: 0.5 }}
          />
        </motion.svg>
      </motion.div>
    </div>
  );
}

function UltrasoundIllustration() {
  return (
    <div className="relative w-full h-64 md:h-80 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl overflow-hidden mb-8">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" fill="none">
        {/* Ultrasound Monitor */}
        <motion.g
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <rect x="100" y="30" width="200" height="150" rx="12" fill="#1e293b"/>
          <rect x="108" y="38" width="184" height="120" rx="8" fill="#0f172a"/>
          
          {/* Screen Glow */}
          <rect x="108" y="38" width="184" height="120" rx="8" fill="url(#screenGlow)" fillOpacity="0.3"/>
          
          {/* Stand */}
          <rect x="175" y="180" width="50" height="15" rx="2" fill="#334155"/>
          <rect x="165" y="195" width="70" height="8" rx="2" fill="#475569"/>
        </motion.g>
        
        {/* Ultrasound Wave Animation */}
        <motion.g>
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.ellipse
              key={i}
              cx="200"
              cy="98"
              rx={20 + i * 20}
              ry={10 + i * 10}
              stroke="#0d9488"
              strokeWidth="2"
              fill="none"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 0.8, 0],
                scale: [0.5, 1, 1.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeOut"
              }}
            />
          ))}
        </motion.g>
        
        {/* Heart Rate Line */}
        <motion.path
          d="M120 98 L145 98 L155 78 L165 118 L175 88 L185 108 L195 98 L280 98"
          stroke="#22c55e"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        {/* Heart Icon */}
        <motion.g
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          <motion.path
            d="M200 130 C200 120, 185 115, 185 125 C185 135, 200 145, 200 145 C200 145, 215 135, 215 125 C215 115, 200 120, 200 130"
            fill="#ef4444"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        </motion.g>
        
        {/* Data Display */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <text x="120" y="55" fontSize="10" fill="#22c55e" fontFamily="monospace">HR: 72 bpm</text>
          <text x="230" y="55" fontSize="10" fill="#22c55e" fontFamily="monospace">MODE: 2D</text>
        </motion.g>
        
        {/* Probe */}
        <motion.g
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <ellipse cx="340" cy="140" rx="20" ry="35" fill="#64748b"/>
          <ellipse cx="340" cy="120" rx="15" ry="25" fill="#94a3b8"/>
          <rect x="330" y="165" width="20" height="60" rx="4" fill="#475569"/>
          <rect x="333" y="170" width="14" height="50" rx="3" fill="#1e293b"/>
          {/* Cable */}
          <motion.path
            d="M340 225 C340 250, 300 250, 300 260 C300 270, 290 280, 280 280"
            stroke="#1e293b"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
        </motion.g>
        
        {/* Floating Medical Crosses */}
        <motion.g
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect x="50" y="60" width="16" height="4" rx="1" fill="#0d9488" fillOpacity="0.3"/>
          <rect x="56" y="54" width="4" height="16" rx="1" fill="#0d9488" fillOpacity="0.3"/>
        </motion.g>
        
        <motion.g
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect x="70" y="220" width="12" height="3" rx="1" fill="#0d9488" fillOpacity="0.2"/>
          <rect x="74.5" y="215.5" width="3" height="12" rx="1" fill="#0d9488" fillOpacity="0.2"/>
        </motion.g>
        
        {/* Gradient Definition */}
        <defs>
          <radialGradient id="screenGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0d9488"/>
            <stop offset="100%" stopColor="#0d9488" stopOpacity="0"/>
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}

function TeamIllustration() {
  return (
    <div className="relative w-full h-64 md:h-80 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl overflow-hidden mb-8">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" fill="none">
        {/* Background Decorations */}
        <motion.circle
          cx="320" cy="60"
          r="30"
          fill="#f59e0b"
          fillOpacity="0.1"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.circle
          cx="80" cy="240"
          r="40"
          fill="#0d9488"
          fillOpacity="0.1"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        
        {/* Team Member 1 - Left */}
        <motion.g
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <circle cx="110" cy="130" r="35" fill="#e2e8f0"/>
          <circle cx="110" cy="120" r="22" fill="#fbbf24"/>
          <circle cx="110" cy="115" r="18" fill="#fef3c7"/>
          {/* Face */}
          <circle cx="103" cy="112" r="3" fill="#1e293b"/>
          <circle cx="117" cy="112" r="3" fill="#1e293b"/>
          <path d="M105 122 Q110 127 115 122" stroke="#1e293b" strokeWidth="2" fill="none" strokeLinecap="round"/>
          {/* Body */}
          <path d="M75 200 Q75 160 110 155 Q145 160 145 200" fill="#0d9488"/>
          {/* Stethoscope hint */}
          <ellipse cx="110" cy="175" rx="8" ry="6" fill="#1e293b" fillOpacity="0.3"/>
        </motion.g>
        
        {/* Team Member 2 - Center (New Member - Highlighted) */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5, type: "spring" }}
        >
          {/* Glow Effect */}
          <motion.circle
            cx="200" cy="115"
            r="55"
            fill="#f59e0b"
            fillOpacity="0.2"
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          <circle cx="200" cy="115" r="40" fill="#fef3c7"/>
          <circle cx="200" cy="105" r="25" fill="#7c3aed"/>
          <circle cx="200" cy="100" r="20" fill="#ede9fe"/>
          {/* Face */}
          <circle cx="192" cy="97" r="3" fill="#1e293b"/>
          <circle cx="208" cy="97" r="3" fill="#1e293b"/>
          <path d="M193 108 Q200 114 207 108" stroke="#1e293b" strokeWidth="2" fill="none" strokeLinecap="round"/>
          {/* Body */}
          <path d="M155 200 Q155 155 200 148 Q245 155 245 200" fill="#7c3aed"/>
          {/* White Coat */}
          <path d="M165 200 Q165 165 200 158 Q235 165 235 200" fill="white" stroke="#e2e8f0" strokeWidth="1"/>
          {/* Name Tag */}
          <rect x="185" y="170" width="30" height="10" rx="2" fill="#f59e0b"/>
        </motion.g>
        
        {/* Team Member 3 - Right */}
        <motion.g
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <circle cx="290" cy="130" r="35" fill="#e2e8f0"/>
          <circle cx="290" cy="120" r="22" fill="#0ea5e9"/>
          <circle cx="290" cy="115" r="18" fill="#e0f2fe"/>
          {/* Face */}
          <circle cx="283" cy="112" r="3" fill="#1e293b"/>
          <circle cx="297" cy="112" r="3" fill="#1e293b"/>
          <path d="M285 122 Q290 127 295 122" stroke="#1e293b" strokeWidth="2" fill="none" strokeLinecap="round"/>
          {/* Body */}
          <path d="M255 200 Q255 160 290 155 Q325 160 325 200" fill="#0ea5e9"/>
        </motion.g>
        
        {/* Welcome Banner */}
        <motion.g
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <rect x="120" y="230" width="160" height="35" rx="8" fill="white" stroke="#f59e0b" strokeWidth="2"/>
          <text x="200" y="252" fontSize="14" fill="#1e293b" textAnchor="middle" fontWeight="600">Willkommen!</text>
        </motion.g>
        
        {/* Confetti */}
        {[
          { x: 60, y: 80, color: "#f59e0b", delay: 1 },
          { x: 340, y: 100, color: "#0d9488", delay: 1.2 },
          { x: 50, y: 160, color: "#7c3aed", delay: 1.4 },
          { x: 350, y: 180, color: "#ef4444", delay: 1.1 },
          { x: 100, y: 50, color: "#22c55e", delay: 1.3 },
          { x: 300, y: 40, color: "#3b82f6", delay: 1.5 },
        ].map((confetti, i) => (
          <motion.rect
            key={i}
            x={confetti.x}
            y={confetti.y}
            width="8"
            height="8"
            rx="2"
            fill={confetti.color}
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{ 
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1, 0.5],
              rotate: [0, 180, 360],
              y: [confetti.y, confetti.y + 30]
            }}
            transition={{ 
              duration: 2,
              delay: confetti.delay,
              repeat: Infinity,
              repeatDelay: 3
            }}
          />
        ))}
        
        {/* Stars */}
        <motion.g
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <path d="M370 140 L372 146 L378 146 L373 150 L375 156 L370 152 L365 156 L367 150 L362 146 L368 146 Z" fill="#f59e0b"/>
        </motion.g>
        <motion.g
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        >
          <path d="M30 120 L31 124 L35 124 L32 127 L33 131 L30 128 L27 131 L28 127 L25 124 L29 124 Z" fill="#0d9488"/>
        </motion.g>
      </svg>
    </div>
  );
}

// Get the appropriate illustration based on slug
function ArticleIllustration({ slug }: { slug: string }) {
  if (slug === "willkommen-neue-website") {
    return <WebsiteIllustration />;
  } else if (slug === "neue-ultraschallgeraete") {
    return <UltrasoundIllustration />;
  } else if (slug === "team-erweiterung-khakan-amara") {
    return <TeamIllustration />;
  }
  return null;
}

interface NewsPost {
  id: string;
  slug: string;
  titleDe: string;
  titleEn: string;
  contentDe: string;
  contentEn: string;
  publishedAt: Date | string;
  category?: string | null;
}

interface NewsDetailContentProps {
  post: NewsPost;
  relatedPosts: NewsPost[];
}

// Simple markdown-like parser for basic formatting
function renderContent(content: string) {
  const lines = content.split('\n');
  const elements: JSX.Element[] = [];
  let listItems: string[] = [];
  let listType: 'ul' | 'ol' | null = null;
  let key = 0;

  const flushList = () => {
    if (listItems.length > 0 && listType) {
      if (listType === 'ul') {
        elements.push(
          <ul key={key++} className="space-y-2 mb-6">
            {listItems.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                <span dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
              </li>
            ))}
          </ul>
        );
      } else {
        elements.push(
          <ol key={key++} className="space-y-2 mb-6 list-decimal list-inside">
            {listItems.map((item, i) => (
              <li key={i} className="text-muted-foreground">
                <span dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
              </li>
            ))}
          </ol>
        );
      }
      listItems = [];
      listType = null;
    }
  };

  const formatInline = (text: string) => {
    // Bold text
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>');
    return text;
  };

  for (const line of lines) {
    const trimmedLine = line.trim();

    // Empty line
    if (!trimmedLine) {
      flushList();
      continue;
    }

    // Heading 2
    if (trimmedLine.startsWith('## ')) {
      flushList();
      const text = trimmedLine.slice(3);
      elements.push(
        <h2 key={key++} className="text-2xl font-serif text-foreground mt-8 mb-4 first:mt-0">
          {text}
        </h2>
      );
      continue;
    }

    // Heading 3
    if (trimmedLine.startsWith('### ')) {
      flushList();
      const text = trimmedLine.slice(4);
      elements.push(
        <h3 key={key++} className="text-xl font-serif text-foreground mt-6 mb-3">
          {text}
        </h3>
      );
      continue;
    }

    // Unordered list item
    if (trimmedLine.startsWith('- ')) {
      if (listType !== 'ul') {
        flushList();
        listType = 'ul';
      }
      listItems.push(trimmedLine.slice(2));
      continue;
    }

    // Ordered list item
    const orderedMatch = trimmedLine.match(/^(\d+)\.\s(.*)$/);
    if (orderedMatch) {
      if (listType !== 'ol') {
        flushList();
        listType = 'ol';
      }
      listItems.push(orderedMatch[2]);
      continue;
    }

    // Regular paragraph
    flushList();
    elements.push(
      <p 
        key={key++} 
        className="text-muted-foreground leading-relaxed mb-4"
        dangerouslySetInnerHTML={{ __html: formatInline(trimmedLine) }}
      />
    );
  }

  flushList();
  return elements;
}

export default function NewsDetailContent({ post, relatedPosts }: NewsDetailContentProps) {
  const t = useTranslations("news");
  const locale = useLocale();
  const dateLocale = locale === "de" ? de : enUS;

  const title = locale === "de" ? post.titleDe : post.titleEn;
  const content = locale === "de" ? post.contentDe : post.contentEn;

  // Estimate reading time (words / 200 words per minute)
  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-primary/90 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48cGF0aCBkPSJNLTEwIDMwaDYwdjJoLTYweiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDMiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4=')] opacity-50" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Back link */}
            <Link 
              href="/aktuelles" 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("backToNews")}
            </Link>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              {post.category && (
                <Badge className="bg-white/20 text-white border-0">
                  {post.category}
                </Badge>
              )}
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <Calendar className="h-4 w-4" />
                {format(new Date(post.publishedAt), "d. MMMM yyyy", { locale: dateLocale })}
              </div>
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <Clock className="h-4 w-4" />
                {readingTime} min Lesezeit
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white max-w-4xl">
              {title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2"
            >
              {/* Article Illustration */}
              <ArticleIllustration slug={post.slug} />
              
              <div className="prose prose-lg max-w-none">
                {renderContent(content)}
              </div>

              {/* Share Section */}
              <div className="mt-12 pt-8 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">Beitrag teilen</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.article>

            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-1"
            >
              {/* CTA Card */}
              <Card className="mb-8 bg-gradient-to-br from-primary to-primary/90 text-white border-0">
                <CardContent className="p-6">
                  <h3 className="text-xl font-serif mb-3">Termin vereinbaren</h3>
                  <p className="text-white/80 text-sm mb-4">
                    Haben Sie Fragen oder möchten einen Termin buchen? Wir sind für Sie da.
                  </p>
                  <Button asChild className="w-full bg-white text-primary hover:bg-white/90">
                    <Link href="/termin">
                      <Calendar className="mr-2 h-4 w-4" />
                      Jetzt Termin buchen
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div>
                  <h3 className="text-lg font-serif text-foreground mb-4">Weitere Beiträge</h3>
                  <div className="space-y-4">
                    {relatedPosts.map((relatedPost) => (
                      <Link key={relatedPost.id} href={`/aktuelles/${relatedPost.slug}`}>
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2 text-muted-foreground text-xs mb-2">
                              <Calendar className="h-3 w-3" />
                              {format(new Date(relatedPost.publishedAt), "d. MMM yyyy", { locale: dateLocale })}
                            </div>
                            <h4 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                              {locale === "de" ? relatedPost.titleDe : relatedPost.titleEn}
                            </h4>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </motion.aside>
          </div>
        </div>
      </section>

      {/* More News CTA */}
      <section className="py-16 bg-accent">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Newspaper className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-4">
              Mehr aus unserer Praxis
            </h2>
            <p className="text-muted-foreground mb-8">
              Entdecken Sie weitere Neuigkeiten und Informationen aus unserer Praxis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/aktuelles">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Alle Beiträge
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/kontakt">
                  Kontakt aufnehmen
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
