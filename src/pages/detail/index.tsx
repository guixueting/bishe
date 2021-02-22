import React, { useEffect, useState } from 'react'
import './detail.scss'
import { Link, RouteComponentProps } from 'react-router-dom'
import { fetchget, fetchpost } from '../../utils/zgfetch'
import { Input } from 'antd';

const Detail: React.FC<RouteComponentProps<any>> = (props) => {
    let skuWareCode = props.match.params.skuWareCode; 
    let [proDetail, setProDetail] = useState<any>({})
    let [detImg, setDetImg] = useState<any>([])
    let [selectIndex, setIndex] = useState<any>(0)
    // 同类推荐
    let [classPro, setClassPro] = useState<any>([])
    let [richData, setRichData] = useState<any>()
    /**------------------------------发请求，拿数据-------------------------*/
    const getProDetail = async () => {
        var { resultJson: result } = await fetchpost('https://jf.10086.cn/cmcc-web-shop/ware/detailPage', { skuWareCode: skuWareCode })
        setProDetail(result)
        setDetImg(result.imgUrl);
        console.log(result.imgUrl, "wwwwwwwwwwww");
    }
    // 同类推荐(result1.resultCode==200建数据库时，记得写)
    const getClassList = async () => {
        var { resultJson: result1 } = await fetchpost('https://jf.10086.cn/cmcc-web-shop/ware/getRecommendationByCategory', { 'spuWareCode': `${proDetail.spuWareCode}`, 'smallKindCode': `${proDetail.wareSmallKindCode}` });
        setClassPro(result1)
        console.log(result1);
    }
    // 富文本
    const getRich = async () => {
        var { resultJson: result2 } = await fetchpost('https://jf.10086.cn/cmcc-web-shop/ware/blobContent', { skuWareCode: skuWareCode })
        var { blobContent: result3 } = result2;
        setRichData(result3)
        // console.log(result3, "rich---------------------");
    }
    useEffect(() => {
        getProDetail()
        getRich()
    }, [props.history.location.pathname])
    useEffect(() => {
        getClassList()
    }, [proDetail])
  
    /**-------------------------------------------------------------------- */
    const selectimg = (e: any) => {
        // console.log(e.target.id);
        setIndex(e.target.id)
    }

    const changeValue = () => {

    }
    const goDetail = (itemCode: any) => {
        console.log(itemCode, "fffffffffff");
        props.history.push({ pathname: `/detail/${itemCode}` }) // 要跳转的页面，其中id为参数

    }
    // 加入购物车
    const addDuiGou = async () => {
        console.log(proDetail, "pppppppp");
        var obj={
            itemCode:proDetail.skuWareCode,
            imageUrl:detImg[0],
            name:proDetail.wareName,
            integralValue:proDetail.oriIntegralValue
        }
        console.log(obj);
        var result = await fetchget('/api/getDuiGou');
        var currentGood = result.find((i: any) => {
            if (proDetail.skuWareCode == i.itemCode) {
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
        <div className="d_body">
            <div className="detail">
                {/* 导航 */}
                <div className="d_nav">
                    <Link to="/">首页</Link>
                    <span> &gt; {proDetail.wareBigKindName} </span>
                </div>
                {/* 详情 */}
                <div className="d_detail">
                    <div className="dd_left">
                        <div className="big_img">
                            <img src={detImg[selectIndex]} alt="" />
                        </div>
                        <div className="img_sel">
                            <ul>
                                {
                                    detImg.map((item: any, index: any) => {
                                        return <li key={index}>
                                            <div className={`${selectIndex == index ? 'selectImg' : ''}`}>
                                                <img src={item} id={index} onMouseOver={selectimg} alt="" />
                                            </div>

                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="dd_right">
                        {/* 头部 */}
                        <div className="ddr_tit">
                            <div className="tit_left">
                                <h3>{proDetail.wareName}</h3>
                                <h6>{proDetail.wareAlias}</h6>
                                <div className="tl_bianhao">
                                    <span>商品编号:{proDetail.skuWareCode}</span>
                                </div>
                            </div>
                            <div className="tit_right">
                                <div className="tr_brand">{proDetail.wareBrandName}</div>
                                <div className="tr_haopin">
                                    <div className="tr_rate">{proDetail.goodCommentRate}%</div>
                                    <div className="tr_ly">
                                        <div>累计评价 {proDetail.commentCount}</div>
                                        <div>月销 {proDetail.saleCountMonth}件</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* 价格 */}
                        <div className="ddr_price">
                            <div className="jiage">
                                <span className="jg">价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</span>
                                <div className="jg_det">
                                    <span>{proDetail.oriIntegralValue} </span>
                                    <span>积分</span>
                                </div>
                            </div>
                            <div className="zhifu">
                                <span className="jg">支付方式</span>
                                <div className="jg_det">
                                    <span className="quan" style={{ fontSize: '8px' }}>全积分</span>
                                </div>
                            </div>
                            <div className="import">
                                <span className="jg">重要提示</span>
                                <div>{proDetail.importantNotice ? `${proDetail.importantNotice}` : '产品如有质量问题或使用咨询，请联系我们'}</div>
                            </div>
                        </div>
                        <div className="ddr_cartNum">
                            <span className="jg">数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量</span>
                            <span className="i_span"><i className="iconfont icon-jian"></i></span>
                            <input onChange={changeValue} className="dc_input" autoComplete="off" value={1} />
                            <span className="i_span"><i className="iconfont icon-jia"></i></span>
                        </div>
                        <div className="ddr_cartBtn">
                            <button onClick={addDuiGou}>立即兑换</button>
                        </div>
                    </div>

                </div>
                {/* 同类推荐 */}
                <div className="d_class">
                    <div className="dc_title">
                        <p className="tui">同类推荐</p>
                        <ul>
                            {
                                classPro && classPro.sameKindRecWareList && classPro.sameKindRecWareList.map((item: any) => {
                                    return <li key={item.name} onClick={(itemCode) => { goDetail(item.itemCode) }}>
                                        {/* <Link to={`/detail/${item.itemCode}`}> */}
                                        <div className="dct_img">
                                            <img src={item.imageUrl} alt="" />
                                        </div>
                                        <p>
                                            <span>{item.integralValue} </span>
                                            <span>&nbsp;积分</span>
                                        </p>
                                        <p className="p_name">{item.name}</p>
                                        {/* </Link> */}
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                </div>
                {/* 商品详情 */}
                <div className="pro_detail">
                    {/* <div>
                        {richData}
                    </div> */}
                    <p className="tui">商品详情</p>
                    <div dangerouslySetInnerHTML={{ __html: richData }} className="rich"></div>
                </div>
            </div>
        </div>
    )
}

export default Detail