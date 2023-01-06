<template>
    <div>
        <el-card class="box-card" :body-style="{ padding: '0px' }">
            <el-image
              fit="cover"
              v-if="flower.url"
              :src="flower.url"
            />
            <el-image
              fit="cover"
              v-else
              src="https://flowers-production.s3.amazonaws.com/photo-coming-soon.jpg"
            />
            <div id="flower-details">
              <span>{{flower.id}}</span>
              <el-divider direction="vertical" />
              <span>{{flower.variety_catalog_id}}</span>
              <el-divider v-if="flower.name" direction="vertical" />
              <span v-if="flower.name">{{flower.name}}</span>
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
</style>
