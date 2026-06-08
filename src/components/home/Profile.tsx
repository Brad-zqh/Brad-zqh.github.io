'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
    EnvelopeIcon,
    AcademicCapIcon,
    HeartIcon,
    MapPinIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { Github, Linkedin } from 'lucide-react';
import type { SiteConfig } from '@/lib/config';
import { useMessages } from '@/lib/i18n/useMessages';

// Custom ORCID icon component — white circle, blue border, blue iD
const OrcidIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle cx="12" cy="12" r="11.5" fill="white" stroke="currentColor" strokeWidth="1.5" />
        <path
            fill="currentColor"
            d="M7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-2.016-1.284-3.722-4.097-3.722h-2.222z"
        />
    </svg>
);

interface ProfileProps {
    author: SiteConfig['author'];
    social: SiteConfig['social'];
    features: SiteConfig['features'];
    researchInterests?: string[];
}

export default function Profile({ author, social, features, researchInterests }: ProfileProps) {
    const messages = useMessages();

    const [hasLiked, setHasLiked] = useState(false);
    const [showThanks, setShowThanks] = useState(false);

    // Check local storage for user's like status
    useEffect(() => {
        if (!features.enable_likes) return;

        const userHasLiked = localStorage.getItem('jiale-website-user-liked');
        if (userHasLiked === 'true') {
            setHasLiked(true);
        }
    }, [features.enable_likes]);

    const handleLike = () => {
        const newLikedState = !hasLiked;
        setHasLiked(newLikedState);

        if (newLikedState) {
            localStorage.setItem('jiale-website-user-liked', 'true');
            setShowThanks(true);
            setTimeout(() => setShowThanks(false), 2000);
        } else {
            localStorage.removeItem('jiale-website-user-liked');
            setShowThanks(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="sticky top-8"
        >
            {/* Profile Image */}
            <div className="w-64 h-64 mx-auto mb-6 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                <Image
                    src={author.avatar}
                    alt={author.name}
                    width={256}
                    height={256}
                    className="w-full h-full object-cover object-[32%_center]"
                    priority
                />
            </div>

            {/* Name and Title */}
            <div className="text-center mb-6">
                <h1 className="text-3xl font-serif font-bold text-primary mb-2">
                    {author.name}
                </h1>
                <p className="text-lg text-accent font-medium mb-1">
                    {author.title}
                </p>
                <p className="text-neutral-600 mb-2">
                    {author.institution}
                </p>
            </div>

            {/* Contact Info List */}
            <div className="mb-6 space-y-2">
                {social.location && (
                    <a
                        href={social.location_url || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2.5 text-sm text-neutral-600 dark:text-neutral-400 hover:text-accent transition-colors duration-200 group"
                    >
                        <MapPinIcon className="h-4 w-4 flex-shrink-0 text-accent/70 group-hover:text-accent" />
                        <span>{social.location}</span>
                    </a>
                )}
                {social.email && (
                    <a
                        href={`mailto:${social.email}`}
                        className="flex items-center gap-2.5 text-sm text-neutral-600 dark:text-neutral-400 hover:text-accent transition-colors duration-200 group"
                    >
                        <EnvelopeIcon className="h-4 w-4 flex-shrink-0 text-accent/70 group-hover:text-accent" />
                        <span className="break-all">{social.email}</span>
                    </a>
                )}
                {social.google_scholar && (
                    <a
                        href={social.google_scholar}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2.5 text-sm text-neutral-600 dark:text-neutral-400 hover:text-accent transition-colors duration-200 group"
                    >
                        <AcademicCapIcon className="h-4 w-4 flex-shrink-0 text-accent/70 group-hover:text-accent" />
                        <span>Google Scholar</span>
                    </a>
                )}
                {social.researchgate && (
                    <a
                        href={social.researchgate as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2.5 text-sm text-neutral-600 dark:text-neutral-400 hover:text-accent transition-colors duration-200 group"
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 flex-shrink-0 text-accent/70 group-hover:text-accent" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.968 18.809c-.28 0-.657-.043-1.019-.154-.403-.124-.672-.28-.912-.44.022-.043 1.168-2.518 1.168-4.946 0-2.367-.893-4.12-2.367-4.12-.787 0-1.23.388-1.48.7-.292.356-.485.836-.55 1.378-.063.528-.035 1.032.019 1.45.013.117.009.226-.047.302-.1.138-.302.139-.326.138-.027-.003-.41-.053-.41-.6 0-.025.003-.079.007-.15.046-.876.282-1.71.7-2.46C13.343 8.74 14.408 8 15.813 8c2.303 0 3.919 1.913 3.919 4.647 0 2.35-1.432 4.674-1.432 4.674s.447.13.844.15c.41.024.805-.097 1.063-.325.33-.292.44-.668.44-1.03 0-.362-.09-.682-.258-.937-.173-.262-.42-.463-.713-.587a.156.156 0 01-.09-.16.153.153 0 01.13-.131 2.59 2.59 0 011.857.646c.46.414.744 1.025.744 1.744 0 .718-.305 1.357-.793 1.79-.47.416-1.116.628-1.791.628h-.765zm-8.37-.028H4.032V5.22h5.566c1.03 0 1.94.238 2.64.688.703.452 1.147 1.097 1.147 1.934 0 1.34-1.076 2.22-2.38 2.525 1.614.26 2.752 1.254 2.752 2.798 0 2.207-1.884 3.616-4.159 3.616zm-.12-7.673H6.206v2.63h3.273c.934 0 1.537-.53 1.537-1.316 0-.787-.603-1.314-1.537-1.314zm.183 4.55H6.206v2.894h3.455c1.06 0 1.722-.606 1.722-1.447 0-.84-.662-1.447-1.722-1.447z"/>
                        </svg>
                        <span>ResearchGate</span>
                    </a>
                )}
                {social.orcid && (
                    <a
                        href={social.orcid}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2.5 text-sm text-neutral-600 dark:text-neutral-400 hover:text-accent transition-colors duration-200 group"
                    >
                        <OrcidIcon className="h-4 w-4 flex-shrink-0 text-accent/70 group-hover:text-accent" />
                        <span>ORCID</span>
                    </a>
                )}
                {social.github && (
                    <a
                        href={social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2.5 text-sm text-neutral-600 dark:text-neutral-400 hover:text-accent transition-colors duration-200 group"
                    >
                        <Github className="h-4 w-4 flex-shrink-0 text-accent/70 group-hover:text-accent" />
                        <span>GitHub</span>
                    </a>
                )}
                {social.linkedin && (
                    <a
                        href={social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2.5 text-sm text-neutral-600 dark:text-neutral-400 hover:text-accent transition-colors duration-200 group"
                    >
                        <Linkedin className="h-4 w-4 flex-shrink-0 text-accent/70 group-hover:text-accent" />
                        <span>LinkedIn</span>
                    </a>
                )}
            </div>

            {/* Research Interests */}
            {researchInterests && researchInterests.length > 0 && (
                <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-primary mb-3">{messages.profile.researchInterests}</h3>
                    <div className="flex flex-wrap gap-2">
                        {researchInterests.map((interest, index) => (
                            <span key={index} className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-white dark:bg-neutral-700 text-accent border border-accent/30">
                                {interest}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Like Button */}
            {features.enable_likes && (
                <div className="flex justify-center">
                    <div className="relative">
                        <motion.button
                            onClick={handleLike}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${hasLiked
                                ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 cursor-pointer'
                                }`}
                        >
                            {hasLiked ? (
                                <HeartSolidIcon className="h-4 w-4" />
                            ) : (
                                <HeartIcon className="h-4 w-4" />
                            )}
                            <span>{hasLiked ? messages.profile.liked : messages.profile.like}</span>
                        </motion.button>

                        {/* Thanks bubble */}
                        <AnimatePresence>
                            {showThanks && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                                    animate={{ opacity: 1, y: -10, scale: 1 }}
                                    exit={{ opacity: 0, y: -20, scale: 0.8 }}
                                    className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full bg-accent text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg whitespace-nowrap"
                                >
                                    {messages.profile.thanks} 😊
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-accent"></div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            )}
        </motion.div>
    );
}
