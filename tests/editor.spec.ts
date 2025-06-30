import { expect, test } from "@playwright/test";
import { dndElement } from "./helpers/dndElement";
import { AREA_TESTID, EDITOR_TESTID, ELEMENT_TESTID, FORM_FIELD_TESTID } from "./helpers/selectors";

test.describe('Editor', () => {
        test.beforeEach(async ({ page }) => {
                await page.goto('/');
                // Wait for the page to be fully loaded
                await page.waitForSelector('main');
                // Wait for elements list to be visible
                await page.getByTestId(AREA_TESTID.ELEMENTS_LIST).waitFor({ state: 'visible' });
                // Wait for drop zone to be visible
                await page.getByTestId(AREA_TESTID.DROPZONE).waitFor({ state: 'visible' });
        });

        test('should show editor when element is dropped into form area', async ({ page }) => {
                const dropZoneBoundingBox = await page.getByTestId(AREA_TESTID.DROPZONE).boundingBox();

                // Drag input element into drop zone
                await dndElement(page, ELEMENT_TESTID.INPUT, { dropZoneBoundingBox });

                // Verify editor panel shows element settings
                await expect(page.getByTestId(EDITOR_TESTID.INPUT)).toBeVisible();
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
});