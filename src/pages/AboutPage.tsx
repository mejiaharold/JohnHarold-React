import SectionTitle from '../components/SectionTitle'

const principles = [
  { number: '01', title: 'Nutritious by design', text: 'We believe meals should be satisfying, balanced, and prepared with care.' },
  { number: '02', title: 'Community first', text: 'Local knowledge and trusted relationships help food support reach people respectfully.' },
  { number: '03', title: 'Thoughtful sourcing', text: 'Where possible, we prioritize local ingredients and practical choices that reduce waste.' },
]

const crewRoles = [
  { number: '01', title: 'Community outreach', text: 'Build relationships with neighborhood leaders and listen to families about local needs.' },
  { number: '02', title: 'Meal preparation', text: 'Coordinate ingredients, food safety, and thoughtful preparation with volunteers.' },
  { number: '03', title: 'Volunteer coordination', text: 'Bring people together and help each community activity run smoothly.' },
]

export default function AboutPage() {
  return (
    <>
      <section className="about-hero">
        <div className="about-hero-inner">
          <p className="eyebrow">About Oksyo</p>
          <h1>Care starts<br />around the table.</h1>
          <p>We are building a community feeding effort that helps children and families access nourishing food in the Philippines.</p>
        </div>
        <img className="about-hero-image" src="/images/Pic7-IPT.jpg" alt="Community members sharing ideas around a table" />
      </section>

      <section className="section about-story">
        <div className="about-story-heading">
          <SectionTitle label="Our purpose">Food support with dignity at its heart.</SectionTitle>
        </div>
        <div className="about-story-copy">
          <p>Oksyo is focused on a simple, urgent need: making nourishing meals more accessible to children and people facing food insecurity.</p>
          <p>Our approach brings together local ingredients, volunteers, and community partners. By listening to the people closest to each neighborhood, we can shape food support around real needs and deliver it with respect.</p>
          <a className="text-link" href="#donate">Support the feeding program <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <section className="leadership-section">
        <div className="leadership-inner">
          <img className="leader-photo" src="/images/john-harold-mejia.png" alt="Portrait of John Harold Mejia" />
          <div className="leader-copy">
            <p className="eyebrow">Organization leadership</p>
            <h2>John Harold Mejia</h2>
            <p className="leader-role">Founder and Chief Executive Officer</p>
            <p>John leads Oksyo's community feeding mission, bringing people together around practical food support for children and families in the Philippines. The work is guided by listening, dignity, and care for the communities it serves.</p>
          </div>
        </div>
        <div className="crew-wrap">
          <SectionTitle label="The people behind the work">A crew that makes care practical.</SectionTitle>
          <div className="crew-grid">
            {crewRoles.map((role) => (
              <article className="crew-role" key={role.number}>
                <span>{role.number}</span>
                <h3>{role.title}</h3>
                <p>{role.text}</p>
              </article>
            ))}
          </div>
          <p className="crew-note">Crew roles are shown here; individual team names and portraits will be added as they are confirmed.</p>
        </div>
      </section>

      <section className="about-image-band">
        <img src="/images/Pic8-IPT.jpg" alt="Community members gathered around a table" />
        <div>
          <p className="eyebrow">Our commitment</p>
          <h2>Good food should bring people together, not leave anyone behind.</h2>
          <p>We want every part of our work, from sourcing to serving, to reflect care for people and the places we share.</p>
        </div>
      </section>

      <section className="section principles-section">
        <SectionTitle label="What guides us">The way we show up matters.</SectionTitle>
        <div className="principles-grid">
          {principles.map((principle) => (
            <article className="principle" key={principle.number}>
              <span>{principle.number}</span>
              <h3>{principle.title}</h3>
              <p>{principle.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-band" id="about">
        <div>
          <p className="eyebrow">Work with us</p>
          <h2>There is room for you at the table.</h2>
          <p>Connect with us about volunteering, food contributions, or community partnerships.</p>
        </div>
        <a className="button button-primary" href="mailto:mejia.johnharold@student.auf.edu.ph?subject=Community%20feeding%20program">Contact Oksyo <span aria-hidden="true">↗</span></a>
      </section>
    </>
  )
}


