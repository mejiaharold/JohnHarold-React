import Card from '../components/Card'
import ImageBanner from '../components/ImageBanner'
import ListItem from '../components/ListItem'
import SectionTitle from '../components/SectionTitle'

const pillars = [
  { title: 'Research', text: 'Pioneering work that begins with the web and extends to large-scale data and deep learning.' },
  { title: 'Education', text: 'Programs that nurture the next generation of leaders who shape the future of technology.' },
  { title: 'Social Implementation', text: 'Bringing new technologies out of the lab and into communities that need them.' },
  { title: 'Incubation', text: 'Supporting people and ideas as they grow into initiatives that change society.' },
]

const stats = [
  { value: '1,200+', label: 'Learners supported' },
  { value: '45', label: 'Research projects' },
  { value: '30', label: 'Community partners' },
  { value: '8', label: 'Years of service' },
]

const programs = [
  { title: 'Open Learning Courses', text: 'Free lectures and hands-on workshops on data, AI and the web, open to everyone.', image: '/images/community.jpg' },
  { title: 'Research Fellowships', text: 'Funding and mentorship for young researchers tackling socially meaningful problems.', image: '/images/research.jpg' },
  { title: 'Community Labs', text: 'Local hubs where residents, students and engineers build solutions together.', image: '/images/vision.jpg' },
]

const news = [
  { date: '2026.09.15', text: 'Opening of the autumn community learning program.' },
  { date: '2026.08.02', text: 'New research partnership announced with regional universities.' },
  { date: '2026.06.20', text: 'Annual report for the previous fiscal year is now available.' },
  { date: '2026.04.01', text: 'Applications open for the 2026 research fellowship.' },
]

export default function HomePage() {
  return (
    <>
      <section className="hero" style={{ backgroundImage: 'linear-gradient(rgba(6,26,64,.75), rgba(11,61,145,.7)), url(/images/hero.jpg)' }}>
        <p className="eyebrow">Non-profit Organization</p>
        <h1>
          Nurturing and sending out
          <br />
          the pioneers of our time.
        </h1>
        <p className="hero-sub">Taking on the challenge of creating intelligence.</p>
      </section>

      <section className="section">
        <SectionTitle label="About">About Our Organization</SectionTitle>
        <h3 className="lead">Nurturing and sending out the pioneers of our time.</h3>
        <p>We take on the challenge of “creating intelligence.”</p>
        <p>
          Starting from research on the web, we have taken on pioneering research of our era — from the vast
          amounts of data held by companies to deep learning.
        </p>
        <p>Our mission is to create new technologies that serve as signposts toward the future.</p>
        <p>
          At the same time, we are building an ecosystem of research, education, social implementation and
          incubation surrounding technology.
        </p>
        <ImageBanner src="/images/community.jpg" alt="People collaborating" caption="Building an ecosystem together" />
      </section>

      <section className="stats">
        {stats.map((s) => (
          <div key={s.label}>
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </section>

      <section className="section alt">
        <div className="inner">
          <SectionTitle label="Activities">What We Do</SectionTitle>
          <div className="grid">
            {pillars.map((p, i) => (
              <Card key={p.title} num={i + 1} title={p.title} text={p.text} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <SectionTitle label="Programs">Our Programs</SectionTitle>
        <div className="grid">
          {programs.map((p) => (
            <Card key={p.title} plain title={p.title} text={p.text} image={p.image} />
          ))}
        </div>
      </section>

      <section className="section alt">
        <div className="inner">
          <SectionTitle label="News">Latest Updates</SectionTitle>
          <ul className="news">
            {news.map((n) => (
              <ListItem key={n.date} date={n.date} text={n.text} />
            ))}
          </ul>
        </div>
      </section>

      <section className="cta">
        <h2>Join us in shaping the future</h2>
        <p>Volunteer, partner, or support our work. Get in touch at hello@example.org.</p>
      </section>
    </>
  )
}
