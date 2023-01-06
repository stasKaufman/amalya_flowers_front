<template>
    <el-row :gutter="20">
        <el-col :sm="24" :lg="11">
            <div id="image">
                <el-image v-if="isFlowerLoaded && flower.url" class="el-image" :src="flower.url" fit="cover" />
                <el-image v-if="isFlowerLoaded && !flower.url" class="el-image" src="https://flowers-production.s3.amazonaws.com/photo-coming-soon.jpg" fit="cover" />
            </div>
        </el-col>
        <el-col :sm="24" :lg="13" v-if="isFlowerLoaded">
            <div id="flower-properties">
            <h1 id="flower-name">{{flower.name}}</h1>
                <template v-for="(value, key) in filteredFlowerProp" :key="value">
                    <div class="flower-property">
                        <span>{{key}}</span><span>{{value}}</span>
                    </div>
                    <el-divider border-style="dashed" />
                </template>
            </div>
        </el-col>
    </el-row>
    <TrakingTable v-if="flower" :flowerTracker="flower.FlowerTrackers" :flower-id="flowerId"></TrakingTable>
</template>
<script>
import { flowerProperties } from '../helpers/mappers'
import TrakingTable from '../components/TrakingTable.vue'

export default {
  name: 'Flower',
  components: {
    TrakingTable
  },
  data () {
    return {
      flower: null,
      isFlowerLoaded: false
    }
  },
  computed: {
    flowerId () {
      return this.$route.params.id
    },
    filteredFlowerProp () {
      const filteredFlower = {}
      for (const key in this.flower) {
        if (!(key === 'name' || key === 'url' || key === 'FlowerTrackers')) {
          const adjustKey = flowerProperties[key]
          filteredFlower[adjustKey] = this.flower[key]
        }
      }
      return filteredFlower
    }
  },
  created () {
    this.loadFlower()
  },
  methods: {
    async loadFlower () {
      this.flower = await this.$store.dispatch('getFlower', { id: this.flowerId })
      this.isFlowerLoaded = true
    }
  }
}
</script>

<style lang="scss" scoped>
    h1#flower-name {
        margin-top: 0px;
    }
    .el-image {
        box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
        height: 370px;
    }

    .flower-property {
        display: flex;
        justify-content: space-between;
    }

    @media only screen and (max-width: 600px) {
        #flower-name {
            text-align: center;
        }
    }

    @media only screen and (max-width: 830px) {
        .el-image {
          display: flex;
          justify-content: center;
        }
    }
</style>
