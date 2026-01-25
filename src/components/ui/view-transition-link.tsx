'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { ComponentProps } from 'react'

type ViewTransitionLinkProps = ComponentProps<typeof Link>

export function ViewTransitionLink({
  href,
  children,
  ...props
}: ViewTransitionLinkProps) {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window === 'undefined') return

    // Check if browser supports View Transitions API
    if (!('startViewTransition' in document)) {
      console.log('View Transitions API not supported')
      return
    }

    e.preventDefault()

    const targetUrl = href.toString()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(document as any).startViewTransition(() => {
      router.push(targetUrl)
    })
  }

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  )
}
