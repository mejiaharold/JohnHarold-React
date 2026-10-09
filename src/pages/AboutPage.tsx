import Card from '../components/Card'
import ImageBanner from '../components/ImageBanner'
import ListItem from '../components/ListItem'
import SectionTitle from '../components/SectionTitle'

const values = ['Curiosity', 'Integrity', 'Collaboration', 'Inclusion']

const timeline = [
  { year: '2018', text: 'Founded the organization with a small group of volunteers.' },
  { year: '2020', text: 'Launched the open learning courses.' },
  { year: '2023', text: 'Opened the first community lab and research fellowship.' },
  { year: '2026', text: 'Expanded to regional partnerships and startup incubation.' },
]

export default function AboutPage() {
  return (
    <>
      <section className="section">
        <SectionTitle label="About">About Me</SectionTitle>
        <div className="bio">
          <img className="portrait" src="/images/portrait.jpg" alt="Portrait of John Harold Mejia" />
          <div>
            <h3 className="lead">John Harold Mejia</h3>
            <p className="role">Founder &amp; Volunteer Coordinator</p>
            <p>
              Hello! I am John Harold Mejia, a passionate advocate for community development and technology
              education. Replace this paragraph with your own biography: where you grew up, what you studied,
              and what motivated you to start this non-profit.
            </p>
            <p>
              My mission is to open doors for people through learning, research and practical support,
              building a community where everyone can contribute to a better future.
            </p>
            <dl className="facts">
              <dt>Location</dt>
              <dd>Pampanga, Philippines</dd>
              <dt>Education</dt>
              <dd>Bachelor of Science in Information Technology, Philippines</dd>
              <dt>Interests</dt>
              <dd>Education, Technology, Community Service</dd>
              <dt>Email</dt>
              <dd>mejia.johnharold@student.auf.edu.ph</dd>
            </dl>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="inner">
          <ImageBanner src="/images/vision.jpg" alt="Looking toward the future" />
          <div className="two-col">
            <div>
              <SectionTitle label="Vision">Our Vision</SectionTitle>
              <p>
                A world where everyone, regardless of background, has access to knowledge and technology, and
                the power to use them to create a better society.
              </p>
            </div>
            <div>
              <SectionTitle label="Mission">Our Mission</SectionTitle>
              <p>
                To nurture pioneers through research, education, social implementation and incubation, and to
                create new technologies that serve as signposts toward the future.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <SectionTitle label="Values">What I Believe In</SectionTitle>
        <div className="grid">
          {values.map((v, i) => (
            <Card key={v} num={i + 1} title={v} />
          ))}
        </div>
      </section>

      <section className="section alt">
        <div className="inner">
          <SectionTitle label="Journey">My Journey</SectionTitle>
          <ul className="news">
            {timeline.map((t) => (
              <ListItem key={t.year} date={t.year} text={t.text} />
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}


