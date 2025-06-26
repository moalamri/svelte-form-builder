import type { Page } from "@playwright/test";

type BoundingBox = {
          x: number;
          y: number;
          width: number;
          height: number;
};

type DndElementOptions = {
          dropZoneBoundingBox: BoundingBox;
          steps?: number;
          mouseUp?: boolean;
};

export const dndElement = async (page: Page, toDragTestId: string, options: DndElementOptions) => {
          const { dropZoneBoundingBox, steps = 4, mouseUp = true } = options;
          const { x, y, width, height } = dropZoneBoundingBox;

          await page.getByTestId(toDragTestId).hover();
          await page.mouse.down();
          await page.mouse.move(x + width / 2, y + height / 2, { steps });
          if (mouseUp) {
                    await page.mouse.up();
          }
};