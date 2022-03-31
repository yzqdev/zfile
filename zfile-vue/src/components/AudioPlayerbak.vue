<template>
  <vue-aplayer
    v-show="fileList.length > 0 && audioIndex !== -1"
    ref="aplayer"
    id="aplayer"
    fixed
    preload="none"
    :list="fileList"
    @listSwitch="updateCover"
    autoplay
    music="fff"
  />
</template>

<script setup>
import { onMounted, reactive, ref, toRefs, watch } from "vue";
import VueAplayer from "@vueplug/aplayer/src/vue-aplayer.vue";
import axios from "../utils/http";

let state = reactive({
  audioInfo: {},
});
let { audioInfo } = toRefs(state);
let props = defineProps({
  fileList: Array,
  audioIndex: Number,
});
let aplayer = ref(null);

function updateCover() {
  let currentMusic = aplayer.currentMusic;
  axios
    .get("/common/audio-info", { params: { url: currentMusic.url } })
    .then((response) => {
      let data = response.data.data;
      // let el = aplayer.$el;
      // el.getElementsByClassName('aplayer-pic')[0].style.backgroundImage = 'url(' + data.cover + ')';
      // el.getElementsByClassName('aplayer-list-light')[0].getElementsByClassName('aplayer-list-author')[0].innerHTML = data.artist
    });
}

watch(audioInfo, () => {
  if (props.fileList.length > 0 && props.audioIndex !== -1) {
    aplayer.value.play();
    aplayer.switch(propsaudioIndex);
  } else {
    aplayer.pause();
  }
});
onMounted(() => {
  console.log(`%c这是什么`, `color:red;font-size:16px;background:transparent`);
  console.log(aplayer.value.$el);
  // let el = aplayer.value.$el;
  // el.getElementsByClassName("aplayer-miniswitcher")[0].click();
  // el.getElementsByClassName('aplayer-icon-order')[0].setAttribute('title', '播放顺序');
  // el.getElementsByClassName('aplayer-icon-loop')[0].setAttribute('title', '循环模式');
  // el.getElementsByClassName('aplayer-icon-menu')[0].setAttribute('title', '播放列表');
});
watch(props, (data) => {
  if (data.length === 0) {
    aplayer.pause();
  } else {
    for (let file of props.fileList) {
      file.artist = "";
      file.cover = "";
    }
  }
});
</script>

<style scoped>
#aplyer >>> .el-icon-close {
  position: absolute;
  right: 0;
  top: 0;
}
</style>
