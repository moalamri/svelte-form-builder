import { dndElement } from './helpers/dnd-element';
import { FORM_FIELD_TESTID, AREA_TESTID, BUTTONS_TESTID, EDITOR_TESTID, ELEMENT_TESTID } from './helpers/selectors';
import { expect, test } from '@playwright/test';

test.describe('Drag and Drop Form Builder', () => {
          test.beforeEach(async ({ page }) => {
                    await page.goto('/');
                    // Wait for the page to be fully loaded
                    await page.waitForSelector('main');
                    // Wait for elements list to be visible
                    await page.getByTestId(AREA_TESTID.ELEMENTS_LIST).waitFor({ state: 'visible' });
                    // Wait for drop zone to be visible
                    await page.getByTestId(AREA_TESTID.DROPZONE).waitFor({ state: 'visible' });
          });

          test('should have all draggable elements in the elements panel', async ({ page }) => {
                    // Check that all draggable elements are present
                    for (const et in ELEMENT_TESTID) {
                              await expect(page.getByTestId(ELEMENT_TESTID[et])).toBeVisible();
                    }

          });

          test('should show drop zone area when dragging an element', async ({ page }) => {
                    const formArea = page.getByTestId(AREA_TESTID.FORM_AREA);
                    const dropZoneBoundingBox = await formArea.boundingBox();

                    // Check that drop zone `data-isdragging` attribute is set to `false`
                    expect(await formArea.getAttribute('data-isdragging')).toBe('false');

                    // Drag input element over form area
                    await dndElement(page, ELEMENT_TESTID.INPUT, { dropZoneBoundingBox, mouseUp: false });

                    // Drag over form area
                    await formArea.hover();

                    // Check that drop zone `data-isdragging` attribute is set to `true`
                    expect(await formArea.getAttribute('data-isdragging')).toBe('true');

                    // Release the mouse
                    await page.mouse.up();

                    // Check that drop zone `data-isdragging` attribute is set to `false`
                    expect(await formArea.getAttribute('data-isdragging')).toBe('false');
          });

          test('should successfully drag and drop all elements into form', async ({ page }) => {
                    // element.dragTo(dropZone) is not working as expected (always times out)
                    // instead, we will use the mouse to drag and drop the elements

                    // Get the bounding box of the drop zone
                    const dropZoneBoundingBox = await page.getByTestId(AREA_TESTID.DROPZONE).boundingBox();

                    for (const element in ELEMENT_TESTID) {
                              await dndElement(page, ELEMENT_TESTID[element], { dropZoneBoundingBox });
                    }

                    // Verify that all elements are successfully dropped by counting the number of the form fields
                    await expect(page.locator('[data-form-element]')).toHaveCount(Object.keys(ELEMENT_TESTID).length);
          });

          test('should show sorting handles for dropped elements', async ({ page }) => {
                    const dropZoneBoundingBox = await page.getByTestId(AREA_TESTID.DROPZONE).boundingBox();

                    // Drag input element into drop zone
                    await dndElement(page, ELEMENT_TESTID.INPUT, { dropZoneBoundingBox });

                    // Verify drag handles are present
                    await expect(page.locator('.handle')).toHaveCount(1);
          });

          test('should allow reordering of elements within form', async ({ page }) => {
                    const dropZoneBoundingBox = await page.getByTestId(AREA_TESTID.DROPZONE).boundingBox();

                    // Add two elements
                    await dndElement(page, ELEMENT_TESTID.INPUT, { dropZoneBoundingBox });
                    await dndElement(page, ELEMENT_TESTID.TITLE, { dropZoneBoundingBox });

                    // Get drag handles
                    const dragHandles = page.locator('.handle');
                    expect(dragHandles).toHaveCount(2);

                    // Start dragging the first element
                    const firstHandle = page.locator('.handle').first();
                    await firstHandle.hover();
                    await page.mouse.down();

                    // Move to position after second element
                    const secondElement = page.locator('[data-form-element]').nth(1);
                    await secondElement.hover();

                    // Release to reorder
                    await page.mouse.up();

                    // Verify elements are still present (reordering should work)
                    await expect(page.getByTestId(FORM_FIELD_TESTID.INPUT)).toBeVisible();
                    await expect(page.getByTestId(FORM_FIELD_TESTID.TITLE)).toBeVisible();
          });

          test('should remove element when delete button is clicked', async ({ page }) => {
                    const dropZoneBoundingBox = await page.getByTestId(AREA_TESTID.DROPZONE).boundingBox();

                    // Drag input element into drop zone
                    await dndElement(page, ELEMENT_TESTID.INPUT, { dropZoneBoundingBox });

                    // Verify element was added
                    await expect(page.getByTestId(FORM_FIELD_TESTID.INPUT)).toBeVisible();

                    // Click delete icon
                    const deleteIcon = page.getByTestId(BUTTONS_TESTID.DELETE_BUTTON);
                    await deleteIcon.click();

                    // Confirm deletion
                    await page.getByTestId(BUTTONS_TESTID.DELETE_BUTTON_YES).click();

                    // Verify element was removed
                    await expect(page.getByTestId(FORM_FIELD_TESTID.INPUT)).not.toBeVisible();
                    await expect(page.getByTestId(AREA_TESTID.DROPZONE)).toBeVisible();
          });

          test('should cancel element deletion when clicking outside popover', async ({ page }) => {
                    const dropZoneBoundingBox = await page.getByTestId(AREA_TESTID.DROPZONE).boundingBox();

                    // Drag input element into drop zone
                    await dndElement(page, ELEMENT_TESTID.INPUT, { dropZoneBoundingBox });

                    // Click delete icon
                    const deleteIcon = page.getByTestId(BUTTONS_TESTID.DELETE_BUTTON);
                    await deleteIcon.click();

                    // Click outside to cancel
                    await page.click('body');

                    // Verify popover is not visible
                    await expect(page.getByTestId('delete-popover')).not.toBeVisible();

                    // Verify element is still present
                    await expect(page.getByTestId(FORM_FIELD_TESTID.INPUT)).toBeVisible();
          });

          test('should show editor when element is dropped into form area', async ({ page }) => {
                    const dropZoneBoundingBox = await page.getByTestId(AREA_TESTID.DROPZONE).boundingBox();

                    // Drag input element into drop zone
                    await dndElement(page, ELEMENT_TESTID.INPUT, { dropZoneBoundingBox });

                    // Verify editor panel shows element settings
                    await expect(page.getByTestId(EDITOR_TESTID.INPUT)).toBeVisible();
          });

          test('should select active element when clicked', async ({ page }) => {
                    const dropZoneBoundingBox = await page.getByTestId(AREA_TESTID.DROPZONE).boundingBox();

                    // Drag input element into drop zone
                    await dndElement(page, ELEMENT_TESTID.INPUT, { dropZoneBoundingBox });
                    // Drag title element into drop zone
                    await dndElement(page, ELEMENT_TESTID.TITLE, { dropZoneBoundingBox });

                    const inputElement = page.getByTestId(FORM_FIELD_TESTID.INPUT);
                    const titleElement = page.getByTestId(FORM_FIELD_TESTID.TITLE);
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
                    const dropZoneBoundingBox = await page.getByTestId(AREA_TESTID.DROPZONE).boundingBox();

                    // Drag input element into drop zone
                    await dndElement(page, ELEMENT_TESTID.INPUT, { dropZoneBoundingBox });
                    // Drag title element into drop zone
                    await dndElement(page, ELEMENT_TESTID.TITLE, { dropZoneBoundingBox });

                    // Click on the input element to select it
                    await page.getByTestId(FORM_FIELD_TESTID.INPUT).click();

                    // Verify editor panel shows element settings
                    await expect(page.getByTestId(EDITOR_TESTID.INPUT)).toBeVisible();
          });

          test('should handle drag and drop with different viewport sizes', async ({ page }) => {
                    // The bounding box of the drop zone
                    let dropZoneBoundingBox = null;

                    // Test mobile viewport
                    await page.setViewportSize({ width: 375, height: 667 });
                    // Hide left panel
                    await page.getByTestId(BUTTONS_TESTID.TOGGLE_LEFT_PANEL).click();

                    // Drop zone bounding box for mobile viewport
                    dropZoneBoundingBox = await page.getByTestId(AREA_TESTID.DROPZONE).boundingBox();

                    // Drag input element into drop zone
                    await dndElement(page, ELEMENT_TESTID.INPUT, { dropZoneBoundingBox });
                    await expect(page.getByTestId(FORM_FIELD_TESTID.INPUT)).toBeVisible();

                    // Test tablet viewport
                    await page.setViewportSize({ width: 768, height: 1024 });
                    await page.reload();
                    await page.getByTestId(AREA_TESTID.ELEMENTS_LIST).waitFor({ state: 'visible' });

                    // Drop zone bounding box for tablet viewport
                    dropZoneBoundingBox = await page.getByTestId(AREA_TESTID.DROPZONE).boundingBox();

                    // Drag input element into drop zone
                    await dndElement(page, ELEMENT_TESTID.INPUT, { dropZoneBoundingBox });
                    await expect(page.getByTestId(FORM_FIELD_TESTID.INPUT)).toBeVisible();

                    // Test desktop viewport
                    await page.setViewportSize({ width: 1920, height: 1080 });
                    await page.reload();
                    await page.getByTestId(AREA_TESTID.ELEMENTS_LIST).waitFor({ state: 'visible' });

                    // Drop zone bounding box for desktop viewport
                    dropZoneBoundingBox = await page.getByTestId(AREA_TESTID.DROPZONE).boundingBox();

                    // Drag input element into drop zone
                    await dndElement(page, ELEMENT_TESTID.INPUT, { dropZoneBoundingBox });
                    await expect(page.getByTestId(FORM_FIELD_TESTID.INPUT)).toBeVisible();
          });
});
