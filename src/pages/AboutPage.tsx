import { useState } from 'react'
import Reveal from '../components/Reveal'
import SectionTitle from '../components/SectionTitle'
import aboutContent from '../data/about.json'

const { profile, stats, story, hobbies, education, services, capabilities, certifications, projects, contact } = aboutContent

const jsonText = JSON.stringify(aboutContent, null, 2)

function downloadJson() {
  const url = URL.createObjectURL(new Blob([jsonText], { type: 'application/json' }))
  const link = document.createElement('a')
  link.href = url
  link.download = 'about.json'
  link.click()
  URL.revokeObjectURL(url)
}

export default function AboutPage() {
  const [showJson, setShowJson] = useState(false)

  return (
    <>
      <section className="about-hero">
        <div className="about-hero-inner">
          <p className="eyebrow">{profile.eyebrow}</p>
          <span className="status-pill"><i /> {profile.status}</span>
          <h1>
            {profile.greeting}
            <em>{profile.name}</em>
          </h1>
          <p className="about-role">{profile.role}</p>
          <p className="about-summary">{profile.summary}</p>
          <blockquote className="about-motto">“{profile.motto}”</blockquote>
          <div className="hero-actions">
            <a className="button button-primary" href={`mailto:${contact.email}?subject=${encodeURIComponent(contact.subject)}`}>
              {contact.buttonText} <span aria-hidden="true">↗</span>
            </a>
            <button type="button" className="button button-ghost" onClick={() => setShowJson((v) => !v)} aria-expanded={showJson}>
              {'{ }'} {showJson ? 'Hide' : 'View'} about.json
            </button>
          </div>
        </div>
        <div className="about-portrait">
          <img src={profile.image} alt={profile.imageAlt} />
          <span className="portrait-badge">{profile.tagline}</span>
        </div>
      </section>

      <section className="stats-strip" aria-label="Highlights">
        {stats.map((stat) => (
          <div key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </section>

      {showJson && (
        <section className="section json-section" aria-label="About data as JSON">
          <div className="json-window">
            <div className="json-bar">
              <i /><i /><i /><span>src/data/about.json</span>
              <button type="button" className="json-download" onClick={downloadJson}>Download .json</button>
            </div>
            <pre><code>{jsonText}</code></pre>
          </div>
        </section>
      )}

      <section className="section about-story">
        <Reveal>
          <SectionTitle label={story.label}>{story.title}</SectionTitle>
        </Reveal>
        <Reveal delay={120} className="about-story-copy">
          {story.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Reveal>
      </section>

      <section className="section hobbies-section">
        <Reveal>
          <SectionTitle label={hobbies.label}>{hobbies.title}</SectionTitle>
        </Reveal>
        <div className="hobby-grid">
          {hobbies.items.map((hobby, index) => (
            <Reveal key={hobby.title} delay={index * 80}>
              <article className="hobby-card">
                <span className="hobby-icon" aria-hidden="true">{hobby.icon}</span>
                <h3>{hobby.title}</h3>
                <p>{hobby.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="dark-section">
        <div className="section">
          <Reveal>
            <SectionTitle label={education.label}>{education.title}</SectionTitle>
          </Reveal>
          <ol className="timeline">
            {education.items.map((item) => (
              <li key={item.program}>
                <Reveal>
                  <span className="timeline-period">{item.period}</span>
                  <h3>{item.program}</h3>
                  <p className="timeline-school">{item.school}</p>
                  <p>{item.detail}</p>
                  {item.highlights.length > 0 && (
                    <ul className="chip-row">
                      {item.highlights.map((h) => <li key={h}>{h}</li>)}
                    </ul>
                  )}
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <Reveal>
          <SectionTitle label={services.label}>{services.title}</SectionTitle>
        </Reveal>
        <div className="service-grid">
          {services.items.map((service, index) => (
            <Reveal key={service.title} delay={index * 80}>
              <article className="service-card">
                <span className="hobby-icon" aria-hidden="true">{service.icon}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <ul className="chip-row">
                  {service.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section capabilities-section">
        <Reveal>
          <SectionTitle label={capabilities.label}>{capabilities.title}</SectionTitle>
        </Reveal>
        <div className="capability-grid">
          {capabilities.groups.map((group, index) => (
            <Reveal key={group.name} delay={index * 60}>
              <article className="capability-card">
                <h3>{group.name}</h3>
                <ul className="chip-row">
                  {group.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <Reveal>
          <SectionTitle label={certifications.label}>{certifications.title}</SectionTitle>
        </Reveal>
        <div className="cert-grid">
          {certifications.items.map((cert, index) => (
            <Reveal key={cert.title} delay={index * 60}>
              <article className="cert-card">
                <h3>{cert.title}</h3>
                <p>{cert.issuer}</p>
                <div>
                  <time>{cert.date}</time>
                  <span className="cert-status">{cert.status}</span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section project-section">
        <Reveal>
          <SectionTitle label={projects.label}>{projects.title}</SectionTitle>
        </Reveal>
        <div className="project-grid">
          {projects.items.map((project, index) => (
            <Reveal key={project.title} delay={index * 60}>
              <article className="project-card">
                <span>{project.type}</span>
                <h3>{project.title}</h3>
                <p>{project.stack}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="contact-band" id="contact">
        <div>
          <p className="eyebrow">{contact.eyebrow}</p>
          <h2>{contact.title}</h2>
          <p>{contact.description}</p>
          <ul className="contact-list">
            <li><b>Email</b> {contact.email}</li>
            <li><b>Phone</b> {contact.phone}</li>
            <li><b>Location</b> {contact.location}</li>
          </ul>
        </div>
        <a className="button button-primary" href={`mailto:${contact.email}?subject=${encodeURIComponent(contact.subject)}`}>
          {contact.buttonText} <span aria-hidden="true">↗</span>
        </a>
      </section>
    </>
  )
}
