<template>
    <div>
        <el-card class="box-card" :body-style="{ padding: '0px' }">
            <el-image
            :class="{ 'inactive-opacity': !isFlowerActive }"
              fit="cover"
              v-if="flower.url"
              :src="flower.url"
            />
            <el-image
              fit="cover"
              v-else
              src="https://flowers-production.s3.amazonaws.com/photo-coming-soon.jpg"
            />
            <div id="flower-details" :class="{ inactive: !isFlowerActive }">
              <span class="flower-id">{{flower.id}}</span>
              <el-divider direction="vertical" />
              <span>{{flower.variety_catalog_id}}</span>
              <el-divider v-if="flower.name" direction="vertical" />
              <span v-if="flower.name">{{flower.name}}</span>
              <el-divider v-if="flower.old_id" direction="vertical" />
              <span v-if="flower.old_id">{{flower.old_id}}</span>
            </div>
        </el-card>
    </div>
</template>
<script>

export default {
  name: 'FlowerCard',
  props: {
    flower: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    isFlowerActive () {
      if (this.flower) {
        return this.flower.is_active
      }
      return false
    }
  }
}
</script>
<style lang="scss" scoped>
.box-card {
    max-width: 350px;
    height: 415px;
}

.el-image {
  height: 330px
}

#flower-details {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 78px;
}

.flower-id {
  display: flex;
  align-items: center;
  justify-content: center;
}

.inactive {
  color: #f56c6c;
  background-color: #fef0f0;
}

.inactive-opacity {
  opacity: 60%;
}
</style>
