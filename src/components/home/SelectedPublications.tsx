'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Publication } from '@/types/publication';
import { useMessages } from '@/lib/i18n/useMessages';
import FormattedBibTeXText from '@/components/publications/FormattedBibTeXText';

interface SelectedPublicationsProps {
    publications: Publication[];
    title?: string;
    enableOnePageMode?: boolean;
}

export default function SelectedPublications({ publications, title, enableOnePageMode = false }: SelectedPublicationsProps) {
    const messages = useMessages();
    const resolvedTitle = title || messages.home.selectedPublications;

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-serif font-bold text-primary">{resolvedTitle}</h2>
                <Link
                    href={enableOnePageMode ? "/#publications" : "/publications"}
                    prefetch={true}
                    className="text-accent hover:text-accent-dark text-sm font-medium transition-all duration-200 rounded hover:bg-accent/10 hover:shadow-sm"
                >
                    {messages.home.viewAll} →
                </Link>
            </div>
            <div className="space-y-4">
                {publications.map((pub, index) => (
                    <motion.div
                        key={pub.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 * index }}
                        className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-[rgba(148,163,184,0.24)] hover:shadow-lg transition-all duration-200 hover:scale-[1.02] overflow-hidden"
                    >
                        <div className="flex flex-col sm:flex-row">
                            {/* Paper preview image */}
                            {pub.preview && (
                                <div className="sm:w-64 sm:flex-shrink-0 w-full h-48 sm:h-auto relative">
                                    <div className="w-full h-full rounded-l-lg overflow-hidden shadow-md">
                                        <Image
                                            src={`/papers/${pub.preview}`}
                                            alt={`Preview for ${pub.title}`}
                                            fill
                                            className="object-contain p-1 bg-neutral-50 dark:bg-neutral-700"
                                            sizes="(max-width: 640px) 100vw, 256px"
                                        />
                                    </div>
                                </div>
                            )}
                            {/* Text content */}
                            <div className="p-4 flex-1">
                                <h3 className="font-semibold text-primary mb-2 leading-tight">
                                    <FormattedBibTeXText nodes={pub.titleNodes} fallback={pub.title} />
                                </h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-500 mb-1">
                                    {pub.authors.map((author, idx) => (
                                        <span key={idx}>
                                            <span className={`${author.isHighlighted ? 'font-bold' : ''} ${author.isCoAuthor ? 'underline underline-offset-4 decoration-neutral-400' : ''}`}>
                                                {author.name}
                                            </span>
                                            {author.isCorresponding && (
                                                <sup className={`ml-0 ${author.isHighlighted ? 'text-accent' : 'text-neutral-600 dark:text-neutral-500'}`}>†</sup>
                                            )}
                                            {idx < pub.authors.length - 1 && ', '}
                                        </span>
                                    ))}
                                </p>
                                <p className="text-sm font-semibold italic text-neutral-700 dark:text-neutral-400 mb-2">
                                    {pub.journal || pub.conference}
                                </p>
                                {pub.description && (
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {pub.description.split('·').map((tag, i) => (
                                            <span key={i} className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-accent/10 text-accent border border-accent/20">
                                                {tag.trim()}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}
