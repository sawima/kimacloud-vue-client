<template>
  <div class="dashboard-container">
    <h3>欢迎使用设备内容管理后台</h3>
    <p>您还未加入任何团队，请按下面的指引创建或者申请加入团队</p>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card">
          <img src="@/assets/images/iot-gg-cores-icon.svg">
          <p>创建自己的团队，您将是新建团队的主管理员，创建团队后可以邀请子管理员加入您的团队</p>
          <!-- <el-button type="primary">创建团队</el-button> -->
          <el-button type="primary" @click="$router.push('newOrg')">创建团队</el-button>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <img src="@/assets/images/iot-gg-groups-icon.svg">
          <p>发出加入团队申请，等待团队管理员审批</p>
          <el-button type="primary" @click="$router.push('joinOrg')">加入团队</el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  name: 'Org'
//   computed: {
//     ...mapGetters([
//       'name'
//     ])
//   }
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
