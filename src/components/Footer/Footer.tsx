import React from 'react'
import './footer.scss'
const Footer: React.FC = () => {
    return (
        <div className="foot_center">
            <div className="fc_top">
                <div className="footer-service">

                    <div className="w footer-service-inner">
                        <ul className="clearfix">
                            <li>
                                <div className="service_unit">
                                    <h5>多</h5>
                                    <p>品类齐全，轻松购物</p>
                                </div>
                            </li>

                            <li>
                                <div className="service_unit">
                                    <h5 className="kuai">快</h5>
                                    <p>多仓直发，极速配送</p>
                                </div>
                            </li>

                            <li>
                                <div className="service_unit">
                                    <h5 className="hao">好</h5>
                                    <p>正品行货，精致服务</p>
                                </div>
                            </li>

                            <li>
                                <div className="service_unit">
                                    <h5 className="sheng">省</h5>
                                    <p>天天低价，畅选无忧</p>
                                </div>
                            </li>

                        </ul>
                    </div>

                </div>
            </div>
            <div className="fc_center">
                <div className="w help">
                    <dl>
                        <dt>新手入门</dt>
                        <dd><a href="#">常见问题</a></dd>
                        <dd><a href="#">新会员注册</a></dd>
                        <dd><a href="#">用户登录</a></dd>
                        <dd><a href="#">找回密码</a></dd>
                    </dl>
                    <dl>
                        <dt>购物指南</dt>
                        <dd><a href="#">购物流程</a></dd>
                        <dd><a href="#">订单状态说明</a></dd>
                        <dd><a href="#">隐思声明</a></dd>
                        <dd><a href="#">发票制度</a></dd>
                    </dl>
                    <dl>
                        <dt>配送服务</dt>
                        <dd><a href="#">范围、时间及费用</a></dd>
                        <dd><a href="#">商品验货及签收</a></dd>
                        <dd><a href="#">门店自提</a></dd>
                    </dl>
                    <dl>
                        <dt>支付方式</dt>
                        <dd><a href="#">货到付款</a></dd>
                        <dd><a href="#">网上支付</a></dd>
                        <dd><a href="#">银行转账</a></dd>
                        <dd><a href="#">激活优惠券</a></dd>
                    </dl>
                    <dl>
                        <dt>售后服务</dt>
                        <dd><a href="#">退换货政策</a></dd>
                        <dd><a href="#">退换货流程</a></dd>
                        <dd><a href="#">售后常见问题</a></dd>
                        <dd><a href="#">正品保证</a></dd>
                        <dd><a href="#">品牌保障</a></dd>
                    </dl>

                    <dl>
                        <dt>企业服务</dt>
                        <dd><a href="#">供应商合作</a></dd>
                        <dd><a href="#">供应商入口</a></dd>
                        <dd><a href="#">商家入驻</a></dd>
                    </dl>

                </div>
            </div>
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
    )
}

export default Footer;