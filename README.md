# vivesarapiqui-demo

Proyecto demo para una página 100% sarapiqueña donde encontrar todos los eventos de la zona en un solo lugar.

Es solo frontend: los datos son de ejemplo y viven en `src/data/`. La idea es que el proyecto real use casi las mismas herramientas y secciones.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack, Cache Components) + React 19 + TypeScript
- [Tailwind CSS 4](https://tailwindcss.com): la paleta (bandera de Sarapiquí, verde selva y rojo rana) está en `src/app/globals.css`
- [@vis.gl/react-google-maps](https://visgl.github.io/react-google-maps/) para Google Maps
- [Lucide](https://lucide.dev) para los íconos
- Fuentes Bricolage Grotesque y Figtree con `next/font`

## Cómo correrlo

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

### Google Maps

Sin clave, el mapa principal muestra un **mapa ilustrado** de respaldo para que el demo funcione sin configurar nada. Para usar Google Maps:

1. Cree una clave de [Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/get-api-key).
2. Copie `.env.example` a `.env.local` y complete `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`.
3. (Opcional) Cree un Map ID con estilo propio y póngalo en `NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID`.

## Publicación (GitHub Pages)

El sitio se exporta como HTML estático (`output: "export"` en `next.config.ts`) y se publica con GitHub Actions (`.github/workflows/deploy.yml`):

- Cada push a `main` compila (lint + build) y publica en GitHub Pages.
- Los pull requests solo compilan, para revisar que nada se rompa.
- También se puede lanzar a mano desde la pestaña **Actions** (“Run workflow”).

### Activar Pages (una sola vez)

1. En GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Haga push a `main`. El sitio queda en `https://jasongonzalezdeveloper.github.io/vivesarapiqui-demo/`.

### Dominio propio

1. **Settings → Pages → Custom domain**: escriba el dominio (por ejemplo `vivesarapiqui.com` o `eventos.sudominio.com`) y guarde.
2. En el proveedor del dominio, cree los registros DNS:
   - **Subdominio** (`www.` o `eventos.`): un registro `CNAME` que apunte a `jasongonzalezdeveloper.github.io`.
   - **Dominio raíz** (`sudominio.com`): registros `A` hacia `185.199.108.153`, `185.199.109.153`, `185.199.110.153` y `185.199.111.153` (y opcionalmente `AAAA` hacia `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`).
3. Cuando GitHub verifique el DNS, active **Enforce HTTPS**.
4. Vuelva a ejecutar el workflow: con dominio propio la ruta base pasa a ser `/` automáticamente (la da `actions/configure-pages`).

### Google Maps en producción

- Agregue la clave como secret del repositorio `GOOGLE_MAPS_API_KEY` (**Settings → Secrets and variables → Actions**). Opcional: la variable `GOOGLE_MAPS_MAP_ID`.
- La clave queda visible en el JavaScript del sitio (así funciona Maps en el navegador): en Google Cloud **restrínjala por referrer HTTP** a su dominio y a `jasongonzalezdeveloper.github.io`.

> Nota: al compilar en Windows, Next.js 16.4 escribe mal los archivos de precarga de la exportación (usa `\` en las rutas) y la consola muestra algunos 404 de archivos `__next.*.txt`. No afecta al build de GitHub Actions, que corre en Linux.

## Secciones

| Ruta | Qué tiene |
| --- | --- |
| `/` | Mapa con los eventos de hoy, mañana, esta semana, este mes (por defecto) y próximos, filtrables por tipo (Turismo, Deporte, Comida, Empresas, Cultura). El color del pin indica el tipo; los de hoy llevan borde rojo y la etiqueta "HOY". Panel inferior plegable en el teléfono; lista + mapa en escritorio. |
| `/eventos/[id]` | Detalle: fotos, organizador, fecha, hora, dirección exacta, Google Maps / Waze, agregar al calendario (.ics), compartir y favoritos. |
| `/historia` | Historia del cantón, bandera, línea del tiempo y distritos. |
| `/comercios` | Directorio con búsqueda, categorías y comercio destacado. |
| `/galeria` | Álbumes de eventos recientes con visor de fotos. |
| `/contacto` | Formulario de contacto y paquetes de publicidad. |
| `/publicar` | Formulario para que los organizadores envíen eventos (con revisión) y elijan su tipo. |

Publicidad: banner fijo de 320 × 50 abajo en el teléfono y banners laterales de 160 × 600 solo en escritorio (`src/components/ads/AdSlots.tsx`).

## Notas del demo

- Las fechas de los eventos se calculan en relación con el día de hoy (`dayOffset` en `src/data/events.ts`) para que siempre haya eventos que mostrar. En el proyecto real serán fechas que vienen del backend.
- Las fotos son espacios reservados (`PhotoPlaceholder`); en el proyecto real se reemplazan por `next/image`.
- Los formularios no envían datos: muestran un mensaje de éxito.
- El contenido de Historia es de muestra y hay que validarlo con la Municipalidad.
