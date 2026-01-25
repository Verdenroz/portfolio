import { useEffect, useRef, useState } from 'react'

interface UseInViewOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export function useInView({
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true,
}: UseInViewOptions = {}) {
  const ref = useRef<HTMLElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting
        setIsInView(inView)

        if (inView && triggerOnce) {
          observer.unobserve(element)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [threshold, rootMargin, triggerOnce])

  return { ref, isInView }
}
