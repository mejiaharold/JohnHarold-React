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

export default function App() {
  const [page, setPage] = useState<Page>(pageFromHash)

  useEffect(() => {
    const onHash = () => {
      setPage(pageFromHash())
      if (window.location.hash !== '#donate') {
        window.scrollTo(0, 0)
      }
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    if (page === 'home' && window.location.hash === '#donate') {
      document.getElementById('donate')?.scrollIntoView()
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
