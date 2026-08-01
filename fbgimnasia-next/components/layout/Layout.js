import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({ children, title = 'FBGimnasia', description = 'Federación Bonaerense de Gimnasia' }) {
  return (
    <>
      <Head>
        <title>{title} — Federación Bonaerense de Gimnasia</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
