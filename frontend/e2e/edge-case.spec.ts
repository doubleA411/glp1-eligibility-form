import { test, expect } from '@playwright/test'

test('edge case - clinical review when blood pressure selects both normal and hypertensive crisis', async ({ page }) => {
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
  await page.getByTestId('checkbox-input-hypertensive-crisis').click();
  await page.getByTestId('next-button').click();


  // Screen 15 - Result
  await expect(page.getByTestId('result')).toContainText('Clinical Review')
})