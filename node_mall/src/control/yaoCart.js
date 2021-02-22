// 1.读取根据id获取药品的单个数量
function getYaoCount(req, res) {
    var id = req.query.id;
    // console.log(id, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    var sql = `select cart_count FROM yaocart WHERE id=${id}; `
    req.db.driver.execQuery(sql, (err, datas) => {
        res.send(datas)
    })
}
// 2.读取根据id更新药品的单个数量
function updateYaoCount(req, res) {
    var id = req.query.id;
    var count = req.query.count;
    console.log(id, count, "update");
    var sql = `UPDATE yaocart SET cart_count=${count} WHERE  id=${id}; `
    req.db.driver.execQuery(sql, (err, datas) => {
        console.log('更新药品count');
    })
}
// 3.读取count的总数量
function getSumCount(req, res) {
    var sql = 'select sum(cart_count) AS sum_count from yaocart;'
    req.db.driver.execQuery(sql, (err, datas) => {
        // console.log(datas, "sum");
        res.send(datas)
    })
}
// 4.读取总积分数
function getSumJiFen(req, res) {
    var sql = 'SELECT SUM(cart_count*jifen) AS zong_jifen FROM yaocart;'
    req.db.driver.execQuery(sql, (err, datas) => {
        // console.log(datas, "sumJiFen");
        res.send(datas)
    })
}
//5.获取积分记录
// 5.1 添加一条数据
let successState = 0 // 表示成功
let fialState = 1 // 表示失败
function insertHuoqu(req, res) {
    let resObj = {
        status: successState,
        message: ''
    }
    var commentObj = req.body;
    console.log(commentObj, "nodessss");
    let sql = `INSERT INTO huoqu(hq_jifen) VALUES (${commentObj.jifen});`

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

// 6.删除所有数据
function deleAllCart(req, res) {
    var sql = 'delete from yaocart';
    req.db.driver.execQuery(sql, (err, datas) => {
        console.log('删除所有购物车');
    })
}



exports.getYaoCount = getYaoCount
exports.updateYaoCount = updateYaoCount
exports.getSumCount = getSumCount
exports.getSumJiFen = getSumJiFen
exports.insertHuoqu = insertHuoqu
exports.deleAllCart = deleAllCart
