import { useState } from 'react'
import SectionTitle from '../components/SectionTitle'
import Reveal from '../components/Reveal'
import homeContent from '../data/home.json'

const amounts = [250, 500, 1000, 2500]
const { hero, glance, about, why, programs, process, focusAreas, values, usage, roadmap, involved, faq, volunteerBand } = homeContent

export default function HomePage() {
  const [amount, setAmount] = useState(() => {
    const savedAmount = Number(sessionStorage.getItem('oksyo-donation-amount'))
    return amounts.includes(savedAmount) ? savedAmount : 500
  })
  const [customAmount, setCustomAmount] = useState(() => {
    const savedAmount = Number(sessionStorage.getItem('oksyo-donation-amount'))
    return Number.isSafeInteger(savedAmount) && savedAmount >= 100 && savedAmount <= 1_000_000 && !amounts.includes(savedAmount)
      ? String(savedAmount)
      : ''
  })
  const selectedAmount = customAmount ? Number(customAmount) : amount
  const validAmount = Number.isSafeInteger(selectedAmount) && selectedAmount >= 100 && selectedAmount <= 1_000_000

  function continueToPayment() {
    if (!validAmount) return
    sessionStorage.setItem('oksyo-donation-amount', String(selectedAmount))
    window.location.hash = '#payment'
  }

  return (
    <>
      {/* Hero */}
      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1>{hero.title}</h1>
          <p className="hero-sub">{hero.text}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#donate">{hero.primaryCta}</a>
            <a className="button button-ghost" href="#about-us">{hero.secondaryCta}</a>
          </div>
        </div>
        <div className="hero-visual">
          <img src="/images/Pic1-IPT.jpg" alt="Children sharing a meal at a community feeding program" />
          <span className="hero-caption">Illustrative community imagery</span>
        </div>
      </section>

      {/* At a glance */}
      <section className="glance" aria-label="Oksyo at a glance">
        {glance.map((item) => (
          <div key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </section>

      {/* Who we are */}
      <section className="section about-us" id="about-us">
        <div className="about-us-grid">
          <Reveal>
            <SectionTitle label={about.label}>{about.title}</SectionTitle>
            {about.paragraphs.map((p) => <p className="lead-copy" key={p}>{p}</p>)}
            <a className="text-link" href="#about">Meet the founder →</a>
          </Reveal>
          <div className="mission-stack">
            <Reveal delay={80}>
              <article className="mission-card">
                <h3>{about.mission.title}</h3>
                <p>{about.mission.text}</p>
              </article>
            </Reveal>
            <Reveal delay={160}>
              <article className="mission-card alt">
                <h3>{about.vision.title}</h3>
                <p>{about.vision.text}</p>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="band band-soft" id="why-it-matters">
        <div className="section">
          <div className="why-grid">
            <Reveal>
              <SectionTitle label={why.label}>{why.title}</SectionTitle>
              <p className="lead-copy">{why.text}</p>
            </Reveal>
            <div className="why-points">
              {why.points.map((point, i) => (
                <Reveal key={point.title} delay={i * 90}>
                  <article className="why-point">
                    <span className="why-index">0{i + 1}</span>
                    <div>
                      <h3>{point.title}</h3>
                      <p>{point.text}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="section" id="programs">
        <div className="section-heading-row">
          <SectionTitle label={programs.label}>{programs.title}</SectionTitle>
          <p className="section-intro">{programs.intro}</p>
        </div>
        <div className="program-grid">
          {programs.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <article className="program-card">
                <span className="icon-badge" aria-hidden="true">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* How a meal day works */}
      <section className="band band-dark" id="how-it-works">
        <div className="section">
          <Reveal>
            <SectionTitle label={process.label}>{process.title}</SectionTitle>
          </Reveal>
          <ol className="process-list">
            {process.steps.map((step, i) => (
              <li key={step.title}>
                <Reveal delay={i * 80}>
                  <span className="process-num">{i + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Focus areas + gallery */}
      <section className="section" id="focus-areas">
        <div className="section-heading-row">
          <SectionTitle label={focusAreas.label}>{focusAreas.title}</SectionTitle>
          <p className="section-intro">{focusAreas.intro}</p>
        </div>
        <div className="area-grid">
          {focusAreas.items.map((area, i) => (
            <Reveal key={area.name} delay={i * 90}>
              <article className="area-card">
                <p className="area-city">{area.city}</p>
                <h3>{area.name}</h3>
                <p>{area.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="program-gallery" aria-label="Illustrative community and volunteer photos">
          <figure>
            <img src="/images/Pic2-IPT.jpg" alt="Children sharing a meal around a white table" />
            <figcaption>Shared meals</figcaption>
          </figure>
          <figure>
            <img src="/images/Pic3-IPT.jpg" alt="Children holding up bottles of water" />
            <figcaption>Healthy smiles</figcaption>
          </figure>
          <figure>
            <img src="/images/Pic4-IPT.jpg" alt="Children eating lunch at long tables" />
            <figcaption>Nourishing lunch</figcaption>
          </figure>
          <figure>
            <img src="/images/Pic5-IPT.jpg" alt="Children eating a school meal" />
            <figcaption>Fuel for learning</figcaption>
          </figure>
        </div>
        <p className="image-disclaimer">Photos are illustrative community imagery and are not documentation of Oksyo feeding activities.</p>
      </section>

      {/* Principles */}
      <section className="band band-soft" id="principles">
        <div className="section">
          <Reveal>
            <SectionTitle label={values.label}>{values.title}</SectionTitle>
          </Reveal>
          <div className="value-grid">
            {values.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 70}>
                <article className="value-card">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Impact banner */}
      <section className="impact-band">
        <div className="impact-copy">
          <p className="eyebrow">Small acts, shared impact</p>
          <h2>Local food. Lasting care.</h2>
          <p>We aim to work with local suppliers and community partners, keeping food support close to the people it is meant to serve.</p>
          <a className="text-link" href="#about">Meet the founder →</a>
        </div>
        <img src="/images/Pic7-IPT.jpg" alt="Volunteers serving meals to schoolchildren" />
      </section>

      {/* How your gift is used + roadmap */}
      <section className="section" id="transparency">
        <div className="two-col">
          <Reveal>
            <SectionTitle label={usage.label}>{usage.title}</SectionTitle>
            <p className="lead-copy">{usage.text}</p>
            <ul className="usage-list">
              {usage.items.map((item) => (
                <li key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <SectionTitle label={roadmap.label}>{roadmap.title}</SectionTitle>
            <ol className="roadmap">
              {roadmap.items.map((item) => (
                <li key={item.phase}>
                  <span className="roadmap-phase">{item.phase}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* Get involved */}
      <section className="band band-soft" id="get-involved">
        <div className="section">
          <Reveal>
            <SectionTitle label={involved.label}>{involved.title}</SectionTitle>
          </Reveal>
          <div className="involved-grid">
            {involved.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 90}>
                <article className="involved-card">
                  <span className="icon-badge" aria-hidden="true">{item.icon}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <a className="text-link" href={item.href}>{item.cta} →</a>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq-section" id="faq">
        <Reveal>
          <SectionTitle label={faq.label}>{faq.title}</SectionTitle>
        </Reveal>
        <div className="faq-list">
          {faq.items.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Donate */}
      <section className="band band-soft" aria-label="Donate">
        <div className="section donation-section" id="donate">
          <div className="donation-copy">
            <SectionTitle label="Give with purpose">Help put nourishing food on the table.</SectionTitle>
            <p>Your contribution can help with ingredients, meal preparation, and getting food to local families. Choose an amount in Philippine pesos and pay securely online.</p>
            <p className="donation-disclaimer">Contribution amounts are suggestions, not a guaranteed number of meals. We will confirm arrangements with you directly.</p>
          </div>
          <div className="donation-form">
            <fieldset>
              <legend>One-time donation amount</legend>
              <div className="amount-options">
                {amounts.map((option) => (
                  <button type="button" key={option} className={!customAmount && amount === option ? 'selected' : ''} onClick={() => { setAmount(option); setCustomAmount('') }} aria-pressed={!customAmount && amount === option}>
                    ₱{option.toLocaleString('en-PH')}
                  </button>
                ))}
              </div>
              <label className="custom-amount">
                <span className="custom-amount-heading">
                  <span>Other amount</span>
                  <small>Minimum ₱100</small>
                </span>
                <span className="custom-amount-control">
                  <span className="custom-amount-currency" aria-hidden="true">₱</span>
                  <input type="number" min="100" max="1000000" step="1" inputMode="numeric" aria-label="Other donation amount in Philippine pesos" placeholder="Enter amount" value={customAmount} onChange={(event) => setCustomAmount(event.target.value)} />
                </span>
              </label>
            </fieldset>
            <div className="donation-total"><span>Your donation</span><strong>₱{selectedAmount.toLocaleString('en-PH')}</strong></div>
            <button className="button button-primary donation-submit" type="button" onClick={continueToPayment} disabled={!validAmount}>
              Continue to payment
            </button>
            {!validAmount && <p className="payment-error" role="alert">Enter a whole-peso amount between ₱100 and ₱1,000,000.</p>}
            <p className="secure-note">Secure payment handled by Stripe. Oksyo does not receive or store your card details.</p>
          </div>
        </div>
      </section>

      <section className="volunteer-band">
        <div>
          <p className="eyebrow">{volunteerBand.eyebrow}</p>
          <h2>{volunteerBand.title}</h2>
        </div>
        <a className="button button-light" href="mailto:mejia.johnharold@student.auf.edu.ph?subject=Community%20feeding%20program">{volunteerBand.cta}</a>
      </section>
    </>
  )
}
