import { Howl, HowlOptions } from "howler";
import { Rate, Volume } from "../System/Music";

export default class MusicHowler {
  private static music: Record<string, Howl> = {};

  static load(name: string, options: HowlOptions): void {
    if (this.music[name]) return;
    //console.log("loading " + name, options.src);
    this.music[name] = new Howl({
      ...options,
    });
  }

  static play(name: string) {
    //console.log("playing", name);
    return this.music[name]?.play();
  }

  static pause(name: string) {
    //console.log("pausing", name);
    return this.music[name]?.pause();
  }

  static stop(name: string) {
    //console.log("stopping", name);
    return this.music[name]?.stop();
  }

  static setVolume(name: string, volume: Volume) {
    return this.music[name]?.volume(volume);
  }

  static setRate(name: string, rate: Rate) {
    return this.music[name]?.rate(rate);
  }

  static unload(name: string): void {
    if (!this.music[name]) return;
    //console.log("unloading", name);
    this.music[name].unload();
    delete this.music[name];
  }
}
