import Layout from '../components/layout/Layout'
import Link from 'next/link'
import eventos from '../data/eventos.json'

const disciplinas = [
  { slug: 'artistica-femenina',  nombre: 'Artística Femenina',  icon: 'fa-person-dress' },
  { slug: 'artistica-masculina', nombre: 'Artística Masculina', icon: 'fa-person' },
  { slug: 'ritmica',             nombre: 'Rítmica',             icon: 'fa-ribbon' },
  { slug: 'aerobica-deportiva',  nombre: 'Aeróbica Deportiva',  icon: 'fa-heart-pulse' },
  { slug: 'trampolin',           nombre: 'Trampolín',           icon: 'fa-person-walking' },
  { slug: 'acrobatica',          nombre: 'Acrobática',          icon: 'fa-people-group' },
  { slug: 'gimnasia-para-todos', nombre: 'Gimnasia para Todos', icon: 'fa-users' },
  { slug: 'parkour',             nombre: 'Parkour',             icon: 'fa-road' },
]

const MESES = ['','Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']

export default function Home() {
  const hoy = new Date().toISOString().split('T')[0]
  const proximos = eventos
    .filter(e => e.fecha >= hoy)
    .slice(0, 6)

  return (
    <Layout title="Inicio" description="Sitio oficial de la Federación Bonaerense de Gimnasia">
      <div style={s.wrap}>

        {/* GRILLA PRINCIPAL */}
        <div style={s.grid}>

          {/* NOVEDADES */}
          <div style={s.card}>
            <div style={s.cardHead}>
              <div style={s.cardTitle}>
                <i className="fas fa-newspaper" style={{ color: 'var(--cyan)' }} /> Novedades
              </div>
              <Link href="/novedades" style={s.cardLink}>Ver todas →</Link>
            </div>
            <div style={s.emptyBox}>
              <i className="fas fa-newspaper" style={s.emptyIcon} />
              <p style={s.emptyText}>No hay novedades publicadas todavía.</p>
            </div>
          </div>

          {/* PRÓXIMOS EVENTOS */}
          <div style={s.card}>
            <div style={s.cardHead}>
              <div style={s.cardTitle}>
                <i className="fas fa-calendar-alt" style={{ color: 'var(--cyan)' }} /> Próximos Eventos
              </div>
              <Link href="/calendario" style={s.cardLink}>Ver calendario →</Link>
            </div>
            {proximos.length === 0 ? (
              <div style={s.emptyBox}>
                <i className="fas fa-calendar" style={s.emptyIcon} />
                <p style={s.emptyText}>No hay eventos próximos.</p>
              </div>
            ) : proximos.map((ev, i) => {
              const [, mes, dia] = ev.fecha.split('-')
              return (
                <div key={i} style={s.eventItem}>
                  <div style={s.eventDot} />
                  <div style={s.eventInfo}>
                    <div style={s.eventName}>{ev.titulo}</div>
                    <div style={s.eventMeta}>
                      {dia}/{mes} {ev.sede ? `· ${ev.sede}` : ''}
                    </div>
                  </div>
                  {ev.disciplina && (
                    <span style={s.eventBadge}>{ev.disciplina.split(' ').pop()}</span>
                  )}
                </div>
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
            </Link>
          ))}
        </div>

      </div>
    </Layout>
  )
}

const s = {
  wrap: { background: 'var(--bg)', padding: '32px 32px 48px' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 48 },
  card: { background: '#fff', border: '1px solid var(--border2)', borderRadius: 16, overflow: 'hidden' },
  cardHead: { padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  cardTitle: { fontSize: 14, fontWeight: 600, color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: 8 },
  cardLink: { fontSize: 12, color: 'var(--cyan)', textDecoration: 'none', fontWeight: 500 },
  emptyBox: { padding: '32px 20px', textAlign: 'center' },
  emptyIcon: { fontSize: 24, display: 'block', marginBottom: 8, opacity: 0.3, color: 'var(--muted)' },
  emptyText: { fontSize: 13, color: 'var(--muted)' },
  eventItem: { display: 'flex', alignItems: 'center', gap: 14, padding: '13px 20px', borderBottom: '1px solid var(--border)' },
  eventDot: { width: 8, height: 8, borderRadius: '50%', background: 'var(--cyan)', flexShrink: 0 },
  eventInfo: { flex: 1 },
  eventName: { fontSize: 13, fontWeight: 500, color: 'var(--ink)', marginBottom: 2 },
  eventMeta: { fontSize: 11, color: 'var(--muted)' },
  eventBadge: { fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 12, background: 'var(--cyan-pale)', color: 'var(--cyan)', flexShrink: 0 },
  sectionRow: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 300, color: 'var(--ink)', whiteSpace: 'nowrap' },
  sectionLine: { flex: 1, height: 1, background: 'var(--border2)' },
  discGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 },
  discCard: { background: '#fff', border: '1px solid var(--border2)', borderRadius: 14, padding: '20px 16px', textAlign: 'center', textDecoration: 'none', display: 'block', transition: 'all .2s' },
  discIcon: { width: 44, height: 44, background: 'var(--cyan-pale)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' },
  discName: { fontSize: 12, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.3 },
}
