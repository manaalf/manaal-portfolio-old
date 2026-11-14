import Lanyard from "./Lanyard";
import { LINKS } from "@/data/links";
import CopyEmail from "./CopyEmail";

// "Let's talk." with the badge hanging between the words, back side out.
// The same links are repeated below as plain text, for keyboards, screen
// readers, and anyone who doesn't think to flip a badge.
export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <div className="talk">
          <span className="talk-word">Let’s</span>
          <Lanyard variant="contact" />
          <span className="talk-word">talk.</span>
        </div>
        <p className="label">Get in touch</p>
        <div className="contact-email-row">
          <a className="contact-email" href={`mailto:${LINKS.email}`}>{LINKS.email}</a>
          <CopyEmail email={LINKS.email} />
        </div>
        <footer className="footer">
          <div className="footer-links">
            <a href={LINKS.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={LINKS.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={LINKS.resume} target="_blank" rel="noreferrer">Resume</a>
          </div>
          <small>© 2026 Manaal Fatima · Orange County, California</small>
        </footer>
      </div>
    </section>
  );
}
