import { afterEach, describe, expect, it, vi } from 'vitest'
import { getInstalledPwaSurface } from '@/shared/lib/platform/use-installed-pwa'

const MEDIA_BROWSER = '(display-mode: browser)'
const MEDIA_STANDALONE = '(display-mode: standalone)'
const MEDIA_WCO = '(display-mode: window-controls-overlay)'

function stubMatchMedia(map: Record<string, boolean>) {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: map[query] ?? false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
}

describe('getInstalledPwaSurface', () => {
  afterEach(() => {
    try {
      Reflect.deleteProperty(window.navigator, 'standalone')
    } catch {
      /* ignore */
    }
    vi.unstubAllGlobals()
  })

  it('вкладка: browser true → false', () => {
    stubMatchMedia({
      [MEDIA_BROWSER]: true,
      [MEDIA_STANDALONE]: false,
      [MEDIA_WCO]: false,
    })
    expect(getInstalledPwaSurface()).toBe(false)
  })

  it('вкладка: всё false → false', () => {
    stubMatchMedia({
      [MEDIA_BROWSER]: false,
      [MEDIA_STANDALONE]: false,
      [MEDIA_WCO]: false,
    })
    expect(getInstalledPwaSurface()).toBe(false)
  })

  it('окно PWA: standalone true → true', () => {
    stubMatchMedia({
      [MEDIA_BROWSER]: false,
      [MEDIA_STANDALONE]: true,
      [MEDIA_WCO]: false,
    })
    expect(getInstalledPwaSurface()).toBe(true)
  })

  it('окно PWA: window-controls-overlay → true', () => {
    stubMatchMedia({
      [MEDIA_BROWSER]: false,
      [MEDIA_STANDALONE]: false,
      [MEDIA_WCO]: true,
    })
    expect(getInstalledPwaSurface()).toBe(true)
  })

  it('iOS «На экран Домой»: navigator.standalone → true', () => {
    stubMatchMedia({
      [MEDIA_BROWSER]: false,
      [MEDIA_STANDALONE]: false,
      [MEDIA_WCO]: false,
    })
    Object.defineProperty(window.navigator, 'standalone', {
      value: true,
      configurable: true,
      enumerable: true,
    })
    expect(getInstalledPwaSurface()).toBe(true)
  })
})
