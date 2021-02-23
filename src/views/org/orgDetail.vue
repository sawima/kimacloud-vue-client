<template>
  <div class="dashboard-container">
    <!-- <h3>Org Detail</h3> -->
    <!-- <p>{{ orgID }}</p> -->
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="设备管理" name="first">
        <el-form :inline="true" :model="activateForm" class="demo-form-inline">
          <el-form-item label="设备编号">
            <el-input v-model="activateForm.macAddress" placeholder="设备编号" />
          </el-form-item>
          <el-form-item label="激活码">
            <el-input v-model="activateForm.activateCode" placeholder="激活码" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="btnActivateDevice">绑定设备</el-button>
          </el-form-item>
        </el-form>
        <el-table
          :data="deviceTableData"
          border
          style="width: 100%"
        >
          <el-table-column
            prop="macAddress"
            label="设备编号"
            width="150"
          />
          <el-table-column
            prop="status"
            label="状态"
            width="120"
          />
          <el-table-column
            label="操作"
            width="100"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="应用管理" name="second">应用管理</el-tab-pane>
      <el-tab-pane label="用户管理" name="third">用户管理</el-tab-pane>
      <!-- <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane> -->
    </el-tabs>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { activateDevice, getDevicesByOrg } from '@/api/devices'

export default {
  name: 'Org',
  data() {
    return {
      activeName: 'first',
      activateForm: {
        macAddress: '',
        activateCode: ''
      },
      deviceTableData: [],
      orgID: this.$route.params.orgID
    }
  },
  computed: {
    ...mapGetters([
      'userContext'
    ])
  },
  created() {
    this.fetchDeviceList()
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    btnActivateDevice() {
      // console.log(this.$route.params)
      const activateParams = {
        deviceMAC: this.activateForm.macAddress,
        activateCode: this.activateForm.activateCode,
        orgID: this.$route.params.orgID
      }
      activateDevice(activateParams).then(res => {
        // console.log(res)
        this.$message('new device is registered')
        this.fetchDeviceList()
      })
    },
    fetchDeviceList() {
      console.log('fetch device list')
      getDevicesByOrg({ orgID: this.orgID }).then(res => {
        console.log(res)
        this.deviceTableData = res.data
      })
    }
  }
}
</script>
