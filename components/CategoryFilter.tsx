'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Category } from '@/types';
import { categoryLabels } from '@/lib/localization';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState, useCallback } from 'react';

export default function CategoryFilter({ currentCategory }: { currentCategory?: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const checkScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    
    const isRTL = typeof document !== 'undefined' && (document.dir === 'rtl' || getComputedStyle(scrollRef.current).direction === 'rtl');
    
    if (isRTL) {
      setShowRightArrow(scrollLeft < 0);
      setShowLeftArrow(Math.abs(scrollLeft) < scrollWidth - clientWidth - 5);
    } else {
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
    }
  }, []);

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [checkScroll]);

  // Handle auto-centering of active category
  useEffect(() => {
    if (!scrollRef.current || !currentCategory) return;
    
    const container = scrollRef.current;
    const activeBtn = container.querySelector(`[data-slug="${currentCategory}"]`) as HTMLElement;
    
    if (activeBtn) {
      const containerWidth = container.offsetWidth;
      const btnOffset = activeBtn.offsetLeft;
      const btnWidth = activeBtn.offsetWidth;
      
      const scrollPosition = btnOffset - (containerWidth / 2) + (btnWidth / 2);
      
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [currentCategory]);

  const handleScrollClick = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 300;
    const multiplier = direction === 'left' ? -1 : 1;
    
    scrollRef.current.scrollBy({
      left: multiplier * scrollAmount,
      behavior: 'smooth'
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
    checkScroll();
  };

  const handleCategoryChange = (category: string | null) => {
    if (isDragging) return;
    
    const params = new URLSearchParams(searchParams);
    if (category) {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const categories = Object.keys(categoryLabels) as Category[];

  return (
    <div className="sticky top-16 z-20 w-full bg-secondary border-b border-primary/5">
      <div className="relative group mx-auto max-w-7xl">
        {/* Navigation Arrows (Desktop Only) */}
        <AnimatePresence>
          {showLeftArrow && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => handleScrollClick('left')}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-30 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg border border-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300 ease-in-out"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showRightArrow && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => handleScrollClick('right')}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-30 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg border border-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300 ease-in-out"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Scroll Container with Dynamic Edge Fades */}
        <div 
          className="relative px-2 md:px-4 overflow-hidden transition-all duration-500"
          style={{
            WebkitMaskImage: `linear-gradient(to right, ${showLeftArrow ? 'transparent' : 'black'} 0%, black 10%, black 90%, ${showRightArrow ? 'transparent' : 'black'} 100%)`,
            maskImage: `linear-gradient(to right, ${showLeftArrow ? 'transparent' : 'black'} 0%, black 10%, black 90%, ${showRightArrow ? 'transparent' : 'black'} 100%)`
          }}
        >
          <div 
            ref={scrollRef}
            onScroll={checkScroll}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseUp}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className={`no-scrollbar flex gap-2 overflow-x-auto py-4 scroll-smooth ${isDragging ? 'cursor-grabbing select-none' : 'cursor-default'}`}
          >
            <button
              onClick={() => handleCategoryChange(null)}
              data-slug="all"
              className={`flex-shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ease-in-out pointer-events-auto h-10 flex items-center justify-center ${
                !currentCategory
                  ? 'bg-primary text-secondary shadow-md font-bold ring-2 ring-accent/20'
                  : 'bg-white text-primary-text hover:bg-primary/5 border border-primary/10'
              }`}
            >
              الكل
            </button>

            {categories.map((slug) => (
              <button
                key={slug}
                data-slug={slug}
                onClick={() => handleCategoryChange(slug)}
                className={`flex-shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ease-in-out pointer-events-auto h-10 flex items-center justify-center ${
                  currentCategory === slug
                    ? 'bg-primary text-secondary shadow-md font-bold ring-2 ring-accent/20'
                    : 'bg-white text-primary-text hover:bg-primary/5 border border-primary/10'
                }`}
                style={currentCategory === slug ? { color: 'var(--color-accent)' } : {}}
              >
                {categoryLabels[slug]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
