'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Sparkles } from 'lucide-react';
import { useLocaleStore } from '@/lib/stores/localeStore';

export interface ProjectEntry {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  image_fit?: 'cover' | 'contain';
  live_url: string;
  github_url: string;
  tags?: string[];
  accent?: 'blue' | 'coral';
}

interface ProjectsProps {
  entries: ProjectEntry[];
  title?: string;
  sectionId?: string;
}

export default function Projects({ entries, title = 'Selected Projects', sectionId }: ProjectsProps) {
  const locale = useLocaleStore((state) => state.locale);
  const labels = locale === 'zh'
    ? { kicker: '研究之外', live: '在线体验', technologies: '技术与方法', preview: '界面预览' }
    : { kicker: 'Beyond research', live: 'Live Demo', technologies: 'Technologies and methods', preview: 'interface preview' };

  return (
    <motion.section
      id={sectionId}
      className="scroll-mt-24"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6 }}
    >
      <div className="section-heading">
        <div>
          <span className="section-kicker"><Sparkles aria-hidden="true" /> {labels.kicker}</span>
          <h2 className="section-title">{title}</h2>
        </div>
        <span className="section-rule" aria-hidden="true" />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {entries.map((project, index) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            whileHover={{ y: -6 }}
            className={`project-card project-card--${project.accent || 'blue'}`}
          >
            <div className={`project-visual project-visual--${project.image_fit || 'cover'}`}>
              <Image
                src={project.image}
                alt={`${project.title} ${labels.preview}`}
                fill
                sizes="(max-width: 768px) 100vw, 360px"
                className={project.image_fit === 'contain' ? 'object-contain p-12' : 'object-cover'}
              />
              <div className="project-visual-shade" aria-hidden="true" />
              <span className="project-index" aria-hidden="true">0{index + 1}</span>
            </div>

            <div className="project-content">
              <p className="project-subtitle">{project.subtitle}</p>
              <h3>{project.title}</h3>
              <p className="project-description">{project.description}</p>

              {project.tags && project.tags.length > 0 && (
                <div className="project-tags" aria-label={labels.technologies}>
                  {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              )}

              <div className="project-actions">
                <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="project-link project-link--primary">
                  {labels.live} <ArrowUpRight aria-hidden="true" />
                </a>
                <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="project-link">
                  <Github aria-hidden="true" /> GitHub
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}
