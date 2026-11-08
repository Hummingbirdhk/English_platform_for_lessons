import { test, expect } from '@playwright/test';

test('irregular verb exercise controls work across all steps', async ({ page }) => {
  await page.goto('#/lesson/irregular-verbs-holiday');
  await expect(page.getByRole('heading', { name: /Past Simple.*Irregular Verbs/s })).toBeVisible();
  await page.getByLabel('Verb type for travel').selectOption('regular');
  await page.getByRole('button', { name: 'Check answers' }).click();
  await expect(page.getByText('1 / 8')).toBeVisible();

  await page
    .getByRole('navigation', { name: 'Choose exercise' })
    .getByRole('button', { name: '3' })
    .click();
  await expect(page.getByText('SENTENCE 5')).toBeVisible();
  await page.getByRole('button', { name: 'Although' }).first().click();
  await expect(page.locator('.irv-assembled button').first()).toHaveText('Although');
  await page.getByRole('button', { name: '↺ Reset' }).first().click();
  await expect(page.locator('.irv-assembled button')).toHaveCount(0);

  await page
    .getByRole('navigation', { name: 'Choose exercise' })
    .getByRole('button', { name: '1' })
    .click();
  await expect(page.getByLabel('Verb type for travel')).toHaveValue('regular');
});
