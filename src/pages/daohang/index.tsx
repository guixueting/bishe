import React, { useEffect, useState } from 'react'
import { fetchget, fetchpost } from '../../utils/zgfetch'
import { RouteComponentProps } from 'react-router-dom'
import { Pagination, Input } from 'antd';
import url from 'url'
import './daohang.scss'
const Daohang: React.FC<RouteComponentProps<any>> = (props) => {
    // 数据
    let [date, setDate] = useState<any>([])
    let [pageIndex, setPageIndex] = useState(1)
    // 总数据条数
    let [total, setTotal] = useState<any>()
    // 颜色选择
    let [seColor, setSeColor] = useState<any>('1')
    let [flag, setFlag] = useState<any>(false)
    // 搜索
    let [searchVal, setSearchVal] = useState<any>('')
    // 公共部分搜索
    /**
     * 搜索？传参
     */
    var httpUrl=props.location.search;
    var keywords=url.parse(httpUrl,true).query.name;
    console.log(keywords,"444444444444444444");
     /** */
    const getDate = async () => {
        var { resultJson: result } = await fetchpost('https://jf.10086.cn/cmcc-web-shop/search/query', { pageSize: 60, pageNum: pageIndex, sortType: 'DESC', sortColumn: 'saleCountMonth',kindName:`${keywords}`,kindList:`[{"kindName":'${keywords}',"kindLevel":"small"}]`})
        setDate(result.searchList)
        setTotal(result.searchResultCount)
        console.log(result.searchList,"dadadadadadda");
        
    }
    

    useEffect(() => {
  
        getDate()
         
        return () => {
            setSearchVal=()=>{}
            setDate=()=>{}
        }
       
    }, [pageIndex])
    const onChange = (pageNumber: any, pageSize: any) => {
        setPageIndex(pageNumber)
    }

    // 选择样式
    const selectColor1 = (e: any) => {
        setSeColor(e.target.id)
        // console.log(seColor);
        // 升序
        date.sort((item1: any, item2: any) => {
            return item2.commentAmount - item1.commentAmount
        })
    }
    const selectColor2 = (e: any) => {
        setSeColor(e.target.id)
        console.log(seColor);
        if (flag == false) {
            // 升序
            date.sort((item1: any, item2: any) => {
                return item1.integralValue - item2.integralValue
            })
            setFlag(true)
        }
        if (flag == true) {
            // 升序
            date.sort((item1: any, item2: any) => {
                return item2.integralValue - item1.integralValue
            })
            setFlag(false)
        }

    }
    // 搜索
    const getValue = (e: any) => {
        console.log(e.target.value, "xz");
        setSearchVal(e.target.value)
    }
    const searchName = () => {
        var ss = date.filter((item: any) => {
            if (item.name.indexOf(searchVal) != -1) {
                return true;
            }
        })
        setDate(ss)
    }
    // 加入秒杀购物车
    const addDuiGou = async (e: any, item: any) => {
        console.log(item, "pppppppp");
        var obj = {
            itemCode: item.itemCode,
            imageUrl: item.imageUrl,
            name: item.name,
            integralValue: item.integralValue
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
    return (<div className="fenlei">
        {/* <h1>这是导航</h1> */}
        <div className="fl_nav">
            <span>全部 &gt; </span>
            <span>{keywords}</span>
        </div>
        <div className="fl_sort">
            <div className="fls_sort">
                <span>排序方式:</span>
                <span id="1" onClick={(e) => { selectColor1(e) }} className={`${seColor == 1 ? 'sele_color' : ''}`}>销量</span>
                <span id="2" onClick={(e) => { selectColor2(e) }} className={`${(seColor == 2) ? 'sele_color' : ''}`}>积分值<i className="fa fa-sort" aria-hidden="true"></i></span>
            </div>
            <div className="fls_search">
                <div className="flss_dv"> <Input id="inp" value={searchVal} size="small" placeholder="请输入" onChange={getValue} prefix={<i className="fa fa-search"></i>} /></div>
                <button onClick={searchName}>确定</button>
            </div>
        </div>
        <div className="fl_product">
            <ul>
                {
                    date.map((item: any) => {
                        return <li key={item.itemCode}>

                            <div className="flp_img">
                                <img src={item.imageUrl} alt="" />
                            </div>
                            <div className="flp_jifen">
                                <span>{item.integralValue}</span>
                                <span>积分</span>
                            </div>
                            <div className="flp_name">
                                <span>
                                    {item.name}
                                </span>
                            </div>
                            <button className="hd_btn" onClick={(e) => { addDuiGou(e, item) }}>立即兑换</button>
                        </li>
                    })
                }
            </ul>
        </div>
        <Pagination showQuickJumper defaultCurrent={1} total={total} pageSize={60} onChange={onChange} />
    </div>)
}

export default Daohang