- [1. 开始](#1-开始)
- [2. 地图基操](#2-地图基操)
  - [2.1. 自定义Icon](#21-自定义icon)
  - [2.2. 图区功能](#22-图区功能)
    - [2.2.1. 地图标点](#221-地图标点)
    - [2.2.2. 地址解析](#222-地址解析)
    - [2.2.3. 反向地址解析](#223-反向地址解析)
  - [2.3. 检索功能](#23-检索功能)
    - [2.3.1. POI检索](#231-poi检索)
    - [2.3.2. 公交、地铁线路查询](#232-公交地铁线路查询)
    - [2.3.3. 路线规划](#233-路线规划)
  - [2.4. 信息提示](#24-信息提示)
    - [2.4.1. POI详情页提示](#241-poi详情页提示)
    - [2.4.2. 全景服务](#242-全景服务)
  - [2.5. MapVGL](#25-mapvgl)
  - [2.6. Web服务API](#26-web服务api)
  - [2.7. 杂](#27-杂)
- [3. AK收集](#3-ak收集)
- [4. 结合PSO算法](#4-结合pso算法)
  - [PSO简介](#pso简介)

# 1. 开始

```sh
    npm install
    npm start
    npm run build
    点击左上角大字刷新缓存
```

# 2. 地图基操

支持异步加载，在引用脚本的时候添加callback参数，当脚本加载完成后callback函数会被立刻调用。

```html
    <script type="text/javascript">
        function initialize() {
            var mp = new BMap.Map('map');
            mp.centerAndZoom(new BMap.Point(121.491, 31.233), 11);
        }

        function loadScript() {
            var script = document.createElement("script");
            script.src = "http://api.map.baidu.com/api?v=2.0&ak=***AK***&callback=initialize";
            document.body.appendChild(script);
        }

        window.onload = loadScript;

    </script>
```

如果在vue项目中引入有几种方式，其中一种是在index.html中线用script标签引入，然后在vue.config.js文件中配置如下：

```js
    module.exports = {
        configureWebpack: {
            externals: {
                BaiduMap: 'BMap',
            }
        },
    };
```

在组件中import即可使用。

## 2.1. 自定义Icon

```js
    let myIcon = new BMap.Icon("https://ythdong.gitee.io/blog_image/Vue/warehouse.png",
        new BMap.Size(25, 25), {
    });
    let point = new BMap.Point(`经纬度`);

    let marker = new BMap.Marker(point, { icon: myIcon });
    this.map.addOverlay(marker);
```
## 2.2. 图区功能

### 2.2.1. 地图标点

https://lbsyun.baidu.com/index.php?title=uri/api/web

注意经纬度反过来

例子：`http://api.map.baidu.com/marker?location=30.90896,118.71949&title=肥宣&content=图书馆&output=html&src=webapp.huidt.RouteDecision`

|  参数名称  |                  参数说明                  | 是否必选 |          备注          |
| :--------: | :----------------------------------------: | :------: | :--------------------: |
|  location  |            lat<纬度>,lng<经度>             |   必选   |      经纬度反过来      |
|   title    |               标注点显示标题               |   必选   |         string         |
|  content   |               标注点显示内容               |   必选   |         string         |
|   output   |                表示输出类型                |   必选   |      指定html即可      |
| coord_type |            坐标类型，可选参数。            |   可选   | 默认为bd09经纬度坐标。 |
|    zoom    |    展现地图的级别，默认为视觉最优级别。    |   可选   |                        |
|    src     | 调用来源，规则：webapp.huidt.RouteDecision |   必选   |     必选但意义不大     |

### 2.2.2. 地址解析

通过地址解析

例子：`http://api.map.baidu.com/geocoder?address=北京市海淀区上地信息路9号奎科科技大厦&output=html&src=webapp.baidu.openAPIdemo`

|  参数名称  |                   参数说明                   | 是否必选 |            备注            |
| :--------: | :------------------------------------------: | :------: | :------------------------: |
|  address   |                   地址名称                   |   必选   |
|   output   |                 表示输出类型                 |   必选   |    手机客户端忽略此参数    |
| coord_type |             坐标类型，可选参数。             |   可选   |   默认为bd09经纬度坐标。   |
|    zoom    |     展现地图的级别，默认为视觉最优级别。     |   可选   |                            |
|    src     | 调用来源，规则：webapp.companyName.appName。 |   必选   | 此参数不传值，不保证服务。 |

### 2.2.3. 反向地址解析

通过经纬度解析

例子：`http://api.map.baidu.com/geocoder?location=39.990912172420714,116.32715863448607&coord_type=gcj02&output=html&src=webapp.baidu.openAPIdemo`

|  参数名称  |               参数说明               | 是否必选 |         备注         |
| :--------: | :----------------------------------: | :------: | :------------------: |
|  location  |         lat<纬度>,lng<经度>          |   必选   |                      |
|   output   |             表示输出类型             |   必选   | 手机客户端忽略此参数 |
| coord_type |               坐标类型               |   可选   | 默认为bd09经纬度坐标 |
|    zoom    | 展现地图的级别，默认为视觉最优级别。 |   可选   |                      |
|    src     |                                      | 调用来源 |         必选         |  |

## 2.3. 检索功能

### 2.3.1. POI检索

周边检索

### 2.3.2. 公交、地铁线路查询

例子：`http://api.map.baidu.com/line?region=北京&name=518&output=html&src=webapp.baidu.openAPIdemo`

### 2.3.3. 路线规划

例子：`http://api.map.baidu.com/direction?origin=latlng:34.264642646862,108.95108518068|name:我家&destination=大雁塔&mode=driving&region=西安&output=html&src=webapp.baidu.openAPIdemo`

//调起百度PC或Web地图，展示"西安市"从（lat:34.264642646862,lng:108.95108518068 ）"我家"到"大雁塔"的驾车路线。

## 2.4. 信息提示

### 2.4.1. POI详情页提示

`http://api.map.baidu.com/place/detail?uid=2fd2beabe34a80517adbd220&output=html&src=webapp.baidu.openAPIdemo`

### 2.4.2. 全景服务

需要 flash

http://api.map.baidu.com/pano/?x=120.320032&y=31.589666&lc=0&ak=***AKAKAKAK***&src=webapp.baidu.openAPIdemo

## 2.5. MapVGL

一款基于WebGL的地理信息可视化库，酷炫的效果，装逼用

https://lbsyun.baidu.com/solutions/mapvdata

## 2.6. Web服务API

https://lbsyun.baidu.com/index.php?title=webapi

货车路径规划： http://lbsyun.baidu.com/index.php?title=webapi/direction-api-truck

## 2.7. 杂

开启滚动缩放：`map.enableScrollWheelZoom(true);`

[非百度坐标转换为百度坐标](http://lbsyun.baidu.com/jsdemo.htm#a5_2)

添加控件，初始化控件时可提供一个可选参数，可以是一个配置器（对象）。

```js
    let config_map = {
        offset: new BMap.Size(150, 5),
        anchor: 'BMAP_ANCHOR_TOP_LEFT'
    }
    map.addControl(new BMap.MapTypeControl(config_map));
    map.addControl(new BMap.ScaleControl(config_map));
```

[个性化样式](http://lbsyun.baidu.com/index.php?title=jspopularGL/guide/custom)

点击的经纬度：https://mapopen-pub-jsapi.bj.bcebos.com/jsapi/reference/jsapi_reference.html#a7b27

地图、覆盖物拖拽： https://mapopen-pub-jsapi.bj.bcebos.com/jsapi/reference/jsapi_reference.html#a3b2

# 3. AK收集

```
fjEOTea6oQGEcK1GSUHruG4efO9fccei
CWmiAPiwuHW6sGdMbAReZdqU
LnP4INwY2AY2VSZFwcRMbNhPxUeBB7sA
```

# 4. 结合PSO算法

## PSO简介

已知事故点坐标、仓库坐标、最短直线距离（行车距离可得）

进一步考虑仓库物资存储量和事故点需求量，则需要结合PSO算法，进行优化选择。