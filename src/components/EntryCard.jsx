import '../styles/entry.css'

export default function EntryCard({ title, subtitle, stats = [], seal, children }) {
  return (
    <article className="entry">
      <h3 className="entry__title">{title}</h3>
      {subtitle && <p className="entry__subtitle">{subtitle}</p>}

      <div className="entry__stats">
        {stats.map(([label, value]) => (
          <div className="entry__row" key={label}>
            <span>{label}</span>
            <span className="entry__dots" />
            <span className="entry__value">{value}</span>
          </div>
        ))}
      </div>

      {seal && (
        <div className="entry__seal">
          <span className="entry__seal-label">{seal.label}</span>
          <span className="entry__seal-value">{seal.value}</span>
        </div>
      )}

      {children}
    </article>
  )
}