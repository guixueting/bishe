import React, { useState, useEffect } from 'react'
import './huodong.scss'
import head from './image/head.jpg'

import { Anchor } from 'antd';
import { fetchget, fetchpost } from '../../utils/zgfetch';
const { Link } = Anchor;

const Huodong: React.FC = () => {

    let [huoNno, setHuoNno] = useState<any>([])
    let [huoOnno, setHuoOnno] = useState<any>([])
    let [huoTnno, setHuoTnno] = useState<any>([])
    /**---------------------------------------------- */

    // 数据库秒杀专区数据
    const getHuoNno = async () => {
        var result = await fetchget('/api/getHuoNno');
        console.log(result, "huozzzzzzzzzzzzzzzz");
        setHuoNno(result)
    }
    const getHuoOnno = async () => {
        var result = await fetchget('/api/getHuoOnno');
        console.log(result, "huo19901990");
        setHuoOnno(result)
    }
    const getHuoTnno = async () => {
        var result = await fetchget('/api/getHuoTnno');
        console.log(result, "huo29902990");
        setHuoTnno(result)
    }
    useEffect(() => {
        getHuoNno()
        getHuoOnno()
        getHuoTnno()
    }, [])
    /**---------------------------------------------- */

    const handle = (e: any) => {
        e.preventDefault();
    }

    const addDuiGou=async (e:any,item:any)=>{
        var obj={
            itemCode:item.skuCode,
            imageUrl:require('.' + item.wareImageUrl).default,
            name:item.spuWareName,
            integralValue:item.oriIntegralValue
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
                <img src={head} alt="" />
                <div className="hd_tiao">
                    <Anchor onClick={handle} affix={false}>
                        <Link href="#nno" title={<div className="tab_title"><p className="tab_title_active">990封顶</p></div>}></Link>
                        <Link href="#onno" title={<div className="tab_title"><p>1990封顶</p></div>}></Link>
                        <Link href="#tnno" title={<div className="tab_title"><p>2990封顶</p></div>}></Link>
                    </Anchor>
                </div>
            </div>
            {/* 990封顶 */}
            <div className="hd_nno mynno">
                <div id="nno" className="hd_title">990封顶</div>
                <ul>
                    {
                        huoNno.map((item: any) => {
                            return <li key={item.skuCode}>
                                <img src={require('.' + item.wareImageUrl).default} alt="" />
                                <p>{item.spuWareName}</p>
                                <div className='jifen'>{item.oriIntegralValue}<span>积分</span></div>
                                <button className="hd_btn" onClick={(e)=>{addDuiGou(e,item)}}>立即兑换</button>
                            </li>
                        })
                    }
                </ul>
            </div>
            {/* 1990封顶 */}
            <div className="hd_nno mynno">
                <div id="onno" className="hd_title">1990封顶</div>
                <ul>
                    {
                        huoOnno.map((item: any) => {
                            return <li key={item.skuCode}>
                                <img src={require('.' + item.wareImageUrl).default} alt="" />
                                <p>{item.spuWareName}</p>
                                <div className='jifen'>{item.oriIntegralValue}<span>积分</span></div>
                                <button className="hd_btn" onClick={(e)=>{addDuiGou(e,item)}}>立即兑换</button>
                            </li>
                        })
                    }
                </ul>
            </div>
            {/* 2990封顶 */}
            <div className="hd_nno mynno">
                <div id="tnno" className="hd_title">2990封顶</div>
                <ul>
                    {
                        huoTnno.map((item: any) => {
                            return <li key={item.skuCode}>
                                <img src={require('.' + item.wareImageUrl).default} alt="" />
                                <p>{item.spuWareName}</p>
                                <div className='jifen'>{item.oriIntegralValue}<span>积分</span></div>
                                <button className="hd_btn" onClick={(e)=>{addDuiGou(e,item)}}>立即兑换</button>
                            </li>
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default Huodong;