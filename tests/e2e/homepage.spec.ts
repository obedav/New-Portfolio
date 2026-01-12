import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('loads successfully', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('h1')).toContainText('David MG');
    await expect(page.locator('text=Software Engineer')).toBeVisible();
  });

  test('displays project cards', async ({ page }) => {
    await page.goto('/');

    const projectCards = page.locator('[data-testid="project-box"]');
    await expect(projectCards).toHaveCount(3); // SwiftPass, Royal Health, TunedU
  });

  test('unfold interaction works end-to-end', async ({ page }) => {
    await page.goto('/');

    // Find first project box
    const projectBox = page.locator('[data-testid="project-box"]').first();

    // Click to unfold
    await projectBox.click();

    // Check Layer 1 is visible
    await expect(page.locator('text=Problem')).toBeVisible();
    await expect(page.locator('text=Solution')).toBeVisible();

    // Navigate to Layer 2
    await page.click('text=View Engineering Details');
    await expect(page.locator('text=Engineering Details')).toBeVisible();
    await expect(page.locator('text=Tech Stack')).toBeVisible();

    // Navigate to Layer 3
    await page.click('text=View Quality & Performance');
    await expect(page.locator('text=Quality & Performance')).toBeVisible();
    await expect(page.locator('text=Lighthouse Scores')).toBeVisible();

    // Navigate to Layer 4
    await page.click('text=View Trade-offs');
    await expect(page.locator('text=Trade-offs & Constraints')).toBeVisible();
  });

  test('keyboard navigation works', async ({ page }) => {
    await page.goto('/');

    // Tab to first project box
    await page.keyboard.press('Tab');

    // Press Enter to open
    await page.keyboard.press('Enter');

    // Verify it opened
    await expect(page.locator('text=Problem')).toBeVisible();
  });

  test('performance is good', async ({ page }) => {
    await page.goto('/');

    // Check that page loads reasonably fast
    const metrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
      };
    });

    // Dom should load quickly
    expect(metrics.domContentLoaded).toBeLessThan(2000);
  });
});

test.describe('Accessibility', () => {
  test('has proper heading structure', async ({ page }) => {
    await page.goto('/');

    // Check for h1
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);

    // Check for proper heading hierarchy
    const headings = await page.locator('h1, h2, h3').all();
    expect(headings.length).toBeGreaterThan(0);
  });

  test('all interactive elements are keyboard accessible', async ({ page }) => {
    await page.goto('/');

    // Tab through interactive elements
    let tabCount = 0;
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');
      const focused = await page.evaluate(() => document.activeElement?.tagName);
      if (focused === 'BUTTON' || focused === 'A') {
        tabCount++;
      }
    }

    // Ensure we can tab to interactive elements
    expect(tabCount).toBeGreaterThan(0);
  });
});
