import { defineStore } from 'pinia';
import { Howl } from 'howler';
import helper from '@/includes/helper';

export default defineStore('player', {
  state: () => ({
    currentSong: {},
    sound: {},
    seek: '0:00',
    duration: '0:00',
  }),
  actions: {
    async newSong(song) {
      this.currentSong = song;

      this.sound = new Howl({
        src: [song.url],
        html5: true,
      });
      this.sound.play();

      this.sound.on('play', () => {
        requestAnimationFrame(this.progress);
      });
    },
    async toggleAudio() {
      if (!this.sound.playing) {
        return;
      }

      if (this.sound.playing()) {
        this.sound.pause();
      } else {
        this.sound.play();
      }
    },
    progress() {
      this.seek = helper.formatTime(this.sound.seek());
      this.duration = helper.formatTime(this.sound.duration());

      if (this.sound.playing()) {
        requestAnimationFrame(this.progress);
      }
    },
  },
  getters: {
    playing: (state) => {
      if (state.sound.playing) {
        return state.sound.playing();
      }

      return false;
    },
  },
});