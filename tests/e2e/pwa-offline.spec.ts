import { test, expect } from '@playwright/test'

test('service worker is available', async ({ page }) => {
  await page.goto('/')
  const hasServiceWorker = await page.evaluate(async () => {
    if (!('serviceWorker' in navigator)) return false
    const registration = await navigator.serviceWorker.getRegistration()
    return Boolean(registration)
  })

  expect(hasServiceWorker).toBeTruthy()
})
