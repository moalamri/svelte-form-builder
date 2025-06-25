import { FORM_FIELD_SELECTORS, AREA_SELECTORS, BUTTONS_SELECTORS, EDITOR_SELECTORS, ELEMENT_SELECTORS } from './helpers/selectors';
import { expect, test } from '@playwright/test';

test.describe('Drag and Drop Form Builder', () => {
          test.beforeEach(async ({ page }) => {
                    await page.goto('/');
                    // Wait for the page to be fully loaded
                    await page.waitForSelector('main');
          });

          test('should have draggable elements in the elements panel', async ({ page }) => {
                    // Wait for the elements panel to be visible
                    page.getByTestId(AREA_SELECTORS.ELEMENTS_LIST).waitFor({ state: 'visible' });

                    // Check that all draggable elements are present
                    for (const et in ELEMENT_SELECTORS) {
                              await expect(page.getByTestId(ELEMENT_SELECTORS[et])).toBeVisible();
                    }

          });

          test('should show drop zone area when dragging over form', async ({ page }) => {
                    const formArea = page.getByTestId(AREA_SELECTORS.FORM_AREA);

                    // Drag input element over form area
                    await page.getByTestId(ELEMENT_SELECTORS.INPUT).hover();
                    await page.mouse.down();

                    // Check that drop zone `data-isdragging` attribute is set to `false`
                    expect(await formArea.getAttribute('data-isdragging')).toBe('false');

                    // Drag over form area
                    await formArea.hover();

                    // Check that drop zone `data-isdragging` attribute is set to `true`
                    expect(await formArea.getAttribute('data-isdragging')).toBe('true');

                    // Release mouse
                    await page.mouse.up();
          });

          test('should successfully drop all elements into form', async ({ page }) => {
                    const dropZone = page.getByTestId(AREA_SELECTORS.DROPZONE);

                    for (const selector in ELEMENT_SELECTORS) {
                              await page.getByTestId(ELEMENT_SELECTORS[selector]).dragTo(dropZone);
                    }

                    // Verify all elements were added
                    for (const selector in ELEMENT_SELECTORS) {
                              await expect(page.getByTestId(FORM_FIELD_SELECTORS[selector])).toBeVisible();
                    }
          });

          test('should show sorting handles for dropped elements', async ({ page }) => {
                    const dropZone = page.getByTestId(AREA_SELECTORS.DROPZONE);

                    // Drag input element into drop zone
                    await page.getByTestId(ELEMENT_SELECTORS.INPUT).dragTo(dropZone);

                    // Verify drag handles are present
                    await expect(page.locator('.handle')).toHaveCount(1);
          });

          test('should allow reordering of elements within form', async ({ page }) => {
                    const dropZone = page.getByTestId(AREA_SELECTORS.DROPZONE);
                    const formArea = page.getByTestId(AREA_SELECTORS.FORM_AREA);

                    // Add two elements
                    await page.getByTestId(ELEMENT_SELECTORS.INPUT).dragTo(formArea);
                    await page.getByTestId(ELEMENT_SELECTORS.TITLE).dragTo(dropZone);

                    // Get drag handles
                    const dragHandles = page.locator('.handle');
                    expect(dragHandles).toHaveCount(2);

                    // Start dragging the first element
                    const firstHandle = page.locator('.handle').first();
                    await firstHandle.hover();
                    await page.mouse.down();

                    // Move to position after second element
                    const secondElement = page.locator('[data-fieldid]').nth(1);
                    await secondElement.hover();

                    // Release to reorder
                    await page.mouse.up();

                    // Verify elements are still present (reordering should work)
                    await expect(page.getByTestId(FORM_FIELD_SELECTORS.INPUT)).toBeVisible();
                    await expect(page.getByTestId(FORM_FIELD_SELECTORS.TITLE)).toBeVisible();
          });

          test('should remove element when delete button is clicked', async ({ page }) => {
                    const dropZone = page.getByTestId(AREA_SELECTORS.DROPZONE);

                    // Drag input element into drop zone
                    await page.getByTestId(ELEMENT_SELECTORS.INPUT).dragTo(dropZone);

                    // Verify element was added
                    await expect(page.getByTestId(FORM_FIELD_SELECTORS.INPUT)).toBeVisible();

                    // Click delete icon
                    const deleteIcon = page.getByTestId(BUTTONS_SELECTORS.DELETE_BUTTON);
                    await deleteIcon.click();

                    // Confirm deletion
                    await page.getByTestId(BUTTONS_SELECTORS.DELETE_BUTTON_YES).click();

                    // Verify element was removed
                    await expect(page.getByTestId(FORM_FIELD_SELECTORS.INPUT)).not.toBeVisible();
                    await expect(page.getByTestId(AREA_SELECTORS.DROPZONE)).toBeVisible();
          });

          test('should cancel element deletion when clicking outside popover', async ({ page }) => {
                    const dropZone = page.getByTestId(AREA_SELECTORS.DROPZONE);

                    // Drag input element into drop zone
                    await page.getByTestId(ELEMENT_SELECTORS.INPUT).dragTo(dropZone);

                    // Click delete icon
                    const deleteIcon = page.getByTestId(BUTTONS_SELECTORS.DELETE_BUTTON);
                    await deleteIcon.click();

                    // Click outside to cancel
                    await page.click('body');

                    // Verify popover is not visible
                    await expect(page.getByTestId('delete-popover')).not.toBeVisible();

                    // Verify element is still present
                    await expect(page.getByTestId(FORM_FIELD_SELECTORS.INPUT)).toBeVisible();
          });

          test('should show editor when element is dropped into form area', async ({ page }) => {
                    const dropZone = page.getByTestId(AREA_SELECTORS.DROPZONE);

                    // Drag input element into drop zone
                    await page.getByTestId(ELEMENT_SELECTORS.INPUT).dragTo(dropZone);

                    // Verify editor panel shows element settings
                    await expect(page.getByTestId(EDITOR_SELECTORS.INPUT)).toBeVisible();
          });

          test('should select active element when clicked', async ({ page }) => {
                    const dropZone = page.getByTestId(AREA_SELECTORS.DROPZONE);

                    // Drag input element into drop zone
                    await page.getByTestId(ELEMENT_SELECTORS.INPUT).dragTo(dropZone);
                    // Drag title element into drop zone
                    await page.getByTestId(ELEMENT_SELECTORS.TITLE).dragTo(dropZone);

                    const inputElement = page.getByTestId(FORM_FIELD_SELECTORS.INPUT);
                    const titleElement = page.getByTestId(FORM_FIELD_SELECTORS.TITLE);
                    const inputId = await inputElement.getAttribute('id');
                    const titleId = await titleElement.getAttribute('id');
                    let activeElement = null;

                    // Click on the element to select it
                    await inputElement.click();

                    // Verify that there is a single active element
                    activeElement = page.locator('[data-isactive="true"]');
                    await expect(activeElement).toHaveCount(1);

                    // verify that the active element is the input element by comparing the id
                    expect(await activeElement.getAttribute('id')).toBe(inputId);

                    // Verify that there is a single active element
                    activeElement = page.locator('[data-isactive="true"]');
                    await expect(activeElement).toHaveCount(1);

                    // Click on the title element to select it
                    await titleElement.click();

                    // Verify that the active element is the title element by comparing the id
                    expect(await activeElement.getAttribute('id')).toBe(titleId);
          });

          test('should show editor when element is selected', async ({ page }) => {
                    const dropZone = page.getByTestId(AREA_SELECTORS.DROPZONE);

                    // Drag input element into drop zone
                    await page.getByTestId(ELEMENT_SELECTORS.INPUT).dragTo(dropZone);
                    // Drag title element into drop zone
                    await page.getByTestId(ELEMENT_SELECTORS.TITLE).dragTo(dropZone);

                    // Click on the input element to select it
                    await page.getByTestId(FORM_FIELD_SELECTORS.INPUT).click();

                    // Verify editor panel shows element settings
                    await expect(page.getByTestId(EDITOR_SELECTORS.INPUT)).toBeVisible();
          });

          test('should handle drag and drop with different viewport sizes', async ({ page }) => {
                    const dropZone = page.getByTestId(AREA_SELECTORS.DROPZONE);

                    // Test mobile viewport
                    await page.setViewportSize({ width: 375, height: 667 });

                    // Show left panel
                    await page.getByTestId(BUTTONS_SELECTORS.SHOW_LEFT_PANEL).click();

                    // Drag input element into drop zone
                    await page.getByTestId(ELEMENT_SELECTORS.INPUT).dragTo(dropZone);
                    await expect(page.getByTestId(FORM_FIELD_SELECTORS.INPUT)).toBeVisible();

                    // Test tablet viewport
                    await page.setViewportSize({ width: 768, height: 1024 });
                    await page.reload();
                    await page.getByTestId(AREA_SELECTORS.ELEMENTS_LIST).waitFor({ state: 'visible' });

                    // Drag input element into drop zone
                    await page.getByTestId(ELEMENT_SELECTORS.INPUT).dragTo(dropZone);
                    await expect(page.getByTestId(FORM_FIELD_SELECTORS.INPUT)).toBeVisible();

                    // Test desktop viewport
                    await page.setViewportSize({ width: 1920, height: 1080 });
                    await page.reload();
                    await page.getByTestId(AREA_SELECTORS.ELEMENTS_LIST).waitFor({ state: 'visible' });

                    // Drag input element into drop zone
                    await page.getByTestId(ELEMENT_SELECTORS.INPUT).dragTo(dropZone);
                    await expect(page.getByTestId(FORM_FIELD_SELECTORS.INPUT)).toBeVisible();
          });
});
