<template>
  <div class="dashboard-container">
    <h3>device view</h3>
    <el-row>
      <el-col :span="8"><div class="grid-content bg-purple" />
        <p>基本信息</p>
      </el-col>
      <el-col :span="16"><div class="grid-content bg-purple-light" />
        <iframe
          src="http://s.1m2.fun/SingleVideo/"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
          width="600"
          height="480"
          scrolling="no"
        />
      </el-col>
    </el-row>
  </div>
</template>
<script>
// import { mapGetters } from 'vuex'
// import { } from '@/api/devices'

export default {
  name: 'DeviceView'
//   data() {
//     return {
//       activeName: 'first',
//       activateForm: {
//         macAddress: '',
//         activateCode: ''
//       },
//       deviceTableData: [],
//       orgID: this.$route.params.orgID
//     }
//   },
//   computed: {
//     ...mapGetters([
//       'userContext'
//     ])
//   },
//   created() {
//     // this.fetchDeviceList()
//   },
//   methods: {
//     fetchDeviceList() {
//       console.log('fetch device list')
//       getDevicesByOrg({ orgID: this.orgID }).then(res => {
//         console.log(res)
//         this.deviceTableData = res.data
//       })
//     }
//   }
}
</script>
