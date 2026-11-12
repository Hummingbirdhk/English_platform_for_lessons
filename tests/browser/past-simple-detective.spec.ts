import { test, expect } from '@playwright/test';

test('detective lesson works on a small phone', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('#/lesson/irregular-verbs-mascot-mystery');
  await expect(page.getByRole('heading', { name: /Past Simple.*Detective Club/s })).toBeVisible();
  await page.getByRole('radio', { name: 'V2 of begin: began' }).check();
  await page.getByRole('button', { name: 'Check answers' }).click();
  await expect(page.getByText('1 / 8')).toBeVisible();
  await page
    .getByRole('navigation', { name: 'Choose exercise' })
    .getByRole('button', { name: '2' })
    .click();
  await page.getByRole('textbox', { name: 'Sentence 4 answer' }).fill('know');
  await page
    .getByRole('navigation', { name: 'Choose exercise' })
    .getByRole('button', { name: '3' })
    .click();
  await page.getByRole('textbox', { name: /Story gap 1/ }).fill('went');
  await page.getByRole('button', { name: 'Check answers' }).click();
  await expect(page.getByText('1 / 8')).toBeVisible();
  await page
    .getByRole('navigation', { name: 'Choose exercise' })
    .getByRole('button', { name: '5' })
    .click();
  await page.getByRole('radio', { name: 'Correction 1: went' }).check();
  await page.getByRole('button', { name: 'Check answers' }).click();
  await expect(page.getByText('1 / 6')).toBeVisible();
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(2);
});
