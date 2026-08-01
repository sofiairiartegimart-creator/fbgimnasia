import Layout from '../components/layout/Layout'
import Link from 'next/link'
import eventos from '../data/eventos.json'

const disciplinas = [
  { slug: 'artistica-femenina',  nombre: 'Artística Femenina',  abrev: 'GAF', icon: 'fa-person-dress' },
  { slug: 'artistica-masculina', nombre: 'Artística Masculina', abrev: 'GAM', icon: 'fa-person' },
  { slug: 'ritmica',             nombre: 'Rítmica',             abrev: 'GR',  icon: 'fa-ribbon' },
  { slug: 'aerobica-deportiva',  nombre: 'Aeróbica Deportiva',  abrev: 'AER', icon: 'fa-heart-pulse' },
  { slug: 'trampolin',           nombre: 'Trampolín',           abrev: 'TRA', icon: 'fa-person-walking' },
  { slug: 'acrobatica',          nombre: 'Acrobática',          abrev: 'GA',  icon: 'fa-people-group' },
  { slug: 'gimnasia-para-todos', nombre: 'Gimnasia para Todos', abrev: 'GPT', icon: 'fa-users' },
  { slug: 'parkour',             nombre: 'Parkour',             abrev: 'PK',  icon: 'fa-road' },
]

const entidades = [
  { nombre: 'World Gymnastics', url: 'https://www.gymnastics.sport/site/', sigla: 'FIG' },
  { nombre: 'UPAG', url: 'https://upag-pagu.com/', sigla: 'UPAG' },
  { nombre: 'CONSUGI', url: 'https://consugi.com/', sigla: 'CONSUGI' },
  { nombre: 'CAG', url: 'https://gimnasiargentina.com/', sigla: 'CAG' },
]

const stats = [
  { num: '180+', label: 'Clubes afiliados' },
  { num: '5000+', label: 'Gimnastas activos' },
  { num: '320+', label: 'Jueces habilitados' },
]

const novedades = [
  { texto: 'Clasificadas al Nacional 2026 — ¡Felicitaciones a todas! 🎉', tiempo: 'hace 2 días' },
  { texto: 'Nuevo reglamento GAF temporada 2025–2028 disponible 📄', tiempo: 'hace 5 días' },
  { texto: 'Inscripciones abiertas — Curso de Jueces Rítmica 2026 🏅', tiempo: 'hace 1 semana' },
  { texto: 'Resultados Torneo Apertura GAF — Zona Norte ✨', tiempo: 'hace 2 semanas' },
]

