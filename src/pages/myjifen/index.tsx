import { parse } from 'querystring'
import React, { useEffect, useState } from 'react'
import { HashRouter, Link } from 'react-router-dom'
import { fetchget, fetchpost } from '../../utils/zgfetch'
import './myjifen.scss'

const Myjifen: React.FC = () => {

    // 获取积分记录
    let [huoqu, setHuoqu] = useState<any>([])
    // 历史积分记录
    let [history, setHistory] = useState<any>([])
    // 兑换积分记录
    let [duihuan, setDuihuan] = useState<any>([])

    /**------------------------------------------------------------------- */
    const getHuoqu = async () => {
        var result = await fetchget('/api/getHuoqu')
        console.log(result, "获取");
        setHuoqu(result)
    }
    const getDuiHuanJi = async () => {
        var result = await fetchget('/api/getDuiHuanJi')
        console.log(result, "duihuan");
        setDuihuan(result)
    }
    const getLishiList = async () => {
        var result = await fetchget('/api/getLishiList')
        console.log(result, "历史");
        setHistory(result)
    }

    useEffect(() => {
        getHuoqu()
        getLishiList()
        getDuiHuanJi()
    }, [])
    /**------------------------------------------------------------------- */
    let [seletColor, setColor] = useState<any>(1)
    const changeColor = (e: any) => {
        console.log(e.target.id);
        setColor(e.target.id)
    }
    return (
        <div className="jifen">
            {/* 导航 */}
            <div className="d_nav">
                <Link to="/">首页</Link>
                <span> &gt; 我的积分 </span>
            </div>
            {/* 左边 */}
            <div className="jf_left">
                <div className="jfl_title">
                    <div className="strip"></div>
                    我的积分
                </div>
                <div className="jfl_fenlei">
                    <h3 className="t">账户信息</h3>
                    <ul onClick={(e) => { changeColor(e) }}>
                        <li id='1' className={1 == seletColor ? 'active' : 'menuName'}>积分获取记录</li>
                        <li id='2' className={2 == seletColor ? 'active' : 'menuName'}>历史积分记录</li>
                        <li id='3' className={3 == seletColor ? 'active' : 'menuName'}>积分消费记录</li>
                    </ul>
                </div>
                <div className="jfl_fenlei">
                    <h3 className="t">我的收藏</h3>
                    <ul onClick={(e) => { changeColor(e) }}>
                        <li id='4' className={4 == seletColor ? 'active' : 'menuName'}><Link to="/shoucang">药品收藏</Link></li>
                    </ul>
                </div>
                <div className="jfl_fenlei">
                    <h3 className="t">我的购物车</h3>
                    <ul onClick={(e) => { changeColor(e) }}>
                        <li id='5' className={5 == seletColor ? 'active' : 'menuName'}><Link to='/yaocart'>药品购物车</Link></li>
                        <li id='6' className={6 == seletColor ? 'active' : 'menuName'}><Link to="/duiCart">兑换购物车</Link></li>
                    </ul>
                </div>
            </div>
            {/* 右边 */}
            {/* style={{display:'none'}} */}
            <div className={1 == seletColor ? 'xianshi' : 'yincang'}>
                <div className="jf_right" >
                    <div className="title bgf">
                        <p className="text_m">积分获取记录</p>
                        <p className="bgRed"></p>
                    </div>
                    <div className="listContent bgf">
                        <table className="ilTable text_m">
                            <tbody style={{ border: '0px' }}>
                                <tr>
                                    <th className="il_th_left">积分类型</th>
                                    <th className="il_th_right">积分值</th>
                                    <th className="il_th">最近到期日</th>
                                </tr>
                                <tr>
                                    <td colSpan={3} className="addText">
                                        - 为您展示近一年积分明细 -
                                    </td>
                                </tr>
                                {
                                    huoqu && huoqu.map((item: any, index: any) => {
                                        return <tr key={index}>
                                            <td rowSpan={1} className="il_td_left">获取积分</td>
                                            <td className="il_td_right" style={{ color: 'rgb(229, 0, 141)' }}>+{item.hq_jifen}</td>
                                            <td className="il_td">{new Date(Date.parse(item.hq_time)).toLocaleString()}</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className={2 == seletColor ? 'xianshi' : 'yincang'}>
                <div className="jf_right" >
                    <div className="title bgf">
                        <p className="text_m">历史积分记录</p>
                        <p className="bgRed"></p>
                    </div>
                    <div className="listContent bgf">
                        <table className="ilTable text_m">
                            <tbody style={{ border: '0px' }}>
                                <tr>
                                    <th className="il_th_left">积分类型</th>
                                    <th className="il_th_right">积分值</th>
                                    <th className="il_th">最近到期日</th>
                                </tr>
                                <tr>
                                    <td colSpan={3} className="addText">
                                        - 为您展示近一年积分明细 -
                                    </td>
                                </tr>
                                {
                                    history && history.map((item: any, index: any) => {
                                        return <tr key={index}>
                                            <td rowSpan={1} className="il_td_left">历史积分</td>
                                            <td className="il_td_right" style={{ color: 'rgb(229, 0, 141)' }}>{item.hi_jifen}</td>
                                            <td className="il_td">{new Date(Date.parse(item.hi_time)).toLocaleString()}</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className={3 == seletColor ? 'xianshi' : 'yincang'}>
                <div className="jf_right" >
                    <div className="title bgf">
                        <p className="text_m">积分消费记录</p>
                        <p className="bgRed"></p>
                    </div>
                    <div className="listContent bgf">
                        <table className="ilTable text_m">
                            <tbody style={{ border: '0px' }}>
                                <tr>
                                    <th className="il_th_left">积分类型</th>
                                    <th className="il_th_right">积分值</th>
                                    <th className="il_th">最近到期日</th>
                                </tr>
                                <tr>
                                    <td colSpan={3} className="addText">
                                        - 为您展示近一年积分明细 -
                                    </td>
                                </tr>
                                {
                                    duihuan && duihuan.map((item: any, index: any) => {
                                        return <tr key={index}>
                                            <td rowSpan={1} className="il_td_left">消费积分</td>
                                            <td className="il_td_right" style={{ color: 'rgb(229, 0, 141)' }}>-{item.dh_jifen}</td>
                                            <td className="il_td">{new Date(Date.parse(item.dh_time)).toLocaleString()}</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Myjifen