const MEDIA_BROWSER = '(display-mode: browser)'
const MEDIA_STANDALONE = '(display-mode: standalone)'
const MEDIA_WCO = '(display-mode: window-controls-overlay)'

/**
 * Окно установленного PWA (или iOS «На экран Домой»), не обычная вкладка браузера.
 * Сначала явная вкладка `(display-mode: browser)` → false (Chrome 108+, Chromium Edge).
 * Затем признаки установленного клиента: standalone, WCO, navigator.standalone (Safari iOS).
 */
export function getInstalledPwaSurface(): boolean {
  if (typeof window === 'undefined') return false

  try {
    if (window.matchMedia(MEDIA_BROWSER).matches) return false
  } catch {
    /* окружение без поддержки */
  }

  try {
    if (window.matchMedia(MEDIA_STANDALONE).matches) return true
    if (window.matchMedia(MEDIA_WCO).matches) return true
  } catch {
    /* старые браузеры */
  }

  return (navigator as Navigator & { standalone?: boolean }).standalone === true
}
