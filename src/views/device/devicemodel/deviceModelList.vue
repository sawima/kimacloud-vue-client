<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    :default-sort="{prop: 'date', order: 'descending'}"
  >
    <el-table-column
      prop="type"
      label="型号"
      sortable
      width="180"
    />
    <el-table-column
      prop="cpu"
      label="处理器"
      sortable
      width="180"
    />
    <el-table-column
      prop="ram"
      label="内存"
      sortable
      width="180"
    />
    <el-table-column
      prop="hd"
      label="存储"
      sortable
      width="180"
    />
    <el-table-column
      prop="os"
      label="操作系统"
      sortable
      width="180"
    />
    <el-table-column
      prop="osversion"
      label="系统版本"
      sortable
      width="180"
    />
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        type: 'Raspiberry 4 B+',
        cpu: 'ARM 64',
        ram: '2G',
        hd: '16G',
        os: 'ubuntu core',
        osversion: '18.04'
      }, {
        type: 'Raspiberry 4 B+',
        cpu: 'ARM 64',
        ram: '4G',
        hd: '16G',
        os: 'Raspbian os',
        osversion: '10.04'
      }, {
        type: 'Raspiberry 3 B',
        cpu: 'ARM 64',
        ram: '1G',
        hd: '16G',
        os: 'ubuntu core',
        osversion: '18.04'
      }, {
        type: 'Raspiberry 4 B+',
        cpu: 'ARM 64',
        ram: '8G',
        hd: '32G',
        os: 'ubuntu core',
        osversion: '18.04'
      }]
    }
  },
  methods: {
    // formatter(row, column) {
    //   return row.address;
    // }
  }
}
</script>
