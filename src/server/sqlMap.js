// SQL语句映射文件，以供api逻辑调用
var sqlMap = {
    person: {
        // add: 'insert into student(name) values (?)',
        // delete: 'delete from student where sno = ?',
        search: 'select * from student where sname = ?', //查找读者信息
        // borrowBook: 'update student set sname = ? where sno = ?'//更新用户表中的已借阅书籍
    },
    ware: {
        add: 'INSERT INTO ware(cid, cname, cposi, cdis, cres) VALUES (?, ?, ?, ?, ?)',
        search: 'SELECT * FROM ware ',
    }
}
module.exports = sqlMap;
