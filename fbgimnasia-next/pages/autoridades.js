import Layout from '../components/layout/Layout'

const comision = [
  { rol: 'Presidente',               nombre: 'Monica Sposaro' },
  { rol: 'Vice Presidente',          nombre: 'Walter Velez' },
  { rol: 'Secretaria',               nombre: 'Andrea Garcia' },
  { rol: 'Pro Secretaria',           nombre: 'Florencia Sacchetto' },
  { rol: 'Tesorero',                 nombre: 'Claudio Gens' },
  { rol: 'Pro Tesorero',             nombre: 'Gustavo Graff' },
  { rol: 'Vocal Titular',            nombre: 'Fabio Dhigero' },
  { rol: 'Vocal Titular',            nombre: 'Lidia Calo' },
  { rol: 'Vocal Titular',            nombre: 'Guillermo Ramos' },
  { rol: 'Vocal Suplente',           nombre: 'Lucia Lamanda' },
  { rol: 'Vocal Suplente',           nombre: 'Alberto Farrapeira' },
  { rol: 'Vocal Suplente',           nombre: 'Mirta Fente' },
  { rol: 'Rev. de Cuentas Titular',  nombre: 'Silvia Thostrup' },
  { rol: 'Rev. de Cuentas Titular',  nombre: 'Mariela Lesci' },
  { rol: 'Rev. de Cuentas Suplente', nombre: 'Natalia Richotti' },
  { rol: 'Rev. de Cuentas Suplente', nombre: 'Florencia Gugliada' },
]

export default function Autoridades() {
  return (
    <Layout title="Autoridades" description="Comisión Directiva de la Federación Bonaerense de Gimnasia">
      <div style={s.breadcrumb}>
        <a href="/" style={s.breadLink}><i className="fas fa-home" /></a>
        <i className="fas fa-chevron-right" style={s.chevron} />
        <span>Autoridades</span>
      </div>

      <div style={s.wrap}>
        <h1 style={s.title}>Comisión <span style={{ color: 'var(--cyan)', fontWeight: 500 }}>Directiva</span></h1>
        <p style={s.subtitle}>Período 2024 — 2028</p>

        <div style={s.list}>
          {comision.map((c, i) => (
            <div key={i} style={s.item}>
              <span style={s.rol}>{c.rol}</span>
              <span style={s.nombre}>{c.nombre}</span>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

const s = {
  breadcrumb: { padding: '14px 40px', fontSize: 12, color: 'var(--muted)', background: '#fff', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 6 },
  breadLink: { color: 'var(--cyan)', textDecoration: 'none' },
  chevron: { fontSize: 10 },
  wrap: { maxWidth: 860, margin: '0 auto', padding: '40px 40px 80px' },
  title: { fontSize: 32, fontWeight: 300, color: 'var(--ink)', marginBottom: 6 },
  subtitle: { fontSize: 13, color: 'var(--muted)', marginBottom: 40 },
  list: { display: 'flex', flexDirection: 'column', gap: 6 },
  item: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 20px', background: '#fff', border: '1px solid var(--border2)', borderRadius: 10 },
  rol: { fontSize: 12, fontWeight: 600, color: 'var(--muted)', minWidth: 200 },
  nombre: { fontSize: 15, fontWeight: 500, color: 'var(--ink)' },
}
