<template>
  <div class="dashboard-container">
    <el-form ref="form" :model="form" label-width="80px" size="mini">
      <el-form-item label="设备类别">
        <el-input v-model="form.hardType" />
      </el-form-item>
      <el-form-item label="处理器">
        <el-input v-model="form.cpu" />
      </el-form-item>
      <el-form-item label="内存">
        <el-input v-model="form.ram" />
      </el-form-item>
      <el-form-item label="存储">
        <el-input v-model="form.hd" />
      </el-form-item>
      <el-form-item label="操作系统">
        <el-input v-model="form.os" />
      </el-form-item>
      <el-form-item label="系统版本">
        <el-input v-model="form.osversion" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.prevent="onSubmit">新建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import { newDeviceModel } from '@/api/devices'

export default {
  name: 'NewDeviceModel',
  data() {
    return {
      form: {
        hardType: '',
        cpu: '',
        ram: '',
        hd: '',
        os: '',
        osversion: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
      newDeviceModel(this.form).then(res => {
        // this.$router.go()
        this.form = {}
      })
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
