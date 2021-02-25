<template>
  <div class="dashboard-container">
    <div v-if="hasOrg">
      <el-row :gutter="20">
        <el-col :span="16">
          <h3>选择终端所属组织</h3>
          <el-select v-model="targetOrg" placeholder="请选择" @change="select_org_change($event)">
            <el-option
              v-for="item in orgList"
              :key="item.orgID"
              :label="item.orgName"
              :value="item.orgID"
            />
          </el-select>
        </el-col>
      </el-row>
    </div>
    <div v-else>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-card class="box-card">
            <el-form ref="newOrgForm" :model="newOrgForm" :rules="rules" label-width="80px" size="mini">
              <el-form-item label="团队名称" prop="orgName">
                <el-input v-model="newOrgForm.orgName" />
              </el-form-item>
              <el-form-item label="团队说明" prop="orgDescription">
                <el-input
                  v-model="newOrgForm.orgDescription"
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
      <!-- <el-row :gutter="5" class="row-margin-top-20">
        <el-col v-for="org in orgList" :key="org.orgID" :span="4">
          <el-card class="box-card">
            <span>团队名称 {{ org.orgName }}</span>
            <el-button size="mini" round @click="$router.push({name:'orgDetail', params: {orgID: org.orgID}})">团队详情</el-button>
          </el-card>
        </el-col>
      </el-row> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { newOrg } from '@/api/org'
import { setLoginUser } from '@/utils/auth'

export default {
  name: 'RegisterORG',
  data() {
    return {
      hasOrg: false,
      targetOrg: '',
      newOrgForm: {
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
  computed: {
    ...mapGetters([
      'userContext'
    ])
  },
  created() {
    // this.fetchData()
    this.orgList = this.userContext.orgs || []
    console.log(this.orgList)
    if (this.orgList.length > 0) {
      this.hasOrg = true
    }
  },
  methods: {
    onSubmit() {
      this.$refs.newOrgForm.validate((valid) => {
        if (valid) {
          console.log('org list !!!')
          console.log(this.orgList)
          if (this.orgList.length <= 5) {
            newOrg(this.newOrgForm).then(res => {
              this.orgList.push({
                orgName: this.newOrgForm.orgName,
                orgID: res.data.orgID,
                orgDescription: this.newOrgForm.orgDescription
              })
              this.userContext.orgs = this.orgList
              setLoginUser(this.userContext)
              this.$store.dispatch('user/getUserInfo')
              this.newOrgForm = {}
              this.selectedModel = ''
              this.$message({ type: 'success', message: res.message })
              this.hasOrg = true
            })
          } else {
            this.$message('超过创建团队数量限制')
          }
        }
      })
    },
    resetForm() {
      this.newOrgForm = {}
    },
    select_org_change(value) {
      this.$store.dispatch('user/setWorkOrg', value)
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.row-margin-top-20 {
    margin-top: 20px;
}
</style>
