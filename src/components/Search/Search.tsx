import React, { useEffect, useState } from 'react'
import './search.scss'
import logo from '../Search/images/logo.jpg'
import { Input, Badge } from 'antd';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { fetchget } from '../../utils/zgfetch';
const { Search } = Input;

const MySearch: React.FC<RouteComponentProps<any>> = (props) => {
    let onsearch = (value: any) => {
        console.log(value,"777777777777777777777777");
        props.history.push('/sousuo?keywords='+value)
        
    }
    // 3.总共多少件商品
    let [user, setUser] = useState<any>(false)
    let [sum_count, setSumCount] = useState<any>()
    const getDuiSumCount = async () => {
        var result = await fetchget("/api/getDuiSumCount")
        console.log(result[0], "sum");
        var obj=[...result]
        setSumCount(obj[0].sum_count)
    }
    const getUser = async () => {
        var { user: result } = await fetchget('/api/session');
        console.log(result, "xxxxxxxxxx")
        if (result && result.name && result.password) {
            setUser(true)
        } else {
            setUser(false)
        }
    }
    useEffect(() => {
        getDuiSumCount()
        getUser()
        return ()=>{
            setUser=()=>{}
            setSumCount=()=>{}
        }
    }, [sum_count])
    return (
        <div className='s_search'>
            {console.log(sum_count,"ssss")}
            <div className="s_center">
                <div className="sc_top">
                    <div className="sc_logo">
                        <Link to='/'><img src={logo} /></Link>
                    </div>
                    <div className="sc_input">
                        <Search placeholder="请输入..." onSearch={onsearch} enterButton />
                        <div className="sc_hot">
                            <span>热门搜索 : </span>
                            <ul>
                                <li><a href="#">三七</a></li>
                                <li><a href="#">隐形眼镜</a></li>
                                <li><a href="#">保温杯</a></li>
                                <li><a href="#">锅</a></li>
                                <li><a href="#">纸巾</a></li>
                                <li><a href="#">感冒药</a></li>
                                <li><a href="#">保健品</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="sc_car">
                        <div><Link to={user?'/duicart':'/login'}>我的购物车 <i className="fa fa-shopping-cart" aria-hidden="true"></i></Link>
                            <Badge count={sum_count} showZero>
                                <a href="#" className="head-example" />
                            </Badge>
                        </div>
                    </div>
                </div>
                <div className="sc_bottom">
                    <div><i className="fa fa-list-ul" aria-hidden="true"></i> 全部商品分类</div>
                    <ul>
                        <li><Link to="/">首页</Link></li>
                        <li><Link to="/shop">积分商城</Link></li>
                        <li><Link to="/miaosha">秒杀专区</Link></li>
                        <li><Link to="/huodong">990包邮</Link></li>
                        <li><Link to="/myjifen">我的积分</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default withRouter(MySearch);