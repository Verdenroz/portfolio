'use client'

import { motion } from 'framer-motion'
import { useInView } from '@/hooks/use-in-view'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  className?: string
}

const directionVariants = {
  up: { y: 40, opacity: 0 },
  down: { y: -40, opacity: 0 },
  left: { x: 40, opacity: 0 },
  right: { x: -40, opacity: 0 },
}

export function Reveal({ children, direction = 'up', delay = 0, className }: RevealProps) {
  const { ref, isInView } = useInView({ threshold: 0.1 })

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      initial={directionVariants[direction]}
      animate={isInView ? { x: 0, y: 0, opacity: 1 } : directionVariants[direction]}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
