//1.获取积分记录
function getHuoqu(req, res) {
    var sql = 'select * from huoqu;'
    req.db.driver.execQuery(sql, (err, datas) => {
        res.send(datas)
    })
}
// 2.获取积分记录的总积分
function lastHuoqu(req, res) {
    var sql = 'select hq_jifen  from huoqu;'
    req.db.driver.execQuery(sql, (err, datas) => {
        res.send(datas)
    })
}

// 3.获取最后一个历史积分
function getLishi(req, res) {
    var sql = 'select hi_jifen from myhistory;'
    req.db.driver.execQuery(sql, (err, datas) => {
        res.send(datas)
    })
}

//4.添加历史积分记录
//4.1 添加一条数据
let successState = 0 // 表示成功
let fialState = 1 // 表示失败
function addLishiJifen(req, res) {
    let resObj = {
        status: successState,
        message: ''
    }
    var commentObj = req.body;
    console.log(commentObj, "nodessss");
    let sql = `INSERT INTO myhistory(hi_jifen) VALUES (${commentObj.jifen});`

    req.db.driver.execQuery(sql, (err, data) => {
        if (err) {
            resObj.status = fialState
            resObj.message = err.message
            res.end(JSON.stringify(resObj))
            return
        }
        // 4.0 获取数据成功
        resObj.message = '评论提交成功'
        res.end(JSON.stringify(resObj))
    })
}

//5.获取历史积分记录
function getLishiList(req,res){
    var sql = 'select * from myhistory;'
    req.db.driver.execQuery(sql, (err, datas) => {
        res.send(datas)
    })
}

//6.获取兑换积分记录
function getDuiHuanJi(req,res){
    var sql = 'SELECT * FROM duihuan;'
    req.db.driver.execQuery(sql, (err, datas) => {
        res.send(datas)
    })
}

exports.getHuoqu = getHuoqu
exports.lastHuoqu = lastHuoqu
exports.getLishi = getLishi
exports.addLishiJifen = addLishiJifen
exports.getLishiList = getLishiList
exports.getDuiHuanJi = getDuiHuanJi
