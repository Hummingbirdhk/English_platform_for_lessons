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

test('unknown lesson shows a safe not-found state', async ({ page }) => {
  await page.goto('#/lesson/not-a-real-lesson');
  await expect(page.getByText('Lesson not found')).toBeVisible();
});
