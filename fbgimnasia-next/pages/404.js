import Layout from '../components/layout/Layout'
import Link from 'next/link'

export default function NotFound() {
  return (
    <Layout title="Página no encontrada">
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '80px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 80, fontWeight: 300, color: 'var(--cyan)', lineHeight: 1 }}>404</div>
        <h1 style={{ fontSize: 28, fontWeight: 300, color: 'var(--ink)', margin: '12px 0 8px' }}>Página no encontrada</h1>
        <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 32 }}>La página que buscás no existe o fue movida.</p>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 28px', background: 'var(--cyan)', color: '#fff', borderRadius: 10, fontWeight: 500, textDecoration: 'none' }}>
          <i className="fas fa-home" /> Volver al inicio
        </Link>
      </div>
    </Layout>
  )
}
