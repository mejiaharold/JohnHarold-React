export type Page = 'home' | 'about' | 'payment'

export default function Header({ page }: { page: Page }) {
  return (
    <header className="header">
      <a className="logo" href="#home" aria-label="Oksyo home">
        <img className="logo-mark" src="/images/oksyo-mark.png" alt="" />
        <span className="logo-wording">
          <span className="logo-name">Oksyo</span>
          <small>Food &amp; community</small>
        </span>
      </a>
      <nav aria-label="Main navigation">
        <a href="#home" className={page === 'home' ? 'active' : ''} aria-current={page === 'home' ? 'page' : undefined}>
          Home
        </a>
        <a href="#about" className={page === 'about' ? 'active' : ''} aria-current={page === 'about' ? 'page' : undefined}>
          About
        </a>
        <a href="#donate" className="nav-donate">
          Donate now
        </a>
      </nav>
    </header>
  )
}

