<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <span class="margin-right-10">
        <el-dropdown>
          <span class="el-dropdown-link">
            {{ currentOrgName }}<i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="org in userContext.orgs" :key="org.orgID" :data-orgID="org.orgID" :data-orgName="org.orgName" @click.native="org_item_click">{{ org.orgName }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </span>
      <span class="margin-right-10">
        <el-dropdown trigger="click">
          <!-- <div class="avatar-wrapper">
            <p>{{ userContext.nickName }}</p>
            <i class="el-icon-caret-bottom" />
          </div> -->
          <span class="el-dropdown-link">
            @ {{ userContext.nickName }}<i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <router-link to="/userprofile">
              <el-dropdown-item>
                用户信息
              </el-dropdown-item>
            </router-link>
            <!-- <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
            <el-dropdown-item>Docs</el-dropdown-item>
          </a> -->
            <el-dropdown-item divided @click.native="logout">
              <span style="display:block;">注销</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      orgList: [],
      currentOrgName: ''
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'userContext'
    ])
  },
  created() {
    this.orgList = this.userContext.orgs
    this.currentOrgName = this.userContext.orgs[0].orgName
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    org_item_click(value) {
      this.currentOrgName = value.target.getAttribute('data-orgName')
      this.$store.dispatch('user/setWorkOrg', value.target.getAttribute('data-orgID'))
    }
  }
}
</script>

<style lang="scss" scoped>
.margin-right-10{
  margin-right: 10px;
}
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      // vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
