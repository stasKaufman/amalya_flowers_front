<template>
    <el-alert class="inactive-alert" v-if="!isFlowerActive" :title="inactiveMessage" :closable="false" type="error" />
    <el-row :gutter="20">
        <el-col :sm="24" :lg="11">
          <el-card>
            <div id="image">
                <el-image v-if="flower && flower.url" class="el-image" :src="flower.url" fit="cover" />
                <el-image v-if="flower && !flower.url" class="el-image" src="https://flowers-production.s3.amazonaws.com/photo-coming-soon.jpg" fit="cover" />
            </div>
          </el-card>
        </el-col>
        <el-col :sm="24" :lg="13" v-if="flower">
          <el-card>
            <div id="flower-properties">
            <h1 id="flower-name">{{flower.name}}</h1>
                <template v-for="(value, key) in filteredFlowerProp" :key="value">
                    <div class="flower-property">
                        <span>{{key}}</span><span>{{value}}</span>
                    </div>
                    <el-divider border-style="dashed" />
                </template>
            </div>
          </el-card>
        </el-col>
    </el-row>
</template>

<script>
import { flowerProperties } from '../helpers/mappers'

export default {
  props: {
    flower: {
      type: Object,
      default: null
    }
  },
  computed: {
    isFlowerActive () {
      if (this.flower) {
        return this.flower.is_active
      }
      return false
    },
    inactiveMessage () {
      if (this.flower) {
        return `Flower is inactive ${this.flower.inactive_reasons.length > 0 ? 'becuase of ' + this.flower.inactive_reasons.join() : ''}`
      }
      return ''
    },
    filteredFlowerProp () {
      const filteredFlower = {}
      for (const key in this.flower) {
        if (!(key === 'name' || key === 'url' || key === 'FlowerTrackers' ||
        key === 'inactive_reasons' || key === 'is_active')) {
          const adjustKey = flowerProperties[key]
          filteredFlower[adjustKey] = this.flower[key]
        }
      }
      return filteredFlower
    }
  }
}
</script>

<style lang="scss" scoped>
   .el-row {
        margin-bottom: 20px;
          &:last-child {
            margin-bottom: 0;
          }
   }
    h1#flower-name {
        margin-top: 0px;
    }
    .flower-property {
        display: flex;
        justify-content: space-between;
    }

    .el-image {
        box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
        height: 370px;
    }

    .inactive-alert {
      margin-bottom: 20px;
    }

    @media only screen and (max-width: 830px) {
        .el-image {
          display: flex;
          justify-content: center;
        }

        .el-col:not(:last-child) {
          margin-bottom: 20px
        }
    }

    @media only screen and (max-width: 600px) {
        #flower-name {
            text-align: center;
        }
    }
</style>
