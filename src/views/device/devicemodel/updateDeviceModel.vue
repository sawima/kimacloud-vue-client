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
        <el-button type="primary" @click="onSubmit">更新</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import { updateDeviceModel } from '@/api/devices'

export default {
  name: 'NewDeviceModel',
  // props: {
  //   form: {
  //     type: Object,
  //     // eslint-disable-next-line vue/require-valid-default-prop
  //     default: () => {
  //       return {
  //         hardType: '',
  //         cpu: '',
  //         ram: '',
  //         hd: '',
  //         os: '',
  //         osversion: ''
  //       }
  //     }
  //   }
  // },
  data() {
    return {
      form: {
        hardType: '',
        cpu: '',
        ram: '',
        hd: '',
        os: '',
        osversion: '',
        modelID: ''
      }
    }
  },
  mounted() {
    this.form = this.$route.params.form
  },
  methods: {
    onSubmit() {
      console.log('update!')
      updateDeviceModel(this.form).then(res => {
        this.$router.go(-1)
      })
    },
    onCancel() {
      this.$router.go(-1)
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
