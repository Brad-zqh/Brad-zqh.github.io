'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

export interface ConferenceEntry {
    name: string;
    full_name?: string;
    type: 'Oral' | 'Poster';
    year: string;
    photos?: string[];
}

interface ConferencesProps {
    entries: ConferenceEntry[];
    title?: string;
}

function PhotoGallery({ photos, name }: { photos: string[]; name: string }) {
    const [lightbox, setLightbox] = useState<string | null>(null);

    return (
        <>
            <div className="flex gap-1.5 flex-shrink-0">
                {photos.slice(0, 2).map((photo, i) => (
                    <button
                        key={i}
                        onClick={() => setLightbox(photo)}
                        className="w-16 h-16 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-700 hover:scale-105 transition-transform duration-200 focus:outline-none"
                        title={`${name} photo ${i + 1}`}
                    >
                        <Image
                            src={photo}
                            alt={`${name} photo ${i + 1}`}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                        />
                    </button>
                ))}
            </div>

            {/* Lightbox */}
            {lightbox && (
                <div
                    className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
                    onClick={() => setLightbox(null)}
                >
                    <div className="relative max-w-3xl max-h-[80vh]">
                        <Image
                            src={lightbox}
                            alt={name}
                            width={900}
                            height={600}
                            className="object-contain rounded-lg max-h-[80vh] w-auto"
                        />
                        <button
                            onClick={() => setLightbox(null)}
                            className="absolute top-2 right-2 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm hover:bg-black/70"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default function Conferences({ entries, title = 'Conferences' }: ConferencesProps) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
        >
            <h2 className="text-2xl font-serif font-bold text-primary mb-4">{title}</h2>
            <div className="space-y-4">
                {entries.map((entry, index) => (
                    <div key={index} className="flex items-start gap-4">
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <p className="font-semibold text-primary">{entry.name}</p>
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium flex-shrink-0 ${
                                            entry.type === 'Oral'
                                                ? 'bg-accent/10 text-accent'
                                                : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300'
                                        }`}>
                                            {entry.type}
                                        </span>
                                    </div>
                                    {entry.full_name && (
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">{entry.full_name}</p>
                                    )}
                                </div>
                                <div className="flex items-start gap-3 flex-shrink-0">
                                    {entry.photos && entry.photos.length > 0 && (
                                        <PhotoGallery photos={entry.photos} name={entry.name} />
                                    )}
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400 italic whitespace-nowrap pt-1">
                                        {entry.year}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </motion.section>
    );
}
