import Link from "next/link";

// "/#section" links also work from inside a case study
export default function Header() {
  return (
    <header className="header">
      <div className="wrap header-inner">
        <Link href="/" className="brand">Manaal Fatima</Link>
        <nav className="nav" aria-label="Main">
          <Link href="/#work">Work</Link>
          <Link href="/#about">About</Link>
          <Link href="/#experience" className="nav-optional">Experience</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
