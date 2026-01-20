'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface IntroBoxProps {
  onUnbox: () => void;
}

export function IntroBox({ onUnbox }: IntroBoxProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isUnboxing, setIsUnboxing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Only render random elements after mount to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Generate particle positions only on client
  const particles = useMemo(() => {
    if (!isMounted) return [];
    return [...Array(20)].map((_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }));
  }, [isMounted]);

  const handleUnbox = () => {
    setIsUnboxing(true);
    // Delay to let animation play before revealing content
    setTimeout(() => {
      onUnbox();
    }, 800);
  };

  // Handle keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleUnbox();
    }
  };

  return (
    <AnimatePresence>
      {!isUnboxing ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex flex-col items-center bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950"
        >
          {/* Floating particles background - only rendered after mount */}
          <div className="absolute inset-0 overflow-hidden">
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute h-1 w-1 rounded-full bg-blue-500/30"
                initial={{
                  x: particle.x,
                  y: particle.y,
                }}
                animate={{
                  y: [null, -20, 20],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  delay: particle.delay,
                }}
              />
            ))}
          </div>

          {/* Rope and Box Container - starts from top */}
          <motion.div
            className="flex flex-col items-center"
            animate={{
              rotateZ: isHovered ? 0 : [0, 1, -1, 0],
            }}
            transition={{
              duration: 3,
              repeat: isHovered ? 0 : Infinity,
              ease: "easeInOut"
            }}
            style={{ transformOrigin: 'top center' }}
          >
            {/* Long rope from top */}
            <div className="w-0.5 h-[35vh] bg-gradient-to-b from-neutral-700 via-neutral-500 to-neutral-400 rounded-full" />

            {/* 3D Box Container */}
            <motion.button
              onClick={handleUnbox}
              onKeyDown={handleKeyDown}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="group perspective-1000 cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-500/50 rounded-2xl mt-1"
              animate={{
                y: isHovered ? -5 : [0, -5, 0],
              }}
              transition={{
                y: { duration: 2, repeat: isHovered ? 0 : Infinity, ease: "easeInOut" },
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Click to unbox and enter portfolio"
            >
            {/* The 3D Cube */}
            <div className="intro-cube">
              {/* Front face */}
              <div className="intro-cube-face intro-cube-front">
                <div className="flex h-full flex-col items-center justify-center p-2">
                  <div className="mb-1 h-16 w-16 overflow-hidden rounded-full border-2 border-blue-500/50">
                    <Image
                      src="/profile.jpeg"
                      alt="David M-G"
                      width={64}
                      height={64}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="text-xs font-bold text-white">David M-G</span>
                </div>
              </div>

              {/* Back face */}
              <div className="intro-cube-face intro-cube-back">
                <div className="flex h-full flex-col items-center justify-center p-4">
                  <div className="mb-2 text-3xl">🚀</div>
                  <span className="text-xs text-neutral-300">5 SaaS Products</span>
                </div>
              </div>

              {/* Right face */}
              <div className="intro-cube-face intro-cube-right">
                <div className="flex h-full flex-col items-center justify-center p-4">
                  <div className="mb-2 text-3xl">💼</div>
                  <span className="text-xs text-neutral-300">8 Projects</span>
                </div>
              </div>

              {/* Left face */}
              <div className="intro-cube-face intro-cube-left">
                <div className="flex h-full flex-col items-center justify-center p-4">
                  <div className="mb-2 text-3xl">⚡</div>
                  <span className="text-xs text-neutral-300">Full-Stack</span>
                </div>
              </div>

              {/* Top face */}
              <div className="intro-cube-face intro-cube-top">
                <div className="flex h-full items-center justify-center">
                  <div className="text-2xl">🎁</div>
                </div>
              </div>

              {/* Bottom face */}
              <div className="intro-cube-face intro-cube-bottom">
                <div className="flex h-full items-center justify-center">
                  <div className="text-2xl">✨</div>
                </div>
              </div>
            </div>
          </motion.button>
          </motion.div>

          {/* Call to action text */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.p
              className="mb-2 text-lg font-medium text-white"
              animate={{ opacity: isHovered ? 1 : [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: isHovered ? 0 : Infinity }}
            >
              {isHovered ? "Click to unbox!" : "What's inside?"}
            </motion.p>
            <p className="text-sm text-neutral-400">
              Click the box to discover
            </p>
          </motion.div>

          {/* Decorative glow */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <motion.div
              className="h-64 w-64 rounded-full bg-blue-500/10 blur-3xl"
              animate={{
                scale: isHovered ? 1.5 : [1, 1.2, 1],
                opacity: isHovered ? 0.3 : [0.1, 0.2, 0.1],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
        </motion.div>
      ) : (
        // Unboxing animation
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950"
        >
          {/* Exploding box pieces - deterministic positions */}
          {[
            { x: -200, y: -150, rotate: 45 },
            { x: 200, y: -150, rotate: -30 },
            { x: -250, y: 100, rotate: 60 },
            { x: 250, y: 100, rotate: -45 },
            { x: 0, y: -250, rotate: 90 },
            { x: 0, y: 250, rotate: -60 },
          ].map((pos, i) => (
            <motion.div
              key={i}
              className="absolute h-20 w-20 rounded-lg border border-blue-500/50 bg-gradient-to-br from-neutral-800 to-neutral-900"
              initial={{ x: 0, y: 0, rotate: 0, scale: 1 }}
              animate={{
                x: pos.x,
                y: pos.y,
                rotate: pos.rotate,
                scale: 0,
                opacity: 0,
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          ))}

          {/* Central flash */}
          <motion.div
            className="absolute h-4 w-4 rounded-full bg-white"
            initial={{ scale: 1 }}
            animate={{ scale: 50, opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