export default function Home() {
  const hoy = new Date().toISOString().split('T')[0]
  const proximos = eventos.filter(e => e.fecha >= hoy).slice(0, 6)

  return (
    <Layout title="Inicio" description="Sitio oficial de la Federación Bonaerense de Gimnasia">

      {/* HERO */}
      <div style={s.hero}>
        <div style={s.heroOverlay} />
        <div style={s.heroContent}>
          <div style={s.heroTag}>Federación Bonaerense de Gimnasia</div>
          <h1 style={s.heroTitle}>Centro de Alto Rendimiento<br /><span style={{ color: 'var(--cyan)' }}>Aguas Verdes</span></h1>
          <div style={s.heroBtns}>
            <Link href="/calendario" style={s.heroBtn}>Ver calendario 2026</Link>
            <Link href="/disciplinas/artistica-femenina" style={s.heroBtnOutline}>Nuestras disciplinas</Link>
          </div>
        </div>
      </div>

      <div style={s.wrap}>

        {/* GRILLA PRINCIPAL */}
        <div style={s.grid}>

          {/* NOVEDADES */}
          <div style={s.card}>
            <div style={s.cardHead}>
              <div style={s.cardTitle}>
                <i className="fas fa-newspaper" style={{ color: 'var(--cyan)' }} /> Novedades
                <span style={s.igTag}>
                  <i className="fab fa-instagram" style={{ marginRight: 4 }} />
                  @fbgargentina
                </span>
              </div>
              <a href="https://www.instagram.com/fbgargentina" target="_blank" rel="noopener" style={s.cardLink}>Ver Instagram →</a>
            </div>
            {novedades.map((n, i) => (
              <a key={i} href="https://www.instagram.com/fbgargentina" target="_blank" rel="noopener" style={s.newsItem}>
                <div style={s.newsIcon}><i className="fab fa-instagram" style={{ color: 'var(--cyan)', fontSize: 16 }} /></div>
                <div style={s.newsBody}>
                  <div style={s.newsText}>{n.texto}</div>
                  <div style={s.newsMeta}>Instagram · {n.tiempo}</div>
                </div>
                <i className="fas fa-arrow-right" style={{ color: 'var(--border2)', fontSize: 11 }} />
              </a>
            ))}
            <div style={s.igNote}>Las fotos reales se conectarán con la API de Instagram en la versión final.</div>
          </div>

          {/* PRÓXIMOS EVENTOS */}
          <div style={s.card}>
            <div style={s.cardHead}>
              <div style={s.cardTitle}>
                <i className="fas fa-calendar-alt" style={{ color: 'var(--cyan)' }} /> Próximos Eventos
              </div>
              <Link href="/calendario" style={s.cardLink}>Ver todos →</Link>
            </div>
            {proximos.length === 0 ? (
              <div style={s.emptyBox}><p style={{ color: 'var(--muted)', fontSize: 13 }}>No hay eventos próximos.</p></div>
            ) : proximos.map((ev, i) => {
              const [, mes, dia] = ev.fecha.split('-')
              const meses = ['','Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']
              return (
                <Link key={i} href="/calendario" style={s.eventItem}>
                  <div style={s.eventDate}>
                    <div style={s.eventDay}>{dia}</div>
                    <div style={s.eventMonth}>{meses[parseInt(mes)]}</div>
                  </div>
                  <div style={s.eventInfo}>
                    <div style={s.eventName}>{ev.titulo}</div>
                    <div style={s.eventMeta}>{ev.sede || '—'}</div>
                  </div>
                  {ev.disciplina && <span style={s.eventBadge}>{ev.disciplina.split(' ').slice(-1)[0].substring(0,3).toUpperCase()}</span>}
                </Link>
              )
            })}
          </div>
        </div>

        {/* DISCIPLINAS */}
        <div style={s.sectionRow}>
          <h2 style={s.sectionTitle}>Nuestras <span style={{ color: 'var(--cyan)', fontWeight: 500 }}>Disciplinas</span></h2>
          <div style={s.sectionLine} />
        </div>

        <div style={s.discGrid}>
          {disciplinas.map(d => (
            <Link key={d.slug} href={`/disciplinas/${d.slug}`} style={s.discCard}>
              <div style={s.discIcon}>
                <i className={`fas ${d.icon}`} style={{ fontSize: 20, color: 'var(--cyan)' }} />
              </div>
              <div style={s.discName}>{d.nombre}</div>
              <div style={s.discAbrev}>{d.abrev}</div>
            </Link>
          ))}
        </div>

        {/* ESTADÍSTICAS */}
        <div style={s.statsRow}>
          {stats.map((st, i) => (
            <div key={i} style={s.statItem}>
              <div style={s.statNum}>{st.num}</div>
              <div style={s.statLabel}>{st.label}</div>
            </div>
          ))}
        </div>

        {/* ENTIDADES */}
        <div style={s.sectionRow}>
          <h2 style={s.sectionTitle}>Entidades</h2>
          <div style={s.sectionLine} />
        </div>

        <div style={s.entGrid}>
          {entidades.map(e => (
            <a key={e.sigla} href={e.url} target="_blank" rel="noopener" style={s.entCard}>
              <div style={s.entSigla}>{e.sigla}</div>
              <div style={s.entNombre}>{e.nombre}</div>
            </a>
          ))}
        </div>

        {/* PATROCINADORES */}
        <div style={s.sectionRow}>
          <h2 style={s.sectionTitle}>Patrocinadores</h2>
          <div style={s.sectionLine} />
        </div>

        <div style={s.sponsorRow}>
          <a href="https://www.instagram.com/equilibriobylianle" target="_blank" rel="noopener" style={s.sponsorCard}>
            <i className="fas fa-dumbbell" style={{ fontSize: 24, color: 'var(--cyan)', marginBottom: 8, display: 'block' }} />
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>Equilibrio by Lianle</div>
          </a>
        </div>

      </div>
    </Layout>
  )
}

