<template>
  <div class="dashboard-container">
    <el-table
      :data="tableData"
      style="width: 100%"
      :default-sort="{prop: 'date', order: 'descending'}"
      :row-class-name="tableRowClassName"
    >
      <el-table-column
        prop="macAddress"
        label="编号"
        sortable
      />
      <el-table-column
        prop="activateCode"
        label="激活码"
      />
      <el-table-column
        prop="deviceModel.hardType"
        label="型号"
        sortable
      />
      <el-table-column
        prop="deviceModel.cpu"
        label="处理器"
        sortable
      />
      <el-table-column
        prop="deviceModel.ram"
        label="内存"
        sortable
      />
      <el-table-column
        prop="deviceModel.hd"
        label="存储"
        sortable
      />
      <el-table-column
        prop="deviceModel.os"
        label="操作系统"
        sortable
      />
      <el-table-column
        prop="deviceModel.osversion"
        label="系统版本"
        sortable
      />
      <el-table-column
        label="操作"
        width="150"
      >
        <template slot-scope="scope">
          <!-- <el-button type="text" size="small" @click="removeModel(scope.row)">删除</el-button> -->
          <el-button type="danger" size="small"  icon="el-icon-delete" circle @click="delConfirm(scope.row)" />
          <el-button v-if="scope.row.isDisabled === false " size="small" type="info" icon="el-icon-error" circle @click="toggleDevice(scope.row)" />
          <el-button v-else type="danger" size="small" icon="el-icon-check" circle @click="toggleDevice(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
// import { mapGetters } from 'vuex'
import { deviceList, removeDevice, toggleDevice } from '@/api/devices'

export default {
  name: 'DeviceList',
  data() {
    return {
      tableData: null,
      loading: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      deviceList().then(res => {
        const { data } = res
        this.tableData = data
        console.log(this.tableData)
      })
    },
    tableRowClassName(row, rowIndex) {
      if (!row.row.isActivated) {
        return 'not-activated-row'
      }
      return ''
    },
    delConfirm(row) {
      this.$confirm('此操作将永久删除该设备, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeDevice({ macAddress: row.macAddress }).then(res => {
          this.tableData.splice(this.tableData.findIndex(item => item.macAddress === row.macAddress), 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    toggleDevice(row) {
      toggleDevice({ macAddress: row.macAddress, isDisabled: row.isDisabled }).then(res => {
        const deviceIndex = this.tableData.findIndex(item => item.macAddress === row.macAddress)
        this.tableData[deviceIndex].isDisabled = !this.tableData[deviceIndex].isDisabled
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
