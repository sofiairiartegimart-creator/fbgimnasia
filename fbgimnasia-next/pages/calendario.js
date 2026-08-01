import { useState } from 'react'
import Layout from '../components/layout/Layout'
import eventos from '../data/eventos.json'

const DISCIPLINAS = ['Todas las disciplinas', 'Artística Femenina', 'Artística Masculina', 'Rítmica', 'Aeróbica Deportiva', 'Trampolín']

const MESES_NOMBRES = { '01':'Enero','02':'Febrero','03':'Marzo','04':'Abril','05':'Mayo','06':'Junio','07':'Julio','08':'Agosto','09':'Septiembre','10':'Octubre','11':'Noviembre','12':'Diciembre' }

export default function Calendario() {
  const [filtro, setFiltro] = useState('Todas las disciplinas')

  const eventosFiltrados = filtro === 'Todas las disciplinas'
    ? eventos
    : eventos.filter(e => e.disciplina === filtro)

  // Agrupar por mes
  const porMes = {}
  eventosFiltrados.forEach(ev => {
    const [anio, mes] = ev.fecha.split('-')
    const key = `${anio}-${mes}`
    if (!porMes[key]) porMes[key] = []
    porMes[key].push(ev)
  })

  return (
    <Layout title="Calendario 2026" description="Calendario de eventos y competencias 2026">

      <div style={s.pageHeader}>
        <h1 style={s.pageTitle}>Calendario <span style={{ color: 'var(--cyan)' }}>2026</span></h1>
      </div>

      {/* TABS */}
      <div style={s.tabs}>
        {DISCIPLINAS.map(d => (
          <button
            key={d}
            style={{ ...s.tab, ...(filtro === d ? s.tabActive : {}) }}
            onClick={() => setFiltro(d)}
          >
            {d}
          </button>
        ))}
      </div>

      {/* EVENTOS */}
      <div style={s.content}>
        {Object.keys(porMes).length === 0 ? (
          <div style={s.empty}>
            <i className="fas fa-calendar-times" style={{ fontSize: 32, display: 'block', marginBottom: 12, opacity: 0.3 }} />
            <p>No hay eventos para esta disciplina.</p>
          </div>
        ) : Object.entries(porMes).map(([key, evs]) => {
          const [anio, mes] = key.split('-')
          return (
            <div key={key} style={s.monthGroup}>
              <div style={s.monthLabel}>{MESES_NOMBRES[mes]} {anio}</div>
              {evs.map((ev, i) => {
                const dia = ev.fecha.split('-')[2]
                return (
                  <div key={i} style={s.eventRow}>
                    <div style={s.eventDate}>
                      <div style={s.eventDay}>{dia}</div>
                      <div style={s.eventMonth}>{mes === '01'?'ENE':mes==='02'?'FEB':mes==='03'?'MAR':mes==='04'?'ABR':mes==='05'?'MAY':mes==='06'?'JUN':mes==='07'?'JUL':mes==='08'?'AGO':mes==='09'?'SEP':mes==='10'?'OCT':mes==='11'?'NOV':'DIC'}</div>
                    </div>
                    <div style={s.eventInfo}>
                      <div style={s.eventName}>{ev.titulo}</div>
                      {ev.sede && <div style={s.eventSede}>{ev.sede}</div>}
                    </div>
                    {ev.disciplina && (
                      <span style={s.badge}>{ev.disciplina}</span>
                    )}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

const s = {
  pageHeader: { background: '#fff', borderBottom: '1px solid var(--border)', padding: '28px 40px' },
  pageTitle: { fontSize: 32, fontWeight: 300, color: 'var(--ink)' },
  tabs: { display: 'flex', gap: 4, background: 'var(--bg)', padding: '16px 40px', borderBottom: '1px solid var(--border)', overflowX: 'auto' },
  tab: { padding: '8px 18px', fontSize: 13, fontWeight: 500, borderRadius: 20, border: 'none', cursor: 'pointer', background: 'transparent', color: 'var(--muted)', transition: 'all .2s', whiteSpace: 'nowrap' },
  tabActive: { background: 'var(--cyan)', color: '#fff' },
  content: { padding: '24px 40px 60px' },
  empty: { padding: '60px 40px', textAlign: 'center', color: 'var(--muted)' },
  monthGroup: { marginBottom: 36 },
  monthLabel: { fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', paddingBottom: 10, borderBottom: '2px solid var(--cyan-pale)', marginBottom: 12 },
  eventRow: { display: 'flex', alignItems: 'center', gap: 16, padding: '14px 18px', background: '#fff', border: '1px solid var(--border2)', borderRadius: 10, marginBottom: 8 },
  eventDate: { minWidth: 44, textAlign: 'center', flexShrink: 0 },
  eventDay: { fontSize: 20, fontWeight: 600, color: 'var(--cyan)', lineHeight: 1 },
  eventMonth: { fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.04em' },
  eventInfo: { flex: 1 },
  eventName: { fontSize: 14, fontWeight: 500, color: 'var(--ink)' },
  eventSede: { fontSize: 11, color: 'var(--muted)', marginTop: 2 },
  badge: { fontSize: 10, fontWeight: 600, padding: '4px 10px', borderRadius: 12, background: 'var(--cyan-pale)', color: 'var(--cyan)', flexShrink: 0 },
}
