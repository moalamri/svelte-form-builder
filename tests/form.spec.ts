import { expect, test } from "@playwright/test";
import { dndElement } from "./helpers/dndElement";
import { AREA_TESTID, ELEMENT_TESTID, FORM_FIELD_TESTID } from "./helpers/selectors";

test.describe('Form Element Selection', () => {
        test.beforeEach(async ({ page }) => {
                await page.goto('/');
                // Wait for the page to be fully loaded
                await page.waitForSelector('main');
                // Wait for elements list to be visible
                await page.getByTestId(AREA_TESTID.ELEMENTS_LIST).waitFor({ state: 'visible' });
                // Wait for drop zone to be visible
                await page.getByTestId(AREA_TESTID.DROPZONE).waitFor({ state: 'visible' });
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
});