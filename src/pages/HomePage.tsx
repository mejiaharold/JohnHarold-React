import { useState } from 'react'
import SectionTitle from '../components/SectionTitle'

const amounts = [250, 500, 1000, 2500]

const waysToHelp = [
  { number: '01', title: 'Choose nourishing food', text: 'Plan balanced meals with rice, vegetables, protein, and fresh local ingredients.' },
  { number: '02', title: 'Prepare with care', text: 'Work with volunteers and community partners to prepare safe, filling meals.' },
  { number: '03', title: 'Reach families nearby', text: 'Bring meal support closer to children and households who need it in Metro Manila.' },
]

const focusAreas = [
  { name: 'Baseco, Tondo', city: 'Manila', text: 'An example neighborhood for listening with local families and exploring a community-led meal day.' },
  { name: 'Payatas', city: 'Quezon City', text: 'A potential area for connecting with community groups and understanding food support needs.' },
  { name: 'Nearby communities', city: 'Metro Manila', text: 'Additional locations can be shaped around partner referrals, volunteer capacity, and local priorities.' },
]

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
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Community-led feeding · in the Philippines</p>
          <h1>Good food.<br />Growing futures.</h1>
          <p className="hero-sub">Every child deserves a nourishing meal and the chance to thrive. Help bring practical, locally sourced food support to families in our community.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#donate">Donate now <span aria-hidden="true">↗</span></a>
            <a className="text-link" href="#our-approach">See how we help</a>
          </div>
          <p className="hero-note">Food support, prepared with care and respect.</p>
        </div>
        <div className="hero-image" role="img" aria-label="Children sharing a meal at a community feeding program">
          <span className="image-note"><span className="image-note-mark" /> Rooted in community</span>
        </div>
      </section>

      <section className="intro-band">
        <p>Food is more than a meal.</p>
        <span>It is energy to learn, room to grow, and a reminder that a community cares.</span>
      </section>

      <section className="section approach" id="our-approach">
        <div className="section-heading-row">
          <SectionTitle label="Our approach">A meal made possible, together.</SectionTitle>
          <p className="section-intro">We focus on thoughtful, community-based food support for children and families across the Philippines.</p>
        </div>
        <div className="steps-grid">
          {waysToHelp.map((step) => (
            <article className="step" key={step.number}>
              <span className="step-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section locations-section" id="program-locations">
        <div className="section-heading-row">
          <SectionTitle label="Where we hope to serve">Start local. Listen first.</SectionTitle>
          <p className="section-intro">These are illustrative focus areas for community conversations, not confirmed feeding sites. We will work with local leaders to identify needs, dates, and safe distribution points.</p>
        </div>
        <div className="locations-grid">
          {focusAreas.map((area, index) => (
            <article className="location-item" key={area.name}>
              <span className="location-number">0{index + 1}</span>
              <p className="location-city">{area.city}</p>
              <h3>{area.name}</h3>
              <p>{area.text}</p>
            </article>
          ))}
        </div>
        <div className="program-details">
          <div>
            <p className="eyebrow">A practical meal day</p>
            <h3>Good ingredients, less waste, thoughtful delivery.</h3>
          </div>
          <p>Our example program brings together locally sourced ingredients, reusable serving supplies where practical, safe food handling, and volunteer coordination. Menu and meal counts are planned with each community partner.</p>
        </div>
        <div className="program-gallery" aria-label="Illustrative community and volunteer photos">
          <figure>
            <img src="/images/Pic2-IPT.jpg" alt="A group of people standing together by the water" />
            <figcaption>Community connections</figcaption>
          </figure>
          <figure>
            <img src="/images/Pic3-IPT.jpg" alt="People working together around a table" />
            <figcaption>Planning with care</figcaption>
          </figure>
          <figure>
            <img src="/images/Pic4-IPT.jpg" alt="A group sharing a moment outdoors" />
            <figcaption>People at the heart of the work</figcaption>
          </figure>
          <figure>
            <img src="/images/Pic5-IPT.jpg" alt="Volunteers collaborating around a laptop" />
            <figcaption>Ideas shaped together</figcaption>
          </figure>
        </div>
        <p className="image-disclaimer">Photos are illustrative community imagery and are not documentation of Oksyo feeding activities.</p>
      </section>

      <section className="impact-band">
        <div className="impact-copy">
          <p className="eyebrow">Small acts, shared impact</p>
          <h2>Local food.<br />Lasting care.</h2>
          <p>We aim to work with local suppliers and community partners, keeping food support close to the people it is meant to serve.</p>
          <a className="text-link" href="#about">Meet the organization <span aria-hidden="true">↗</span></a>
        </div>
        <img src="/images/Pic6-IPT.jpg" alt="People collaborating around a laptop" />
      </section>

      <section className="section donation-section" id="donate">
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
            Continue to payment <span aria-hidden="true">↗</span>
          </button>
          {!validAmount && <p className="payment-error" role="alert">Enter a whole-peso amount between ₱100 and ₱1,000,000.</p>}
          <p className="secure-note">Secure payment handled by Stripe. Oksyo does not receive or store your card details.</p>
        </div>
      </section>

      <section className="volunteer-band">
        <div>
          <p className="eyebrow">More ways to help</p>
          <h2>Bring your time, skills, or a helping hand.</h2>
        </div>
        <a className="button button-light" href="mailto:mejia.johnharold@student.auf.edu.ph?subject=Community%20feeding%20program">Get in touch <span aria-hidden="true">↗</span></a>
      </section>
    </>
  )
}
