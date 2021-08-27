<template>
  <div id="app">
    <the-header></the-header>
    <the-main-body></the-main-body>
    <TheTable></TheTable>
  </div>
</template>

<script>
import TheHeader from "./components/TheHeader";
import TheMainBody from './components/TheMainBody';
import TheTable from './pages/Table/index.vue';
export default {
  name: 'App',
  data () {
    return {
    }
  },
  components: {
    TheHeader, TheMainBody, TheTable
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