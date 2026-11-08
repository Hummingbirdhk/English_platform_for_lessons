import { test, expect } from '@playwright/test';

for (const width of [320, 375, 390]) {
  test(`mobile navigation and lesson interactions work at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 780 });
    await page.goto('#/');
    const toggle = page.getByRole('button', { name: 'Открыть меню' });
    await expect(toggle).toBeVisible();
    await toggle.click();
    await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
    await page
      .getByRole('navigation', { name: 'Main navigation' })
      .getByRole('link', { name: 'Уроки' })
      .click();
    await expect(page.getByRole('heading', { name: 'Готовые последовательности' })).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeHidden();
    await page.goto('#/lesson/irregular-verbs-holiday');
    await expect(page.getByLabel('Verb type for travel')).toBeVisible();
    await page.getByLabel('Verb type for travel').selectOption('regular');
    await page.getByRole('button', { name: 'Check answers' }).click();
    await expect(page.getByText('1 / 8')).toBeVisible();
    const viewportOverflow = await page.evaluate(() => ({
      root: document.documentElement.scrollWidth,
      viewport: document.documentElement.clientWidth,
    }));
    expect(viewportOverflow.root).toBeLessThanOrEqual(viewportOverflow.viewport + 2);
  });
}

test('tablet and desktop navigation remains fully available', async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 820 });
  await page.goto('#/');
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Открыть меню' })).toBeHidden();
  await page.getByRole('link', { name: 'Материалы' }).click();
  await expect(page.getByRole('heading', { name: 'Библиотека для уроков' })).toBeVisible();
});

test('small-screen reading and dictionary pages retain their content', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 780 });
  await page.goto('#/reading');
  await expect(page.getByRole('heading', { name: 'Давай читать!' })).toBeVisible();
  await page.goto('#/dictionary');
  await expect(page.locator('.dictionary-controls input').first()).toBeVisible();
});
