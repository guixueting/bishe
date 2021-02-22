import React, { useEffect, useState } from 'react'
import './paihang.scss'
import pai from './image/paihang.jpg'
import { fetchget, fetchpost } from '../../utils/zgfetch'
const Paihang: React.FC = () => {
    let [phdata, setPhdata] = useState<any>([])

    const getPaihang = async () => {
        var result = await fetchget('/api/getPai');
        console.log(result, "paihang");
        setPhdata(result)
    }
    useEffect(() => {
        getPaihang()
    }, [])

    const addDuiGou = async (e: any, item: any) => {
        var obj = {
            itemCode: item.skuWareCode,
            imageUrl:item.imgUrl,
            name: item.skuWareName,
            integralValue: item.oriIntegralValue
        }
        console.log(obj);
        var result = await fetchget('/api/getDuiGou');
        var currentGood = result.find((i: any) => {
            if (item.skuCode == i.itemCode) {
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
        <div className="paihang">
            {/* 图片 */}
            <div className="ph_img">
                <img src={pai}></img>
            </div>
            {/* 商品 */}
            <div className="hd_nno mynno">
                <ul>
                    {
                        phdata.map((item: any, index: any) => {
                            return <li key={index}>
                                <img src={item.imgUrl} alt="" />
                                <p>{item.skuWareName}</p>
                                <div className='jifen'>{item.oriIntegralValue}<span>积分</span></div>
                                <button className="hd_btn" onClick={(e) => { addDuiGou(e, item) }}>立即兑换</button>
                            </li>
                        })
                    }
                </ul>
            </div>
            <div className="intright_foot">
                <span>- 已到达底部 -</span>
            </div>
        </div>
    )
}

export default Paihang