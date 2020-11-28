import blinkt from '@patched/blinkt';

import { hsv2rgb } from '@electron/utils/colors';
import { onlyRpiSync } from '@electron/utils/device';

/**
 * This class talks directly to Rpi native functions,
 * so we have to check if we are running on RPI
 */
class Blinkt {

  private static readonly RAINBOW_SPACING = 360.0 / 16.0;
  private static readonly DEFAULT_BRIGHTNESS = 0.1;

  private currentInterval: NodeJS.Timeout | null = null;

  init(): void {
    onlyRpiSync(() => {
      blinkt.setClearOnExit()
    }, 'Blinkt.init => blinkt.setClearOnExit()');
  }

  clear(): Promise<void> {
    return new Promise(resolve => {
      onlyRpiSync(() => {
        blinkt.clear()
      }, 'Blinkt.clear => blinkt.clear()');
      resolve();
    });
  }

  showRainbow(): Promise<void> {
    return new Promise(resolve => {

      onlyRpiSync(() => {

        const DELAY = 1; // 1 milisecond

        const interval = setInterval(() => {
          const hue = Number(this.getNowTimestamp() * 100) % 360;

          // set color for each LED
          for (let x=0; x < blinkt.NUM_PIXELS; x++) {
            const offset = x * Blinkt.RAINBOW_SPACING;
            const h = Number((hue + offset) % 360) / 360.0;
            const { r, g, b } = hsv2rgb(h, 1.0, 1.0);
            blinkt.setPixels(x, r, g, b, Blinkt.DEFAULT_BRIGHTNESS);
          }

          // push the change
          blinkt.show();

        }, DELAY);

        this.setCurrentInterval(interval);

      }, 'Blinkt.showRainbow => blinkt.setPixels() / blinkt.show()');

      resolve();

    });
  }

  private getNowTimestamp(): number {
    return new Date().getTime();
  }

  private setCurrentInterval(interval: NodeJS.Timeout): void {
    // if there are old active intervals, clear them
    this.clearCurrentInterval();
    this.currentInterval = interval;
  }

  private clearCurrentInterval(): void {
    try {
      if (this.currentInterval) {
        clearInterval(this.currentInterval);
      }
    } catch {
      // do nothing
    }
  }

}

export { Blinkt };