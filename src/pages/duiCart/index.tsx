import Item from 'antd/lib/list/Item';
import React, { useEffect, useState } from 'react'
import { fetchget, fetchpost } from '../../utils/zgfetch';
import './duicart.scss'
import { message, Button } from 'antd';
const DuiCart: React.FC = () => {
    let [dui, setDui] = useState<any>([]);
    let [dui_count, setValue] = useState<any>()
    let [sum_count, setSumCount] = useState<any>()
    let [zong_jifen, setZongJiFen] = useState<any>()
    let [lishi, setLishi] = useState<any>()
    /**---------------------------------------------------- */
    // 1.获取兑换购物车总数据
    const getDuigou = async () => {
        var result = await fetchget('/api/getDuiGou');
        // console.log(result);
        setDui(result)
        var arr = []
        for (var i = 0; i < dui.length; i++) {
            arr.push(dui[i].dui_count)
        }
        setValue(arr)
    }
    // 2.跟新输入框的count值
    const updataDuiCount = async (e: any, id: any) => {
        var result = await fetchget(`/api/updateDuiCount?id=${id}&count=${e.target.value}`);
        console.log("update");
    }
    // 3.总共多少件商品
    const getDuiSumCount = async () => {
        var result = await fetchget("/api/getDuiSumCount")
        // console.log(result[0].sum_count, "sum");
        setSumCount(result[0].sum_count)
    }
    // 3.总共多少积分
    const getDuiSumJiFen = async () => {
        var result = await fetchget("/api/getDuiSumJiFen")
        // console.log(result[0].sum_count, "sum");
        setZongJiFen(result[0].zong_jifen)
    }
    // 4.通过--和++更新输入框的count
    const updataDuiCountJian = async (e: any, id: any, count: any) => {
        var result = await fetchget(`/api/updateDuiCount?id=${id}&count=${count}`);
        console.log("jianjianjian");
    }
    // 5.清除兑换购物车
    const deleAllDui = async () => {
        await fetchget('/api/deleAllDui')
    }
    //6.获取历史jifen
    const getLishi = async () => {
        var result = await fetchget('/api/getLishi')
        console.log(parseInt(result[result.length - 1] && result[result.length - 1].hi_jifen), "lishi");
        setLishi(parseInt(result[result.length - 1] && result[result.length - 1].hi_jifen))
    }
    //6.从历史积分中减去消费的
    const jianLishiJifen = async () => {
        var ji = lishi - zong_jifen
        console.log(ji, "jijiji");
        await fetchpost('/api/addLishiJifen', { jifen: ji })
    }
    useEffect(() => {
        getDuigou()
        getDuiSumCount()
        getDuiSumJiFen()
        return () => {
            setDui = () => { }
            // setSumCount = () => { }
            setValue = () => { }
            // setZongJiFen = () => { }
        }
    }, [dui])
    useEffect(() => {
        getDuiSumCount()
        getDuiSumJiFen()
        getLishi()
    }, [])
    /**---------------------------------------------------- */
    // 1.修改输入框的值
    const changeValue = async (e: any, item: any, index: any) => {
        // 当改变时，更新数据库的值
        console.log(item, 'llllll');
        var new_count = dui_count && dui_count.forEach((item: any, ind: any) => {
            if (ind == index) {
                item = e.target.value
            }
        })
        console.log(new_count && new_count[index], index);
        updataDuiCount(e, item.itemCode)
        setValue(new_count)
    }

    // 2.点击-,修改输入框的值
    const jian = (e: any, id: any, index: any, count: any) => {
        dui_count && dui_count.forEach((item: any, ind: any) => {
            if (ind == index && item > 1) {
                item -= 1;
                updataDuiCountJian(e, id, item).then(() => {
                    console.log(item, "ssssssssssssswwwwwwwwwww");
                })
            }
        })
        setValue(dui_count)
    }
    //3.点击+，修改输入框的值
    const jia = (e: any, id: any, index: any, count: any) => {
        dui_count && dui_count.forEach((item: any, ind: any) => {
            if (ind == index) {
                item += 1;
                updataDuiCountJian(e, id, item)
                console.log(item, "ssssssssssssswwwwwwwwwww");
            }
        })
        setValue(dui_count)
        console.log(id, index, count, "kkkk");

    }
    // 4.删除指定id数据
    const deleteDui = async (e: any, id: any) => {
        await fetchget('/api/deleDui?id=' + id)
    }
    //5.兑换,点击兑换按钮的时候，把兑换的总积分加入兑换数据库，清空购物车；从历史积分中减去兑换的积分
    const duihuan = async () => {
        var ji = lishi - zong_jifen;
        if (ji < 0) {
            message.error('积分不足，不能兑换商品!');
            return
        } else {
            var obj = {
                jifen: zong_jifen
            }
            await fetchpost('/api/insertDuiHuan', obj)
            deleAllDui()
            jianLishiJifen()
        }

    }
    return (
        <div className="duicart">
            {/* {console.log(dui, "...")} */}
            <div className="between pb20">
                <span className="font16 fw">商品清单</span>
                <span className="blueBtn pointer">返回</span>
            </div>
            <div className="dc_center">
                <table>
                    <thead>
                        <tr>
                            <td>商品图片</td>
                            <td>商品名称</td>
                            <td>商品数量</td>
                            <td>商品单价</td>
                            <td>商品小计</td>
                            <td>操作</td>
                        </tr>
                    </thead>
                    {/*  */}
                    <tbody>
                        {
                            dui && dui.map((item: any, index: any) => {
                                return <tr className="t" key={index}>
                                    <td><img src={item.imageUrl} alt="" width="160" height="140" /></td>
                                    <td className="name"><span title="ssss">{item.name}</span></td>
                                    <td className="count">
                                        <button onClick={(e) => { jian(e, item.itemCode, index, item.dui_count) }}>-</button>
                                        <input type="text" id={index} value={dui_count && dui_count[index] || ''} onChange={(e) => changeValue(e, item, index)} />
                                        <button onClick={(e) => { jia(e, item.itemCode, index, item.dui_count) }}>+</button>
                                    </td>
                                    <td><span className="qian">{item.integralValue}</span><span className="jf">积分</span></td>
                                    <td><span className="qian">{item.integralValue * item.dui_count}</span><span className="jf">积分</span></td>
                                    <td className="de">
                                        <div className="delet" onClick={(e) => { deleteDui(e, item.itemCode) }}>
                                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                                            <p>删除</p>
                                        </div>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
                <div className={dui.length == 0 ? 'xianshi' : 'nooo'}>
                    <p>看到需要兑换的物品，点击【加入购物车】，在这里下单兑换吧！</p>
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
                    <div className="jiesuan" onClick={duihuan}><a>兑换</a></div>
                </div>
            </div>
        </div>
    )
}

export default DuiCart;