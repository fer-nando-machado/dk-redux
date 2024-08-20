import { Howl, HowlOptions } from "howler";
import { Rate, Volume } from "../Game/System/Music";

export default class Howler {
  private static music: Record<string, Howl> = {};

  static load(name: string, options: HowlOptions): void {
    if (this.music[name]) return;

    this.music[name] = new Howl({
      ...options,
    });
  }

  static play(name: string) {
    return this.music[name].play();
  }

  static pause(name: string) {
    return this.music[name].pause();
  }

  static stop(name: string) {
    return this.music[name].stop();
  }

  static setVolume(name: string, volume: Volume) {
    return this.music[name].volume(volume);
  }

  static setRate(name: string, rate: Rate) {
    return this.music[name].rate(rate);
  }

  /*
  static unload(name: string): void {
    if (this.music[name]) {
      this.music[name].unload();
      delete this.music[name];
    }
  }
  */
}
