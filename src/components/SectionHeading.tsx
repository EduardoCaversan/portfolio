import type { ReactNode } from 'react'
export function SectionHeading({
  index,
  label,
  title,
  children,
}: {
  index: string
  label: string
  title: string
  children?: ReactNode
}) {
  return (
    <header className="section-heading">
      <div className="eyebrow">
        <span>{index}</span> / {label}
      </div>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </header>
  )
}
