import SectionTitle from "../components/SectionTitle";
import aboutContent from "../data/about.json";

export default function AboutPage() {
  return (
    <>
      <section className="about-hero">
        <div className="about-hero-inner">
          <p className="eyebrow">{aboutContent.hero.eyebrow}</p>
          <h1>
            {aboutContent.hero.title.split("\n").map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
          </h1>
          <p>{aboutContent.hero.description}</p>
        </div>
        <img
          className="about-hero-image"
          src={aboutContent.hero.image}
          alt={aboutContent.hero.imageAlt}
        />
      </section>

      <section className="section about-story">
        <div className="about-story-heading">
          <SectionTitle label={aboutContent.story.label}>
            {aboutContent.story.title}
          </SectionTitle>
        </div>
        <div className="about-story-copy">
          {aboutContent.story.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <a className="text-link" href={aboutContent.story.linkHref}>
            {aboutContent.story.linkText} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <section className="leadership-section">
        <div className="leadership-inner">
          <img
            className="leader-photo"
            src={aboutContent.leadership.image}
            alt={aboutContent.leadership.imageAlt}
          />
          <div className="leader-copy">
            <p className="eyebrow">{aboutContent.leadership.eyebrow}</p>
            <h2>{aboutContent.leadership.name}</h2>
            <p className="leader-role">{aboutContent.leadership.role}</p>
            <p>{aboutContent.leadership.description}</p>
          </div>
        </div>
        <div className="crew-wrap">
          <SectionTitle label={aboutContent.leadership.crewLabel}>
            {aboutContent.leadership.crewTitle}
          </SectionTitle>
          <div className="crew-grid">
            {aboutContent.leadership.crewRoles.map((role) => (
              <article className="crew-role" key={role.number}>
                <span>{role.number}</span>
                <h3>{role.title}</h3>
                <p>{role.text}</p>
              </article>
            ))}
          </div>
          <p className="crew-note">{aboutContent.leadership.crewNote}</p>
        </div>
      </section>

      <section className="about-image-band">
        <img
          src={aboutContent.commitment.image}
          alt={aboutContent.commitment.imageAlt}
        />
        <div>
          <p className="eyebrow">{aboutContent.commitment.eyebrow}</p>
          <h2>{aboutContent.commitment.title}</h2>
          <p>{aboutContent.commitment.description}</p>
        </div>
      </section>

      <section className="section principles-section">
        <SectionTitle label={aboutContent.principles.label}>
          {aboutContent.principles.title}
        </SectionTitle>
        <div className="principles-grid">
          {aboutContent.principles.items.map((principle) => (
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
          <p className="eyebrow">{aboutContent.contact.eyebrow}</p>
          <h2>{aboutContent.contact.title}</h2>
          <p>{aboutContent.contact.description}</p>
        </div>
        <a
          className="button button-primary"
          href={`mailto:${aboutContent.contact.email}?subject=${encodeURIComponent(aboutContent.contact.subject)}`}
        >
          {aboutContent.contact.buttonText} <span aria-hidden="true">↗</span>
        </a>
      </section>
    </>
  );
}
