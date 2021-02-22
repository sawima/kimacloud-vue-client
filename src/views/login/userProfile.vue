<template>
  <div class="dashboard-container">
    <el-row>
      <el-col :span="16">
        <h3>用户信息</h3>
        <el-form ref="userInfoForm" :model="userInfoForm" status-icon :rules="userInfoRules" label-width="80px">
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="userInfoForm.mobile" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item label="用户名" prop="nickName">
            <el-input v-model="userInfoForm.nickName" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item>
            <el-button size="mini" type="primary" @click="submitForm('userInfoForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="16">
        <h3>修改密码</h3>
        <el-form ref="passForm" :model="passForm" status-icon :rules="passwdRules" label-width="80px">
          <el-form-item label="密码" prop="password">
            <el-input v-model="passForm.password" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item label="确认密码" prop="repeatPassword">
            <el-input v-model="passForm.repeatPassword" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item>
            <el-button size="mini" type="primary" @click="submitForm('passForm')">提交</el-button>
            <el-button size="mini" @click="resetForm('passForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { changePasswd, updateUserProfile } from '@/api/user'

export default {
  name: 'ChangePWD',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.passForm.repeatPassword !== '') {
          this.$refs.passForm.validateField('repeatPassword')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.passForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var validatePasswordLength = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位字母或数字'))
      } else {
        callback()
      }
    }
    return {
      passForm: {
        password: '',
        repeatPassword: ''
      },
      userInfoForm: {
        mobile: '',
        nickName: ''
      },
      userInfoRules: {
        mobile: [{ required: true, trigger: 'blur', message: '请输入手机号' }],
        // username: [{ required: true, trigger: 'blur', validator: validateUsername, message: '请输入手机号' }],
        nickName: [{ required: true, trigger: 'blur', message: '请输入昵称' }]
      },
      passwdRules: {
        password: [
          { validator: validatePass, trigger: 'blur' },
          { validator: validatePasswordLength, trigger: 'blur' }
        ],
        repeatPassword: [
          { validator: validatePass2, trigger: 'blur' }
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
    console.log('created!!!')
    this.userInfoForm.mobile = this.userContext.mobile
    this.userInfoForm.nickName = this.userContext.nickName
  },
  methods: {
    submitForm(formName) {
      const password = this.passForm.password
      this.$refs[formName].validate((valid) => {
        if (valid) {
        //   changePasswd({ password: password }).then((res) => {
        //     this.$message({
        //       type: 'success',
        //       message: '密码修改成功'
        //     })
        //     this.$refs[formName].resetFields()
        //   })
          switch (formName) {
            case 'passForm':
              changePasswd({ password: password }).then((res) => {
                this.$message({
                  type: 'success',
                  message: '密码修改成功'
                })
              })
              this.$refs[formName].resetFields()
              break
            case 'userInfoForm':
              updateUserProfile({ mobile: this.userInfoForm.mobile, nickName: this.userInfoForm.nickName }).then((res) => {
                this.$message({
                  type: 'success',
                  message: '用户信息修改成功'
                })
                this.$store.dispatch('user/refreshUserInfo')
              })
              break
          }
        //   this.$refs[formName].resetFields()
        } else {
          this.$message({
            type: 'warning',
            message: '提交错误'
          })
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
