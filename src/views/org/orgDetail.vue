<template>
  <div class="dashboard-container">
    <h3>Org Detail</h3>
    <p>{{ $route.params.orgID }}</p>
    
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
