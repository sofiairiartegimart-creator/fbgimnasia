import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const disciplinas = [
  { slug: 'artistica-femenina',  nombre: 'Artística Femenina',  abrev: 'GAF' },
  { slug: 'artistica-masculina', nombre: 'Artística Masculina', abrev: 'GAM' },
  { slug: 'ritmica',             nombre: 'Rítmica',             abrev: 'GR'  },
  { slug: 'aerobica-deportiva',  nombre: 'Aeróbica Deportiva',  abrev: 'AER' },
  { slug: 'trampolin',           nombre: 'Trampolín',           abrev: 'TRA' },
  { slug: 'acrobatica',          nombre: 'Acrobática',          abrev: 'GA'  },
  { slug: 'gimnasia-para-todos', nombre: 'Gimnasia para Todos', abrev: 'GPT' },
  { slug: 'parkour',             nombre: 'Parkour',             abrev: 'PK'  },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSection, setMobileSection] = useState(null)
  const [mobileDisc, setMobileDisc] = useState(null)
  const router = useRouter()

  const isActive = (path) => router.pathname === path || router.pathname.startsWith(path + '/')

  const toggleSection = (sec) => setMobileSection(mobileSection === sec ? null : sec)
  const toggleDisc = (d) => setMobileDisc(mobileDisc === d ? null : d)

  return (
    <>
      <div style={{ background: 'var(--cyan)', height: 38 }} />

      <header style={styles.header}>
        {/* LOGO */}
        <Link href="/" style={styles.logo}>
          <div style={styles.logoText}>
            <div style={styles.brand}>FB<span style={{ color: 'var(--cyan)' }}>Gimnasia</span></div>
            <div style={styles.sub}>Federación Bonaerense de Gimnasia</div>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav style={styles.nav}>
          <Link href="/calendario" style={{ ...styles.navLink, ...(isActive('/calendario') ? styles.navLinkActive : {}) }}>
            Calendario
          </Link>

          {/* Disciplinas dropdown */}
          <div style={styles.dropdown}>
            <span style={styles.navLink}>
              Disciplinas <i className="fas fa-chevron-down" style={{ fontSize: 9 }} />
            </span>
            <div style={styles.dropMenu}>
              {disciplinas.map(d => (
                <div key={d.slug} style={styles.dropItem}>
                  <Link href={`/disciplinas/${d.slug}`} style={styles.dropLink}>
                    {d.nombre}
                    <i className="fas fa-chevron-right" style={{ fontSize: 9, marginLeft: 'auto' }} />
                  </Link>
                  <div style={styles.subDropMenu}>
                    <Link href={`/disciplinas/${d.slug}?tab=invitaciones`} style={styles.subDropLink}>Invitaciones a torneos</Link>
                    <Link href={`/disciplinas/${d.slug}?tab=reglamentos`} style={styles.subDropLink}>Reglamentos</Link>
                    <Link href={`/disciplinas/${d.slug}?tab=resultados`} style={styles.subDropLink}>Resultados</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Institucional dropdown */}
          <div style={styles.dropdown}>
            <span style={styles.navLink}>
              Institucional <i className="fas fa-chevron-down" style={{ fontSize: 9 }} />
            </span>
            <div style={styles.dropMenu}>
              <Link href="/autoridades" style={styles.dropLink}>Autoridades</Link>
              <Link href="/reglamentos" style={styles.dropLink}>Reglamentos Generales</Link>
              <Link href="/jueces" style={styles.dropLink}>Listado de Jueces</Link>
              <Link href="/instituciones-afiliadas" style={styles.dropLink}>Instituciones Afiliadas</Link>
            </div>
          </div>

          <Link href="/normativas" style={{ ...styles.navLink, ...(isActive('/normativas') ? styles.navLinkActive : {}) }}>
            Normativas
          </Link>

          <a href="https://sistemagestiongimnastas.com/" target="_blank" rel="noopener" style={styles.sggBtn}>
            <i className="fas fa-users" style={{ marginRight: 6, fontSize: 11 }} /> SGG
          </a>
        </nav>

        {/* SEARCH */}
        <div style={styles.search}>
          <i className="fas fa-search" style={{ color: 'var(--cyan)', fontSize: 14 }} />
          <input placeholder="Buscar..." style={styles.searchInput} />
        </div>

        {/* HAMBURGER */}
        <button
          style={styles.hamburger}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menú"
        >
          <span style={{ ...styles.hLine, ...(mobileOpen ? { transform: 'translateY(7px) rotate(45deg)' } : {}) }} />
          <span style={{ ...styles.hLine, ...(mobileOpen ? { opacity: 0 } : {}) }} />
          <span style={{ ...styles.hLine, ...(mobileOpen ? { transform: 'translateY(-7px) rotate(-45deg)' } : {}) }} />
        </button>
      </header>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div style={styles.mobileMenu}>
          <Link href="/" style={styles.mobLink} onClick={() => setMobileOpen(false)}>
            <i className="fas fa-home" style={{ color: 'var(--cyan)' }} /> Inicio
          </Link>
          <Link href="/calendario" style={styles.mobLink} onClick={() => setMobileOpen(false)}>
            Calendario
          </Link>

          {/* Disciplinas */}
          <div>
            <div style={styles.mobHead} onClick={() => toggleSection('disc')}>
              Disciplinas <i className={`fas fa-chevron-${mobileSection === 'disc' ? 'up' : 'down'}`} style={{ fontSize: 11 }} />
            </div>
            {mobileSection === 'disc' && (
              <div style={styles.mobSub}>
                {disciplinas.map(d => (
                  <div key={d.slug}>
                    <div style={styles.mobDiscHead} onClick={() => toggleDisc(d.slug)}>
                      {d.nombre}
                      <i className={`fas fa-chevron-${mobileDisc === d.slug ? 'up' : 'down'}`} style={{ fontSize: 10 }} />
                    </div>
                    {mobileDisc === d.slug && (
                      <div style={styles.mobDiscSub}>
                        <Link href={`/disciplinas/${d.slug}?tab=invitaciones`} style={styles.mobDiscLink} onClick={() => setMobileOpen(false)}>Invitaciones</Link>
                        <Link href={`/disciplinas/${d.slug}?tab=reglamentos`} style={styles.mobDiscLink} onClick={() => setMobileOpen(false)}>Reglamentos</Link>
                        <Link href={`/disciplinas/${d.slug}?tab=resultados`} style={styles.mobDiscLink} onClick={() => setMobileOpen(false)}>Resultados</Link>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Institucional */}
          <div>
            <div style={styles.mobHead} onClick={() => toggleSection('inst')}>
              Institucional <i className={`fas fa-chevron-${mobileSection === 'inst' ? 'up' : 'down'}`} style={{ fontSize: 11 }} />
            </div>
            {mobileSection === 'inst' && (
              <div style={styles.mobSub}>
                <Link href="/autoridades" style={styles.mobSubLink} onClick={() => setMobileOpen(false)}>Autoridades</Link>
                <Link href="/reglamentos" style={styles.mobSubLink} onClick={() => setMobileOpen(false)}>Reglamentos</Link>
                <Link href="/jueces" style={styles.mobSubLink} onClick={() => setMobileOpen(false)}>Jueces</Link>
              </div>
            )}
          </div>

          <Link href="/normativas" style={styles.mobLink} onClick={() => setMobileOpen(false)}>Normativas</Link>

          <a href="https://sistemagestiongimnastas.com/" target="_blank" rel="noopener" style={styles.mobSgg}>
            SGG — Sistema de Gestión
          </a>
        </div>
      )}
    </>
  )
}

const styles = {
  header: { background: '#fff', borderBottom: '1px solid var(--border2)', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68, position: 'sticky', top: 0, zIndex: 1000, boxShadow: '0 2px 20px rgba(0,191,223,0.07)' },
  logo: { display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' },
  logoText: {},
  brand: { fontFamily: 'DM Serif Display, serif', fontSize: 18, color: 'var(--ink)', lineHeight: 1.2 },
  sub: { fontSize: 10, color: 'var(--muted)', letterSpacing: '0.04em' },
  nav: { display: 'flex', alignItems: 'center', height: 68, gap: 2 },
  navLink: { display: 'flex', alignItems: 'center', gap: 5, height: '100%', padding: '0 14px', fontSize: 13, fontWeight: 500, color: 'var(--muted)', borderBottom: '2.5px solid transparent', cursor: 'pointer', transition: 'all .2s', whiteSpace: 'nowrap' },
  navLinkActive: { color: 'var(--cyan)', borderBottomColor: 'var(--cyan)' },
  dropdown: { position: 'relative', height: 68, display: 'flex', alignItems: 'center' },
  dropMenu: { display: 'none', position: 'absolute', top: '100%', left: 0, background: '#fff', border: '1px solid var(--border2)', borderRadius: 12, minWidth: 220, boxShadow: '0 12px 40px rgba(0,0,0,0.1)', zIndex: 200 },
  dropItem: { position: 'relative' },
  dropLink: { display: 'flex', alignItems: 'center', padding: '10px 16px', fontSize: 13, color: 'var(--ink2)', borderBottom: '1px solid rgba(0,191,223,0.08)', transition: 'background .15s' },
  subDropMenu: { display: 'none', position: 'absolute', top: 0, left: '100%', background: '#fff', border: '1px solid var(--border2)', borderRadius: 12, minWidth: 200, boxShadow: '0 8px 32px rgba(0,0,0,0.12)', zIndex: 300 },
  subDropLink: { display: 'block', padding: '10px 16px', fontSize: 13, color: 'var(--ink2)', borderBottom: '1px solid rgba(0,191,223,0.08)' },
  sggBtn: { display: 'flex', alignItems: 'center', background: 'var(--ink)', color: '#fff', borderRadius: 8, margin: '0 0 0 6px', padding: '7px 16px', fontSize: 12, fontWeight: 600, textDecoration: 'none', letterSpacing: '0.04em' },
  search: { display: 'flex', alignItems: 'center', background: 'var(--cyan-pale)', border: '1px solid var(--border2)', borderRadius: 24, padding: '7px 14px', gap: 7 },
  searchInput: { border: 'none', background: 'transparent', fontSize: 13, color: 'var(--ink)', outline: 'none', width: 130, fontFamily: 'DM Sans, sans-serif' },
  hamburger: { display: 'none', flexDirection: 'column', gap: 5, padding: 6, background: 'none', border: 'none' },
  hLine: { display: 'block', width: 24, height: 2, background: 'var(--ink)', borderRadius: 2, transition: 'all .3s' },
  mobileMenu: { display: 'block', position: 'fixed', top: 68, left: 0, right: 0, bottom: 0, background: '#fff', zIndex: 9999, overflowY: 'auto', borderTop: '3px solid var(--cyan)' },
  mobLink: { display: 'flex', alignItems: 'center', gap: 10, padding: '16px 24px', fontSize: 15, fontWeight: 500, color: 'var(--ink)', borderBottom: '1px solid var(--border)', textDecoration: 'none' },
  mobHead: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 24px', fontSize: 15, fontWeight: 500, color: 'var(--ink)', borderBottom: '1px solid var(--border)', cursor: 'pointer' },
  mobSub: { background: 'var(--bg)', borderBottom: '1px solid var(--border)' },
  mobSubLink: { display: 'block', padding: '12px 36px', fontSize: 14, color: 'var(--muted)', borderBottom: '1px solid var(--border)', textDecoration: 'none' },
  mobDiscHead: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 36px', fontSize: 14, fontWeight: 500, color: 'var(--ink2)', cursor: 'pointer', borderBottom: '1px solid var(--border)' },
  mobDiscSub: { background: '#fff' },
  mobDiscLink: { display: 'block', padding: '10px 52px', fontSize: 13, color: 'var(--cyan)', borderBottom: '1px solid var(--border)', textDecoration: 'none' },
  mobSgg: { display: 'block', margin: '16px 24px 20px', background: 'var(--ink)', color: '#fff', borderRadius: 8, padding: 14, fontSize: 14, fontWeight: 600, textAlign: 'center', textDecoration: 'none' },
}
