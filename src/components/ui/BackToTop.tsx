'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useLocaleStore } from '@/lib/stores/localeStore';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const locale = useLocaleStore((state) => state.locale);

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 720);
    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    return () => window.removeEventListener('scroll', updateVisibility);
  }, []);

  const label = locale === 'zh' ? '返回顶部' : 'Back to top';

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label={label}
          title={label}
          initial={{ opacity: 0, y: 12, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.92 }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="back-to-top"
        >
          <ArrowUp aria-hidden="true" />
          <span>{label}</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
