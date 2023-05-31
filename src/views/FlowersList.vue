<template>
    <div v-loading="loading">
      <div class="flower-menu">
        <el-input :suffix-icon="Search" clearable v-model="text" class="search-input" placeholder="Search flower" />
        <el-button @click="search"  class="search-button" type="primary">Search</el-button>
        <el-divider direction="vertical" />
        <el-checkbox-group v-model="activeInactive">
          <el-checkbox label="Active" />
          <el-checkbox label="Inactive" />
        </el-checkbox-group>
      </div>
      <div v-if="flowers.length" id="flowers-grid">
        <FlowerCard @click="goToFlowerPage(flower.id)" class="flower-card"
        :flower="flower" v-for="flower in flowers" :key="flower.id"></FlowerCard>
      </div>
      <div v-else>
        <h1 id="no-results">No Results</h1>
      </div>
    </div>
    <div id="el-pagination">
      <el-pagination
        v-model:current-page="currentPage"
        :page-size="6"
        v-if="flowers.length"
        background
        layout="prev, pager, next"
        @current-change="gotoPage"
        :total="total">
      </el-pagination>
    </div>
</template>
<script>
import FlowerCard from '../components/flowerCard.vue'
import { CARD_ON_PAGE_LIMIT } from '../helpers/constants'
const ACTIVE_INACTIVE_MAP = {
  Active: true,
  Inactive: false
}
export default {
  name: 'FlowerList',
  components: {
    FlowerCard
  },
  data () {
    return {
      total: 0,
      text: '',
      currentPage: 1,
      flowers: [],
      loading: false,
      activeInactive: []
    }
  },
  mounted () {
    // if we load the page without query string.
    if (!this.$route.query.page) {
      this.currentPage = 1
      this.$router.push({ name: 'flowerList', query: { page: this.currentPage } })
    } else { // query string exist
      this.currentPage = +this.$route.query.page
      this.fetchFlowers()
    }
  },
  methods: {
    search () {
      const isFirstPage = +this.$route.query.page === 1
      if (isFirstPage) {
        this.fetchFlowers()
      } else {
        this.gotoPage(1)
      }
    },
    async gotoPage (page) {
      this.$router.push({ name: 'flowerList', query: { page } })
    },
    goToFlowerPage (flowerId) {
      this.loading = true
      this.$router.push({ name: 'flower', params: { id: flowerId } })
      this.loading = false
    },
    async fetchFlowers () {
      this.loading = true
      const offset = (this.currentPage - 1) * CARD_ON_PAGE_LIMIT
      const activityStatus = this.activeInactive.length === 2 || this.activeInactive.length === 0 ? null : ACTIVE_INACTIVE_MAP[this.activeInactive[0]]
      const { flowers, total } = await this.$store.dispatch('getFlowers',
        { text: this.text, limit: CARD_ON_PAGE_LIMIT, offset, activityStatus })
      this.flowers = flowers
      this.total = total
      this.loading = false
    }
  },
  watch: {
    async $route (to, from) {
      this.currentPage = +to.query.page
      await this.fetchFlowers()
    },
    async activeInactive () {
      await this.fetchFlowers()
    }
  }
}
</script>

<style scoped lang="scss">

#el-pagination {
  display: flex;
  justify-content: center;
}

#no-results {
  text-align: center;
}

:deep(.search-input) {
  display: inline-block;
  width: 18%;
  margin-left: 30px;
}

#flowers-grid {
  column-width: 320px;
  column-gap: 20px;
  width: 100%;
  max-width: 1180px;
  margin: 30px auto;
  text-align: center;
}

.flower-card {
  margin: 0 0px 15px;
  padding: 0px;
  padding-bottom: 10px;
  transition: opacity 0.4s ease-in-out;
  display: inline-block;
  max-width: 320px;
  cursor: pointer;
}

.flower-menu {
  display: flex;
}

.el-divider--vertical {
  height: 2rem;
  margin: 0 16px;
}

// not working
@media only screen and (max-width: 600px) {
  .flower-menu {
    flex-direction: column;
    justify-content: center;
  }

  .el-checkbox-group {
    display: flex;
    justify-content: center;
    margin-top: 8px;
  }

  .el-divider--vertical {
    display: none;
  }

  :deep(.search-input), :deep(.search-button)  {
      width: 100%;
      display: inline-flex;
    }

  :deep(.search-button) {
    margin-top: 8px;
  }

  :deep(.search-input) {
    margin-left: 0
  }
}
</style>
