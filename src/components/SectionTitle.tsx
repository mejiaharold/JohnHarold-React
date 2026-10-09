export default function SectionTitle({ label, children }: { label: string; children: string }) {
  return (
    <h2 className="section-title">
      <span>{label}</span>
      {children}
    </h2>
  )
}
