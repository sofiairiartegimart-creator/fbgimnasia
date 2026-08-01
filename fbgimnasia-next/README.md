# FBGimnasia — Next.js

Proyecto oficial de la **Federación Bonaerense de Gimnasia** en Next.js 14.

---

## Instalación

```bash
npm install
npm run dev
```

El sitio corre en `http://localhost:3000`

---

## Estructura

```
fbgimnasia-next/
├── pages/
│   ├── index.js              ← Inicio
│   ├── calendario.js         ← Calendario 2026
│   ├── jueces.js             ← Listado de jueces
│   ├── autoridades.js        ← Comisión directiva
│   ├── disciplinas/
│   │   └── [slug].js         ← Página dinámica por disciplina
│   ├── _app.js
│   └── _document.js
├── components/
│   └── layout/
│       ├── Layout.js         ← Wrapper con Head, Navbar, Footer
│       ├── Navbar.js         ← Navbar responsive con dropdowns
│       └── Footer.js         ← Footer
├── data/
│   ├── eventos.json          ← 113 eventos calendario 2026
│   └── jueces.json           ← 250 jueces con brevet completo
├── styles/
│   └── globals.css           ← Variables CSS + reset
└── public/
    └── (logo, favicon, imágenes)
```

---

## Páginas disponibles

| Ruta | Página |
|------|--------|
| `/` | Inicio con novedades y próximos eventos |
| `/calendario` | Calendario 2026 filtrable por disciplina |
| `/jueces` | Listado de jueces con tabs y buscador |
| `/autoridades` | Comisión directiva |
| `/disciplinas/artistica-femenina` | Página de disciplina |
| `/disciplinas/artistica-masculina` | ... |
| `/disciplinas/ritmica` | ... |
| `/disciplinas/aerobica-deportiva` | ... |
| `/disciplinas/trampolin` | ... |
| `/disciplinas/acrobatica` | ... |
| `/disciplinas/gimnasia-para-todos` | ... |
| `/disciplinas/parkour` | ... |

---

## Datos incluidos

### eventos.json
113 eventos del calendario 2026. Cada evento tiene:
```json
{
  "titulo": "1er Torneo Provincial GAF",
  "fecha": "2026-04-18",
  "mes": "Abril",
  "sede": "La Plata",
  "disciplina": "Artística Femenina"
}
```

### jueces.json
250 jueces con estructura completa de brevet:
```json
{
  "apellido": "Daloia",
  "nombre": "Paola",
  "club": "Elite Pilar",
  "brevet": [
    { "categoria": "CII", "nivel": "Internacional" },
    { "categoria": "6a9", "nivel": "Nacional" },
    { "categoria": "1a5", "nivel": "Nacional" }
  ],
  "disc_slug": "artistica-femenina",
  "disc_nombre": "Artística Femenina",
  "disc_abrev": "GAF"
}
```

---

## Paleta de colores

```css
--cyan:      #00BFDF   /* Color principal */
--cyan-dark: #0099B5
--ink:       #0F1923   /* Texto principal */
--ink2:      #2C3E50
--muted:     #6B7A8D
--bg:        #F8FBFC
```

---

## Pendiente de integrar

- [ ] Novedades (conectar a CMS o API)
- [ ] Reglamentos y normativas (subir PDFs)
- [ ] Contenido de cada disciplina (invitaciones, reglamentos, resultados)
- [ ] Logo oficial en `/public/logo.png`
- [ ] Favicon en `/public/favicon.ico`
- [ ] Links de redes sociales en Footer.js
- [ ] Deploy en Vercel o servidor propio

---

## Deploy en Vercel (recomendado)

```bash
npm install -g vercel
vercel
```

O conectar el repositorio de GitHub a vercel.com para deploy automático.
