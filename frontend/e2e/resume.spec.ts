import { test, expect } from "@playwright/test";

test("resume path - reload in screen 7 and check it lands in screen 7", async ({
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

  // Page refreshes
  await page.reload();

  // Check page lands in Screen 7
  await expect(page.getByTestId("screen-prompt")).toContainText(
    "Have you ever been diagnosed with diabetes?",
  );
});
