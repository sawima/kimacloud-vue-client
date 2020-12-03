<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    :default-sort="{prop: 'date', order: 'descending'}"
  >
    <el-table-column
      prop="modelID"
      label="ID"
      sortable
      width="120"
    />
    <el-table-column
      prop="hardType"
      label="型号"
      sortable
      width="120"
    />
    <el-table-column
      prop="cpu"
      label="处理器"
      sortable
      width="120"
    />
    <el-table-column
      prop="ram"
      label="内存"
      sortable
      width="120"
    />
    <el-table-column
      prop="hd"
      label="存储"
      sortable
      width="120"
    />
    <el-table-column
      prop="os"
      label="操作系统"
      sortable
      width="120"
    />
    <el-table-column
      prop="osversion"
      label="系统版本"
      sortable
      width="120"
    />
    <el-table-column
      label="操作"
      width="100"
    >
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="removeModel(scope.row)">删除</el-button>
        <el-button type="text" size="small" @click="editModel(scope)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { deviceModelList, removeDeviceModel } from '@/api/devices'

export default {
  data() {
    return {
      tableData: null,
      loading: false
    }
  },
  watch: {
    '$route': 'fetchData'
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
        this.tableData = data
      })
    },
    removeModel(row) {
      console.log('remove row')
      console.log(row.$index)
      removeDeviceModel({ modelID: row.modelID }).then(res => {
        this.tableData.splice(row.$index - 1, 1)
      })
    },
    editModel(scope) {
      this.$router.push({ name: 'updatemodel', params: { form: {hardType: scope.row.hardType, os: scope.row.os, modelID: scope.row.modelID, cpu: scope.row.cpu, ram: scope.row.ram, hd: scope.row.hd, osversion: scope.row.osversion }}})
    }
  }
}
</script>
