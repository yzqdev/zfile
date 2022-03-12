<template>
<div>
  <vue-aplayer
      mini
      float
      :music="{
          title: '兰亭序',
          artist: '周杰伦',
          src: 'http://antiserver.kuwo.cn/anti.s?useless=/resource/&format=mp3&response=res&type=convert_url&rid=MUSIC_118980',
          pic: 'http://img4.kuwo.cn/star/starheads/120/4/80a74b254395e7d786fdc3f68703377_0.jpg',
        }"
  />
</div>
</template>

<script setup>
 import VueAplayer from "vueplug-aplayer/src/vue-aplayer.vue";
</script>

<style scoped>

</style>
