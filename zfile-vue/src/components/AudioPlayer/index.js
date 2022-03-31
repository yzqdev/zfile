
import AudioPlayer from './AudioPlayer.vue'

AudioPlayer.install = (Vue) => {
    Vue.component(AudioPlayer.name, AudioPlayer)
}

export default AudioPlayer
