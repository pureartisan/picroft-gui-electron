import { Blinkt } from './blinkt';

class LightManager {

  private blinkt = new Blinkt();

  init(): void {
    this.blinkt.init();
  }

  async clear(): Promise<void> {
    await this.blinkt.clear();
  }

  async showThinking(): Promise<void> {
    await this.blinkt.showRainbow();
  }

}

const singleton = new LightManager();

export {
  singleton as LightManager
};