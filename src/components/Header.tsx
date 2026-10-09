export type Page = 'home' | 'about'

export default function Header({ page }: { page: Page }) {
  return (
    <header className="header">
      <a className="logo" href="#home">
        Oksyo <small>Non-profit</small>
      </a>
      <nav>
        <a href="#home" className={page === 'home' ? 'active' : ''}>
          Home
        </a>
        <a href="#about" className={page === 'about' ? 'active' : ''}>
          About
        </a>
      </nav>
    </header>
  )
}

