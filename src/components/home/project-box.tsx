'use client';

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { Project, UnfoldState } from '@/types/project';
import { Layer1Product } from './layers/layer1-product';
import { Layer2Engineering } from './layers/layer2-engineering';
import { Layer3Quality } from './layers/layer3-quality';
import { Layer4Tradeoffs } from './layers/layer4-tradeoffs';

interface ProjectBoxProps {
  project: Project;
  index: number;
}

export function ProjectBox({ project, index: _index }: ProjectBoxProps) {
  const [unfoldState, setUnfoldState] = useState<UnfoldState>('closed');
  const prefersReducedMotion = useReducedMotion();

  const handleToggle = () => {
    if (unfoldState === 'closed') {
      setUnfoldState('layer1');
    } else {
      setUnfoldState('closed');
    }
  };

  const handleNextLayer = () => {
    const layers: UnfoldState[] = ['layer1', 'layer2', 'layer3', 'layer4'];
    const currentIndex = layers.indexOf(unfoldState);
    if (currentIndex < layers.length - 1) {
      setUnfoldState(layers[currentIndex + 1]);
    }
  };

  const handlePrevLayer = () => {
    const layers: UnfoldState[] = ['closed', 'layer1', 'layer2', 'layer3'];
    const currentLayerIndex = ['closed', 'layer1', 'layer2', 'layer3', 'layer4'].indexOf(unfoldState);
    if (currentLayerIndex > 0) {
      setUnfoldState(layers[currentLayerIndex - 1]);
    }
  };

  const handleClose = () => {
    setUnfoldState('closed');
  };

  // Animation variants
  const boxVariants: Variants = {
    closed: {
      height: '320px',
      transition: {
        duration: prefersReducedMotion ? 0 : 0.5,
        ease: [0.4, 0.0, 0.2, 1],
      },
    },
    layer1: {
      height: 'auto',
      minHeight: '600px',
      transition: {
        duration: prefersReducedMotion ? 0 : 0.5,
        ease: [0.4, 0.0, 0.2, 1],
      },
    },
    layer2: {
      height: 'auto',
      minHeight: '800px',
      transition: {
        duration: prefersReducedMotion ? 0 : 0.5,
        ease: [0.4, 0.0, 0.2, 1],
      },
    },
    layer3: {
      height: 'auto',
      minHeight: '900px',
      transition: {
        duration: prefersReducedMotion ? 0 : 0.5,
        ease: [0.4, 0.0, 0.2, 1],
      },
    },
    layer4: {
      height: 'auto',
      minHeight: '1000px',
      transition: {
        duration: prefersReducedMotion ? 0 : 0.5,
        ease: [0.4, 0.0, 0.2, 1],
      },
    },
  };

  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.3,
        ease: [0.4, 0.0, 0.2, 1],
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.2,
      },
    },
  };

  return (
    <motion.article
      variants={boxVariants}
      initial="closed"
      animate={unfoldState}
      className="relative overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
      data-testid="project-box"
    >
      {/* Closed State - Box Front */}
      {unfoldState === 'closed' && (
        <button
          onClick={handleToggle}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleToggle();
            }
          }}
          aria-expanded={unfoldState !== 'closed'}
          aria-controls={`project-${project.slug}`}
          aria-label={`${project.name} - Expand project details`}
          className="flex h-full w-full flex-col justify-between p-4 @sm:p-6 @md:p-8 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
        >
          <div>
            <div className="mb-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
              {project.category}
            </div>
            <h3 className="mb-2 text-2xl font-bold text-neutral-900 dark:text-white">
              {project.name}
            </h3>
            <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
              {project.oneLiner}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {project.keyMetric}
            </span>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              Click to unfold →
            </span>
          </div>
        </button>
      )}

      {/* Expanded State - Layers */}
      <AnimatePresence mode="wait">
        {unfoldState !== 'closed' && (
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            id={`project-${project.slug}`}
            className="p-4 @sm:p-6 @md:p-8"
          >
            {/* Layer 1: Product */}
            <Layer1Product
              project={project}
              onNext={handleNextLayer}
              onClose={handleClose}
            />

            {/* Layer 2: Engineering */}
            {(unfoldState === 'layer2' ||
              unfoldState === 'layer3' ||
              unfoldState === 'layer4') && (
              <Layer2Engineering
                project={project}
                onNext={handleNextLayer}
                onPrev={handlePrevLayer}
              />
            )}

            {/* Layer 3: Quality */}
            {(unfoldState === 'layer3' || unfoldState === 'layer4') && (
              <Layer3Quality
                project={project}
                onNext={handleNextLayer}
                onPrev={handlePrevLayer}
              />
            )}

            {/* Layer 4: Trade-offs */}
            {unfoldState === 'layer4' && (
              <Layer4Tradeoffs
                project={project}
                onPrev={handlePrevLayer}
                onClose={handleClose}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
