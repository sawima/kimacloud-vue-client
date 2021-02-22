<template>
  <div class="dashboard-container">
    <h3>device</h3>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Org',
  computed: {
    ...mapGetters([
      'userContext'
    ])
  }
}
</script>
