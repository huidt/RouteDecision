- [1. 开始](#1-开始)
- [2. 界面](#2-界面)
  - [2.1. 纯Vue](#21-纯vue)
  - [2.2. 引入ElementUI](#22-引入elementui)
- [3. 地图基操](#3-地图基操)
  - [3.1. 自定义Icon](#31-自定义icon)
  - [3.2. 图区功能](#32-图区功能)
    - [3.2.1. 地图标点](#321-地图标点)
    - [3.2.2. 地址解析](#322-地址解析)
    - [3.2.3. 反向地址解析](#323-反向地址解析)
  - [3.3. 检索功能](#33-检索功能)
    - [3.3.1. POI检索](#331-poi检索)
    - [3.3.2. 公交、地铁线路查询](#332-公交地铁线路查询)
    - [3.3.3. 路线规划](#333-路线规划)
  - [3.4. 信息提示](#34-信息提示)
    - [3.4.1. POI详情页提示](#341-poi详情页提示)
    - [3.4.2. 全景服务](#342-全景服务)
  - [3.5. MapVGL](#35-mapvgl)
  - [3.6. Web服务API](#36-web服务api)
  - [3.7. 杂](#37-杂)
- [4. 结合PSO算法](#4-结合pso算法)
  - [4.1. PSO简介](#41-pso简介)
- [5. 仓储站信息](#5-仓储站信息)

# 1. 开始

```sh
    npm install
    npm start
    npm run build
    点击左上角大字刷新缓存
```

# 2. 界面

[HuiDT_GP](http://hui.thdong.top:8080/demo/)

## 2.1. 纯Vue

![](src\assets\old.PNG)

## 2.2. 引入ElementUI

![](src\assets\new.PNG)

# 3. 地图基操

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

## 3.1. 自定义Icon

```js
    let myIcon = new BMap.Icon("https://ythdong.gitee.io/blog_image/Vue/warehouse.png",
        new BMap.Size(25, 25), {
    });
    let point = new BMap.Point(`经纬度`);

    let marker = new BMap.Marker(point, { icon: myIcon });
    this.map.addOverlay(marker);
```
## 3.2. 图区功能

### 3.2.1. 地图标点

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

### 3.2.2. 地址解析

通过地址解析

例子：`http://api.map.baidu.com/geocoder?address=北京市海淀区上地信息路9号奎科科技大厦&output=html&src=webapp.baidu.openAPIdemo`

|  参数名称  |                   参数说明                   | 是否必选 |            备注            |
| :--------: | :------------------------------------------: | :------: | :------------------------: |
|  address   |                   地址名称                   |   必选   |
|   output   |                 表示输出类型                 |   必选   |    手机客户端忽略此参数    |
| coord_type |             坐标类型，可选参数。             |   可选   |   默认为bd09经纬度坐标。   |
|    zoom    |     展现地图的级别，默认为视觉最优级别。     |   可选   |                            |
|    src     | 调用来源，规则：webapp.companyName.appName。 |   必选   | 此参数不传值，不保证服务。 |

### 3.2.3. 反向地址解析

通过经纬度解析

例子：`http://api.map.baidu.com/geocoder?location=39.990912172420714,116.32715863448607&coord_type=gcj02&output=html&src=webapp.baidu.openAPIdemo`

|  参数名称  |               参数说明               | 是否必选 |         备注         |
| :--------: | :----------------------------------: | :------: | :------------------: |
|  location  |         lat<纬度>,lng<经度>          |   必选   |                      |
|   output   |             表示输出类型             |   必选   | 手机客户端忽略此参数 |
| coord_type |               坐标类型               |   可选   | 默认为bd09经纬度坐标 |
|    zoom    | 展现地图的级别，默认为视觉最优级别。 |   可选   |                      |
|    src     |                                      | 调用来源 |         必选         |  |

## 3.3. 检索功能

### 3.3.1. POI检索

周边检索

### 3.3.2. 公交、地铁线路查询

例子：`http://api.map.baidu.com/line?region=北京&name=518&output=html&src=webapp.baidu.openAPIdemo`

### 3.3.3. 路线规划

例子：`http://api.map.baidu.com/direction?origin=latlng:34.264642646862,108.95108518068|name:我家&destination=大雁塔&mode=driving&region=西安&output=html&src=webapp.baidu.openAPIdemo`

//调起百度PC或Web地图，展示"西安市"从（lat:34.264642646862,lng:108.95108518068 ）"我家"到"大雁塔"的驾车路线。

## 3.4. 信息提示

### 3.4.1. POI详情页提示

`http://api.map.baidu.com/place/detail?uid=2fd2beabe34a80517adbd220&output=html&src=webapp.baidu.openAPIdemo`

### 3.4.2. 全景服务

需要 flash

http://api.map.baidu.com/pano/?x=120.320032&y=31.589666&lc=0&ak=***AKAKAKAK***&src=webapp.baidu.openAPIdemo

## 3.5. MapVGL

一款基于WebGL的地理信息可视化库，酷炫的效果，装逼用

https://lbsyun.baidu.com/solutions/mapvdata

## 3.6. Web服务API

https://lbsyun.baidu.com/index.php?title=webapi

货车路径规划： http://lbsyun.baidu.com/index.php?title=webapi/direction-api-truck

## 3.7. 杂

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

# 4. 结合PSO算法

## 4.1. PSO简介

已知事故点坐标、仓库坐标、最短直线距离（行车距离可得）

进一步考虑仓库物资存储量和事故点需求量，则需要结合PSO算法，进行优化选择。

# 5. 仓储站信息

|       name       |                       addr                        |         posi         |  res  |
| :--------------: | :-----------------------------------------------: | :------------------: | :---: |
|    淮北仓储站    |    淮北市烈山区京台高速与东外环路交叉路口东侧     | 116.905052,33.885118 |  39   |
|    淮北仓储站    |                安徽省淮北市濉溪县                 | 116.498819,33.70784  |  666  |
|   亳州东仓储站   |                安徽省亳州市谯城区                 | 115.864808,33.900788 |  63   |
|   涡阳东仓储站   |                安徽省亳州市涡阳县                 | 116.365201,33.407492 |  760  |
|    宿州仓储站    |     安徽省宿州市埇桥区宿州收费站(外环南路西)      | 116.952821,33.617648 |  600  |
|   宿州东仓储站   |      安徽省宿州市埇桥区东收费站(宿州大道东)       | 117.317909,33.695588 |  657  |
|    界首仓储站    |                安徽省阜阳市界首市                 | 115.388228,33.291389 |  103  |
|   阜阳南仓储站   |          安徽省阜阳市颍州区G105(京珠线)           | 115.93091,32.797736  |  640  |
|   淮南东仓储站   |    安徽省淮南市大通区东收费站(蚌淮高速公路西)     | 117.142974,32.619409 |  662  |
|    安丰仓储站    |              安徽省淮南市寿县瓦埠湖               | 116.758518,32.185505 |  14   |
|   郑蒲港仓储站   |                安徽省马鞍山市和县                 | 118.323991,31.627163 |  473  |
|    当涂仓储站    |              马鞍山市当涂县宁芜高速               | 118.540563,31.560207 |  110  |
|    林头仓储站    |               安徽省马鞍山市含山县                | 117.949576,31.563246 |  760  |
|    双墩仓储站    |                安徽省合肥市长丰县                 | 117.254063,32.028204 |  435  |
|    肥东仓储站    |          安徽省合肥市肥东县G3(京台高速)           | 117.503966,31.877101 |  438  |
|    蜀山仓储站    | 合肥市蜀山区铁笛路(合肥汽车客运西站东北侧约150米) | 117.147201,31.860089 |  227  |
|    金寨仓储站    |     安徽省六安市金寨县金寨收费站(红军大道东)      | 115.967995,31.718272 |  205  |
|    霍山仓储站    |            安徽省六安市霍山县迎宾大道             | 116.408212,31.411355 |  60   |
|    长集仓储站    |               六安市霍邱县济广高速                | 116.162172,32.043771 |  77   |
|    芜湖仓储站    |         安徽省芜湖市鸠江区G5011(芜合高速)         | 118.420576,31.37261  |  514  |
|   铜陵南仓储站   |  安徽省铜陵市郊区大通镇京台高速公路(铜陵收费站)   | 117.767096,30.842575 |  521  |
|    横埠仓储站    |                安徽省铜陵市枞阳县                 | 117.503067,30.917307 |  266  |
|    宿松仓储站    |          安徽省安庆市宿松县G50(高界高速)          |  116.120222,30.1842  |  303  |
|    怀宁仓储站    | 安徽省安庆市怀宁县金拱镇沪渝高速公路(怀宁收费站)  | 116.880513,30.796487 |  417  |
| 宣城北高速仓储站 |      昭亭北路与S32宣铜高速出口交叉口北200米       | 118.746693,31.004389 |  329  |
|   广德东仓储站   |      安徽省宣城市广德市东收费站(太极大道南)       | 119.515377,30.905072 |  212  |
|    黄山仓储站    |    安徽省黄山市休宁县黄山收费站(京台高速公路)     | 118.311341,29.440926 |  261  |
|   谭家桥仓储站   |     安徽省黄山市黄山区谭家桥收费站(205国道西)     | 118.271427,30.170961 |  463  |
|    三阳仓储站    |    安徽省黄山市歙县三阳收费站(杭徽高速公路北)     | 118.825166,30.04006  |  154  |
