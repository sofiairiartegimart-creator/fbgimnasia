import Link from 'next/link'

const links = [
  { href: '/autoridades', label: 'Autoridades' },
  { href: '/calendario', label: 'Calendario' },
  { href: '/reglamentos', label: 'Reglamentos' },
  { href: '/jueces', label: 'Jueces' },
  { href: '/normativas', label: 'Normativas' },
  { href: 'https://sistemagestiongimnastas.com/', label: 'SGG', external: true },
]

const social = [
  { icon: 'fab fa-facebook-f', href: 'https://www.facebook.com/FeBoGim/', label: 'Facebook' },
  { icon: 'fab fa-instagram', href: 'https://www.instagram.com/fbgargentina', label: 'Instagram' },
  { icon: 'fab fa-youtube', href: 'https://www.youtube.com/c/FederacionBonaerenseDeGimnasia', label: 'YouTube' },
]

export default function Footer() {
  return (
    <footer style={s.footer}>
      <div style={s.name}>FBGimnasia</div>
      <div style={s.tagline}>Federación Bonaerense de Gimnasia</div>
      <div style={s.line} />

      <div style={s.social}>
        {social.map(sc => (
          <a key={sc.label} href={sc.href} target="_blank" rel="noopener" aria-label={sc.label} style={s.socialLink}>
            <i className={sc.icon} />
          </a>
        ))}
      </div>

      <div style={s.links}>
        {links.map(l => (
          l.external
            ? <a key={l.href} href={l.href} target="_blank" rel="noopener" style={s.footerLink}>{l.label}</a>
            : <Link key={l.href} href={l.href} style={s.footerLink}>{l.label}</Link>
        ))}
      </div>

      <div style={s.copy}>
        © {new Date().getFullYear()} · Todos los derechos reservados
      </div>
    </footer>
  )
}

const s = {
  footer: { background: '#0F1923', padding: '60px 32px 40px', textAlign: 'center' },
  name: { fontFamily: 'DM Sans, sans-serif', fontSize: 28, fontWeight: 300, color: '#fff', letterSpacing: '0.08em' },
  tagline: { fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 6, letterSpacing: '0.04em' },
  line: { width: 40, height: 1.5, background: '#00BFDF', margin: '20px auto', opacity: 0.7 },
  social: { display: 'flex', justifyContent: 'center', gap: 14, marginBottom: 32 },
  socialLink: { width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.4)', fontSize: 14, textDecoration: 'none' },
  links: { display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap', marginBottom: 32 },
  footerLink: { fontSize: 12, color: 'rgba(255,255,255,0.35)', textDecoration: 'none' },
  copy: { fontSize: 11, color: 'rgba(255,255,255,0.2)' },
}
