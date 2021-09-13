<template>
    <div id="container"></div>
</template>

<script>
import BMap from 'BaiduMap'

export default {
    data () {
        return {
            map: null,
            accidentMaker: null,
            pointStr: '117.234303, 31.828682',
            wareArr: '116.905052,33.885118,116.498819,33.70784,115.864808,33.900788,116.365201,33.407492,116.952821,33.617648,117.317909,33.695588,115.388228,33.291389,115.93091,32.797736,117.142974,32.619409,116.758518,32.185505,118.323991,31.627163,118.540563,31.560207,117.949576,31.563246,117.254063,32.028204,117.503966,31.877101,117.147201,31.860089,115.967995,31.718272,116.408212,31.411355,116.162172,32.043771,118.420576,31.37261,117.767096,30.842575,117.503067,30.917307,116.120222,30.1842,116.880513,30.796487,118.746693,31.004389,119.515377,30.905072,118.311341,29.440926,118.271427,30.170961,118.825166,30.04006',

            overlayMarkerArr: [],
        }
    },
    created () {
    },
    mounted () {
        this.map = new BMap.Map('container');
        this.mapSetConfig();
        var point = new BMap.Point(116.404, 39.915);
        // 创建点坐标  
        this.map.centerAndZoom(point, 15);
        // this.$store.commit('receiveMap', {
        //     map: this.map
        // });
        // this.$store.commit('updateMarkerPos', {
        //     markerPos: this.pointStr
        // });
        // this.markerSetConfig();
    },
    watch: {
        pointStr: function () {
            this.$store.commit('updateMarkerPos', {
                markerPos: this.pointStr
            });
        },
        '$store.state.markerPos' () {
            this.pointStr = this.$store.state.markerPos;
            this.map.removeOverlay(this.accidentMaker);
            let strTemp = this.pointStr.split(',');
            let point = new BMap.Point(+strTemp[0], +strTemp[1]);
            this.accidentMaker = new BMap.Marker(point, {
                icon: new BMap.Icon("https://ythdong.gitee.io/blog_image/Vue/accident.png",
                    new BMap.Size(25, 25), {
                })
            });
            this.map.addOverlay(this.accidentMaker);
            this.accidentMaker.enableDragging(); // 标注可拖拽
            this.accidentMaker.addEventListener("dragend", (e) => {
                this.pointStr = e.point.lng + ", " + e.point.lat;
            });
        }
    },
    methods: {
        mapSetConfig () {
            this.map.enableScrollWheelZoom(true);
            this.getJSON();
            let top_right_map_type_control = new BMap.MapTypeControl({
                offset: new BMap.Size(10, 5),
                anchor: 'BMAP_ANCHOR_TOP_RIGHT'
            });
            this.map.addControl(top_right_map_type_control);
        },
        initWare () {
            this.$store.commit('updateWareArr', {
                wareArr: this.wareArr
            });

            let arr = this.wareArr.split(',');
            for (let i = 0; arr.length != 0; i++) {
                let myIcon = new BMap.Icon("https://ythdong.gitee.io/blog_image/Vue/warehouse.png",
                    new BMap.Size(25, 25), {
                });
                let point = new BMap.Point(+arr.shift(), +arr.shift());
                let marker = new BMap.Marker(point, { icon: myIcon });
                this.map.addOverlay(marker);
                // this.map.removeOverlay(marker);
                this.overlayMarkerArr.push(marker);
            }
            // 把 overlayMarkerArr 传到 TheMapControl 组件中去
            // window.overlayMarkerArr = this.overlayMarkerArr;
        },
        markerSetConfig () {
            let strTemp = this.$store.state.markerPos.split(',');
            // 事故点根据 VueX 初始化，VueX存的只是字符串
            let point = new BMap.Point(+strTemp[0], +strTemp[1]);
            this.map.centerAndZoom(point, 9);
            // 事故点图标
            let marker = new BMap.Marker(point, {
                icon: new BMap.Icon("https://ythdong.gitee.io/blog_image/Vue/accident.png",
                    new BMap.Size(25, 25), {
                })
            });
            this.accidentMaker = marker;
            this.map.addOverlay(this.accidentMaker);

            this.accidentMaker.enableDragging(); // 标注可拖拽
            this.accidentMaker.addEventListener("dragend", (e) => {
                // 应不应该选择在这里更新 pointStr ？
                this.pointStr = e.point.lng + ", " + e.point.lat;
                // let x = e.point.lng; // 经度
                // let y = e.point.lat; // 纬度

                // // 拖动事故点，更新 point
                // // point 的变化触发 watch 中的函数，触发 VueX 的 commit
                // this.point = new BMap.Point(x, y);
            });

            this.initWare();
        },
        async getJSON () {
            let url = window.location.href;
            url = url + 'style_config.json';
            let my_style_json;
            // 生产环境需要下面的文件
            // yama
            // url = 'http://yama.thdong.top:8080/demo/style_config.json';
            // hui
            // url = 'http://hui.thdong.top:8080/demo/style_config.json';
            try {
                await fetch(url)
                    .then(function (response) {
                        if (!response.ok) {
                            throw new Error('HTTP error, status = ' + response.status);
                        }
                        return response.json();
                    })
                    .then(function (pro) {
                        my_style_json = pro;
                    })
                    .catch(function (err) {
                        this.$message(err || '没找到样式文件\n');
                    });
            } catch (err) {
                this.$message(err || '没找到样式文件\n');
            }
            this.map.setMapStyle({
                styleJson: my_style_json
            });
        },
    },
}
</script>

<style>
#container {
    display: block;
    height: 90vh;
    background-color: rgb(120, 169, 201);
}
</style>
