var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost', //mysql连接ip地址
    user: 'hui',
    password: 'lplplp', //mySql用户名密码
    database: 'yama',
    port: '3306' //mysql连接端口
});

connection.connect();

let s1 = "SELECT * FROM ware";
connection.query(s1, function (error, result, fields) {
    if (error) {
        console.error(error.message);
        return;
    }
    console.log(fields);
    console.log('--------------------------SELECT----------------------------');
    console.log(JSON.parse(JSON.stringify(result)));
    console.log('------------------------------------------------------------\n\n');
});
connection.end();

// 给某个数据库添加用户
// GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP ON huidt.* TO 'hui'@'localhost' IDENTIFIED BY '123456';