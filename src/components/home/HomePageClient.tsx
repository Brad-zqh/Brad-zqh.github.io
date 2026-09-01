'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import Profile from '@/components/home/Profile';
import About from '@/components/home/About';
import SelectedPublications from '@/components/home/SelectedPublications';
import News, { NewsItem } from '@/components/home/News';
import Education, { EducationEntry } from '@/components/home/Education';
import Conferences, { ConferenceEntry } from '@/components/home/Conferences';
import Projects, { ProjectEntry } from '@/components/home/Projects';
import VisitorMap from '@/components/home/VisitorMap';
import PublicationsList from '@/components/publications/PublicationsList';
import TextPage from '@/components/pages/TextPage';
import CardPage from '@/components/pages/CardPage';
import type { SiteConfig } from '@/lib/config';
import { Publication } from '@/types/publication';
import { CardPageConfig, PublicationPageConfig, TextPageConfig } from '@/types/page';
import { useLocaleStore } from '@/lib/stores/localeStore';

interface SectionConfig {
  id: string;
  type: 'markdown' | 'publications' | 'list' | 'education' | 'conference' | 'projects';
  title?: string;
  source?: string;
  filter?: string;
  limit?: number;
  content?: string;
  publications?: Publication[];
  items?: NewsItem[];
  educationEntries?: EducationEntry[];
  conferenceEntries?: ConferenceEntry[];
  projectEntries?: ProjectEntry[];
}

type PageData =
  | { type: 'about'; id: string; sections: SectionConfig[] }
  | { type: 'publication'; id: string; config: PublicationPageConfig; publications: Publication[] }
  | { type: 'text'; id: string; config: TextPageConfig; content: string }
  | { type: 'card'; id: string; config: CardPageConfig };

export interface HomePageLocaleData {
  author: SiteConfig['author'];
  social: SiteConfig['social'];
  features: SiteConfig['features'];
  enableOnePageMode?: boolean;
  researchInterests?: string[];
  pagesToShow: PageData[];
}

interface HomePageClientProps {
  dataByLocale: Record<string, HomePageLocaleData>;
  defaultLocale: string;
}

const heroStatementsByLocale = {
  en: [
    'Understanding cities, environments, and human experience through spatial data.',
    'Connecting urban environments, mental health, and social equity.',
    'Turning multimodal urban data into evidence for more sustainable places.',
  ],
  zh: [
    '用空间数据理解城市、环境与人的体验。',
    '连接城市环境、心理健康与社会公平。',
    '让多模态城市数据转化为可持续地方发展的证据。',
  ],
} as const;

export default function HomePageClient({ dataByLocale, defaultLocale }: HomePageClientProps) {
  const locale = useLocaleStore((state) => state.locale);
  const [heroIndex, setHeroIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const heroStatements = locale === 'zh' ? heroStatementsByLocale.zh : heroStatementsByLocale.en;
  const fallback = dataByLocale[defaultLocale] || Object.values(dataByLocale)[0];
  const data = dataByLocale[locale] || fallback;

  useEffect(() => {
    setHeroIndex(0);
    if (shouldReduceMotion) return;

    const timer = window.setInterval(() => {
      setHeroIndex((current) => (current + 1) % heroStatements.length);
    }, 5500);

    return () => window.clearInterval(timer);
  }, [heroStatements, shouldReduceMotion]);

  useEffect(() => {
    const scrollToHash = (animate = true) => {
      const targetId = decodeURIComponent(window.location.hash.slice(1));
      if (!targetId) return;

      window.requestAnimationFrame(() => {
        document.getElementById(targetId)?.scrollIntoView({
          behavior: animate && !shouldReduceMotion ? 'smooth' : 'auto',
          block: 'start',
        });
      });
    };

    const handleHashChange = () => scrollToHash(true);
    const initialScroll = window.setTimeout(() => scrollToHash(false), 120);
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.clearTimeout(initialScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [data, shouldReduceMotion]);

  if (!data) {
    return null;
  }

  return (
    <div className="academic-home min-h-screen">
      <div className="ambient-orb ambient-orb--one" aria-hidden="true" />
      <div className="ambient-orb ambient-orb--two" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-[19rem_minmax(0,1fr)] gap-10 xl:gap-16">
        <div className="lg:col-span-1">
          <Profile
            author={data.author}
            social={data.social}
            features={data.features}
            researchInterests={data.researchInterests}
          />
        </div>

        <div className="space-y-14">
          {data.pagesToShow.map((page) => (
            <section key={page.id} id={page.id} className="scroll-mt-24 space-y-12">
              {page.type === 'about' && (
                <div className="research-hero">
                  <span className="research-hero__eyebrow">
                    {locale === 'zh' ? '研究 · 数据 · 地方' : 'Research · Data · Places'}
                  </span>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={heroIndex}
                      className="research-hero__title"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.45, ease: 'easeOut' }}
                    >
                      {heroStatements[heroIndex]}
                    </motion.p>
                  </AnimatePresence>
                  <div
                    className="research-hero__signal"
                    aria-label={locale === 'zh' ? '研究主题轮播' : 'Research focus carousel'}
                  >
                    {heroStatements.map((statement, index) => (
                      <button
                        key={statement}
                        type="button"
                        className={index === heroIndex ? 'is-active' : ''}
                        aria-label={locale === 'zh' ? `显示第 ${index + 1} 个研究主题` : `Show research focus ${index + 1}`}
                        aria-current={index === heroIndex ? 'true' : undefined}
                        onClick={() => setHeroIndex(index)}
                      />
                    ))}
                  </div>
                </div>
              )}
              {page.type === 'about' && page.sections.map((section: SectionConfig) => {
                switch (section.type) {
                  case 'markdown':
                    return (
                      <About
                        key={section.id}
                        content={section.content || ''}
                        title={section.title}
                      />
                    );
                  case 'publications':
                    return (
                      <SelectedPublications
                        key={section.id}
                        publications={section.publications || []}
                        title={section.title}
                        enableOnePageMode={data.enableOnePageMode}
                      />
                    );
                  case 'list':
                    return (
                      <News
                        key={section.id}
                        items={section.items || []}
                        title={section.title}
                      />
                    );
                  case 'education':
                    return (
                      <Education
                        key={section.id}
                        entries={section.educationEntries || []}
                        title={section.title}
                      />
                    );
                  case 'conference':
                    return (
                      <Conferences
                        key={section.id}
                        entries={section.conferenceEntries || []}
                        title={section.title}
                        compact={true}
                      />
                    );
                  case 'projects':
                    return (
                      <Projects
                        key={section.id}
                        sectionId={section.id}
                        entries={section.projectEntries || []}
                        title={section.title}
                      />
                    );
                  default:
                    return null;
                }
              })}
              {page.type === 'publication' && (
                <PublicationsList
                  config={page.config}
                  publications={page.publications}
                  embedded={true}
                />
              )}
              {page.type === 'text' && (
                <TextPage
                  config={page.config}
                  content={page.content}
                  embedded={true}
                />
              )}
              {page.type === 'card' && (
                <CardPage
                  config={page.config}
                  embedded={true}
                />
              )}
            </section>
          ))}
        </div>
      </div>

      {/* Visitor Map */}
      <div className="mt-16 max-w-3xl mx-auto visitor-shell">
        <h2 className="section-title mb-5">{locale === 'zh' ? '访问足迹' : 'Visitors'}</h2>
        <VisitorMap />
      </div>
      </div>
    </div>
  );
}
