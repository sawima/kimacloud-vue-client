<template>
  <div class="dashboard-container">
    <div class="dashboard-text">change passwd</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ChangePWD',
  computed: {
    ...mapGetters([
      'userContext'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 10px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
