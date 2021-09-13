<template>
    <div id="app">
        <el-row>
            <el-col :span="24" class="the_header">
                <TheHeader></TheHeader>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-col :span="5" class="the_control">
                    <TheMapControl></TheMapControl>
                </el-col>
                <el-col :span="19" class="the_main">
                    <TheMap></TheMap>
                </el-col>
            </el-col>
        </el-row>
        <TheTable></TheTable>
    </div>
</template>

<script>
import TheTable from './pages/Table/index.vue';
import TheMap from './pages/Map/index.vue';
import TheHeader from './pages/components/TheHeader.vue';
import TheMapControl from './pages/components/TheMapControl.vue';
export default {
    name: 'App',
    data () {
        return {
        }
    },
    components: {
        TheTable,
        TheMap, TheHeader, TheMapControl
    },
    methods: {

    }
}
</script>

<style scoped>
#app {
    display: block;
    height: 100%;
    widows: 100%;
}

.the_header {
    min-height: 10vh;
    background: rgb(159, 107, 211);
}
.the_control {
    min-height: 90vh;
    background: rgb(114, 184, 111);
}
.the_main {
    min-height: 90vh;
    background: rgb(205, 218, 96);
}
</style>