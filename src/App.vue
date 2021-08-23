<template>
  <div id="app">
    <the-header></the-header>
    <the-main-body></the-main-body>
    <!-- <the-footer></the-footer> -->
    <TheTable></TheTable>
  </div>
</template>

<script>
import TheHeader from "./components/TheHeader";
import TheMainBody from './components/TheMainBody';
import TheTable from './components/TheTable';
export default {
  name: 'App',
  data () {
    return {
    }
  },
  components: {
    TheHeader, TheMainBody,
    // TheFooter,
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