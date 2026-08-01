import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const disciplinas = [
  { slug: 'artistica-femenina',  nombre: 'Artística Femenina' },
  { slug: 'artistica-masculina', nombre: 'Artística Masculina' },
  { slug: 'ritmica',             nombre: 'Rítmica' },
  { slug: 'aerobica-deportiva',  nombre: 'Aeróbica Deportiva' },
  { slug: 'trampolin',           nombre: 'Trampolín' },
  { slug: 'acrobatica',          nombre: 'Acrobática' },
  { slug: 'gimnasia-para-todos', nombre: 'Gimnasia para Todos' },
  { slug: 'parkour',             nombre: 'Parkour' },
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

      <header style={s.header}>
        <Link href="/" style={s.logo}>
          <div>
            <div style={s.brand}>FB<span style={{ color: 'var(--cyan)' }}>Gimnasia</span></div>
            <div style={s.sub}>Federación Bonaerense de Gimnasia</div>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav style={s.nav}>

          {/* Calendario con sub */}
          <div className="fbg-drop" style={s.dropWrap}>
            <Link href="/calendario" style={{ ...s.navLink, ...(isActive('/calendario') ? s.navActive : {}) }}>
              Calendario <i className="fas fa-chevron-down" style={{ fontSize: 9 }} />
            </Link>
            <div className="fbg-drop-menu" style={s.dropMenu}>
              <Link href="/calendario" style={s.dropLink}>Torneos</Link>
              <Link href="/calendario?sec=jueces" style={s.dropLink}>Curso de jueces</Link>
              <Link href="/calendario?sec=entrenadores" style={s.dropLink}>Curso de entrenadores</Link>
            </div>
          </div>

          {/* Disciplinas */}
          <div className="fbg-drop" style={s.dropWrap}>
            <span style={s.navLink}>Disciplinas <i className="fas fa-chevron-down" style={{ fontSize: 9 }} /></span>
            <div className="fbg-drop-menu" style={{ ...s.dropMenu, minWidth: 240 }}>
              {disciplinas.map(d => (
                <div key={d.slug} className="fbg-drop-item" style={{ position: 'relative' }}>
                  <Link href={`/disciplinas/${d.slug}`} style={{ ...s.dropLink, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    {d.nombre}
                    <i className="fas fa-chevron-right" style={{ fontSize: 9 }} />
                  </Link>
                  <div className="fbg-sub-menu" style={s.subMenu}>
                    <Link href={`/disciplinas/${d.slug}?tab=invitaciones`} style={s.dropLink}>Invitaciones a torneos</Link>
                    <Link href={`/disciplinas/${d.slug}?tab=reglamentos`} style={s.dropLink}>Reglamentos</Link>
                    <Link href={`/disciplinas/${d.slug}?tab=resultados`} style={s.dropLink}>Resultados</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Institucional */}
          <div className="fbg-drop" style={s.dropWrap}>
            <Link href="/autoridades" style={{ ...s.navLink, ...(isActive('/autoridades') ? s.navActive : {}) }}>
              Institucional <i className="fas fa-chevron-down" style={{ fontSize: 9 }} />
            </Link>
            <div className="fbg-drop-menu" style={s.dropMenu}>
              <Link href="/autoridades" style={s.dropLink}>Autoridades</Link>
              <Link href="/comite-disciplina" style={s.dropLink}>Comité de disciplina</Link>
              <Link href="/reglamentos" style={s.dropLink}>Reglamentos generales</Link>
              <Link href="/instituciones-afiliadas" style={s.dropLink}>Instituciones afiliadas</Link>
              <Link href="/jueces" style={s.dropLink}>Listado de jueces</Link>
            </div>
          </div>

          {/* Normativas */}
          <div className="fbg-drop" style={s.dropWrap}>
            <Link href="/normativas" style={{ ...s.navLink, ...(isActive('/normativas') ? s.navActive : {}) }}>
              Normativas <i className="fas fa-chevron-down" style={{ fontSize: 9 }} />
            </Link>
            <div className="fbg-drop-menu" style={s.dropMenu}>
              <Link href="/normativas" style={s.dropLink}>Instructivos</Link>
              <Link href="/normativas?sec=aranceles" style={s.dropLink}>Aranceles</Link>
              <Link href="/normativas?sec=formularios" style={s.dropLink}>Formularios</Link>
            </div>
          </div>

          <a href="https://sistemagestiongimnastas.com/" target="_blank" rel="noopener" style={s.sggBtn}>
            <i className="fas fa-users" style={{ marginRight: 6, fontSize: 11 }} /> SGG
          </a>
        </nav>

        <div style={s.search}>
          <i className="fas fa-search" style={{ color: 'var(--cyan)', fontSize: 14 }} />
          <input placeholder="Buscar..." style={s.searchInput} />
          <span style={{ fontSize: 11, color: 'var(--muted)' }}>⌘K</span>
        </div>

        <button style={s.hamburger} onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menú">
          <span style={{ ...s.hLine, ...(mobileOpen ? { transform: 'translateY(7px) rotate(45deg)' } : {}) }} />
          <span style={{ ...s.hLine, ...(mobileOpen ? { opacity: 0 } : {}) }} />
          <span style={{ ...s.hLine, ...(mobileOpen ? { transform: 'translateY(-7px) rotate(-45deg)' } : {}) }} />
        </button>
      </header>

      <style>{`
        .fbg-drop:hover .fbg-drop-menu { display: block !important; }
        .fbg-drop-item:hover .fbg-sub-menu { display: block !important; }
        .fbg-drop-menu a:hover { background: var(--cyan-pale); color: var(--cyan); }
      `}</style>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div style={s.mobileMenu}>
          <Link href="/" style={s.mobLink} onClick={() => setMobileOpen(false)}>
            <i className="fas fa-home" style={{ color: 'var(--cyan)' }} /> Inicio
          </Link>

          <div>
            <div style={s.mobHead} onClick={() => toggleSection('cal')}>
              Calendario <i className={`fas fa-chevron-${mobileSection === 'cal' ? 'up' : 'down'}`} style={{ fontSize: 11 }} />
            </div>
            {mobileSection === 'cal' && (
              <div style={s.mobSub}>
                <Link href="/calendario" style={s.mobSubLink} onClick={() => setMobileOpen(false)}>Torneos</Link>
                <Link href="/calendario?sec=jueces" style={s.mobSubLink} onClick={() => setMobileOpen(false)}>Curso de jueces</Link>
                <Link href="/calendario?sec=entrenadores" style={s.mobSubLink} onClick={() => setMobileOpen(false)}>Curso de entrenadores</Link>
              </div>
            )}
          </div>

          <div>
            <div style={s.mobHead} onClick={() => toggleSection('disc')}>
              Disciplinas <i className={`fas fa-chevron-${mobileSection === 'disc' ? 'up' : 'down'}`} style={{ fontSize: 11 }} />
            </div>
            {mobileSection === 'disc' && (
              <div style={s.mobSub}>
                {disciplinas.map(d => (
                  <div key={d.slug}>
                    <div style={s.mobDiscHead} onClick={() => toggleDisc(d.slug)}>
                      {d.nombre} <i className={`fas fa-chevron-${mobileDisc === d.slug ? 'up' : 'down'}`} style={{ fontSize: 10 }} />
                    </div>
                    {mobileDisc === d.slug && (
                      <div style={s.mobDiscSub}>
                        <Link href={`/disciplinas/${d.slug}?tab=invitaciones`} style={s.mobDiscLink} onClick={() => setMobileOpen(false)}>Invitaciones</Link>
                        <Link href={`/disciplinas/${d.slug}?tab=reglamentos`} style={s.mobDiscLink} onClick={() => setMobileOpen(false)}>Reglamentos</Link>
                        <Link href={`/disciplinas/${d.slug}?tab=resultados`} style={s.mobDiscLink} onClick={() => setMobileOpen(false)}>Resultados</Link>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <div style={s.mobHead} onClick={() => toggleSection('inst')}>
              Institucional <i className={`fas fa-chevron-${mobileSection === 'inst' ? 'up' : 'down'}`} style={{ fontSize: 11 }} />
            </div>
            {mobileSection === 'inst' && (
              <div style={s.mobSub}>
                <Link href="/autoridades" style={s.mobSubLink} onClick={() => setMobileOpen(false)}>Autoridades</Link>
                <Link href="/reglamentos" style={s.mobSubLink} onClick={() => setMobileOpen(false)}>Reglamentos</Link>
                <Link href="/jueces" style={s.mobSubLink} onClick={() => setMobileOpen(false)}>Jueces</Link>
              </div>
            )}
          </div>

          <div>
            <div style={s.mobHead} onClick={() => toggleSection('norm')}>
              Normativas <i className={`fas fa-chevron-${mobileSection === 'norm' ? 'up' : 'down'}`} style={{ fontSize: 11 }} />
            </div>
            {mobileSection === 'norm' && (
              <div style={s.mobSub}>
                <Link href="/normativas" style={s.mobSubLink} onClick={() => setMobileOpen(false)}>Instructivos</Link>
                <Link href="/normativas?sec=aranceles" style={s.mobSubLink} onClick={() => setMobileOpen(false)}>Aranceles</Link>
                <Link href="/normativas?sec=formularios" style={s.mobSubLink} onClick={() => setMobileOpen(false)}>Formularios</Link>
              </div>
            )}
          </div>

          <a href="https://sistemagestiongimnastas.com/" target="_blank" rel="noopener" style={s.mobSgg}>
            SGG — Sistema de Gestión
          </a>
        </div>
      )}
    </>
  )
}

const s = {
  header: { background: '#fff', borderBottom: '1px solid var(--border2)', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68, position: 'sticky', top: 0, zIndex: 1000, boxShadow: '0 2px 20px rgba(0,191,223,0.07)' },
  logo: { display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' },
  brand: { fontFamily: 'DM Serif Display, serif', fontSize: 18, color: 'var(--ink)', lineHeight: 1.2 },
  sub: { fontSize: 10, color: 'var(--muted)', letterSpacing: '0.04em' },
  nav: { display: 'flex', alignItems: 'center', height: 68, gap: 2 },
  dropWrap: { position: 'relative', height: 68, display: 'flex', alignItems: 'center' },
  navLink: { display: 'flex', alignItems: 'center', gap: 5, height: '100%', padding: '0 13px', fontSize: 13, fontWeight: 500, color: 'var(--muted)', borderBottom: '2.5px solid transparent', cursor: 'pointer', textDecoration: 'none', whiteSpace: 'nowrap', transition: 'all .2s' },
  navActive: { color: 'var(--cyan)', borderBottomColor: 'var(--cyan)' },
  dropMenu: { display: 'none', position: 'absolute', top: '100%', left: 0, background: '#fff', border: '1px solid var(--border2)', borderRadius: 12, minWidth: 200, boxShadow: '0 12px 40px rgba(0,0,0,0.1)', zIndex: 200, listStyle: 'none' },
  dropLink: { display: 'block', padding: '10px 16px', fontSize: 13, color: 'var(--ink2)', borderBottom: '1px solid rgba(0,191,223,0.08)', textDecoration: 'none' },
  subMenu: { display: 'none', position: 'absolute', top: 0, left: '100%', background: '#fff', border: '1px solid var(--border2)', borderRadius: 12, minWidth: 200, boxShadow: '0 8px 32px rgba(0,0,0,0.12)', zIndex: 300 },
  sggBtn: { display: 'flex', alignItems: 'center', background: 'var(--ink)', color: '#fff', borderRadius: 8, margin: '0 0 0 6px', padding: '7px 16px', fontSize: 12, fontWeight: 600, textDecoration: 'none', letterSpacing: '0.04em' },
  search: { display: 'flex', alignItems: 'center', background: 'var(--cyan-pale)', border: '1px solid var(--border2)', borderRadius: 24, padding: '7px 14px', gap: 7 },
  searchInput: { border: 'none', background: 'transparent', fontSize: 13, color: 'var(--ink)', outline: 'none', width: 100, fontFamily: 'DM Sans, sans-serif' },
  hamburger: { display: 'none', flexDirection: 'column', gap: 5, padding: 6, background: 'none', border: 'none' },
  hLine: { display: 'block', width: 24, height: 2, background: 'var(--ink)', borderRadius: 2, transition: 'all .3s' },
  mobileMenu: { position: 'fixed', top: 68, left: 0, right: 0, bottom: 0, background: '#fff', zIndex: 9999, overflowY: 'auto', borderTop: '3px solid var(--cyan)' },
  mobLink: { display: 'flex', alignItems: 'center', gap: 10, padding: '16px 24px', fontSize: 15, fontWeight: 500, color: 'var(--ink)', borderBottom: '1px solid var(--border)', textDecoration: 'none' },
  mobHead: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 24px', fontSize: 15, fontWeight: 500, color: 'var(--ink)', borderBottom: '1px solid var(--border)', cursor: 'pointer' },
  mobSub: { background: 'var(--bg)', borderBottom: '1px solid var(--border)' },
  mobSubLink: { display: 'block', padding: '12px 36px', fontSize: 14, color: 'var(--muted)', borderBottom: '1px solid var(--border)', textDecoration: 'none' },
  mobDiscHead: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 36px', fontSize: 14, fontWeight: 500, color: 'var(--ink2)', cursor: 'pointer', borderBottom: '1px solid var(--border)' },
  mobDiscSub: { background: '#fff' },
  mobDiscLink: { display: 'block', padding: '10px 52px', fontSize: 13, color: 'var(--cyan)', borderBottom: '1px solid var(--border)', textDecoration: 'none' },
  mobSgg: { display: 'block', margin: '16px 24px 20px', background: 'var(--ink)', color: '#fff', borderRadius: 8, padding: 14, fontSize: 14, fontWeight: 600, textAlign: 'center', textDecoration: 'none' },
}
