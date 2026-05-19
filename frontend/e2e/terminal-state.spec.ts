import { test, expect } from "@playwright/test";

test("underage - ineligible state", async ({ page }) => {
  await page.goto("http://localhost:3001");

  // Screen 1 - Age
  await page.getByTestId("number-input").fill("16");
  await page.getByTestId("next-button").click();

  await expect(page.getByTestId("result")).toContainText("Ineligible");
});

test("pregnancy - ineligible state", async ({ page }) => {
  await page.goto("http://localhost:3001");

  // Screen 1 - Age
  await page.getByTestId("screen-1").waitFor();
  await page.getByTestId("number-input").fill("35");
  await page.getByTestId("next-button").click();

  // Screen 2 - Weight
  await page.getByTestId("screen-2").waitFor();
  await page.getByTestId("number-input").fill("90");
  await page.getByTestId("next-button").click();

  // Screen 3 - Height
  await page.getByTestId("screen-3").waitFor();
  await page.getByTestId("number-input").fill("170");
  await page.getByTestId("next-button").click();

  // Screen 4 - BMI computed, no input
  await page.getByTestId("screen-4").waitFor();
  await page.getByTestId("next-button").click();

  // Screen 5 - Pregnancy
  await page.getByTestId("radio-input-yes").click();
  await page.getByTestId("next-button").click();

  await expect(page.getByTestId("result")).toContainText("Ineligible");
});

test("Clinical Review - when already in GLP-1 receptor agnonist", async ({
  page,
}) => {
  await page.goto("http://localhost:3001");

  // Screen 1 - Age
  await page.getByTestId("screen-1").waitFor();
  await page.getByTestId("number-input").fill("35");
  await page.getByTestId("next-button").click();

  // Screen 2 - Weight
  await page.getByTestId("screen-2").waitFor();
  await page.getByTestId("number-input").fill("90");
  await page.getByTestId("next-button").click();

  // Screen 3 - Height
  await page.getByTestId("screen-3").waitFor();
  await page.getByTestId("number-input").fill("170");
  await page.getByTestId("next-button").click();

  // Screen 4 - BMI computed, no input
  await page.getByTestId("screen-4").waitFor();
  await page.getByTestId("next-button").click();

  // Screen 5 - Pregnancy
  await page.getByTestId("radio-input-no").click();
  await page.getByTestId("next-button").click();

  // Screen 6 - Comorbidities
  await page.getByTestId("next-button").click();

  // Screen 7 - Diabetes
  await page.getByTestId("radio-input-no").click();
  await page.getByTestId("next-button").click();

  // Screen 9 - Blood Pressure
  await page.getByTestId("checkbox-input-normal").click();
  await page.getByTestId("next-button").click();

  // Screen 10 - Medications
  await page.getByTestId("checkbox-input-glp-1-receptor-agonist").click();
  await page.getByTestId("next-button").click();

  // Screen 15 - Result
  await expect(page.getByTestId("result")).toContainText("Clinical Review");
});
