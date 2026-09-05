type PageHeaderProps = {
  title: string
}

/** Shared page title styling and spacing. */
export default function PageHeader({ title }: PageHeaderProps) {
  return (
    <header className="mb-12">
      <h1 className="text-title text-label">{title}</h1>
    </header>
  )
}
