import { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/layout/Layout'

const DISCIPLINAS = {
  'artistica-femenina':  { nombre: 'Artística Femenina',  icono: 'fa-person-dress', subtitulo: 'Gimnasia Artística Femenina — FBGimnasia' },
  'artistica-masculina': { nombre: 'Artística Masculina', icono: 'fa-person',        subtitulo: 'Gimnasia Artística Masculina — FBGimnasia' },
  'ritmica':             { nombre: 'Rítmica',             icono: 'fa-ribbon',        subtitulo: 'Gimnasia Rítmica — FBGimnasia' },
  'aerobica-deportiva':  { nombre: 'Aeróbica Deportiva',  icono: 'fa-heart-pulse',   subtitulo: 'Gimnasia Aeróbica Deportiva — FBGimnasia' },
  'trampolin':           { nombre: 'Trampolín',           icono: 'fa-person-walking', subtitulo: 'Gimnasia de Trampolín — FBGimnasia' },
  'acrobatica':          { nombre: 'Acrobática',          icono: 'fa-people-group',  subtitulo: 'Gimnasia Acrobática — FBGimnasia' },
  'gimnasia-para-todos': { nombre: 'Gimnasia para Todos', icono: 'fa-users',         subtitulo: 'Gimnasia para Todos — FBGimnasia' },
  'parkour':             { nombre: 'Parkour',             icono: 'fa-road',          subtitulo: 'Parkour — FBGimnasia' },
}

const TABS = [
  { id: 'invitaciones', label: 'Invitaciones a torneos', icon: 'fa-envelope-open-text' },
  { id: 'reglamentos',  label: 'Reglamentos',            icon: 'fa-book' },
  { id: 'resultados',   label: 'Resultados',             icon: 'fa-trophy' },
]

export default function Disciplina() {
  const router = useRouter()
  const { slug, tab } = router.query
  const [activeTab, setActiveTab] = useState(tab || 'invitaciones')

  const disc = DISCIPLINAS[slug]
  if (!disc) return null

  return (
    <Layout title={disc.nombre} description={disc.subtitulo}>

      {/* BREADCRUMB */}
      <div style={s.breadcrumb}>
        <a href="/" style={s.breadLink}><i className="fas fa-home" /></a>
        <i className="fas fa-chevron-right" style={s.chevron} />
        <span>Disciplinas</span>
        <i className="fas fa-chevron-right" style={s.chevron} />
        <span>{disc.nombre}</span>
      </div>

      {/* HEADER */}
      <div style={s.header}>
        <div style={s.iconBox}>
          <i className={`fas ${disc.icono}`} style={{ fontSize: 22, color: 'var(--cyan)' }} />
        </div>
        <h1 style={s.title}>{disc.nombre}</h1>
        <p style={s.subtitle}>{disc.subtitulo}</p>

        {/* TABS */}
        <div style={s.tabs}>
          {TABS.map(t => (
            <button
              key={t.id}
              style={{ ...s.tab, ...(activeTab === t.id ? s.tabActive : {}) }}
              onClick={() => setActiveTab(t.id)}
            >
              <i className={`fas ${t.icon}`} /> {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENIDO */}
      <div style={s.content}>
        <div style={s.empty}>
          <i className={`fas ${TABS.find(t => t.id === activeTab)?.icon}`} style={{ fontSize: 32, display: 'block', marginBottom: 12, opacity: 0.3 }} />
          <p>No hay {activeTab} publicados todavía para {disc.nombre}.</p>
          <p style={{ fontSize: 12, marginTop: 8, color: 'var(--muted)' }}>
            El contenido se puede cargar desde el panel de administración.
          </p>
        </div>
      </div>

    </Layout>
  )
}

// Generar rutas estáticas para todas las disciplinas
export async function getStaticPaths() {
  return {
    paths: Object.keys(DISCIPLINAS).map(slug => ({ params: { slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  return { props: {} }
}

const s = {
  breadcrumb: { padding: '14px 40px', fontSize: 12, color: 'var(--muted)', background: '#fff', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 6 },
  breadLink: { color: 'var(--cyan)', textDecoration: 'none' },
  chevron: { fontSize: 10 },
  header: { background: '#fff', borderBottom: '1px solid var(--border)', padding: '24px 40px 0' },
  iconBox: { width: 52, height: 52, background: 'var(--cyan-pale)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  title: { fontSize: 30, fontWeight: 300, color: 'var(--ink)', marginBottom: 4 },
  subtitle: { fontSize: 13, color: 'var(--muted)', marginBottom: 20 },
  tabs: { display: 'flex', borderBottom: '2px solid var(--border2)', overflowX: 'auto' },
  tab: { padding: '12px 20px', fontSize: 13, fontWeight: 500, color: 'var(--muted)', cursor: 'pointer', border: 'none', background: 'none', borderBottom: '2px solid transparent', marginBottom: -2, whiteSpace: 'nowrap', fontFamily: 'DM Sans, sans-serif', display: 'flex', alignItems: 'center', gap: 6, transition: 'all .2s' },
  tabActive: { color: 'var(--cyan)', borderBottomColor: 'var(--cyan)' },
  content: { padding: '32px 40px 60px' },
  empty: { padding: '48px', textAlign: 'center', color: 'var(--muted)' },
}
