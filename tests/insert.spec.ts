import { dndElement } from './helpers/dndElement';
import { FORM_FIELD_TESTID, AREA_TESTID, BUTTONS_TESTID, ELEMENT_TESTID } from './helpers/selectors';
import { expect, test } from '@playwright/test';

test.describe('Insert Form Element', () => {
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
