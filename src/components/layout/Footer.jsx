import { contactData } from '../../constants/data'

export default function Footer() {
  const scrollToTop = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-charcoal py-12 text-white/50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={scrollToTop}
            className="font-serif text-xl tracking-[0.3em] text-white transition-colors hover:text-gold"
          >
            ZARO
          </a>

          {/* Social links */}
          <div className="flex gap-6 text-sm">
            <a
              href={contactData.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="tracking-wider transition-colors hover:text-gold"
            >
              Instagram
            </a>
            <a
              href={contactData.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="tracking-wider transition-colors hover:text-gold"
            >
              Facebook
            </a>
            <a
              href={contactData.social.pinterest}
              target="_blank"
              rel="noopener noreferrer"
              className="tracking-wider transition-colors hover:text-gold"
            >
              Pinterest
            </a>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="text-sm tracking-wider transition-colors hover:text-gold"
          >
            Volver arriba &uarr;
          </button>
        </div>

        <div className="mt-8 border-t border-white/10 pt-8 text-center text-xs tracking-wider">
          <p>&copy; {new Date().getFullYear()} Zaro Fotografia. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
