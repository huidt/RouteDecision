<template>
  <main name="mainbody">
    <div class="main_content mainleft">
      <the-map-control></the-map-control>
    </div>
    <div class="main_content main_midea">
      <the-map-component></the-map-component>
    </div>
  </main>
</template>

<script>
import TheMapComponent from "./TheMapComponent";
import TheMapControl from "./TheMapControl";
export default {
  components: {
    TheMapComponent, TheMapControl
  }
}

</script>

<style>
main[name="mainbody"] {
  height: 87vh;
  display: flex;
  flex-direction: row;
}

.main_content {
  font-family: "lucida Grande", Verdana, "Microsoft YaHei";
}

.mainleft {
  width: 20vw;
  /* width: 60vw; */
  background-color: #7caac0;
  border-right: 1px #d6dfea solid;
}

.main_midea {
  width: 80vw;
}
</style>