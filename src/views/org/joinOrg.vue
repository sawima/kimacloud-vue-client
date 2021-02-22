<template>
  <div class="dashboard-container">
    <h1>join org</h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NewOrg',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>
