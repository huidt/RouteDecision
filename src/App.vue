<template>
  <div id="app">
    <TheTable></TheTable>
  </div>
</template>

<script>
import TheTable from './pages/Table/index.vue';
export default {
  name: 'App',
  data () {
    return {
    }
  },
  components: {
    TheTable
  },
  methods: {

  }
}
</script>

<style scoped>
body {
  display: flex;
  flex-direction: column;
}
</style>