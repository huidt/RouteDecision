<template>
  <div id="app">
    <the-header></the-header>
    <the-main-body></the-main-body>
    <the-footer></the-footer>
  </div>
</template>

<script>
import TheHeader from "./components/TheHeader";
import TheMainBody from './components/TheMainBody';
import TheFooter from './components/TheFooter';
export default {
  name: 'App',
  components: {
    TheHeader, TheMainBody, TheFooter,
  }
}
</script>

<style scoped>
body {
  display: flex;
  flex-direction: column;
}
</style>