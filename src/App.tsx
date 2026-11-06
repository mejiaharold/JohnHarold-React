import { useEffect, useState } from 'react'
import './App.css'
import Header, { type Page } from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import PaymentPage from './pages/PaymentPage'

const pageFromHash = (): Page => {
  if (window.location.hash === '#about') return 'about'
  if (window.location.hash === '#payment') return 'payment'
  return 'home'
}

/** Hashes that point at a section on the home page rather than a separate page. */
const isHomeSection = () => {
  const id = window.location.hash.slice(1)
  return id !== '' && id !== 'home' && id !== 'about' && id !== 'payment'
}

export default function App() {
  const [page, setPage] = useState<Page>(pageFromHash)

  useEffect(() => {
    const onHash = () => {
      const next = pageFromHash()
      setPage(next)
      if (next === 'home' && isHomeSection()) {
        // wait for the home page to mount when coming from another page
        window.setTimeout(() => document.getElementById(window.location.hash.slice(1))?.scrollIntoView(), 30)
      } else {
        window.scrollTo(0, 0)
      }
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    if (page === 'home' && isHomeSection()) {
      document.getElementById(window.location.hash.slice(1))?.scrollIntoView()
    }
  }, [page])

  return (
    <div className="site">
      <Header page={page} />
      <main>{page === 'about' ? <AboutPage /> : page === 'payment' ? <PaymentPage /> : <HomePage />}</main>
      <Footer />
    </div>
  )
}
