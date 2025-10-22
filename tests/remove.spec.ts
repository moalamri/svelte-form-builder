import { expect, test } from '@playwright/test';
import { dndElement } from './helpers/dndElement';
import { AREA_TESTID, BUTTONS_TESTID, ELEMENT_TESTID, FORM_FIELD_TESTID } from './helpers/selectors';

test.describe('Remove Form Element', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		// Wait for the page to be fully loaded
		await page.waitForSelector('main');
		// Wait for elements list to be visible
		await page.getByTestId(AREA_TESTID.ELEMENTS_LIST).waitFor({ state: 'visible' });
		// Wait for drop zone to be visible
		await page.getByTestId(AREA_TESTID.DROPZONE).waitFor({ state: 'visible' });
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
});
