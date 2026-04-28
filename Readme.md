## AuraMix

Local-first Vue 3 PWA with sound mixer, focus timer, session journal and preset exchange.

### Stack
- Vue 3 + Composition API + TypeScript
- Vite + Pinia + Vue Router
- idb/idb-keyval
- howler.js
- vite-plugin-pwa
- Tailwind CSS

### Architecture
- `app -> pages -> features -> entities -> shared`
- `shared` has no knowledge of upper layers
- `entities` stores model/state only
- `features` hold business behavior

### Scripts
- `npm run dev`
- `npm run build`
- `npm run typecheck`
- `npm run lint`
- `npm run test`
- `npm run test:e2e`
