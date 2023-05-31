<template>
    <el-row :gutter="20">
      <el-col :sm="24" :lg="11">
        <el-card>
          <el-button :disabled="!isFlowerActive || !isAdmin" type="danger" @click="dialogVisible = true" :icon="Delete">deactivate (לפסול)</el-button>
        </el-card>
      </el-col>
      <el-col :sm="24" :lg="13">
        <el-card>
          <TrakingTable v-if="flower" :isFlowerActive="isFlowerActive" :flowerTracker="flower.FlowerTrackers" :flower-id="flowerId"></TrakingTable>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      v-model="dialogVisible"
      width="30%"
      title="Please choose a reason for deactivation (בחר סיבה לפסילה)">
      <el-checkbox-group v-model="checkList">
        <el-checkbox label="lack of demand (חוסר ביקוש)" />
        <el-checkbox label="issues with growth (בעיה בגדילה)" />
      </el-checkbox-group>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="deactivate">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>
</template>

<script>
import TrakingTable from './TrakingTable.vue'
import { Delete } from '@element-plus/icons-vue'

export default {
  data () {
    return {
      Delete,
      dialogVisible: false,
      checkList: []
    }
  },
  components: {
    TrakingTable
  },
  props: {
    flower: {
      type: Object,
      default: null
    },
    flowerId: {
      type: Number
    }
  },
  computed: {
    isFlowerActive () {
      if (this.flower) {
        return this.flower.is_active
      }
      return false
    },
    isAdmin () {
      return +localStorage.getItem('role') === 200
    }
  },
  methods: {
    async deactivate () {
      this.dialogVisible = false
      const flowerPayload = { id: this.flowerId, inactive_reasons: this.checkList, is_active: false }
      await this.$store.dispatch('updateFlower', flowerPayload)
      this.$emit('updateFlower', { is_active: false, inactive_reasons: [...this.checkList] })
    }
  }
}
</script>

<style  lang="scss" scoped>
    .el-card .el-button {
      width: 100%;
    }

    @media only screen and (max-width: 830px) {

        .el-col:not(:last-child) {
          margin-bottom: 20px
        }
    }
</style>
