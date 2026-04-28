import { vi } from 'vitest'

vi.stubGlobal(
  'matchMedia',
  (query: string) =>
    ({
      get matches() {
        if (query.includes('(max-width: 768px)')) return true
        if (query.includes('(display-mode: browser)')) return true
        if (query.includes('(display-mode: standalone)')) return false
        return false
      },
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }) as MediaQueryList,
)
