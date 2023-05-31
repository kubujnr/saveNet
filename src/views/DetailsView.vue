<template>
  <div v-if="info.downloading" class="flex justify-center items-center fixed p-4 top-0 left-0 right-0 z-50 bg-transparent">
    <div class="bg-yellow-400 p-2 rounded font-medium text-xs">downloading...</div>
  </div>
  <main class="bg-other min-h-screen space-y-8 pb-8">
    <div class="min-h-[40vh] bg-hero pt-24">
      <div
        class="md:w-3/5 md:mx-auto lg:w-2/5 flex flex-col justify-center items-center px-8 space-y-4"
      >
        <h1 class="md:text-2xl text-xl font-medium text-center">
          SaveNet youtube downloader: Safe downloading with us
        </h1>
        <RouterLink
          to="/"
          class="px-4 py-2 text-xs md:text-sm shadow rounded outline-none font-medium bg-blue-400"
          >Download another</RouterLink
        >
      </div>
    </div>
    <div v-if="info.loading" class="flex -bottom-14 justify-center p-4">
      <div class="bg-white p-4 md:p-8 rounded shadow-xl">
        <div class="md:big-loader loader border-2"></div>
      </div>
    </div>
    <div v-else-if="info.error" class="flex -bottom-24 justify-center p-4">
      <div class="bg-white text-slate-950 p-8 rounded shadow-xl">
        <div class="text-center md:space-y-4 space-y-2">
          <h2 class="text-lg font-medium">Error while loading youtube video</h2>
          <p class="text-gray-600">
            Please check the link or
            <RouterLink to="/" class="text-blue-600 underline">
              Try Again
            </RouterLink>
          </p>
        </div>
      </div>
    </div>
    <div
      v-else-if="info.videoDetails && info.formats"
      class="bg-white md:w-3/5 shadow lg:w-1/2 mx-4 space-y-4 py-8 px-4 md:mx-auto rounded"
    >
      <h3 class="text-xl font-medium">{{ info.videoDetails.title }}</h3>
      <div class="flex gap-4 md:flex-row flex-col">
        <div class="flex-1 space-y-2">
          <img
            v-bind:src="info.videoDetails.thumbnails[4].url"
            alt="youtube thumbnail"
            class="rounded"
          />
          <p class="line-clamp-3 md:hidden text-sm">
            {{ info.videoDetails.description }}
          </p>
        </div>
        <ul class="md:px-8 flex flex-col gap-2">
          <li v-for="format in info.formats">
            <button
              class="inline-flex items-center bg-blue-500 hover:bg-blue-700 text-sm text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              @click="handleDownload(format)"
            >
              {{ format.qualityLabel }} ({{ format.container }})
            </button>
          </li>
        </ul>
      </div>
      <p class="text-sm hidden md:line-clamp-3">
        {{ info.videoDetails.description }}
      </p>
    </div>
  </main>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { RouterLink, useRoute } from "vue-router";

const info = reactive({
  videoDetails: null,
  formats: null,
  loading: false,
  error: false,
  downloading: false
});

async function loadVideoInfo(videoID) {
  info.loading = true;
  info.error = false;

  const url = "https://www.youtube.com/watch?v=" + videoID;
  try {
    const response = await fetch(
      "https://youtube-api-thf1.onrender.com/video?url=" + url
    );

    const videoInfo = await response.json();

    info.formats = videoInfo.formats.filter((f) => f.hasVideo && f.hasAudio);
    info.videoDetails = videoInfo.videoDetails;
  } catch (error) {
    info.error = true;
    console.log(error);
  }

  info.loading = false;
}

const handleDownload = (format) => {
  info.downloading = true
  const downloadUrl = `https://youtube-api-thf1.onrender.com/download-video?url=${info.videoDetails.video_url}&itag=${format.itag}`;
  window.location.href = downloadUrl;
  info.downloading = false
};

const route = useRoute();

onMounted(() => {
  const videoId = route.query.videoID;

  if (videoId == undefined) {
    info.error = false;
    return;
  }

  loadVideoInfo(videoId);
});
</script>
