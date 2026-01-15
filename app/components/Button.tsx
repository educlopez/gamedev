import Link from 'next/link'
import { cn } from '@/utils/cn'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

function ArrowIcon(props: ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m11.5 6.5 3 3.5m0 0-3 3.5m3-3.5h-9"
      />
    </svg>
  )
}

const variantStyles = {
  primary:
    'rounded-xs bg-gameboy-700 py-1 px-3 text-gameboy-100 hover:bg-gameboy-900',
  secondary:
    'rounded-xs bg-gameboy-700 py-1 px-3 text-gameboy-100 hover:bg-gameboy-400',
} as const

type ButtonProps = {
  variant?: keyof typeof variantStyles
  className?: string
  children: ReactNode
  arrow?: 'left' | 'right'
} & (
  | (ComponentPropsWithoutRef<'button'> & { href?: never })
  | (ComponentPropsWithoutRef<typeof Link> & { href: string })
)

export function Button({
  variant = 'primary',
  className,
  children,
  arrow,
  ...props
}: ButtonProps) {
  className = cn(
    'inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition',
    variantStyles[variant],
    className
  )

  const arrowIcon = (
    <ArrowIcon
      className={cn(
        'mt-0.5 h-5 w-5',
        arrow === 'left' && '-ml-1 rotate-180',
        arrow === 'right' && '-mr-1'
      )}
    />
  )

  if (props.href) {
    return (
      <Link className={className} {...(props as ComponentPropsWithoutRef<typeof Link>)}>
        {arrow === 'left' && arrowIcon}
        {children}
        {arrow === 'right' && arrowIcon}
      </Link>
    )
  }

  return (
    <button className={className} {...(props as ComponentPropsWithoutRef<'button'>)}>
      {arrow === 'left' && arrowIcon}
      {children}
      {arrow === 'right' && arrowIcon}
    </button>
  )
}
