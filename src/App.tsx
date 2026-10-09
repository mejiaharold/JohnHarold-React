import { useEffect, useState } from 'react'
import './App.css'
import Header, { type Page } from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'

const pageFromHash = (): Page => (window.location.hash === '#about' ? 'about' : 'home')

export default function App() {
  const [page, setPage] = useState<Page>(pageFromHash)

  useEffect(() => {
    const onHash = () => {
      setPage(pageFromHash())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <div className="site">
      <Header page={page} />
      <main>{page === 'home' ? <HomePage /> : <AboutPage />}</main>
      <Footer />
    </div>
  )
}
