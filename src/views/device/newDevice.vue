<template>
  <div class="dashboard-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" size="mini">
      <el-form-item label="物理地址" prop="macAddress">
        <el-input v-model="form.macAddress" />
      </el-form-item>
      <!-- <el-form-item label="激活码" prop="activateCode">
        <el-input v-model="form.activateCode" />
      </el-form-item> -->
      <el-form-item label="设备型号">
        <el-select v-model="selectedModel" placeholder="请选择" @change="selectModel($event)">
          <el-option
            v-for="item in device_model"
            :key="item.modelID"
            :label="item.hardType"
            :value="item.modelID"
          >
            <span style="float: left">{{ item.hardType }}</span>
            <span style="float: left;padding-left: 16px;">{{ item.os }}</span>
            <span style="float: left; color: #8492a6; font-size: 13px; padding-left: 16px;">{{ item.osversion }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">新增设备</el-button>
        <el-button @click="resetForm">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import { deviceModelList, newDevice } from '@/api/devices'

export default {
  name: 'RegisterNewDevice',
  data() {
    return {
      form: {
        macAddress: '',
        activateCode: '',
        deviceModel: {}
      },
      rules: {
        macAddress: [
          { required: true, message: '请输入网卡地址', trigger: 'blur' },
          { min: 12, max: 12, message: '长度在 12 个字符', trigger: 'blur' }
        ],
        // activateCode: [
        //   { required: true, message: '生成激活码', trigger: 'blur' }
        // ],
        deviceType: [
          { required: true, message: '请选择设备型号', trigger: 'change' }
        ]
      },
      value: '',
      device_model: {},
      selectedModel: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      deviceModelList().then(res => {
        this.loading = false
        const { data } = res
        this.device_model = data
      })
    },
    onSubmit() {
      // console.log('submit!')
      newDevice(this.form).then(res => {
        this.form = {}
        this.selectedModel = ''
      })
    },
    resetForm() {
      this.form = {}
      this.selectedModel = ''
    },
    selectModel(e) {
      // eslint-disable-next-line eqeqeq
      const selecteDeviceModel = this.device_model[this.device_model.findIndex(item => item.modelID == e)]
      this.form.deviceModel = {
        modelID: selecteDeviceModel.modelID,
        hardType: selecteDeviceModel.hardType,
        cpu: selecteDeviceModel.cpu,
        ram: selecteDeviceModel.ram,
        hd: selecteDeviceModel.hd,
        os: selecteDeviceModel.os,
        osversion: selecteDeviceModel.osversion
      }
      console.log(this.form.deviceModel)
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
