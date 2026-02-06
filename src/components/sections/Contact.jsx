import { useState } from 'react'
import { motion } from 'framer-motion'
import { contactData } from '../../constants/data'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

export default function Contact() {
  const [ref, isVisible] = useIntersectionObserver()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setFormData({ name: '', email: '', date: '', message: '' })
    setTimeout(() => setSubmitted(false), 4000)
  }

  const inputClasses =
    'w-full border-b border-charcoal/20 bg-transparent py-3 text-sm text-charcoal outline-none transition-colors duration-300 focus:border-gold placeholder:text-charcoal/40'

  return (
    <section id="contact" className="bg-cream py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="font-serif text-4xl text-charcoal md:text-5xl">
            Contacto
          </h2>
          <div className="mx-auto mt-4 h-px w-16 bg-gold" />
        </motion.div>

        <div className="mx-auto grid max-w-5xl gap-16 md:grid-cols-2">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              value={formData.name}
              onChange={handleChange}
              required
              className={inputClasses}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className={inputClasses}
            />
            <div>
              <label className="mb-1 block text-xs tracking-wider text-charcoal/50 uppercase">
                Fecha de la boda
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>
            <textarea
              name="message"
              placeholder="Cuéntame sobre tu boda..."
              value={formData.message}
              onChange={handleChange}
              rows={4}
              required
              className={`${inputClasses} resize-none`}
            />
            <button
              type="submit"
              className="bg-charcoal px-10 py-3 text-sm tracking-widest text-white transition-all duration-300 hover:bg-gold"
            >
              ENVIAR
            </button>
            {submitted && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-gold"
              >
                Mensaje enviado. Te contactaré pronto.
              </motion.p>
            )}
          </motion.form>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-10"
          >
            <div>
              <h3 className="mb-2 font-serif text-xl text-charcoal">Email</h3>
              <a
                href={`mailto:${contactData.email}`}
                className="text-sm text-charcoal/60 transition-colors hover:text-gold"
              >
                {contactData.email}
              </a>
            </div>
            <div>
              <h3 className="mb-2 font-serif text-xl text-charcoal">
                Teléfono
              </h3>
              <a
                href={`tel:${contactData.phone}`}
                className="text-sm text-charcoal/60 transition-colors hover:text-gold"
              >
                {contactData.phone}
              </a>
            </div>
            <div>
              <h3 className="mb-2 font-serif text-xl text-charcoal">
                Ubicación
              </h3>
              <p className="text-sm text-charcoal/60">{contactData.location}</p>
            </div>
            <div>
              <h3 className="mb-2 font-serif text-xl text-charcoal">
                Sígueme
              </h3>
              <div className="flex gap-6">
                <a
                  href={contactData.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-charcoal/60 transition-colors hover:text-gold"
                >
                  Instagram
                </a>
                <a
                  href={contactData.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-charcoal/60 transition-colors hover:text-gold"
                >
                  Facebook
                </a>
                <a
                  href={contactData.social.pinterest}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-charcoal/60 transition-colors hover:text-gold"
                >
                  Pinterest
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
