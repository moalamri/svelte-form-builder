import type { Page } from "@playwright/test";

type BoundingBox = {
          x: number;
          y: number;
          width: number;
          height: number;
};

export const dndElement = async (page: Page, toDragTestId: string, dropZoneBoundingBox: BoundingBox, steps: number = 4) => {
          const toDrag = page.getByTestId(toDragTestId);
          const { x, y, width, height } = dropZoneBoundingBox;

          await toDrag.hover();
          await page.mouse.down();
          await page.mouse.move(x + width / 2, y + height / 2, { steps });
          await page.mouse.up();
};