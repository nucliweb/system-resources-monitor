import { test, expect } from "@playwright/test";

test.describe("System Resources Monitor", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display the title correctly", async ({ page }) => {
    const title = await page.getByRole("heading", {
      name: "System Resources Monitor v1.0.0",
    });
    await expect(title).toBeVisible();
  });

  test("should display system information", async ({ page }) => {
    const platformInfo = await page.getByText(/Platform:/);
    await expect(platformInfo).toBeVisible();

    const userAgentInfo = await page.getByText(/User Agent:/);
    await expect(userAgentInfo).toBeVisible();
  });

  test("should display all resource cards", async ({ page }) => {
    const memoryCard = await page.getByRole("heading", { name: "[Device Memory]" });
    await expect(memoryCard).toBeVisible();

    const cpuCard = await page.getByRole("heading", { name: "[CPU Cores]" });
    await expect(cpuCard).toBeVisible();

    const networkCard = await page.getByRole("heading", { name: "[Network Information]" });
    await expect(networkCard).toBeVisible();
  });

  test("should have working documentation links", async ({ page }) => {
    const links = await page.getByRole("link").all();

    for (const link of links) {
      const href = await link.getAttribute("href");
      expect(href).toContain("developer.mozilla.org");

      const target = await link.getAttribute("target");
      expect(target).toBe("_blank");

      const rel = await link.getAttribute("rel");
      expect(rel).toContain("noopener");
      expect(rel).toContain("noreferrer");
    }
  });

  test("should show correct support status for APIs", async ({ page }) => {
    const cards = [
      {
        title: "Device Memory",
        filename: "device-memory",
        contentPattern: /GB|This API is not supported/,
      },
      {
        title: "CPU Cores",
        filename: "cpu-cores",
        contentPattern: /cores|This API is not supported/,
      },
      {
        title: "Network Information",
        filename: "network-information",
        contentPattern: /Connection type|This API is not supported/,
      },
    ];

    for (const card of cards) {
      // Localizar el contenedor de la tarjeta basado en el nombre del archivo
      const cardContainer = await page.locator(`div:has(> div > div > span:text-is("${card.filename}.txt"))`).first();

      // Verificar el estado de soporte
      const supportStatus = await cardContainer.locator("h2").locator("span:last-child");
      await expect(supportStatus).toBeVisible();

      const supportText = await supportStatus.textContent();
      expect(supportText).toMatch(/● (Supported|Not Supported)/);

      // Verificar el contenido
      const content = await cardContainer.locator("div.text-green-300").first();
      await expect(content).toBeVisible();

      const contentText = await content.textContent();
      expect(contentText).toMatch(card.contentPattern);
    }
  });

  test("should handle responsive design", async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator("div.max-w-3xl")).toBeVisible();

    // Test desktop viewport
    await page.setViewportSize({ width: 1024, height: 768 });
    await expect(page.locator("div.max-w-3xl")).toBeVisible();

    // Verify text sizes adjust
    const title = await page.getByRole("heading", {
      name: "System Resources Monitor v1.0.0",
    });

    const titleClasses = await title.getAttribute("class");
    expect(titleClasses).toContain("text-xl");
    expect(titleClasses).toContain("sm:text-2xl");
  });
});
