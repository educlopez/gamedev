import Link from 'next/link'
import { cn } from '@/utils/cn'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

type RetrobuttonProps = {
  className?: string
  children: ReactNode
  variant?: 'primary' | 'secondary'
} & (
  | (ComponentPropsWithoutRef<'button'> & { href?: never })
  | (ComponentPropsWithoutRef<typeof Link> & { href: string })
)

export function Retrobutton({ className, children, ...props }: RetrobuttonProps) {
  className = cn('retro-btn flex flex-row gap-1', className)
  
  if (props.href) {
    return (
      <Link className={className} {...(props as ComponentPropsWithoutRef<typeof Link>)}>
        {children}
      </Link>
    )
  }

  return (
    <button className={className} {...(props as ComponentPropsWithoutRef<'button'>)}>
      {children}
    </button>
  )
}
