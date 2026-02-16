import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollPosition } from '../../hooks/useScrollPosition'
import { navLinks, contactData } from '../../constants/data'
import { cn } from '../../utils/cn'
import logoZaro from '../../assets/images/LogoZaro.png'

function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  )
}

export default function Navbar() {
  const scrollY = useScrollPosition()
  const isScrolled = scrollY > 50
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const targets = document.querySelectorAll('[data-hide-navbar]')
    if (!targets.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const anyVisible = entries.some((e) => e.isIntersecting)
        setHidden(anyVisible)
      },
      { threshold: 0.15 }
    )

    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMobileOpen(false)

    if (location.pathname !== '/') {
      navigate('/' + href)
    } else {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleLogoClick = (e) => {
    e.preventDefault()
    if (location.pathname !== '/') {
      navigate('/')
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 z-40 w-full transition-all duration-700',
        hidden ? '-translate-y-full' : 'translate-y-0',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-black/5 shadow-sm'
          : 'bg-transparent'
      )}
    >
      {/* ── Desktop ── */}
      <div className="hidden md:block">
        {/* Row 1: social icons | logo | (empty) */}
        <div className="mx-auto grid max-w-7xl grid-cols-3 items-center px-8 pt-5 pb-3 lg:px-12">
          {/* Social icons — left */}
          <div className="flex items-center gap-4">
            <a
              href={contactData.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={cn('transition-opacity duration-300 hover:opacity-100', isScrolled ? 'text-charcoal/60' : 'text-white/60')}
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
            <a
              href={contactData.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className={cn('transition-opacity duration-300 hover:opacity-100', isScrolled ? 'text-charcoal/60' : 'text-white/60')}
              aria-label="Facebook"
            >
              <FacebookIcon />
            </a>
            <a
              href={contactData.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className={cn('transition-opacity duration-300 hover:opacity-100', isScrolled ? 'text-charcoal/60' : 'text-white/60')}
              aria-label="WhatsApp"
            >
              <WhatsAppIcon />
            </a>
          </div>

          {/* Logo — center */}
          <div className="flex justify-center">
            <a
              href="#"
              onClick={handleLogoClick}
            >
              <img
                src={logoZaro}
                alt="Zaro Fotografía"
                className={cn(
                  'w-auto transition-all duration-500',
                  isScrolled ? 'h-14': 'h-24 invert'
                )}
              />
            </a>
          </div>

          {/* Empty right column (language removed) */}
          <div />
        </div>

        {/* Row 2: nav links centered */}
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-12 px-8 pb-4 lg:px-12">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={cn('group relative font-serif text-[13px] uppercase tracking-[0.15em] transition-all duration-300 hover:opacity-100', isScrolled ? 'text-charcoal/70' : 'text-white/70')}
            >
              {link.label}
              <span className={cn('absolute -bottom-1 left-0 h-[1px] w-0 transition-all duration-300 group-hover:w-full', isScrolled ? 'bg-charcoal/70' : 'bg-white/70')} />
            </a>
          ))}
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="flex items-center justify-between px-6 py-4 md:hidden">
        <a
          href="#"
          onClick={handleLogoClick}
        >
          <img
            src={logoZaro}
            alt="Zaro Fotografía"
            className={cn('h-10 w-auto transition-all duration-500', !isScrolled && 'invert')}
          />
        </a>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col gap-[5px]"
          aria-label="Menu"
        >
          <span
            className={cn(
              'h-[1px] w-6 transition-all duration-300', isScrolled ? 'bg-charcoal/80' : 'bg-white/80',
              mobileOpen && 'translate-y-[6px] rotate-45'
            )}
          />
          <span
            className={cn(
              'h-[1px] w-6 transition-all duration-300', isScrolled ? 'bg-charcoal/80' : 'bg-white/80',
              mobileOpen && 'opacity-0'
            )}
          />
          <span
            className={cn(
              'h-[1px] w-6 transition-all duration-300', isScrolled ? 'bg-charcoal/80' : 'bg-white/80',
              mobileOpen && '-translate-y-[6px] -rotate-45'
            )}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden bg-charcoal/95 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col items-center gap-8 px-6 py-10">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.3 }}
                  className="font-serif text-[13px] uppercase tracking-[0.15em] text-white/70 transition-opacity duration-300 hover:opacity-100"
                >
                  {link.label}
                </motion.a>
              ))}

              {/* Social icons in mobile menu */}
              <div className="flex items-center gap-5 pt-4">
                <a href={contactData.social.instagram} target="_blank" rel="noopener noreferrer" className="text-white/50" aria-label="Instagram">
                  <InstagramIcon />
                </a>
                <a href={contactData.social.facebook} target="_blank" rel="noopener noreferrer" className="text-white/50" aria-label="Facebook">
                  <FacebookIcon />
                </a>
                <a href={contactData.whatsapp} target="_blank" rel="noopener noreferrer" className="text-white/50" aria-label="WhatsApp">
                  <WhatsAppIcon />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
