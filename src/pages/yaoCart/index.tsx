import './yaoCart.scss'
import React, { useEffect, useRef, useState } from 'react'
import { fetchget, fetchpost } from '../../utils/zgfetch'

const YaoCart: React.FC = () => {
    let [yao, setYao] = useState<any>([])
    let [cart_count, setValue] = useState<any>()
    let [sum_count, setSumCount] = useState<any>()
    let [zong_jifen, setZongJiFen] = useState<any>()
    /**------------------------------------------ */
    // 最后一个历史积分记录
    let [lishi, setLishi] = useState<any>()
    // 
    // 最后一个获取积分记录
    let [lastHuo, setLastHuo] = useState<any>(0)
    /**------------------------------------------ */
    const getYaoCart = async () => {
        var result = await fetchget('/api/getYaoCart');
        setYao(result)
        var arr = []
        for (var i = 0; i < yao.length; i++) {
            arr.push(yao[i].cart_count)
        }
        setValue(arr)
    }

    const updataYaoCount = async (e: any, id: any) => {
        var result = await fetchget(`/api/updateYaoCount?id=${id}&count=${e.target.value}`);
        console.log("update");
    }
    const updataYaoCountJian = async (e: any, id: any, count: any) => {
        var result = await fetchget(`/api/updateYaoCount?id=${id}&count=${count}`);
        console.log("jianjianjian");
    }
    const getSumCount = async () => {
        var result = await fetchget("/api/getSumCount")
        // console.log(result[0].sum_count, "sum");
        setSumCount(result[0].sum_count)
    }
    const getSumJiFen = async () => {
        var result = await fetchget("/api/getSumJiFen")
        // console.log(result[0].sum_count, "sum");
        setZongJiFen(result[0].zong_jifen)
    }

    const deleAllCart = async () => {
        await fetchget('/api/deleAllCart')
    }
    useEffect(() => {
        getYaoCart()
        getSumCount()
        getSumJiFen()
        return () => {
            setYao = () => { }
            // setSumCount = () => { }
            setValue = () => { }
            // setZongJiFen = () => { }
        }
    }, [yao])
    /**------------------------------------------- */
    const getLishi = async () => {
        var result = await fetchget('/api/getLishi')
        console.log(parseInt(result[result.length - 1] && result[result.length - 1].hi_jifen), "lishi");
        setLishi(parseInt(result[result.length - 1] && result[result.length - 1].hi_jifen))
    }
    // 获取最后一个和获取积分记录
    const getLastHuoqu = async () => {
        var result = await fetchget('/api/lastHuoqu')
        console.log(parseInt(result[result.length - 1] && result[result.length - 1].hq_jifen), "最后一个获取积分");
        setLastHuo(parseInt(result[result.length - 1] && result[result.length - 1].hq_jifen))
    }
    const addLishiJifen = async () => {
        var ji = zong_jifen + lishi
        console.log(ji, "jijiji");
        await fetchpost('/api/addLishiJifen', { jifen: ji })
    }


    /**----------------------------------------------- */
    useEffect(() => {
        getSumCount()
        getSumJiFen()
        getLishi()
        getLastHuoqu()
    }, [])

    const deleteYao = async (e: any, id: any) => {
        await fetchget('/api/deleYao?id=' + id)
    }
    /**------------------------------------------------------------ */
    const changeValue = async (e: any, item: any, index: any) => {
        // 当改变时，更新数据库的值
        console.log(e.target.value, 'llllll');
        var new_count = cart_count && cart_count.forEach((item: any, ind: any) => {
            if (ind == index) {
                item = e.target.value
            }
        })
        console.log(new_count && new_count[index], index);
        updataYaoCount(e, item.id)
        setValue(new_count)
    }

    const jian = (e: any, id: any, index: any, count: any) => {
        cart_count && cart_count.forEach((item: any, ind: any) => {
            if (ind == index && item > 1) {
                item -= 1;
                updataYaoCountJian(e, id, item).then(() => {
                    console.log(item, "ssssssssssssswwwwwwwwwww");
                })
            }
        })
        setValue(cart_count)
    }
    const jia = (e: any, id: any, index: any, count: any) => {
        cart_count && cart_count.forEach((item: any, ind: any) => {
            if (ind == index) {
                item += 1;
                updataYaoCountJian(e, id, item)
                console.log(item, "ssssssssssssswwwwwwwwwww");
            }
        })
        setValue(cart_count)
        console.log(id, index, count, "kkkk");

    }
    // 点击结算
    const jiesuan = async () => {
        var obj = {
            jifen: zong_jifen
        }
        await fetchpost('/api/insertHuoqu', obj)
        deleAllCart()
        addLishiJifen()
    }

    return (
        <div className="yaoCart">
            <p className="my-cart">我的收藏</p>
            <table>
                <thead>
                    <tr>
                        <td>商品图片</td>
                        <td>商品名称</td>
                        <td>商品数量</td>
                        <td>积分</td>
                        <td>总积分</td>
                        <td>操作</td>
                    </tr>
                </thead>
                {/* {console.log(xiaoji,"xiaoji") } */}
                <tbody>
                    {
                        yao && yao.map((item: any, index: any) => {
                            return <tr className="t" key={item.id}>
                                <td><img src={item.img_url} alt="" width="160" height="140" /></td>
                                <td className="name"><span title={item.NAME}>{item.NAME}</span></td>
                                <td className="count">
                                    <button onClick={(e) => { jian(e, item.id, index, item.cart_count) }}>-</button>
                                    <input type="text" id={index} value={cart_count && cart_count[index] || ''} onChange={(e) => changeValue(e, item, index)} />
                                    <button onClick={(e) => { jia(e, item.id, index, item.cart_count) }}>+</button>
                                </td>
                                <td><span className="qian">{item.jifen}</span><span className="jf">积分</span></td>
                                <td><span className="qian">{item.jifen*item.cart_count}</span><span className="jf">积分</span></td>
                                <td className="de">
                                    <div className="delet" onClick={(e) => { deleteYao(e, item.id) }}>
                                        <i className="fa fa-trash-o" aria-hidden="true"></i>
                                        <p>删除</p>
                                    </div>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
            <div className={yao.length == 0 ? 'xianshi' : 'nooo'}>
                <p>看到需要购买的药品，点击【加入购物车】，在这里下单购买吧！</p>
            </div>
            <div className="bot">
                <div className="yi">已选商品<span id="z_jian">{sum_count||0}</span>件 </div>
                <div className="heji">
                    <p style={{ fontSize: "14px" }}>
                        合计(不含运费):￥<span id="heji">{zong_jifen||0}</span>
                    </p>
                    <p style={{ fontSize: "12px" }}>(若购买享有优惠，相应金额将在订单结算页面减扣)</p>
                </div>
                {/* 提交订单时会加入药品订单数据库，这时会有一个时间和积分数 */}
                <div className="jiesuan" onClick={jiesuan}><a>结算</a></div>
            </div>
        </div>
    )
}

export default YaoCart;