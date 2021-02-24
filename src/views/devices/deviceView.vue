<template>
  <div class="dashboard-container">
    <el-row>
      <el-col :span="8">
        <h3>{{ deviceInfo.terminalName }}</h3>
        <el-button type="text" size="small" @click="$router.push({name:'deviceview',params:null})">素材编排</el-button>
        <el-button type="text" size="small" @click="$router.push({name:'deviceview',params:null})">更换应用</el-button>
        <!-- <el-button type="text" size="small">编辑</el-button> -->
      </el-col>
      <el-col :span="16">
        <iframe
          src="http://s.1m2.fun/SingleVideo/"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
          width="100%"
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
  name: 'DeviceView',
  data() {
    return {
      deviceInfo: this.$route.params
    }
  }
//   computed: {
//     ...mapGetters([
//       'userContext'
//     ])
//   },
  // created() {
  //   // this.fetchDeviceList()
  // },
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
<style lang="scss" scoped>
.preview-container {
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
</style>

