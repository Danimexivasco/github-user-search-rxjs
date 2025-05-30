import { test as base, expect, Locator } from "@playwright/test";

export const test = base.extend<{
  searchInput: Locator;
}>({
  searchInput: async ({ page }, use) => {
    await page.goto("/");
    const input = page.getByRole("textbox", {
      name: "Search GitHub users"
    });
    await use(input);
  }
});

export { expect };