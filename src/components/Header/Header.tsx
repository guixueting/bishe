import React, { useEffect, useState } from 'react'
import './header.scss'
import { Menu, Dropdown, Button } from 'antd';
import { Link } from 'react-router-dom';
import { fetchget } from '../../utils/zgfetch'
const menu: any = (
    <Menu>
        <Menu.Item>
           <Link to="/myjifen">
                我的积分
           </Link>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="#">
                我的优惠劵
        </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="#">
                帮助中心
        </a>
        </Menu.Item>
    </Menu>
);

const Header: React.FC = () => {
    let [user, setUser] = useState<any>(false)
    const getUser = async () => {
        var {user:result} = await fetchget('/api/session');
        console.log(result, "xxxxxxxxxx")
        if(result && result.name && result.password){
            setUser(true)
        }else{
            setUser(false)
        }
        
        // console.log(result, "xxxxxxxxxx")
    }
    useEffect(() => {
        getUser()
    }, [])
    return (
        <div className="h_title">
            <div className="h_center">
                <div className="h_left">
                    <span>您好，欢迎访问仁心药业积分商城</span>
                    <Link to="/login" className="h_login">{user? '已登录' : '请登录'}</Link>
                    <a href="/api/layout" className="h_login">退出登录</a>
                </div>
                <div className="h_right">
                    <ul>
                        <li><Link to={user?'/shoucang':'/login'}><i className="fa fa-star-o" aria-hidden="true"></i> 我的收藏<span>|</span></Link></li>
                        <li><Link to={user?'/yaoCart':'/login'}><i className="fa fa-file-text-o" aria-hidden="true"></i> 需求清单<span>|</span></Link></li>
                        <li>
                            <Dropdown overlay={menu} placement="bottomCenter">
                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    我的仁心 <i className="fa fa-angle-down" aria-hidden="true"></i>
                                </a>
                            </Dropdown><span>|</span></li>
                        <li>帮助中心</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header;