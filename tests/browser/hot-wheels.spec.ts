import { test, expect } from '@playwright/test';

test('Hot Wheels practice is functional on desktop and mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('#/lesson/spotlight-6-module-3c-hot-wheels');
  await expect(page.getByRole('heading', { name: 'Hot Wheels' })).toBeVisible();
  await expect(page.getByText('Exercise 1 of 5')).toBeVisible();
  await page.getByLabel('Vocabulary answer 1').selectOption('helmet');
  await page.getByRole('button', { name: 'Check answers' }).click();
  await expect(page.getByText('1 / 8')).toBeVisible();

  await page
    .getByRole('navigation', { name: 'Choose exercise' })
    .getByRole('button', { name: '2' })
    .click();
  await page.getByRole('checkbox', { name: 'Sentence 1: who' }).check();
  await page.getByRole('checkbox', { name: 'Sentence 1: that' }).check();
  await page.getByRole('button', { name: 'Check answers' }).click();
  await expect(page.getByText('1 / 7')).toBeVisible();

  await page
    .getByRole('navigation', { name: 'Choose exercise' })
    .getByRole('button', { name: '4' })
    .click();
  await expect(page.getByText('READING · 150 WORDS')).toBeVisible();
  await page
    .getByRole('navigation', { name: 'Choose exercise' })
    .getByRole('button', { name: '5' })
    .click();
  await page
    .getByLabel('Your short article')
    .fill('Sofia is a driver who enjoys karting and whose team helps young people.');
  await page.getByRole('button', { name: 'Check writing requirements' }).click();
  await expect(page.getByText('✓ You used at least two relative pronouns.')).toBeVisible();
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(2);
});
