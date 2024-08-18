import { Howl, HowlOptions } from "howler";

class MusicHowler {
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

  static setVolume(name: string, volume: number) {
    return this.music[name].volume(volume);
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

export default MusicHowler;
