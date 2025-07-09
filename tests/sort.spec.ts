import { expect, test } from "@playwright/test";
import { dndElement } from "./helpers/dndElement";
import { AREA_TESTID, ELEMENT_TESTID, FORM, FORM_FIELD_TESTID } from "./helpers/selectors";
import { getFieldElement } from "./helpers/getField";

test.describe('Sort Form Elements', () => {
        test.beforeEach(async ({ page }) => {
                await page.goto('/');
                // Wait for the page to be fully loaded
                await page.waitForSelector('main');
                // Wait for elements list to be visible
                await page.getByTestId(AREA_TESTID.ELEMENTS_LIST).waitFor({ state: 'visible' });
                // Wait for drop zone to be visible
                await page.getByTestId(AREA_TESTID.DROPZONE).waitFor({ state: 'visible' });
        });

        test('should show sorting handles for dropped elements', async ({ page }) => {
                const dropZoneBoundingBox = await page.getByTestId(AREA_TESTID.DROPZONE).boundingBox();

                // Drag input element into drop zone
                await dndElement(page, ELEMENT_TESTID.INPUT, { dropZoneBoundingBox });
                await expect(page.getByTestId(FORM_FIELD_TESTID.INPUT)).toBeVisible();
                await dndElement(page, ELEMENT_TESTID.TITLE, { dropZoneBoundingBox });
                await expect(page.getByTestId(FORM_FIELD_TESTID.TITLE)).toBeVisible();

                // Verify drag handles are present
                await expect(page.locator('.handle')).toHaveCount(2);
        });

        test('should allow reordering of elements within form', async ({ page }) => {
                const dropZoneBoundingBox = await page.getByTestId(AREA_TESTID.DROPZONE).boundingBox();

                // Add two elements (each element is added at the top of the drop zone)
                await dndElement(page, ELEMENT_TESTID.INPUT, { dropZoneBoundingBox });
                const droppedInput = page.getByTestId(FORM_FIELD_TESTID.INPUT);
                await expect(droppedInput).toBeVisible();

                await dndElement(page, ELEMENT_TESTID.CHECKBOX, { dropZoneBoundingBox });
                const droppedCheckbox = page.getByTestId(FORM_FIELD_TESTID.CHECKBOX);
                await expect(droppedCheckbox).toBeVisible();

                // The current order is input, checkbox
                expect(droppedInput).toHaveAttribute(FORM.ELEMENT, '0');
                expect(droppedCheckbox).toHaveAttribute(FORM.ELEMENT, '1');

                const { height: checkboxHeight } = await droppedCheckbox.boundingBox();
                const { height: inputHeight, y: inputY } = await droppedInput.boundingBox();
                const toY = inputY + inputHeight + checkboxHeight;

                // Start dragging the first element
                const firstHandle = page.locator('.handle').first();
                await firstHandle.hover();
                await page.mouse.down();
                await page.mouse.move(dropZoneBoundingBox.x + 20, toY, { steps: 50 });
                // Release to reorder
                await page.mouse.up();

                // The new order should be checkbox, input
                const inputIndex = await page.getByTestId(FORM_FIELD_TESTID.INPUT).getAttribute(FORM.ELEMENT);
                const checkboxIndex = await page.getByTestId(FORM_FIELD_TESTID.CHECKBOX).getAttribute(FORM.ELEMENT);
                expect(inputIndex).toBe('1');
                expect(checkboxIndex).toBe('0');
        });
});