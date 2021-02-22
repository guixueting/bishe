function getPai(req, res) {
    var sql = 'select * from paihang;'
    req.db.driver.execQuery(sql, (err, datas) => {
        res.send(datas)
    })
}

exports.getPai=getPai;