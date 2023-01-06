<template>
  <el-table :cell-style="cellStyle" id="tracking-table" :data="adjustedTrackerList">
    <el-table-column prop="date" label="Date" />
    <el-table-column prop="appearance" label="Appearance">
        <template #default="scope">
            <el-icon v-if="scope.row.appearance === true" :size="25" :color="GREEN"><Select /></el-icon>
            <el-icon v-if="scope.row.appearance === false" :size="25" :color="RED"><CloseBold /></el-icon>
      </template>
    </el-table-column>
    <el-table-column>
      <template #default="scope">
        <el-button :disabled="!isAdmin"  type="success" @click.prevent="changeStatus(scope.$index, true)" circle><el-icon><Select /></el-icon></el-button>
        <el-button :disabled="!isAdmin" type="danger" @click.prevent="changeStatus(scope.$index, false)" circle><el-icon><Delete /></el-icon></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { GREEN, RED } from '../helpers/constants'
export default {
  props: {
    flowerId: {
      type: Number
    },
    flowerTracker: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      adjustedTrackerList: []
    }
  },
  name: 'TrakingTable',
  created () {
    this.setConstants()
  },
  mounted () {
    this.setAdjustedTrackerList()
  },
  methods: {
    cellStyle ({ columnIndex }) {
      if (columnIndex === 2) {
        return { 'text-align': 'right' }
      }
    },
    setConstants () {
      this.RED = RED
      this.GREEN = GREEN
    },
    async changeStatus (index, status) {
      // optimistic update
      const currentAppearance = this.adjustedTrackerList[index].appearance
      this.adjustedTrackerList[index].appearance = status
      // get data and send to the server
      const payload = { flower_Id: this.flowerId, date: this.adjustedTrackerList[index].date, appearance: status }
      try {
        await this.$store.dispatch('createOrUpdateFlowerTracker', payload)
      } catch (error) {
        // rollback in case error happened.
        this.adjustedTrackerList[index].appearance = currentAppearance
      }
    },
    setAdjustedTrackerList () {
      const setTracker = new Set()

      this.adjustedTrackerList = this.flowerTracker.map(t => {
        const monthIndex = new Date(t.date).getMonth()
        setTracker.add(monthIndex)
        // present only the year and month.
        t.date = t.date.substring(0, 7)
        return t
      })
      // fill the missing months
      for (let loop = 0; loop < 12; loop++) {
        if (!setTracker.has(loop)) {
          const date = `2023-${loop >= 9 ? loop + 1 : `0${loop + 1}`}`
          this.adjustedTrackerList.push({ date, appearance: null })
        }
      }
      // sort by month.
      this.adjustedTrackerList.sort((a, b) => {
        const monthA = +a.date.substring(5)
        const monthB = +b.date.substring(5)
        return monthA - monthB
      })
    }
  },
  computed: {
    isAdmin () {
      return +localStorage.getItem('role') === 200
    }
  }
}
</script>
<style scoped lang="scss">

  #tracking-table {
    width: 46%
  }

  @media only screen and (max-width: 820px) {
      #tracking-table {
        width: 100%
      }
    }
</style>
