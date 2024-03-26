import Link from 'next/link'
import clsx from 'clsx'
export function Retrobutton({ className, children, ...props }) {
     let Component = props.href ? Link : 'button'

  className = clsx(
    'retro-btn',
    className
  )
    return (
        <Component class={className} {...props}>
           {children}
        </Component>
  )
}