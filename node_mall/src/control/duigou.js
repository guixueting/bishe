// 1.当点击加入购物车的时候，insert数据
//3.1 加入购物车
let successState1 = 0 // 表示成功
let fialState1 = 1 // 表示失败
function postAddDuiGou(req, res) {
    let resObj = {
        status: successState1,
        message: ''
    }
    var commentObj = req.body;
    console.log(commentObj, "兑换购物车子啊啊啊cart");
    let sql=`INSERT INTO duigou(itemCode,imageUrl,name,dui_count,integralValue) VALUES
     (${commentObj.itemCode},'${commentObj.imageUrl}','${commentObj.name}',1,'${commentObj.integralValue}');`

req.db.driver.execQuery(sql, (err, data) => {
        if (err) {
            resObj.status = fialState1
            resObj.message = err.message
            res.end(JSON.stringify(resObj))
            return
        }
        // 4.0 获取数据成功
        resObj.message = '评论提交成功'
        res.end(JSON.stringify(resObj))
    })
}
// 2.读取购物车药品的数据
function getDuiGou(req, res) {
    // 连接数据库，来获取数据
    // console.log(req.query,"xxxxxxxxxxxxxzsdwwwwwwwwwwwwwwwwwwwwwwwwww");
    var sql = 'SELECT * FROM duigou;'
    req.db.driver.execQuery(sql, (err, datas) => {
        // console.log(datas,"sss");
        res.send(datas)
    })
}

// 3.读取根据id更新兑换物品的单个数量
function updateDuiCount(req, res) {
    var id = req.query.id;
    var count = req.query.count;
    console.log(id, count, "update");
    var sql = `UPDATE duigou SET dui_count=${count} WHERE itemCode=${id}; `
    req.db.driver.execQuery(sql, (err, datas) => {
        console.log('更新兑换count');
    })
}

// 4.读取count的总数量
function getDuiSumCount(req, res) {
    var sql = 'select sum(dui_count) AS sum_count from duigou;'
    req.db.driver.execQuery(sql, (err, datas) => {
        // console.log(datas, "sum");
        res.send(datas)
    })
}
// 5.读取总积分数
function getDuiSumJiFen(req, res) {
    var sql = 'SELECT SUM(dui_count*integralValue) AS zong_jifen FROM duigou;'
    req.db.driver.execQuery(sql, (err, datas) => {
        // console.log(datas, "sumJiFen");
        res.send(datas)
    })
}

//6 删除购物车数据
function deleDui(req, res) {
    var id = req.query.id;
    // console.log(id, "yaoyaoyao");
    var sql = `DELETE FROM duigou WHERE itemCode=${id}; `
    req.db.driver.execQuery(sql, (err, datas) => {
        console.log('删除药瓶');
    })
}
//7.兑换积分记录
let successState = 0 // 表示成功
let fialState = 1 // 表示失败
function insertDuiHuan(req, res) {
    let resObj = {
        status: successState,
        message: ''
    }
    var commentObj = req.body;
    console.log(commentObj, "nodessss");
    let sql = `INSERT INTO duihuan(dh_jifen) VALUES (${commentObj.jifen});`

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
// 8.删除所有数据
function deleAllDui(req, res) {
    var sql = 'delete from duigou';
    req.db.driver.execQuery(sql, (err, datas) => {
        console.log('删除所有兑换购物车');
    })
}


exports.postAddDuiGou=postAddDuiGou;
exports.getDuiGou=getDuiGou;
exports.updateDuiCount=updateDuiCount;
exports.getDuiSumCount=getDuiSumCount;
exports.getDuiSumJiFen=getDuiSumJiFen;
exports.deleDui=deleDui;
exports.insertDuiHuan=insertDuiHuan;
exports.deleAllDui=deleAllDui;