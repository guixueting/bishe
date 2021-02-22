import React, { useState, useEffect } from 'react'
import './baokuan.scss'
import baokuan from './image/baokuan.png'

import { Anchor } from 'antd';
import { fetchget, fetchpost } from '../../utils/zgfetch';
const { Link } = Anchor;

const Baokuan: React.FC = () => {

    let [huoNno, setHuoNno] = useState<any>([])
    let [huoOnno, setHuoOnno] = useState<any>([])
    let [huoTnno, setHuoTnno] = useState<any>([])
    /**---------------------------------------------- */

    // 数据库秒杀专区数据
    const getBaokuanOne = async () => {
        var result = await fetchget('/api/getBaokuanOne');
        console.log(result, "huozzzzzzzzzzzzzzzz");
        setHuoNno(result)
    }
    const getBaokuanTwo = async () => {
        var result = await fetchget('/api/getBaokuanTwo');
        console.log(result, "huo19901990");
        setHuoOnno(result)
    }
    const getBaokuanThree = async () => {
        var result = await fetchget('/api/getBaokuanThree');
        console.log(result, "huo29902990");
        setHuoTnno(result)
    }
    useEffect(() => {
        getBaokuanOne()
        getBaokuanTwo()
        getBaokuanThree()
    }, [])
    /**---------------------------------------------- */

    const handle = (e: any) => {
        e.preventDefault();
    }

    const addDuiGou = async (e: any, item: any) => {
        var obj = {
            itemCode: item.skuCode,
            imageUrl: item.wareImageUrl,
            name: item.spuWareName,
            integralValue: item.discountIntegralValue
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
        <div className="huodong">
            {/* 头部 */}
            <div className="hd_head">
                <img src={baokuan} alt="" />
                <div className="hd_tiao">
                    <Anchor onClick={handle} affix={false}>
                        <Link href="#nno" title={<div className="tab_title"><p className="tab_title_active">折后990</p></div>}></Link>
                        <Link href="#onno" title={<div className="tab_title"><p>厨房好物</p></div>}></Link>
                        <Link href="#tnno" title={<div className="tab_title"><p>精品家居</p></div>}></Link>
                    </Anchor>
                </div>
            </div>
            {/* 990折后 */}
            <div className="hd_nno mynno">
                <div id="nno" className="hd_title">折后990</div>
                <ul>
                    {
                        huoNno.map((item: any) => {
                            return <li key={item.skuCode}>
                                <img src={item.wareImageUrl} alt="" />
                                <p className="proName">{item.spuWareName}</p>
                                <div className='jifen'>
                                    <p className="dis_price">{item.discountIntegralValue}<span>积分</span></p>
                                    <p className="ori_price">{item.oriIntegralValue}积分</p>
                                </div>
                                <button className="hd_btn" onClick={(e) => { addDuiGou(e, item) }}>立即兑换</button>
                            </li>
                        })
                    }
                </ul>
            </div>
            {/* 厨房好物 */}
            <div className="hd_nno mynno">
                <div id="onno" className="hd_title">厨房好物</div>
                <ul>
                    {
                        huoOnno.map((item: any) => {
                            return <li key={item.skuCode}>
                                <img src={item.wareImageUrl} alt="" />
                                <p>{item.spuWareName}</p>
                                <div className='jifen'>
                                    <p className="dis_price">{item.discountIntegralValue}<span>积分</span></p>
                                    <p className="ori_price">{item.oriIntegralValue}积分</p>
                                </div>
                                <button className="hd_btn" onClick={(e) => { addDuiGou(e, item) }}>立即兑换</button>
                            </li>
                        })
                    }
                </ul>
            </div>
            {/* 精品家居 */}
            <div className="hd_nno mynno">
                <div id="tnno" className="hd_title">精品家居</div>
                <ul>
                    {
                        huoTnno.map((item: any) => {
                            return <li key={item.skuCode}>
                                <img src={item.wareImageUrl} alt="" />
                                <p>{item.spuWareName}</p>
                                <div className='jifen'>
                                    <p className="dis_price">{item.discountIntegralValue}<span>积分</span></p>
                                    <p className="ori_price">{item.oriIntegralValue}积分</p>
                                </div>
                                <button className="hd_btn" onClick={(e) => { addDuiGou(e, item) }}>立即兑换</button>
                            </li>
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default Baokuan;