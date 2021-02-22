import React, { useEffect, useState } from 'react'
import './login.scss'
import { Form, Input, Button, message } from 'antd';


import { Link, withRouter } from 'react-router-dom'
import Header from '../../components/Header/Header'
import logo from './image/logo.jpg'
import brand from './image/brand.jpg'
import qq from './image/QQ.png'
import weixin from './image/微信.png'
import erwei from './image/erwei.jpg'
import sao from './image/sao.jpg'
import { fetchget } from '../../utils/zgfetch';


const Login: React.FC = (props) => {
    let [id, setId] = useState(1)
    const select = (e: any) => {
        console.log(e.target.id);
        setId(e.target.id)
    }
  
    return (
        <div>
            <Header></Header>
            <div className="l_brand">
                <div className="lb_center">
                    <Link to="/" className="lb_image">
                        <div className="lb_img1">
                            <img src={logo} alt="" />
                        </div>
                        <div className="lb_img2">
                            <img src={brand} alt="" />
                        </div>
                    </Link>
                </div>
                <div className="l_bgc">
                    <div className="lbgc_center">
                        <div className="lbgc_login">
                            <ul>
                                <li onClick={select}><span id="1" className={`${id == 1 ? 'clickspan' : ''}`}>账号登陆</span></li>
                                <li onClick={select}><span id="2" className={`${id == 2 ? 'clickspan' : ''}`}>扫码登陆</span></li>
                            </ul>
                            {/* 账号 */}
                            <div className={`zhanghao ${id == 1 ? 'active' : 'hidd'}`}>
                                <form method="POST" action="/api/login">
                                    <Input required={true} size="large" name="name" placeholder="请输入用户名" prefix={<i className="fa fa-user-o" aria-hidden="true" />}></Input>
                                    <Input required={true} size="large" name="password" placeholder="请输入密码" prefix={<i className="fa fa-unlock-alt" aria-hidden="true" />}></Input>
                                    <p><a href="#">忘记密码？</a><a href="#">《仁和药房网用户协议》</a></p>
                                    <input type="submit" value="登陆" className="zh_submit" />
                                    <div className="zh_other">
                                        <span>您还可以通过以下方式登录：<a href="#"><img src={qq} alt="" /><img src={weixin} alt="" /></a></span>
                                    </div>
                                </form>
                            </div>
                            {/* 扫码登陆 */}
                            <div className={`saoma ${id == 2 ? 'active' : 'hidd'}`}>
                                <img src={erwei} alt="" className="erImg" />
                                <div className="sm_tishi">
                                    <img src={sao} alt="" />
                                    <p>请使用 <a href="#">仁心医药APP</a> 扫码登录</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* 底部 */}
                <div className="fc_bottom">
                    <div className="w copyright">

                        <div className="c-info">
                            <p>京公网安备 11000002000088号|京ICP证070359号|互联网药品信息服务资格证编号(京)-经营性-2014-0008|新出发京零 字第大120007号</p>
                            <p>互联网出版许可证编号新出网证(京)字150号|出版物经营许可证|网络文化经营许可证京网文[2014]2148-348号|违法和不良信息举报电话：4006561155</p>
                            <p>Copyright © 2004 - 2017  版权所有|消费者维权热线：4006227733经营证照</p>
                            <p>仁心旗下网站：京东支付|京东云</p>
                        </div>
                        <div className="tupian">
                            <a href="#"></a>
                            <a href="#" className="kexin"></a>
                            <a href="#"></a>
                            <a href="#"></a>
                            <a href="#"></a>
                            <a href="#"></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Login)