'use client'

import { useInView } from '@/hooks/use-in-view'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface RevealProps {
  children: ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  className?: string
}

const directionClasses = {
  up: 'motion-translate-y-in-[25%] motion-translate-y-out-0',
  down: 'motion-translate-y-in-[-25%] motion-translate-y-out-0',
  left: 'motion-translate-x-in-[25%] motion-translate-x-out-0',
  right: 'motion-translate-x-in-[-25%] motion-translate-x-out-0',
}

const delayClasses: Record<number, string> = {
  0: '',
  0.1: 'motion-delay-[100ms]',
  0.2: 'motion-delay-[200ms]',
  0.3: 'motion-delay-[300ms]',
  0.4: 'motion-delay-[400ms]',
  0.5: 'motion-delay-[500ms]',
}

export function Reveal({ children, direction = 'up', delay = 0, className }: RevealProps) {
  const { ref, isInView } = useInView({ threshold: 0.1 })

  const delayClass = delayClasses[delay] || (delay > 0 ? `motion-delay-[${delay * 1000}ms]` : '')

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        'motion-preset-fade',
        directionClasses[direction],
        delayClass,
        'motion-duration-600',
        'motion-ease-[cubic-bezier(0.22,1,0.36,1)]',
        !isInView && 'motion-opacity-in-0',
        className
      )}
    >
      {children}
    </div>
  )
}
