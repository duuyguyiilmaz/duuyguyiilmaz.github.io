type PageHeaderProps = {
  title: string
  lead?: string
}

/**
 * Title and lead stack vertically rather than sitting in opposite columns. A
 * headline on the left with a small paragraph floating top-right is a shape
 * that looks designed and reads badly: nothing aligns to anything.
 */
export default function PageHeader({ title, lead }: PageHeaderProps) {
  return (
    <header className="mb-12">
      <h1 className="text-title text-label">{title}</h1>
      {lead && <p className="text-body-lg mt-3 max-w-[56ch] text-label-secondary">{lead}</p>}
    </header>
  )
}
