import { test, expect } from "./fixtures";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173/");
});

test.describe("Search", () => {
  test("search input is visible", async ({ searchInput }) => {
    await expect(searchInput).toBeVisible();
  });

  test("Go to user profile", async ({ page, searchInput }) => {
    await searchInput.fill("danimexi");

    const githubProfilePromise = page.waitForEvent("popup");

    await page.getByRole("link", {
      name: "Danimexivasco Danimexivasco"
    }).click();

    const githubProfile = await githubProfilePromise;

    expect(githubProfile.url()).toBe("https://github.com/Danimexivasco");

    await expect(githubProfile.getByText("Daniel Cano")).toBeVisible();
  });

  test("Go to user profile repositories", async ({ page, searchInput }) => {
    await searchInput.fill("danimex");

    const githubProfilePromise = page.waitForEvent("popup");

    await page.getByRole("link", {
      name: "Danimexivasco Danimexivasco"
    }).getByRole("link").click();

    const githubProfile = await githubProfilePromise;

    expect(githubProfile.url()).toBe("https://github.com/Danimexivasco?tab=repositories");

    await expect(githubProfile.getByRole("searchbox", {
      name: "Find a repository…"
    })).toBeVisible();
  });

  test("No users label appear when no users", async ({ page, searchInput }) => {
    await searchInput.fill("danimexito");

    await expect(page.getByText("No users found")).toBeVisible();
  });

  test("should clear input on x click", async ({ page, searchInput }) => {
    await searchInput.fill("danimex");

    await page.getByRole("button", {
      name: "clear input"
    }).click();

    await expect(searchInput).toHaveValue("");
  });
});

test.describe("About App Modal", () => {
  test("should open/close the modal on About the app button click", async ({ page }) => {
    await page.getByRole("button", {
      name: "About the App"
    }).click();
    await expect(page.getByRole("heading", {
      name: "GitHub User Search"
    })).toBeVisible();
    await expect(page.getByText("Stack:")).toBeVisible();
    await page.getByRole("button", {
      name:  "Close",
      exact: true
    }).click();
    await expect(page.getByRole("heading", {
      name: "GitHub User Search"
    })).not.toBeVisible();
  });
});

test.describe("Debounce", () => {
  test("should show the info tooltip", async ({ page }) => {
    await page.getByRole("button", {
      name: "Delay search requests while"
    }).click();
    expect(page.getByText("Delay search requests while")).toBeVisible();
  });

  test("should debounce the search", async ({ page }) => {
    const slider = page.getByRole("slider", {
      name: "debounce in ms"
    });

    await slider.focus();

    for (let i = 0; i < 12; i++) {
      await slider.press("ArrowRight");
    }

    await page.evaluate(() => {
      const slider = document.querySelector("[aria-label=\"debounce in ms\"]") as HTMLInputElement;
      if (slider) {
        slider.value = "1500";
        slider.dispatchEvent(new Event("input", {
          bubbles: true
        }));
        slider.dispatchEvent(new Event("change", {
          bubbles: true
        }));
      }
    });

    await expect(slider).toHaveAttribute("aria-valuenow", "1500");

  });
});