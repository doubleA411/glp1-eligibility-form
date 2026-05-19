import { test, expect } from '@playwright/test'

test('happy path - eligible patient completes form', async ({ page }) => {
  await page.goto('http://localhost:3001')

  // Screen 1 - Age
  await page.getByTestId('number-input').fill('35')
  await page.getByTestId('next-button').click()

  // Screen 2 - Weight
  await page.getByTestId('number-input').fill('90')
  await page.getByTestId('next-button').click()

  // Screen 3 - Height
  await page.getByTestId('number-input').fill('170')
  await page.getByTestId('next-button').click()

  // Screen 4 - BMI computed, no input
  await page.getByTestId('next-button').click()

  // Screen 5 - Pregnancy
  await page.getByTestId('radio-input-no').click();
  await page.getByTestId('next-button').click();

  // Screen 6 - Comorbidities
  await page.getByTestId('next-button').click();

  // Screen 7 - Diabetes
  await page.getByTestId('radio-input-no').click();
  await page.getByTestId('next-button').click();

  // Screen 9 - Blood Pressure
  await page.getByTestId('checkbox-input-normal').click();
  await page.getByTestId('next-button').click();

  // Screen 10 - Medications
  await page.getByTestId('next-button').click();

  // Screen 11 - Smoking
  await page.getByTestId('radio-input-no').click();
  await page.getByTestId('next-button').click();

  // Screen 12 - Alcohol
  await page.getByTestId('radio-input-never').click();
  await page.getByTestId('next-button').click();

  // Screen 13 - Activity
  await page.getByTestId('radio-input-moderate').click();
  await page.getByTestId('next-button').click();

  // Screen 14 - Diet
  await page.getByTestId('checkbox-input-balanced').click();
  await page.getByTestId('next-button').click();

  // Screen 15 - Result
  await expect(page.getByTestId('result')).toContainText('Eligible')
})