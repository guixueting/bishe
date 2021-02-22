// 1.首页药品
function getHomeProducts(req, res) {
    // 连接数据库，来获取数据
    console.log(req.query,"shouye11111");
    var sql = 'SELECT * FROM home_products;'
    req.db.driver.execQuery(sql, (err, datas) => {
        // console.log(datas,"sss");
        res.send(datas)
        // res.send(datas.slice((req.query.page - 1) * req.query.limit, req.query.page * req.query.limit));
    })
}

// 2 关于收藏
// 2.1 添加一条数据
let successState = 0 // 表示成功
let fialState = 1 // 表示失败
function postAddShou(req, res) {
    let resObj = {
        status: successState,
        message: ''
    }
    var commentObj = req.body;
    console.log(commentObj, "nodessss");
    let sql=`INSERT INTO shoucang(id,name,isXuan,img_url,sc_count,jifen) VALUES
     (${commentObj.id},'${commentObj.NAME || commentObj.name}',FALSE,'${commentObj.img_url}',1,'${commentObj.jifen}');`

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
//2.2读取收藏的数据
function getShouCang(req, res) {
    // 连接数据库，来获取数据
    // console.log(req.query,"sssssssssssssssssssssssxxxxxxxxxxxxxxxxxxxxxxx");
    var sql = 'SELECT * FROM shoucang;'
    req.db.driver.execQuery(sql, (err, datas) => {
        // console.log(datas,"sss");
        res.send(datas)
    })
}

//2.3 删除收藏中的数据
// 删除一条数据
function deleShou(req, res) {
    var id = req.query.id;
    // console.log(id, "sssw1w1,xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    var sql = `DELETE FROM shoucang WHERE id=${id}; `
    req.db.driver.execQuery(sql, (err, datas) => {
        console.log('shanchule');
    })
}

//3.关于购物车
//3.1 加入购物车
let successState1 = 0 // 表示成功
let fialState1 = 1 // 表示失败
function postAddYaoCart(req, res) {
    let resObj = {
        status: successState1,
        message: ''
    }
    var commentObj = req.body;
    console.log(commentObj, "药品购物车子啊啊啊cart");
    let sql=`INSERT INTO yaocart(id,NAME,img_url,cart_count,jifen) VALUES
     (${commentObj.id},'${commentObj.NAME || commentObj.name}','${commentObj.img_url}',1,'${commentObj.jifen}');`

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
//3.2读取购物车药品的数据
function getYaoCart(req, res) {
    // 连接数据库，来获取数据
    // console.log(req.query,"xxxxxxxxxxxxxzsdwwwwwwwwwwwwwwwwwwwwwwwwww");
    var sql = 'SELECT * FROM yaocart;'
    req.db.driver.execQuery(sql, (err, datas) => {
        // console.log(datas,"sss");
        res.send(datas)
    })
}
//2.3 删除购物车数据

function deleYao(req, res) {
    var id = req.query.id;
    // console.log(id, "yaoyaoyao");
    var sql = `DELETE FROM yaocart WHERE id=${id}; `
    req.db.driver.execQuery(sql, (err, datas) => {
        console.log('删除药瓶');
    })
}





exports.getHomeProducts = getHomeProducts;
exports.postAddShou = postAddShou;
exports.getShouCang = getShouCang;
exports.deleShou = deleShou;

exports.postAddYaoCart = postAddYaoCart;
exports.getYaoCart = getYaoCart;
exports.deleYao = deleYao;