


// 使用express的入口文件
// 1.引入express---->是一个函数
const express=require("express");
// 2.调用一下，得到app对象
const app=express();


const path=require('path');
const bodyParser=require('body-parser');
// 配置body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());








//1.0 初始化orm
const orm=require("orm")
app.use(orm.express('mysql://root:@127.0.0.1:3306/mall',{
	define:function(db,models,next){
		next();
	}
}));

//2.0 将所有api的请求响应content-type设置为application/json

app.all('/api/*',(req,res,next)=>{
	//设置允许跨域响应报文头
		//设置跨域
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods","*");
	res.setHeader('Content-Type','application/json;charset=utf-8');
	next();
});


//2.0 设置路由规则
const apiRoute = require('./router/apiRoute.js');
app.use('/',apiRoute);

// 监听端口,设定express占用的端口
app.listen("8000",()=>{
    console.log("服务器已经启动，占用端口8000");
})