<template>
    <FlowerInfo :flower="flower"></FlowerInfo>
    <FlowerActions @updateFlower="updateFlower" :flower="flower" :flowerId="flowerId"></FlowerActions>
</template>
<script>
import FlowerActions from '../components/FlowerActions.vue'
import FlowerInfo from '../components/FlowerInfo.vue'

export default {
  name: 'Flower',
  components: {
    FlowerActions,
    FlowerInfo
  },
  data () {
    return {
      flower: null
    }
  },
  computed: {
    flowerId () {
      return this.$route.params.id
    }
  },
  created () {
    this.loadFlower()
  },
  methods: {
    async loadFlower () {
      this.flower = await this.$store.dispatch('getFlower', { id: this.flowerId })
    },
    updateFlower (payload) {
      this.flower = Object.assign(this.flower, payload)
    }
  }
}
</script>
