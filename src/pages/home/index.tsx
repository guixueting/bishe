import React, { useEffect, useState, useContext } from 'react'
import './home.scss'
import { Carousel } from 'antd';
import lunbo1 from './images/lunbo1.png'
import lunbo2 from './images/lunbo2.jpg'
import lunbo3 from './images/lunbo3.jpg'
import lunbo4 from './images/lunbo4.jpg'
import a1 from './images/a1.jpg'
import a2 from './images/a2.jpg'
import a3 from './images/a3.jpg'
import { fetchget, fetchpost } from '../../utils/zgfetch'


const Home: React.FC = () => {
    let [hproducts, setHproducts] = useState<any>([])
    /*-----------------------------发请求，拿数据------------------------------ */
    const getHProducts = async () => {
        var result = await fetchget('/api/getHomeProducts');
        console.log(result);
        setHproducts(result)
    }

    /**------------------------------------------------------------------------- */
    useEffect(() => {
        getHProducts();
        // getHMeirong();
    }, [])

    const onflish = () => {
        console.log("红么00000000000000000000000000000000000000000");

    }
    // 收藏
    const addShouCang = async (e: any, item: any) => {
        console.log(item, "sss");
        var result = await fetchget('/api/getShouCang');
        var currentGood = result.find((i: any) => {
            if (item.id == i.id) {
                return i
            }
        })
        if (currentGood) {
            return
        } else {
            await fetchpost("/api/postAddShou", item)
        }
    }
    //购物车
    const addYaoCart =async (e: any, item: any) => {
        console.log(item, "cart");
        var result = await fetchget('/api/getYaoCart');
        var currentGood = result.find((i: any) => {
            if (item.id == i.id) {
                return i
            }
        })
        if (currentGood) {
            return
        } else {
            await fetchpost("/api/postAddYaoCart", item)
        }

    }

    return (
        <div>
            {/* 轮播部分 */}
            <div className="home_center">
                <div className="home_left">
                    <ul>
                        <li><a href="#"><div>中西药品</div><div><span>补气血</span><span>风湿</span><span>壮阳</span></div></a></li>
                        <li><a href="#"><div>营养保健</div><div><span>调节免疫</span><span>美容养颜</span></div></a></li>
                        <li><a href="#"><div>滋补养生</div><div><span>三七</span><span>燕窝</span><span>阿胶</span></div></a></li>
                        <li><a href="#"><div>保健器械</div><div><span>血压计</span><span>制氧机</span><span>血糖仪</span></div></a></li>
                        <li><a href="#"><div>护理护具</div><div><span>口罩</span><span>鼻喉护理</span><span>暖贴</span></div></a></li>
                        <li><a href="#"><div>营养成分</div><div><span>胶原蛋白</span><span>益生菌</span><span>维生素</span></div></a></li>
                        <li><a href="#"><div>成人用品</div><div><span>计生用品</span><span>壮阳</span></div></a></li>
                        <li><a href="#"><div>隐形眼镜</div><div><span>彩色隐形</span><span>透明隐形</span><span>护理液</span></div></a></li>
                        <li><a href="#"><div>健康服务</div><div><span>体检套餐</span><span>口腔齿科</span></div></a></li>
                    </ul>
                </div>
                <div className="home_lunbo">
                    <Carousel autoplay>
                        <div>
                            <img src={lunbo1} alt="" />
                        </div>
                        <div>
                            <img src={lunbo2} alt="" />
                        </div>
                        <div>
                            <img src={lunbo3} alt="" />
                        </div>
                        <div>
                            <img src={lunbo4} alt="" />
                        </div>
                    </Carousel>
                </div>
                <div className="home_adv">
                    <div><img src={a1} alt="" /></div>
                    <div><img src={a2} alt="" /></div>
                    <div><img src={a3} alt="" /></div>
                </div>
            </div>
            {/* 产品部分 */}
            <div className="home_product">
                <div className="hp_item">
                    <div className="pp">
                        <p>感冒咳嗽</p>
                    </div>
                    <div className="hp_list">
                        {
                            hproducts.map((item: any, index: any) => {
                                if (index >= 0 && index < 5) {
                                    return <div className='hpl_item' key={item.id}>
                                        <img src={item.img_url} alt="" />
                                        <div className="price"><span>￥</span>{item.sell_price}</div>
                                        <div className="name" title={item.NAME}>{item.NAME}</div>
                                        <div className="hp_sc">
                                            <div onClick={(e) => addShouCang(e, item)}><i className="iconfont icon-xihuan"></i> 收藏</div>
                                            <div onClick={(e) => addYaoCart(e, item)}><i className="iconfont icon-gouwuche"></i> 加入购物车</div>
                                        </div>
                                    </div>
                                }
                            })
                        }
                    </div>
                </div>
                <div className="hp_item">
                    <div className="pp">
                        <p>美容养颜</p>
                    </div>
                    <div className="hp_list">
                        {
                            hproducts.map((item: any, index: any) => {
                                if (index >= 5 && index < 10) {
                                    return <div className='hpl_item' key={item.id}>
                                        <img src={item.img_url} alt="" />
                                        <div className="price"><span>￥</span>{item.sell_price}</div>
                                        <div className="name" title={item.NAME}>{item.NAME}</div>
                                        <div className="hp_sc">
                                            <div onClick={(e) => addShouCang(e, item)}><i className="iconfont icon-xihuan"></i> 收藏</div>
                                            <div onClick={(e) => addYaoCart(e, item)}><i className="iconfont icon-gouwuche"></i> 加入购物车</div>
                                        </div>
                                    </div>
                                }
                            })
                        }
                    </div>
                </div>
                <div className="hp_item">
                    <div className="pp">
                        <p>养生器械</p>
                    </div>
                    <div className="hp_list">
                        {
                            hproducts.map((item: any, index: any) => {
                                if (index >= 10 && index < 15) {
                                    return <div className='hpl_item' key={item.id}>
                                        <img src={item.img_url} alt="" />
                                        <div className="price"><span>￥</span>{item.sell_price}</div>
                                        <div className="name" title={item.NAME}>{item.NAME}</div>
                                        <div className="hp_sc">
                                            <div onClick={(e) => addShouCang(e, item)}><i className="iconfont icon-xihuan"></i> 收藏</div>
                                            <div onClick={(e) => addYaoCart(e, item)}><i className="iconfont icon-gouwuche"></i> 加入购物车</div>
                                        </div>
                                    </div>
                                }
                            })
                        }
                    </div>
                </div>
                <div className="hp_item">
                    <div className="pp">
                        <p>口腔护理</p>
                    </div>
                    <div className="hp_list">
                        {
                            hproducts.map((item: any, index: any) => {
                                if (index >= 15 && index < 20) {
                                    return <div className='hpl_item' key={item.id}>
                                        <img src={item.img_url} alt="" />
                                        <div className="price"><span>￥</span>{item.sell_price}</div>
                                        <div className="name" title={item.NAME}>{item.NAME}</div>
                                        <div className="hp_sc">
                                            <div onClick={(e) => addShouCang(e, item)}><i className="iconfont icon-xihuan"></i> 收藏</div>
                                            <div onClick={(e) => addYaoCart(e, item)}><i className="iconfont icon-gouwuche"></i> 加入购物车</div>
                                        </div>
                                    </div>
                                }
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home