const s = {
  hero: { position: 'relative', height: 420, background: 'linear-gradient(135deg, #0F1923 0%, #1a2d3d 50%, #0a3d4d 100%)', display: 'flex', alignItems: 'center', overflow: 'hidden' },
  heroOverlay: { position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 50%, rgba(0,191,223,0.15) 0%, transparent 70%)' },
  heroContent: { position: 'relative', zIndex: 1, padding: '0 48px', maxWidth: 700 },
  heroTag: { fontSize: 12, fontWeight: 600, color: 'var(--cyan)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16 },
  heroTitle: { fontSize: 42, fontWeight: 300, color: '#fff', lineHeight: 1.2, marginBottom: 32, fontFamily: 'DM Serif Display, serif' },
  heroBtns: { display: 'flex', gap: 12 },
  heroBtn: { padding: '12px 28px', background: 'var(--cyan)', color: '#fff', borderRadius: 10, fontWeight: 600, fontSize: 14, textDecoration: 'none' },
  heroBtnOutline: { padding: '12px 28px', background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 10, fontWeight: 500, fontSize: 14, textDecoration: 'none' },
  wrap: { background: 'var(--bg)', padding: '32px 32px 48px' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 48 },
  card: { background: '#fff', border: '1px solid var(--border2)', borderRadius: 16, overflow: 'hidden' },
  cardHead: { padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  cardTitle: { fontSize: 14, fontWeight: 600, color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: 8 },
  igTag: { fontSize: 11, color: 'var(--muted)', fontWeight: 400 },
  cardLink: { fontSize: 12, color: 'var(--cyan)', textDecoration: 'none', fontWeight: 500 },
  newsItem: { display: 'flex', alignItems: 'center', gap: 12, padding: '13px 20px', borderBottom: '1px solid var(--border)', textDecoration: 'none', transition: 'background .15s' },
  newsIcon: { width: 36, height: 36, background: 'var(--cyan-pale)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  newsBody: { flex: 1 },
  newsText: { fontSize: 13, fontWeight: 500, color: 'var(--ink)', marginBottom: 2, lineHeight: 1.4 },
  newsMeta: { fontSize: 11, color: 'var(--muted)' },
  igNote: { padding: '10px 20px', fontSize: 11, color: 'var(--muted)', fontStyle: 'italic', borderTop: '1px solid var(--border)' },
  emptyBox: { padding: '32px 20px', textAlign: 'center' },
  eventItem: { display: 'flex', alignItems: 'center', gap: 14, padding: '13px 20px', borderBottom: '1px solid var(--border)', textDecoration: 'none' },
  eventDate: { minWidth: 44, textAlign: 'center', flexShrink: 0 },
  eventDay: { fontSize: 20, fontWeight: 600, color: 'var(--cyan)', lineHeight: 1 },
  eventMonth: { fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.04em' },
  eventInfo: { flex: 1 },
  eventName: { fontSize: 13, fontWeight: 500, color: 'var(--ink)', marginBottom: 2 },
  eventMeta: { fontSize: 11, color: 'var(--muted)' },
  eventBadge: { fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 12, background: 'var(--cyan-pale)', color: 'var(--cyan)', flexShrink: 0 },
  sectionRow: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 300, color: 'var(--ink)', whiteSpace: 'nowrap' },
  sectionLine: { flex: 1, height: 1, background: 'var(--border2)' },
  discGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 48 },
  discCard: { background: '#fff', border: '1px solid var(--border2)', borderRadius: 14, padding: '20px 16px', textAlign: 'center', textDecoration: 'none', display: 'block', transition: 'all .2s' },
  discIcon: { width: 44, height: 44, background: 'var(--cyan-pale)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' },
  discName: { fontSize: 12, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.3, marginBottom: 4 },
  discAbrev: { fontSize: 10, color: 'var(--cyan)', fontWeight: 700, letterSpacing: '0.06em' },
  statsRow: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 48 },
  statItem: { background: '#fff', border: '1px solid var(--border2)', borderRadius: 14, padding: '24px 20px', textAlign: 'center' },
  statNum: { fontSize: 36, fontWeight: 300, color: 'var(--cyan)', lineHeight: 1, marginBottom: 6 },
  statLabel: { fontSize: 13, color: 'var(--muted)', fontWeight: 500 },
  entGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 48 },
  entCard: { background: '#fff', border: '1px solid var(--border2)', borderRadius: 12, padding: '20px 16px', textAlign: 'center', textDecoration: 'none', display: 'block', transition: 'all .2s' },
  entSigla: { fontSize: 18, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 },
  entNombre: { fontSize: 11, color: 'var(--muted)' },
  sponsorRow: { display: 'flex', gap: 12, marginBottom: 16 },
  sponsorCard: { background: '#fff', border: '1px solid var(--border2)', borderRadius: 12, padding: '20px 24px', textDecoration: 'none', textAlign: 'center', minWidth: 180 },
}
