import { vi } from 'vitest'

vi.stubGlobal('matchMedia', (query: string) => ({
  matches: query.includes('768'),
  media: query,
  onchange: null,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}))
