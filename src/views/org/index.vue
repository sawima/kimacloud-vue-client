<template>
  <div class="dashboard-container">
    <h3>欢迎使用设备内容管理后台</h3>
    <p>您还未加入任何组织，请按下面的指引创建或者申请加入组织</p>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card">
          <img src="@/assets/images/iot-gg-cores-icon.svg">
          <p>创建自己的组织，您将是新建组织的主管理员，创建组织后可以邀请子管理员加入您的组织</p>
          <!-- <el-button type="primary">创建组织</el-button> -->
          <el-button type="primary" @click="$router.push('newOrg')">创建组织</el-button>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <img src="@/assets/images/iot-gg-groups-icon.svg">
          <p>发出加入组织申请，等待组织管理员审批</p>
          <el-button type="primary" @click="$router.push('joinOrg')">加入组织</el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Org',
  computed: {
    ...mapGetters([
      'userContext'
    ])
  }
}
</script>
