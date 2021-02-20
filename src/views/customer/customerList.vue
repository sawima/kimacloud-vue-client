<template>
  <div class="dashboard-container">
    <el-table
      :data="customerTable"
      style="width: 100%"
    >
      <el-table-column
        prop="customerName"
        label="客户名称"
        sortable
      />
      <el-table-column
        prop="address"
        label="地址"
      />
      <el-table-column
        prop="rootAccount"
        label="主账号"
        sortable
      />
      <el-table-column
        prop="rootPasswd"
        label="主账号密码"
        sortable
      />
      <el-table-column
        prop="contactPerson"
        label="联系人"
        sortable
      />
      <el-table-column
        prop="contactEmail"
        label="邮箱"
        sortable
      />
      <el-table-column
        prop="contactMobile"
        label="手机"
        sortable
      />
      <el-table-column
        prop="signageVersion"
        label="客户类别"
        sortable
      />
      <el-table-column
        label="操作"
        width="150"
      >
        <template slot-scope="scope">
          <!-- <el-button type="text" size="small" @click="removeModel(scope.row)">删除</el-button> -->
          <el-button type="danger" size="small" icon="el-icon-delete" circle @click="delConfirm(scope.row)" />
          <el-button v-if="scope.row.isDisabled === false " size="small" type="info" icon="el-icon-error" circle @click="toggleDevice(scope.row)" />
          <el-button v-else type="danger" size="small" icon="el-icon-check" circle @click="toggleDevice(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
// import { mapGetters } from 'vuex'
import { customerList } from '@/api/customer'

export default {
  name: 'CustomerList',
  data() {
    return {
      customerTable: null,
      loading: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      customerList().then(res => {
        const { data } = res
        this.customerTable = data
        console.log(this.customerTable)
      })
    }
    // tableRowClassName(row, rowIndex) {
    //   if (!row.row.isActivated) {
    //     return 'not-activated-row'
    //   }
    //   return ''
    // },
    // delConfirm(row) {
    //   this.$confirm('此操作将永久删除该设备, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     removeDevice({ macAddress: row.macAddress }).then(res => {
    //       this.tableData.splice(this.tableData.findIndex(item => item.macAddress === row.macAddress), 1)
    //       this.$message({
    //         type: 'success',
    //         message: '删除成功!'
    //       })
    //     })
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消删除'
    //     })
    //   })
    // },
    // toggleDevice(row) {
    //   toggleDevice({ macAddress: row.macAddress, isDisabled: row.isDisabled }).then(res => {
    //     const deviceIndex = this.tableData.findIndex(item => item.macAddress === row.macAddress)
    //     this.tableData[deviceIndex].isDisabled = !this.tableData[deviceIndex].isDisabled
    //   })
    // }
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
