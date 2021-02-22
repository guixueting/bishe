import React, { useContext, useEffect, useState } from 'react'
import './shoucang.scss'
//接收暴露的数据
import MyContext from '../../context'
import { fetchget, fetchpost } from '../../utils/zgfetch'
const ShouCang: React.FC = () => {
    // const [products, dispatch] = useContext(MyContext)
    // const add = () => {
    //     dispatch({
    //         type: "ADDSHOU",
    //         info:{}
    //     })
    // }
    let [shoucang, setShoucang] = useState<any>([])
    const getShouCang = async () => {
        var result = await fetchget('/api/getShouCang');
        setShoucang(result)
    }
    useEffect(() => {
        getShouCang()
        return () => {
            setShoucang = () => { }
        }
    }, [shoucang])

    const deleteShou = async (e: any, id: any) => {
        await fetchget('/api/deleShou?id=' + id)
    }
    //购物车
    const addYaoCart = async (e: any, item: any) => {
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
        <div className="shoucang">

            <p className="my-cart">我的收藏</p>
            <table>
                <thead>
                    <tr>
                        <td>商品图片</td>
                        <td>商品名称</td>
                        <td>商品数量</td>
                        <td>积分</td>
                        <td>操作</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        shoucang && shoucang.map((item: any) => {
                            return <tr className="t" key={item.id}>
                                <td><img src={item.img_url} alt="" width="160" height="140" /></td>
                                <td className="name"><span title={item.name}>{item.name}</span></td>
                                <td>一件</td>
                                <td><span className="qian">{item.jifen}</span><span className="jf">积分</span></td>
                                <td className="de">
                                    <div className="delet" onClick={(e) => { deleteShou(e, item.id) }}>
                                        <i className="fa fa-trash-o" aria-hidden="true"></i>
                                        <p>删除</p>
                                    </div>
                                    <div className="addcart"  onClick={(e)=>{addYaoCart(e,item)}}>
                                        <i className="fa fa-shopping-cart"></i>
                                        <p>加购物车</p>
                                    </div>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
            <div className={shoucang.length == 0 ? 'xianshi' : 'nooo'}>
                <p>看到需要的药品，点击【加入收藏】，在这里保存起来吧！</p>
            </div>
        </div>

    )
}

export default ShouCang;