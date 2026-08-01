import { useState } from 'react'
import Layout from '../components/layout/Layout'
import jueces from '../data/jueces.json'

const DISC_ORDER = [
  { slug: 'artistica-femenina',  nombre: 'Artística Femenina',  abrev: 'GAF' },
  { slug: 'artistica-masculina', nombre: 'Artística Masculina', abrev: 'GAM' },
  { slug: 'ritmica',             nombre: 'Rítmica',             abrev: 'GR'  },
  { slug: 'aerobica-deportiva',  nombre: 'Aeróbica Deportiva',  abrev: 'AER' },
  { slug: 'trampolin',           nombre: 'Trampolín',           abrev: 'TRA' },
  { slug: 'acrobatica',          nombre: 'Acrobática',          abrev: 'GA'  },
  { slug: 'gimnasia-para-todos', nombre: 'Gimnasia para Todos', abrev: 'GPT' },
  { slug: 'parkour',             nombre: 'Parkour',             abrev: 'PK'  },
]

function badgeClass(nivel) {
  const n = nivel.toLowerCase()
  if (n.includes('intern')) return s.badgeInt
  if (n.includes('nac'))    return s.badgeNac
  return s.badgeProv
}

export default function Jueces() {
  const [activeDisc, setActiveDisc] = useState('artistica-femenina')
  const [buscar, setBuscar] = useState('')

  const byDisc = {}
  jueces.forEach(j => {
    if (!byDisc[j.disc_slug]) byDisc[j.disc_slug] = []
    byDisc[j.disc_slug].push(j)
  })

  const discActual = DISC_ORDER.find(d => d.slug === activeDisc)
  const judgesActuales = (byDisc[activeDisc] || []).filter(j => {
    const q = buscar.toLowerCase()
    return j.apellido.toLowerCase().includes(q) || j.nombre.toLowerCase().includes(q) || j.club.toLowerCase().includes(q)
  })

  return (
    <Layout title="Listado de Jueces" description="Panel oficial de jueces habilitados — FBGimnasia">

      <div style={s.wrap}>
        <h1 style={s.title}>Listado de <span style={{ color: 'var(--cyan)' }}>Jueces</span></h1>

        {/* TABS */}
        <div style={s.tabs}>
          {DISC_ORDER.map(d => (
            <button
              key={d.slug}
              style={{ ...s.tab, ...(activeDisc === d.slug ? s.tabActive : {}) }}
              onClick={() => { setActiveDisc(d.slug); setBuscar('') }}
            >
              {d.abrev}
            </button>
          ))}
        </div>

        {/* PANEL */}
        <div style={s.panel}>
          <div style={s.panelTitle}>
            {discActual?.nombre}
          </div>

          {/* BUSCADOR */}
          <div style={s.searchBar}>
            <i className="fas fa-search" style={{ color: 'var(--cyan)' }} />
            <input
              placeholder="Buscar juez..."
              value={buscar}
              onChange={e => setBuscar(e.target.value)}
              style={s.searchInput}
            />
          </div>

          {/* TABLA */}
          {judgesActuales.length === 0 ? (
            <p style={s.prox}>— Próximamente —</p>
          ) : (
            <table style={s.table}>
              <thead>
                <tr>
                  <th style={s.th}>Apellido</th>
                  <th style={s.th}>Nombre</th>
                  <th style={s.th}>Institución</th>
                  <th style={s.th}>Categoría</th>
                  <th style={s.th}>Nivel</th>
                </tr>
              </thead>
              <tbody>
                {judgesActuales.map((j, i) => (
                  j.brevet.map((b, bi) => (
                    <tr key={`${i}-${bi}`} style={bi === 0 ? s.trTop : {}}>
                      {bi === 0 && <td style={s.tdNombre} rowSpan={j.brevet.length}>{j.apellido}</td>}
                      {bi === 0 && <td style={s.tdNombre} rowSpan={j.brevet.length}>{j.nombre}</td>}
                      {bi === 0 && <td style={s.tdInst} rowSpan={j.brevet.length}>{j.club}</td>}
                      <td style={s.td}>{b.categoria}</td>
                      <td style={s.td}>
                        {b.nivel && (
                          <span style={{ ...s.badge, ...badgeClass(b.nivel) }}>{b.nivel}</span>
                        )}
                      </td>
                    </tr>
                  ))
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Layout>
  )
}

const s = {
  wrap: { maxWidth: 1000, margin: '0 auto', padding: '32px 32px 80px' },
  title: { fontSize: 32, fontWeight: 300, color: 'var(--ink)', marginBottom: 32 },
  tabs: { display: 'flex', gap: 4, borderBottom: '2px solid var(--border2)', marginBottom: 28, overflowX: 'auto' },
  tab: { padding: '10px 20px', fontSize: 13, fontWeight: 600, color: 'var(--muted)', cursor: 'pointer', border: 'none', background: 'none', borderBottom: '2px solid transparent', marginBottom: -2, whiteSpace: 'nowrap', transition: 'all .2s' },
  tabActive: { color: 'var(--cyan)', borderBottomColor: 'var(--cyan)' },
  panel: {},
  panelTitle: { fontSize: 18, fontWeight: 400, color: 'var(--ink2)', marginBottom: 16 },
  searchBar: { display: 'flex', alignItems: 'center', gap: 10, background: 'var(--cyan-pale)', border: '1px solid var(--border2)', borderRadius: 10, padding: '10px 16px', marginBottom: 20, maxWidth: 380 },
  searchInput: { border: 'none', background: 'transparent', fontSize: 14, color: 'var(--ink)', outline: 'none', width: '100%', fontFamily: 'DM Sans, sans-serif' },
  prox: { color: 'var(--muted)', fontStyle: 'italic', fontSize: 13, padding: '24px 0' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 13.5 },
  th: { fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.07em', padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid var(--border2)' },
  td: { padding: '10px 14px', borderBottom: '1px solid var(--border)', verticalAlign: 'middle', color: 'var(--ink)' },
  tdNombre: { padding: '10px 14px', borderBottom: '1px solid var(--border)', verticalAlign: 'middle', color: 'var(--ink)', fontWeight: 600 },
  tdInst: { padding: '10px 14px', borderBottom: '1px solid var(--border)', verticalAlign: 'middle', color: 'var(--muted)', fontSize: 12.5 },
  trTop: { borderTop: '2px solid var(--border2)' },
  badge: { fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 10, display: 'inline-block' },
  badgeInt: { background: '#e8f0fe', color: '#1a56db' },
  badgeNac: { background: 'var(--cyan-pale)', color: 'var(--cyan-dark)' },
  badgeProv: { background: '#f0fdf4', color: '#16a34a' },
}
