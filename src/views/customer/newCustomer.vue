<template>
  <div class="dashboard-container">
    <el-form ref="customerform" :model="customerform" :rules="rules" label-width="100px" size="mini">
      <el-form-item label="客户名称" prop="customerName">
        <el-input v-model="customerform.customerName" />
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="customerform.address" />
      </el-form-item>
      <el-form-item label="主账号" prop="rootAccount">
        <el-input v-model="customerform.rootAccount" />
      </el-form-item>
      <el-form-item label="主账号密码" prop="rootPasswd">
        <el-input v-model="customerform.rootPasswd" />
      </el-form-item>
      <el-form-item label="联系人" prop="contactPerson">
        <el-input v-model="customerform.contactPerson" />
      </el-form-item>
      <el-form-item label="邮箱" prop="contactEmail">
        <el-input v-model="customerform.contactEmail" />
      </el-form-item>
      <el-form-item label="电话" prop="contactMobile">
        <el-input v-model="customerform.contactMobile" />
      </el-form-item>
      <el-form-item label="客户版本">
        <el-select v-model="customerform.signageVersion" prop="signageVersion" placeholder="请选择版本">
          <el-option label="免费版" value="free" />
          <el-option label="专业版" value="pro" />
          <el-option label="企业版" value="ent" />
          <el-option label="定制版" value="cust" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">新增客户</el-button>
        <el-button @click="resetForm">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import { newCustomer } from '@/api/customer'

export default {
  name: 'OrgManaggement',
  data() {
    return {
      customerform: {
        customerName: '',
        address: '',
        rootAccount: '',
        rootPasswd: '',
        contactPerson: '',
        contactEmail: '',
        contactMobile: '',
        signageVersion: ''
      },
      rules: {
        customerName: [
          { required: true, message: '请输入客户名称', trigger: 'blur' }
        ],
        signageVersion: [
          { required: true, message: '请选择客户版本', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      // console.log('submit!')
      newCustomer(this.customerform).then(res => {
        this.customerform = {}
        // this.selectedModel = ''
      })
    },
    resetForm() {
      this.customerform = {}
      // this.selectedModel = ''
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
