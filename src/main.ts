import './style.css'

/** В dev снимаем SW от `preview`/старых сессий — иначе перехватывает запросы и отдаёт HTML вместо JS (MIME error). */
if (import.meta.env.DEV && typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
  void navigator.serviceWorker.getRegistrations().then((regs) => regs.forEach((r) => void r.unregister()))
}

import { bootstrapApp } from '@/app/main'

void bootstrapApp()
