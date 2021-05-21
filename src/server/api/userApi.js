//userApi.js
var models = require('../db')
var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var $sql = require('../sqlMap')

// 连接数据库
var conn = mysql.createConnection(models.mysql)

conn.connect();

var jsonWrite = function (res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        })
    } else {
        res.json(ret)
    }
}

router.get('/find', (req, res) => {
    // 此时sql就代表一条查找的sql语句字符串
    var sql = $sql.ware.search;
    var params = req.query;
    console.log(params);
    conn.query(sql, [params.name], function (err, result) {
        if (err) {
            console.log(err)
        }
        if (result) {
            console.log(result)
            res.send(result)
        }
    })
})

module.exports = router

// 增加用户接口
router.post('/add', (req, res) => {
    var sql = $sql.ware.add
    var params = req.body
    console.log(params)
    conn.query(sql, [params.name], function (err, result) {
        if (err) {
            console.log(err)
        }
        if (result) {
            jsonWrite(res, result)
        }
    })
})
