<template>
  <div class="dashboard-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" size="mini">
      <el-form-item label="物理地址" prop="mac">
        <el-input v-model="form.mac" />
      </el-form-item>
      <el-form-item label="激活码" prop="activateCode">
        <el-input v-model="form.activateCode" />
      </el-form-item>
      <el-form-item label="活动区域" prop="region">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="设备型号">
        <el-select v-model="form.deviceType" placeholder="请选择" prop="deviceType" span="12">
          <el-option
            v-for="item in device_model"
            :key="item.typeID"
            :label="item.type"
            :value="item.typeID"
          >
            <span style="float: left">{{ item.type }}</span>
            <span style="float: left">{{ item.os }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.osversion }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">新建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'RegisterNewDevice',
  data() {
    return {
      form: {
        mac: '',
        activateCode: '',
        deviceType: '',
        region: ''
      },
      rules: {
        mac: [
          { required: true, message: '请输入网卡地址', trigger: 'blur' },
          { min: 12, max: 12, message: '长度在 12 个字符', trigger: 'blur' }
        ],
        activateCode: [
          { required: true, message: '生成激活码', trigger: 'blur' }
        ],
        deviceType: [
          { required: true, message: '请选择设备型号', trigger: 'change' }
        ]
      },
      value: '',
      device_model: [{
        typeID: '1',
        type: 'Raspiberry 4 B+',
        cpu: 'ARM 64',
        ram: '2G',
        hd: '16G',
        os: 'ubuntu core',
        osversion: '18.04'
      }, {
        typeID: '2',
        type: 'Raspiberry 4 B+',
        cpu: 'ARM 64',
        ram: '4G',
        hd: '16G',
        os: 'Raspbian os',
        osversion: '10.04'
      }, {
        typeID: '3',
        type: 'Raspiberry 3 B',
        cpu: 'ARM 64',
        ram: '1G',
        hd: '16G',
        os: 'ubuntu core',
        osversion: '18.04'
      }],
      cities: [{
        value: 'Beijing',
        label: '北京'
      }, {
        value: 'Shanghai',
        label: '上海'
      }, {
        value: 'Nanjing',
        label: '南京'
      }, {
        value: 'Chengdu',
        label: '成都'
      }, {
        value: 'Shenzhen',
        label: '深圳'
      }, {
        value: 'Guangzhou',
        label: '广州'
      }]
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
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
