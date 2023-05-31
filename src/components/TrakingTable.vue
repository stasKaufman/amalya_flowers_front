<template>
    <el-table
  :row-key="row => row.date"
  :cell-style="cellStyle"
  id="tracking-table"
  :data="adjustedTrackerList">
    <el-table-column prop="free_text" type="expand">
      <template #default="scope">
        <el-input
          :disabled="!isFlowerActive"
          :modelValue="scope.row.free_text"
          @update:modelValue="updateText($event, scope.$index)"
          :rows="2"
          type="textarea"
          placeholder="Please input"
        />
      </template>
    </el-table-column>
    <el-table-column min-width="15">
      <template #default="scope">
        <el-icon id="comment-icon" size="18" :color="COMMENT_ICON_COLOR" v-if="scope.row.free_text && scope.row.free_text.length > 0"><Comment /></el-icon>
      </template>
    </el-table-column>
    <el-table-column prop="date" label="Date" min-width="46" />
    <el-table-column prop="appearance" label="Looks" min-width="39">
        <template #default="scope">
            <el-icon v-if="scope.row.appearance === true" :size="25" :color="GREEN"><Select /></el-icon>
            <el-icon v-if="scope.row.appearance === false" :size="25" :color="RED"><CloseBold /></el-icon>
      </template>
    </el-table-column>
    <el-table-column>
      <template #default="scope">
        <el-button :disabled="!isAdmin || !isFlowerActive"  type="success" @click.prevent="updateStatus(scope.$index, true)" circle><el-icon><Select /></el-icon></el-button>
        <el-button :disabled="!isAdmin || !isFlowerActive" type="danger" @click.prevent="updateStatus(scope.$index, false)" circle><el-icon><Close /></el-icon></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { GREEN, RED, COMMENT_ICON_COLOR } from '../helpers/constants'
import { debounce } from 'debounce'
export default {
  props: {
    flowerId: {
      type: Number
    },
    flowerTracker: {
      type: Array,
      default: () => []
    },
    isFlowerActive: {
      type: Boolean,
      default: true
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
    this.debounceCreateOrUpdate = debounce(this.createOrUpdateFlowerTracker, 800)
  },
  mounted () {
    this.setAdjustedTrackerList()
  },
  methods: {
    cellStyle ({ columnIndex }) {
      if (columnIndex === 4) {
        return { 'text-align': 'right' }
      }
      if (columnIndex === 3) {
        return { 'text-align': 'center' }
      }
    },
    setConstants () {
      this.RED = RED
      this.GREEN = GREEN
      this.COMMENT_ICON_COLOR = COMMENT_ICON_COLOR
    },
    async createOrUpdateFlowerTracker (payload, index) {
      payload.flower_Id = this.flowerId
      payload.date = this.adjustedTrackerList[index].date
      const currentAppearance = this.adjustedTrackerList[index].appearance
      const currentText = this.adjustedTrackerList[index].free_text
      try {
        await this.$store.dispatch('createOrUpdateFlowerTracker', payload)
      } catch (error) {
        // rollback in case error happened.
        this.adjustedTrackerList[index].appearance = currentAppearance
        this.adjustedTrackerList[index].free_text = currentText
      }
    },
    updateText (text, index) {
      // optimistic update
      this.adjustedTrackerList[index].free_text = text
      const payload = {
        free_text: text
      }
      this.debounceCreateOrUpdate(payload, index)
    },
    updateStatus (index, status) {
      // optimistic update
      this.adjustedTrackerList[index].appearance = status
      // get data and send to the server
      const payload = { appearance: status }
      this.debounceCreateOrUpdate(payload, index)
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
    // width: 46%;
    display: inline-block;
  }

  #comment-icon {
    margin-top: 10px;
    margin-left: -10px;
  }

  @media only screen and (max-width: 820px) {
      #tracking-table {
        width: 100%
      }
    }
</style>
