<template>
  <div class="dashboard-container">
    <div class="dashboard-text">Assets Store</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AssetsStore',
  computed: {
    ...mapGetters([
      'userContext'
    ])
  }
}
</script>

<style lang="scss" scoped>

</style>
