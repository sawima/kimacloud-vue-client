<template>
  <div class="login-container">
    <el-tabs v-model="activeName" class="login-tabs" @tab-click="handleClick">
      <el-tab-pane label="账号密码" name="mobilepasswd">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
          <div class="title-container">
            <h3 class="title">账号密码登陆</h3>
          </div>
          <el-form-item prop="username">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input
              ref="username"
              v-model="loginForm.username"
              placeholder="手机号"
              name="username"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>
          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="密码"
              name="password"
              tabindex="2"
              auto-complete="on"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>
          <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登陆</el-button>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="手机验证码" name="mobileverify">
        <el-form ref="smsLoginForm" :rules="smsLoginRules" :model="smsLoginForm" class="login-form" auto-complete="on" label-position="left">
          <div class="title-container">
            <h3 class="title">手机验证码登陆</h3>
          </div>
          <el-form-item prop="mobile">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input
              ref="mobile"
              v-model="smsLoginForm.mobile"
              placeholder="手机号"
              name="mobile"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>
          <el-form-item prop="smsCode">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              :key="passwordType"
              ref="smsCode"
              v-model="smsLoginForm.smsCode"
              placeholder="短信验证码"
              name="smsCode"
              tabindex="2"
              auto-complete="on"
              @keyup.enter.native="handleSMSLogin"
            />
            <!-- <span class="show-pwd" @click="getSMSCode">
              <svg-icon icon-class="link" />
            </span> -->
            <el-tooltip class="item" effect="dark" content="获取验证码" placement="top-start">
              <span class="show-pwd" @click="requestSMSCode">
                <svg-icon icon-class="link" />
              </span>
            </el-tooltip>
          </el-form-item>
          <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleSMSLogin">登陆</el-button>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="二维码" name="QRCodeVerify">
        <img src="@/assets/images/loginQR.png">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { getSMSCode } from '@/api/user'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    // const validatePassword = (rule, value, callback) => {
    //   if (value.length < 6) {
    //     callback(new Error('The password can not be less than 6 digits'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername, message: '请输入手机号' }],
        password: [{ required: true, trigger: 'blur', message: '请输入密码' }]
        // password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      smsLoginRules: {
        mobile: [{ required: true, trigger: 'blur', message: '请输入手机号' }],
        smsCode: [{ required: true, trigger: 'blur', message: '请输入6位短信验证码' }]
      },
      smsLoginForm: {
        mobile: '',
        smsCode: ''
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      activeName: 'mobilepasswd',
      sendSMSSignal: true
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/passLogin', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleSMSLogin() {
      this.$refs.smsLoginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/smsLogin', this.smsLoginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    requestSMSCode() {
      if (this.smsLoginForm.mobile === '' || this.smsLoginForm.mobile === null) {
        this.$message({
          type: 'warning',
          message: '手机号为空'
        })
      } else {
        this.$message({
          type: 'success',
          message: '成功获取手机验证码'
        })
        if (this.sendSMSSignal) {
          getSMSCode({ mobile: this.smsLoginForm.mobile }).then((res) => {
            console.log(res)
          })
          this.sendSMSSignal = false
        }
      }
    }
  }
}
</script>

<style lang="scss">
$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

    .login-tabs {
        width: 600px;
        max-width: 100%;
        padding: 140px 30px 0;
        margin: 0 auto;
        overflow: hidden;
    }

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: px 5px 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
