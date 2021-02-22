import React, { useEffect, useState } from 'react'
import './shop.scss'
import { fetchget, fetchpost } from '../../utils/zgfetch'



import { Carousel } from 'antd';
import s1 from './image/s1.jpg'
import s2 from './image/s2.jpg'
import s3 from './image/s3.jpg'
import s4 from './image/s4.jpg'
import s5 from './image/s5.png'
import sc1 from './image/sc1.png'
import sc2 from './image/sc2.png'
import sc3 from './image/sc3.png'
import sc4 from './image/sc4.png'
import sc5 from './image/sc5.png'
import sc6 from './image/sc6.png'
import huo1 from './image/huo1.jpg'
import huo2 from './image/huo2.jpg'
import touxiang from './image/touxiang.png'
import mytouxiang from './image/mytouxiang.jpg'
import shandian from './image/shandian.jpg'
import { Link } from 'react-router-dom';
import Item from 'antd/lib/list/Item';

const Shop: React.FC = () => {
    let [cedata, setCadata] = useState<any>([])
    let [detail, setDetail] = useState<any>([])
    let [tuiProduct, setTuiproduct] = useState<any>([])
    let [miaoList, setMiao] = useState<any>([])

    let [hour, setHour] = useState<any>('00')
    let [minute, setMibute] = useState<any>('00')
    let [seconed, setSeconed] = useState<any>('00')

    let [user, setUser] = useState<any>(false)
    /*-----------------------------发请求，拿数据------------------------------ */
    const getCeData = async () => {
        var { resultJson: result } = await fetchpost('https://jf.10086.cn/cmcc-web-shop/cms/categories');
        var list: any = [];
        result.map((item: any) => {
            return list.push(item.categories[0])
        })
        setCadata(list)
    }
    // 推荐数据
    const getTuiProducts = async () => {
        var { resultJson: result } = await fetchpost('https://jf.10086.cn/cmcc-web-shop/ware/skuWareListForPortal', { skuWareCodeList: '["11110817","11104649","904939","887624","788291","816643","11021767","158490","11040728","11135270","11100210","11167283","11072544","989384","822581","714564","11188516","11179201","11044634","11087703","11044655","11131409","11051225","11129993","11114361","11012283","11067448","11004110","11059450","11044628","11044660","11044640","11051251","11019176","11005646","11000067"]' });
        setTuiproduct(result)

    }
    // 数据库秒杀专区数据
    const getMiaosha = async () => {
        var result = await fetchget('/api/getMiaosha');
        setMiao(result)

    }
    useEffect(() => {
        getCeData();
        getTuiProducts();
        getMiaosha();
        timer()
        getUser()
        return ()=>{
            setCadata=()=>{}
            setDetail=()=>{}
            setTuiproduct=()=>{}
            setMiao=()=>{}
            setUser=()=>{}
            setHour=()=>{}
            setMibute=()=>{}
            setSeconed=()=>{}
        }
    }, [])
    /**------------------------------------------------------------------------- */
    const getId = (id: any) => {
        cedata.forEach((item: any) => {
            if (item.categoryId == id) {
                setDetail(item.categories)
            }
        });
    }
    /**倒计时 */
    const timer = () => {
        var nextDate = new Date('2021/2/30 18:00:00');
        var timeId = setInterval(function () {
            var currentDate = new Date();
            var currentTime = currentDate.getTime();//现在距离1976毫秒数
            var nextTime = nextDate.getTime();//未来距离1976毫秒数
            // console.log(currentTime, nextTime, '/////////////////////////////////////');
            // 5.获取剩余毫秒数
            var allTime = nextTime - currentTime;
            //6.转化（毫秒转为我们想要的格式）
            // 判断，如果超出我们结束的时间，则清除定时器，防止负数
            if (allTime > 0) {
                var allSecond = parseInt(allTime / 1000 + '');
                var d = size(parseInt(allSecond / 3600 / 24 + ''));//天
                var h = size(parseInt(allSecond / 3600 % 24 + ''));//时
                var m = size(parseInt(allSecond / 60 % 60 + ''));//分
                var s = size(parseInt(allSecond % 60 + ''));//秒
                // //7.注入
                setHour(h)
                setMibute(m)
                setSeconed(s)
                // console.log(h, m, s, allTime, currentTime, nextTime, currentDate);
            } else {
                clearInterval(timeId)
            }

        }, 1000);
    }
    const size = (num: any) => {
        return num < 10 ? '0' + num : num;
    }
    // 登陆部分 
    const getUser = async () => {
        var { user: result } = await fetchget('/api/session');
        console.log(result, "xxxxxxxxxx")
        if (result && result.name && result.password) {
            setUser(true)
        } else {
            setUser(false)
        }
    }
    return (
        <div>
            {/* 轮播部分 */}
            <div className="shop_center">
                {/* 左边 */}
                <div className="s_left">
                    {/* {console.log(cedata, "ssssshhhhhooooooppppp")} */}
                    <ul>
                        {
                            cedata.map((item: any) => {
                                return <li key={item.categoryId} onMouseOver={(id) => { getId(item.categoryId) }}>
                                    <span>{item.categoryName}</span>
                                </li>

                            })

                        }
                        <div className="sl_hidd">
                            {
                                detail.map((ite: any) => {
                                    return <div key={ite.categoryId} className="sl_box">
                                        <div className="sl_title">{ite.categoryName}</div>
                                        <div className="sl_select">
                                            {ite.categories && ite.categories.map((it: any) => {
                                                return <Link to={`/daohang?name=`+it.categoryName} key={it.categoryId}><span>{it.categoryName}</span></Link>
                                            })}
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </ul>
                </div>
                {/* 中部 */}
                <div className="s_center">
                    <div className="sc_top">
                        <Carousel autoplay>
                            <div>
                                <img src={s1} alt="" />
                            </div>
                            <div>
                                <img src={s2} alt="" />
                            </div>
                            <div>
                                <img src={s3} alt="" />
                            </div>
                        </Carousel>
                    </div>
                    <div className="sc_bottom">
                        <Link to="/paihang"><img src={s4} alt="" /></Link>
                        <Link to='/baokuan'><img src={s5} alt="" /></Link>
                    </div>
                </div>
                {/* 右边 */}
                <div className="s_right">
                    {/* 登陆 */}
                    <div className="sr_login">
                        <div>
                            <img src={user? mytouxiang:touxiang} alt="" />
                            <div className="srl_jie">
                                <span>欢迎访问</span>
                                <span>仁心药店积分商城</span>
                            </div>
                        </div>
                        <Link to={user?'/shop':'/login'}><button className="sr_btn">{user?'已登陆':'登陆'}</button></Link>
                    </div>
                    {/* 公告 */}
                    <div className="sr_gonggao">
                        <div>商家公告</div>
                        <ul>
                            <li><a href="#" title="积分清“零”公告"><span>【系统】</span>积分清“零”公告</a></li>
                            <li><a href="#" title="国家药监局发布停止生产销售使用吡硫醇注射剂的公告"><span>【质量】</span>国家药监局发布停止生产销售使用吡硫醇注射剂的公告</a></li>
                            <li><a href="#" title="关于停止生产销售使用特酚伪麻片和特洛伪麻胶囊的公告（2018年第92号）"><span>【质量】</span>关于停止生产销售使用特酚伪麻片和特洛伪麻胶囊的公告（2018年第92号）</a></li>
                            <li><a href="#" title="11月9日！仁心药房网优选品牌健康服务日来啦！"><span>【活动】</span>11月9日！仁心药房网优选品牌健康服务日来啦！</a></li>
                            <li><a href="#" title="仁心药房网优选品牌健康服务日活动圆满举办"><span>【活动】</span>仁心药房网优选品牌健康服务日活动圆满举办</a></li>
                            <li><a href="#" title="关于侵害用户权益行为的APP通报"><span>【公告】</span>关于侵害用户权益行为的APP通报</a></li>
                            <li><a href="#" title="关于积分计划规则优化的公告"><span>【公告】</span>关于积分计划规则优化的公告</a></li>
                        </ul>
                    </div>
                    {/* 广告 */}
                    <div className="sr_ad">
                        <ul>
                            <li><a href="#"><img src={sc1} alt="" /><div>商超</div></a></li>
                            <li><a href="#"><img src={sc2} alt="" /><div>便利店</div></a></li>
                            <li><a href="#"><img src={sc3} alt="" /><div>电子书</div></a></li>
                            <li><a href="#"><img src={sc4} alt="" /><div>综合</div></a></li>
                            <li><a href="#"><img src={sc5} alt="" /><div>快餐</div></a></li>
                            <li><a href="#"><img src={sc6} alt="" /><div>视听</div></a></li>

                        </ul>
                    </div>
                </div>
            </div>
            {/* 积分分类 */}
            <div className="s_jilei">
                <ul>
                    <li><a className="fen">分值浏览</a></li>
                    <li><Link to="/fenlei/0/1000">0-1000</Link></li>
                    <li><Link to="/fenlei/1000/2000">1000-2000</Link></li>
                    <li><Link to="/fenlei/2000/3000">2000-3000</Link></li>
                    <li><Link to="/fenlei/3000/5000">3000-5000</Link></li>
                    <li><Link to="/fenlei/5000/10000">5000-10000</Link></li>
                </ul>
            </div>
            {/* 活动专区 */}
            <div className="s_huo">
                <p>活动专区</p>
                <div className="sh_img">
                    <Link to="/huodong">

                        <img src={huo1} alt="" />

                    </Link>
                    <Link to="/huodong">

                        <img src={huo2} alt="" />

                    </Link>
                </div>
            </div>
            {/* 秒杀专区 */}
            <div className="s_miao">
                <p className="sm_zhuan">秒杀专区</p>
                <div className="sm_center">
                    <div className="sm_time">
                        <div className="end">14:00 场</div>
                        <img src={shandian} alt="" />
                        <div className="desc">距离结束还有</div>
                        <div className="daojishi">
                            <span>{hour}</span>
                            <i>:</i>
                            <span>{minute}</span>
                            <i>:</i>
                            <span>{seconed}</span>
                        </div>
                    </div>
                    <div className="sm_right">
                        <ul>
                            {
                                miaoList.map((item: any, index: any) => {
                                    if (index < 4) {
                                        return <li key={item.goods_id}>
                                            <Link to="/miaosha">
                                                <div className="smr_img">
                                                    <img src={require('.' + item.goods_img).default} alt="" />
                                                </div>
                                                <h3>{item.goods_name}</h3>
                                                <p className="desc">{item.goods_desc}</p>
                                                <p className="price">
                                                    <span>{item.new_price}元 </span>
                                                    <span> {item.old_price}元</span>
                                                </p>
                                            </Link>
                                        </li>
                                    }
                                })
                            }
                        </ul>
                    </div>

                </div>
            </div>
            {/* 为您推荐 */}
            <div className="s_tuijian">
                <div className="st_title">
                    <div className="stt_left"></div>
                    <span>为您推荐</span>
                    <div className="stt_right"></div>
                </div>
                <div className="st_product">
                    <ul>
                        {
                            tuiProduct.map((item: any) => {
                                return <li key={item.skuWareCode}>
                                    <Link to={`/detail/${item.skuWareCode}`}>
                                        <div className="stp_img">
                                            <img src={item.imgUrl} alt="" />
                                        </div>
                                        <div className="stp_jifen">
                                            <p>{item.oriIntegralValue}<span>积分</span></p>
                                        </div>
                                        <div className="stp_name">
                                            <p>{item.skuWareName}</p>
                                        </div>
                                        <div className="stp_pingjia">
                                            <span>{item.commentCount}评价 </span>
                                            <span>{item.goodCommentRate}%好评率</span>
                                        </div>
                                    </Link>
                                </li>
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Shop