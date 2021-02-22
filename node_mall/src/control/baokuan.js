//折后990
function getBaokuanOne(req, res) {
    var sql = 'select * from baokuanone;'
    req.db.driver.execQuery(sql, (err, datas) => {
        res.send(datas)
    })
}
function getBaokuanTwo(req, res) {
    var sql = 'select * from baokuantwo;'
    req.db.driver.execQuery(sql, (err, datas) => {
        res.send(datas)
    })
}
function getBaokuanThree(req, res) {
    var sql = 'select * from baokuanthree;'
    req.db.driver.execQuery(sql, (err, datas) => {
        res.send(datas)
    })
}

exports.getBaokuanOne=getBaokuanOne;
exports.getBaokuanTwo=getBaokuanTwo;
exports.getBaokuanThree=getBaokuanThree;