'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export interface EducationEntry {
    institution: string;
    logo?: string;
    degree: string;
    field: string;
    department: string;
    start: string;
    end: string;
    gpa?: string;
}

interface EducationProps {
    entries: EducationEntry[];
    title?: string;
}

export default function Education({ entries, title = 'Education' }: EducationProps) {
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
                        {/* Logo */}
                        <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden border border-neutral-200 dark:border-neutral-700 bg-white flex items-center justify-center">
                            {entry.logo ? (
                                <Image
                                    src={entry.logo}
                                    alt={`${entry.institution} logo`}
                                    width={48}
                                    height={48}
                                    className="object-contain p-1"
                                />
                            ) : (
                                <span className="text-xl font-bold text-accent">
                                    {entry.institution.charAt(0)}
                                </span>
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                                <div>
                                    <p className="font-semibold text-primary">{entry.institution}</p>
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400">{entry.department}</p>
                                    <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-0.5">
                                        <span className="font-medium">{entry.degree}</span> student in {entry.field}
                                        {entry.gpa && (
                                            <span className="text-neutral-500 dark:text-neutral-400"> · GPA {entry.gpa}</span>
                                        )}
                                    </p>
                                </div>
                                <p className="text-sm text-neutral-500 dark:text-neutral-400 italic whitespace-nowrap flex-shrink-0">
                                    {entry.start} – {entry.end}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </motion.section>
    );
}
