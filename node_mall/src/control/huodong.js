// 1.活动专区990
function getHuoNno(req,res){
    var sql='select * FROM huodongnno';
    req.db.driver.execQuery(sql, (err, datas) => {
        // console.log(datas,"sss");
        res.send(datas)
    })
}
// 2.活动专区1990
function getHuoOnno(req,res){
    var sql='select * FROM huodongonno';
    req.db.driver.execQuery(sql, (err, datas) => {
        // console.log(datas,"sss");
        res.send(datas)
    })
}
// 3.活动专区2990
function getHuoTnno(req,res){
    var sql='select * FROM huodongtnno';
    req.db.driver.execQuery(sql, (err, datas) => {
        // console.log(datas,"sss");
        res.send(datas)
    })
}


exports.getHuoNno = getHuoNno;
exports.getHuoOnno = getHuoOnno;
exports.getHuoTnno = getHuoTnno;