<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="16">
        <el-card class="box-card">
          <el-form ref="form" :model="form" :rules="rules" label-width="80px" size="mini">
            <el-form-item label="团队名称" prop="orgName">
              <el-input v-model="form.orgName" />
            </el-form-item>
            <el-form-item label="团队说明" prop="orgDescription">
              <el-input
                v-model="form.orgDescription"
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">新增团队</el-button>
              <el-button @click="resetForm">取消</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="5" class="row-margin-top-20">
      <el-col v-for="org in orgList" :key="org.orgID" :span="4">
        <el-card class="box-card">
          <!-- <p>{{ org.orgName }}</p> -->
          <span>团队名称 {{ org.orgName }}</span>
          <el-button size="mini" round @click="$router.push('orgDetail')">团队详情</el-button>
        </el-card>
      </el-col>

    </el-row>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'

import { newOrg, orgListByUser } from '@/api/org'

export default {
  name: 'NewOrg',
  data() {
    return {
      form: {
        orgName: '',
        orgDescription: ''
      },
      orgList: [],
      rules: {
        orgName: [
          { required: true, message: '请输入团队名称', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      orgListByUser().then(res => {
        const { data } = res
        this.orgList = data
        console.log(data)
        if (data && data.Items) {
          this.orgList = data.Items
        }
        console.log('****orglist')
        console.log(data.Items)
      })
    },
    onSubmit() {
      if (this.orgList.length <= 5) {
        newOrg(this.form).then(res => {
          this.orgList.push({
            orgName: this.form.orgName,
            orgDescription: this.form.orgDescription
          })
          this.form = {}
          this.selectedModel = ''
          this.$message(res.message)
        })
      } else {
        this.$message('超过创建团队数量限制')
      }
    },
    resetForm() {
      this.form = {}
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 10px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.row-margin-top-20 {
    margin-top: 20px;
}
</style>
