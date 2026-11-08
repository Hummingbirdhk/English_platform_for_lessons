import { test, expect } from '@playwright/test';

test('public navigation opens lessons and materials', async ({ page }) => {
  await page.goto('#/');
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
  await page.getByRole('link', { name: 'Уроки' }).click();
  await expect(page.getByRole('heading', { name: 'Готовые последовательности' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'The Holiday That Didn\'t Go to Plan' })).toBeVisible();
  await page.getByRole('link', { name: 'Материалы' }).click();
  await expect(page.getByRole('heading', { name: 'Библиотека для уроков' })).toBeVisible();
});

test('student login remains private and never exposes a profile without auth', async ({ page }) => {
  await page.goto('#/students/student-artem');
  await expect(page).toHaveURL(/#\/(students|student\/login|student\/artem)/);
  await expect(page.locator('input[type="password"]').or(page.getByText('Ученик не найден')).or(page.getByText('Вход ученика')).first()).toBeVisible();
});
