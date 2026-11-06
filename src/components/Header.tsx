import { useState } from 'react'

export type Page = 'home' | 'about' | 'payment'

const links = [
  { href: '#home', label: 'Home', page: 'home' as Page },
  { href: '#about', label: 'About', page: 'about' as Page },
]

export default function Header({ page }: { page: Page }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="header-wrap">
      <div className="topbar">
        <div className="topbar-inner">
          <span>Walang iwanan · Community Feeding Program · Metro Manila, Philippines</span>
          <a href="mailto:mejia.johnharold@student.auf.edu.ph">Contact us</a>
        </div>
      </div>
      <div className="header">
        <a className="logo" href="#home" aria-label="Oksyo home" onClick={() => setOpen(false)}>
          <img className="logo-mark" src="/images/oksyo-mark.png" alt="" />
          <span className="logo-wording">
            <span className="logo-name">Oksyo</span>
            <small>Community Feeding Program</small>
          </span>
        </a>
        <button type="button" className="menu-toggle" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen((v) => !v)}>
          <span className="sr-only">Menu</span>
          <i /><i /><i />
        </button>
        <nav id="main-nav" className={open ? 'open' : ''} aria-label="Main navigation">
          {links.map((link) => {
            const active = link.page !== null && link.page === page
            return (
              <a key={link.href} href={link.href} className={active ? 'active' : ''} aria-current={active ? 'page' : undefined} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            )
          })}
          <a href="#donate" className="nav-donate" onClick={() => setOpen(false)}>
            Donate
          </a>
        </nav>
      </div>
    </header>
  )
}
