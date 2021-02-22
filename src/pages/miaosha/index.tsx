import React, { useEffect, useState } from 'react'
import { fetchget, fetchpost } from '../../utils/zgfetch'
import './miaosha.scss'
const Miaosha: React.FC = () => {
    let [miaoList, setMiao] = useState<any>([])
    // 数据库秒杀专区数据
    const getMiaosha = async () => {
        var result = await fetchget('/api/getMiaosha');
        console.log(result, "miaoshaoooooooooooooo");
        setMiao(result)
    }
    useEffect(() => {
        getMiaosha()
    }, [])
    // 加入兑换购物车

    const addDuiGou = async (e: any, item: any) => {
        // console.log(item, "pppppppp");
        var obj={
            itemCode:item.goods_id,
            imageUrl:require('.' + item.goods_img).default,
            name:item.goods_name,
            integralValue:item.old_price
        }
        console.log(obj);
        var result = await fetchget('/api/getDuiGou');
        var currentGood = result.find((i: any) => {
            if (item.goods_id == i.itemCode) {
                return i
            }
        })
        if (currentGood) {
            return
        } else {
            await fetchpost("/api/postAddDuiGou", obj)
        }

    }
    return (
        <div className="miaosha">
            <div className="ms_header">
                <h1>秒杀活动</h1>
            </div>
            <div className="ms_prodect">
                <ul>
                    {
                        miaoList.map((item: any) => {
                            return <li key={item.goods_id}>
                                <img src={require('.' + item.goods_img).default} alt="" />
                                <div className="msp_cart">
                                    <span className="name">{item.goods_name}</span>
                                    <span className="desc">{item.goods_desc}</span>
                                    <p>
                                        <span className="new">{item.old_price}元</span>
                                        <span className="old">{item.new_price}元</span>
                                    </p>
                                    <button className="msp_btn" onClick={(e) => { addDuiGou(e, item) }}>加入购物车</button>
                                </div>
                            </li>
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default Miaosha;