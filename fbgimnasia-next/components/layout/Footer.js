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
  { icon: 'fab fa-instagram', href: 'https://instagram.com/fbgimnasia', label: 'Instagram' },
  { icon: 'fab fa-facebook-f', href: '#', label: 'Facebook' },
  { icon: 'fab fa-youtube', href: '#', label: 'YouTube' },
  { icon: 'fab fa-whatsapp', href: '#', label: 'WhatsApp' },
  { icon: 'fas fa-envelope', href: '#', label: 'Email' },
]

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.name}>FBGimnasia</div>
      <div style={styles.line} />

      <div style={styles.social}>
        {social.map(s => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener" aria-label={s.label} style={styles.socialLink}>
            <i className={s.icon} />
          </a>
        ))}
      </div>

      <div style={styles.links}>
        {links.map(l => (
          l.external
            ? <a key={l.href} href={l.href} target="_blank" rel="noopener" style={styles.footerLink}>{l.label}</a>
            : <Link key={l.href} href={l.href} style={styles.footerLink}>{l.label}</Link>
        ))}
      </div>

      <div style={styles.copy}>
        © {new Date().getFullYear()} Federación Bonaerense de Gimnasia — Todos los derechos reservados.
      </div>
    </footer>
  )
}

const styles = {
  footer: { background: '#0F1923', padding: '60px 32px 40px', textAlign: 'center' },
  name: { fontFamily: 'DM Sans, sans-serif', fontSize: 28, fontWeight: 300, color: '#fff', letterSpacing: '0.08em' },
  line: { width: 40, height: 1.5, background: '#00BFDF', margin: '20px auto', opacity: 0.7 },
  social: { display: 'flex', justifyContent: 'center', gap: 14, marginBottom: 32 },
  socialLink: { width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.4)', fontSize: 14, textDecoration: 'none', transition: 'all .2s' },
  links: { display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap', marginBottom: 32 },
  footerLink: { fontSize: 12, color: 'rgba(255,255,255,0.35)', textDecoration: 'none' },
  copy: { fontSize: 11, color: 'rgba(255,255,255,0.2)' },
}
