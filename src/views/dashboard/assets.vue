<template>
  <div class="dashboard-container">
    <el-collapse>
      <el-collapse-item title="新建资源分组" name="1">
        <el-form :inline="true" :model="newAssetGroupForm" class="demo-form-inline" size="mini">
          <el-form-item label="分组名称">
            <el-input v-model="newAssetGroupForm.groupName" placeholder="分组名称" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="createNewAssetGroup">新建</el-button>
          </el-form-item>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <ul class="group-list">
      <li>
        <span>
          <i class="el-icon-folder" />
          <span class="folder-name">
            <el-button type="text">Group0</el-button>
          </span>

        </span>
      </li>
      <li>
        <span>
          <i class="el-icon-folder" />
          <span class="folder-name">Group Name1</span>
        </span>
      </li>
      <li>
        <span>
          <i class="el-icon-folder" />
          <span class="folder-name">Group Name1</span>
        </span>
      </li>
      <li>
        <span>
          <i class="el-icon-folder" />
          <span class="folder-name">Group Name1</span>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      newAssetGroupForm: {
        groupName: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'userContext'
    ])
  },
  methods: {
    createNewAssetGroup() {
      console.log('create New Asset Group')
    }
  }
}
</script>

<style lang="scss" scoped>
ul.group-list {
  overflow: hidden;
    list-style: none;
    padding: 0!important;
    border: 1px solid #eaeefb;
    border-radius: 4px;
}
</style>
