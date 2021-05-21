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
  background-color: #d3dce6;
  color: #333;
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
  background-color: #dadee0;
  border-right: 1px #d6dfea solid;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.main_midea {
  width: 80vw;
}
</style>