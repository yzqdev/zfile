<template>
<div id="player" style="width: 20rem; "></div>
</template>

<script setup>
import 'aplayer/dist/APlayer.min.css';
import APlayer from 'aplayer';
import {onBeforeMount, onMounted, watch} from "vue";
import {useRoute} from "vue-router";
let props=defineProps({
  audioList:{
    type:Array
  }
})
let route=useRoute()
let audios=$ref([]);
console.log('audio==.',audios)

watch(route,(val,oldVal)=>{
    console.log(`%c路由切换,显示英语`,`color:red;font-size:16px;background:transparent`)
    console.log(val)
    props.audioList.map((item) => {
      item. url=encodeURI(item.src)
      audios.push(item)
    })
},{immediate:true})
onMounted(() => {

  const ap = new APlayer({
    container: document.getElementById('player'),
    mini: false,
    autoplay: false,
    theme: '#FADFA3',
    loop: 'all',
    order: 'random',
    preload: 'auto',
    volume: 0.7,
    mutex: true,
    listFolded: false,
    listMaxHeight: 90,
    lrcType: 3,
    audio:audios
  });
})
</script>

<style scoped>

</style>
