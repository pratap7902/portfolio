import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Chandra Pratap Singh Chauhan/);
});

test('hero section is visible', async ({ page }) => {
    await page.goto('/');

    // Expect the hero heading to be visible
    await expect(page.getByRole('heading', { name: /Building Scalable/i })).toBeVisible();

    // Expect the "View Projects" button to be visible
    await expect(page.getByRole('link', { name: /View Projects/i })).toBeVisible();
});

test('navbar is visible', async ({ page }) => {
    await page.goto('/');

    // Expect the navbar to be visible
    await expect(page.locator('header')).toBeVisible();

    // Expect the resume button to be visible
    await expect(page.getByRole('link', { name: /Resume/i }).first()).toBeVisible();
});

test('about section is visible', async ({ page }) => {
    await page.goto('/');

    // Scroll to about section
    await page.locator('#about').scrollIntoViewIfNeeded();

    // Expect the About Me heading to be visible
    await expect(page.getByRole('heading', { name: /About Me/i })).toBeVisible();

    // Expect some skills to be visible
    await expect(page.getByText('Data Engineering').first()).toBeVisible();
    await expect(page.getByText('Kubernetes').first()).toBeVisible();
});

test('experience section is visible', async ({ page }) => {
    await page.goto('/');

    // Scroll to experience section
    await page.locator('#experience').scrollIntoViewIfNeeded();

    // Expect the Experience heading to be visible
    await expect(page.getByRole('heading', { name: /Experience/i })).toBeVisible();

    // Expect UrbanPiper to be visible
    await expect(page.getByText('UrbanPiper').first()).toBeVisible();
});

test('projects section is visible', async ({ page }) => {
    await page.goto('/');

    // Scroll to projects section
    await page.locator('#projects').scrollIntoViewIfNeeded();

    // Expect the Projects heading to be visible
    await expect(page.getByRole('heading', { name: /Featured Projects/i })).toBeVisible();

    // Expect a project card to be visible
    await expect(page.getByText('Distributed Data Pipeline').first()).toBeVisible();
});

test('contact section is visible', async ({ page }) => {
    await page.goto('/');

    // Scroll to contact section
    await page.locator('#contact').scrollIntoViewIfNeeded();

    // Expect the Contact heading to be visible
    await expect(page.getByRole('heading', { name: /Get In Touch/i })).toBeVisible();

    // Expect the Say Hello button to be visible
    await expect(page.getByRole('link', { name: /Say Hello/i })).toBeVisible();
});

test('capture full page screenshot', async ({ page }) => {
    await page.goto('/');
    // Wait for animations
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'public/portfolio-screenshot.png', fullPage: true });
});
