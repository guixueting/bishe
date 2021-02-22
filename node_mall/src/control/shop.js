// 2.秒杀专区
function getMiaosha(req,res){
    var sql='select * FROM miaosha';
    req.db.driver.execQuery(sql, (err, datas) => {
        // console.log(datas,"sss");
        res.send(datas)
    })
}


exports.getMiaosha = getMiaosha;