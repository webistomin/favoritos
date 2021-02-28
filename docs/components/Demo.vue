<template>
  <div class="demo mt-16">
    <video id="video"
           ref="video"
           class="demo__video"
           src="https://upload.wikimedia.org/wikipedia/commons/7/79/Big_Buck_Bunny_small.ogv"
           controls="false" crossorigin="anonymous" muted>
    </video>

    <div class="grid grid-cols-4 gap-4">
      <button
        @click="addOne"
        type="button"
        class="block bg-red-700 p-4 text-white rounded-lg font-bold text-center focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-accent-800">
        +1
      </button>
      <button
        @click="removeOne"
        type="button"
        class="block bg-red-700 p-4 text-white rounded-lg font-bold text-center focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-accent-800">
        -1
      </button>
      <button
        @click="drawNotificator"
        type="button"
        class="block bg-red-700 p-4 text-white rounded-lg font-bold text-center focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-accent-800">
        Draw notificator
      </button>
      <button
        @click="reset"
        type="button"
        class="block bg-red-700 p-4 text-white rounded-lg font-bold text-center focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-accent-800">
        Reset
      </button>
      <button
        @click="playVideo"
        type="button"
        class="block bg-red-700 p-4 text-white rounded-lg font-bold text-center focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-accent-800">
        Play video
      </button>
      <button
        type="button"
        @click="drawCircleProgress"
        class="block bg-red-700 p-4 text-white rounded-lg font-bold text-center focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-accent-800">
        Draw circle progress
      </button>
      <button
        type="button"
        @click="drawRectProgress"
        class="block bg-red-700 p-4 text-white rounded-lg font-bold text-center focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-accent-800">
        Draw rect progress
      </button>
    </div>
  </div>
</template>

<script>
import Favoritos from 'favoritos';

export default {
  name: 'Demo',

  data() {
    return {
      lib: null,
      counter: 0,
      videoRaf: null,
      options: {
        debug: {
          enabled: true,
        },
      },
    };
  },

  mounted() {
    this.lib = new Favoritos(this.options);
    this.lib.drawBadge(this.counter += 0)
  },

  methods: {
    addOne() {
      this.lib.drawBadge(this.counter += 1)
    },

    removeOne() {
      this.lib.drawBadge(this.counter -= 1)
    },

    drawNotificator() {
      this.lib.drawBadge()
    },

    reset() {
      this.lib.reset();
      this.counter = 0;
      this.$refs.video.pause();
      cancelAnimationFrame(this.videoRaf)
      document.removeEventListener('scroll', this.drawRect)
      document.removeEventListener('scroll', this.drawCircle)
    },

    playVideo() {
      const playVideoStep = () => {
        this.lib.drawImage(this.$refs.video)
        this.videoRaf = requestAnimationFrame(playVideoStep)
      }

      const playVideo = () => {
        this.videoRaf = requestAnimationFrame(playVideoStep);
      }

      video.addEventListener('play',  playVideo)

      video.play();
    },

    drawCircle () {
      let root = document.documentElement;
      let scrollTopInPx = root.scrollTop;
      let pageHeightInPx = root.scrollHeight - root.clientHeight;
      let scrollPercent = (scrollTopInPx / pageHeightInPx) * 100;
      let scrollPercentRounded = Math.round(scrollPercent);

      this.lib.drawProgressBar(scrollPercentRounded);
    },

    drawCircleProgress () {
      this.lib.setOptions({
        icon: {
          shape: 'circle',
          lineWidth: 10,
        }
      })

      document.removeEventListener('scroll', this.drawRect)
      document.addEventListener('scroll', this.drawCircle)
      alert('Scroll the page')
    },

    drawRect() {
      let root = document.documentElement;
      let scrollTopInPx = root.scrollTop;
      let pageHeightInPx = root.scrollHeight - root.clientHeight;
      let scrollPercent = (scrollTopInPx / pageHeightInPx) * 100;
      let scrollPercentRounded = Math.round(scrollPercent);

      this.lib.drawProgressBar(scrollPercentRounded);
    },

    drawRectProgress() {
      this.lib.setOptions({
        icon: {
          shape: 'rect',
          lineWidth: 10,
        }
      })

      document.removeEventListener('scroll', this.drawCircle)
      document.addEventListener('scroll', this.drawRect)
      alert('Scroll the page')
    }
  }
};
</script>

<style>
.demo__video {
  display: none;
}
</style>
