const express = require('express')
const path=require('path')
let route = express.Router()
const expressSession = require('express-session')

const apiHome = require('../control/home.js')
const apiShop = require('../control/shop.js')
const apiHuodong = require('../control/huodong.js')
const apiYaoCart = require('../control/yaoCart.js')
const apiMyjifen = require('../control/myjifen.js')
const apiDuiGou = require('../control/duigou.js')
const apiPaihang = require('../control/paihang.js')
const apiBaokuan = require('../control/baokuan.js')


const bodyParser = require('body-parser');
// const expressSession = require('express-session')
// 配置body-parser
route.use(bodyParser.urlencoded({
    extended: false
}));
route.use(bodyParser.json())


//1.首页数据
route.get('/api/getHomeProducts', apiHome.getHomeProducts)
// 收藏
route.post('/api/postAddShou', apiHome.postAddShou)
route.get('/api/getShouCang', apiHome.getShouCang)
route.get('/api/deleShou', apiHome.deleShou)
// 购物车
route.post('/api/postAddYaoCart', apiHome.postAddYaoCart)
route.get('/api/getYaoCart', apiHome.getYaoCart)
route.get('/api/deleYao', apiHome.deleYao)

//2.积分商城数据
//2.1秒杀专区
route.get('/api/getMiaosha',apiShop.getMiaosha)


//3.活动数据
route.get('/api/getHuoNno',apiHuodong.getHuoNno)
route.get('/api/getHuoOnno',apiHuodong.getHuoOnno)
route.get('/api/getHuoTnno',apiHuodong.getHuoTnno)

//4.药品购物车的数据
route.get('/api/getYaoCount',apiYaoCart.getYaoCount)
route.get('/api/updateYaoCount',apiYaoCart.updateYaoCount)
route.get('/api/getSumCount',apiYaoCart.getSumCount)
route.get('/api/getSumJiFen',apiYaoCart.getSumJiFen)
route.get('/api/deleAllCart',apiYaoCart.deleAllCart)
route.post('/api/insertHuoqu',apiYaoCart.insertHuoqu)
//5.我的积分
//5.1 获取积分记录
route.get('/api/getHuoqu',apiMyjifen.getHuoqu)
route.get('/api/lastHuoqu',apiMyjifen.lastHuoqu)
route.get('/api/getLishi',apiMyjifen.getLishi)
route.get('/api/getLishiList',apiMyjifen.getLishiList)
route.post('/api/addLishiJifen',apiMyjifen.addLishiJifen)
route.get('/api/getDuiHuanJi',apiMyjifen.getDuiHuanJi)


//6.兑换的购物车
route.post('/api/postAddDuiGou',apiDuiGou.postAddDuiGou)
route.get('/api/getDuiGou',apiDuiGou.getDuiGou)
route.get('/api/updateDuiCount',apiDuiGou.updateDuiCount)
route.get('/api/getDuiSumJiFen',apiDuiGou.getDuiSumJiFen)
route.get('/api/getDuiSumCount',apiDuiGou.getDuiSumCount)
route.get('/api/deleDui',apiDuiGou.deleDui)
route.get('/api/deleAllDui',apiDuiGou.deleAllDui)
route.post('/api/insertDuiHuan',apiDuiGou.insertDuiHuan)

//7. 排行榜
route.get('/api/getPai',apiPaihang.getPai)

//8. 爆款
//8.1 折后990
route.get('/api/getBaokuanOne',apiBaokuan.getBaokuanOne)
route.get('/api/getBaokuanTwo',apiBaokuan.getBaokuanTwo)
route.get('/api/getBaokuanThree',apiBaokuan.getBaokuanThree)





// 配置静态资源
route.use('/',express.static(path.join(__dirname,'./node_modules/')));


//登陆or退出

//配置session中间件
route.use(expressSession({
    name: "guixueting",
    secret: 'secret',
    resave: false,
    rolling: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 3,
    },
}));


route.post('/api/login',(req,res)=>{
	const name = req.body.name;
    const password = req.body.password;
    // 密码存在才判断 密码是否正确
    if (name && password) {
        if (name == 'zhangsan' && password == '123') {
            //当输入用户名和密码正确 就存入session(登陆页面都这样做)，以便整个服务器都可以使用
            req.session.user = req.body;
            // 登陆成功，跳转去用户中心
            res.redirect('/')
            console.log("xxx");
        } else {
            // 登陆失败，跳转去login登陆页面
            res.redirect('http://localhost:3000/#/login')
        }
	}
	console.log(name,password,"xxx");
})

route.get('/api/session',(req,res)=>{
	console.log("session");
	res.send({user:req.session.user})
})
// 退出
route.get('/api/layout',(req,res)=>{
    // 销毁session，同时在req.session中被移除，但是在下一次请求的时候又会被创建  
	//推出登陆使用
	console.log("fffxxx");
    req.session.destroy();
    res.redirect('http://localhost:3000/#/')
})



route.post('/api/post',(req,res)=>{
	var obj = {message:'post 请求 ok'};
	res.end(JSON.stringify(obj));
});

route.all('/api/jsonp',(req,res)=>{

	var callbackFn =  req.query.callback;

	var obj = {message:'jsonp 请求 ok'};
	var jsonStr = JSON.stringify(obj);


	res.end(`${callbackFn}('${jsonStr}')`);

});

module.exports = route

