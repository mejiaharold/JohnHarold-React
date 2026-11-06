export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-about">
          <div className="footer-brand">
            <img src="/images/oksyo-mark.png" alt="" />
            <div>
              <strong>Oksyo</strong>
              <span>Community Feeding Program</span>
            </div>
          </div>
          <p>A community-led initiative bringing balanced, locally sourced meals to children and families across Metro Manila.</p>
        </div>
        <nav aria-label="Footer navigation">
          <h4>Explore</h4>
          <a href="#home">Home</a>
          <a href="#about-us">Who we are</a>
          <a href="#programs">Programs</a>
          <a href="#faq">FAQ</a>
        </nav>
        <nav aria-label="Get involved">
          <h4>Get involved</h4>
          <a href="#donate">Donate</a>
          <a href="#get-involved">Volunteer</a>
          <a href="#get-involved">Partner with us</a>
          <a href="#about">About the founder</a>
        </nav>
        <div className="footer-contact">
          <h4>Contact</h4>
          <a href="mailto:mejia.johnharold@student.auf.edu.ph">mejia.johnharold@student.auf.edu.ph</a>
          <span>Metro Manila, Philippines</span>
        </div>
      </div>
      <div className="footer-bottom">
        <span>&copy; 2026 Oksyo. All rights reserved.</span>
        <span>Payments securely processed by Stripe. Photos on this site are illustrative.</span>
      </div>
    </footer>
  )
}
