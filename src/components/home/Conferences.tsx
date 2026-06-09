'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

export interface ConferenceEntry {
    name: string;
    full_name?: string;
    host?: string;
    type: 'Oral' | 'Poster';
    year: string;
    photos?: string[];
}

interface ConferencesProps {
    entries: ConferenceEntry[];
    title?: string;
    compact?: boolean; // true = homepage (no photos), false = dedicated page (with photos)
}

function Lightbox({ src, name, onClose }: { src: string; name: string; onClose: () => void }) {
    return (
        <div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div className="relative max-w-3xl max-h-[80vh]" onClick={(e) => e.stopPropagation()}>
                <Image
                    src={src}
                    alt={name}
                    width={900}
                    height={600}
                    className="object-contain rounded-lg max-h-[80vh] w-auto"
                />
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm hover:bg-black/70"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}

export default function Conferences({ entries, title = 'Conferences', compact = false }: ConferencesProps) {
    const [lightbox, setLightbox] = useState<{ src: string; name: string } | null>(null);

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
        >
            <h2 className="text-2xl font-serif font-bold text-primary mb-4">{title}</h2>

            <div className="space-y-3">
                {entries.map((entry, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.08 * index }}
                        className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-[rgba(148,163,184,0.24)] hover:shadow-lg transition-all duration-200 hover:scale-[1.01] overflow-hidden"
                    >
                        <div className="flex flex-col sm:flex-row">
                            {/* Photo — only shown in full (non-compact) mode */}
                            {!compact && entry.photos && entry.photos.length > 0 && (
                                <button
                                    onClick={() => setLightbox({ src: entry.photos![0], name: entry.name })}
                                    className="sm:w-60 sm:flex-shrink-0 w-full h-44 sm:h-auto relative focus:outline-none"
                                >
                                    <div className="w-full h-full rounded-l-lg overflow-hidden shadow-[4px_6px_18px_rgba(0,0,0,0.18)]">
                                        <Image
                                            src={entry.photos[0]}
                                            alt={entry.name}
                                            fill
                                            className="object-cover bg-neutral-50 dark:bg-neutral-700"
                                            sizes="(max-width: 640px) 100vw, 240px"
                                        />
                                    </div>
                                </button>
                            )}

                            {/* Text content */}
                            <div className="p-4 flex-1 flex gap-3">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2 mb-1">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <h3 className="text-sm font-semibold text-primary leading-snug">
                                                {entry.name}
                                            </h3>
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium flex-shrink-0 ${
                                                entry.type === 'Oral'
                                                    ? 'bg-accent/10 text-accent border border-accent/20'
                                                    : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-600'
                                            }`}>
                                                {entry.type}
                                            </span>
                                        </div>
                                        <p className="text-xs text-neutral-500 dark:text-neutral-400 italic whitespace-nowrap flex-shrink-0">
                                            {entry.year}
                                        </p>
                                    </div>

                                    {entry.full_name && (
                                        <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                                            {entry.full_name}
                                        </p>
                                    )}
                                    {entry.host && (
                                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                                            {entry.host}
                                        </p>
                                    )}
                                </div>

                                {/* Small thumbnail only in compact (homepage) mode */}
                                {compact && entry.photos && entry.photos.length > 0 && (
                                    <button
                                        onClick={() => setLightbox({ src: entry.photos![0], name: entry.name })}
                                        className="flex-shrink-0 w-14 h-14 rounded-md overflow-hidden border border-neutral-200 dark:border-neutral-700 opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-200 focus:outline-none self-center"
                                    >
                                        <Image
                                            src={entry.photos[0]}
                                            alt={entry.name}
                                            width={56}
                                            height={56}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {lightbox && (
                <Lightbox src={lightbox.src} name={lightbox.name} onClose={() => setLightbox(null)} />
            )}
        </motion.section>
    );
}
