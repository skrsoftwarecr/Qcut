import { test, expect } from '@playwright/test';

test.describe('smoke', () => {
  test('página de login carga', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByRole('heading', { name: 'Qcut' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Iniciar Sesión' })).toBeVisible();
  });
});
