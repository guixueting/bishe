import React, { useEffect, useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
// 实现Nav的切换，获取url中的地址，'/'  '/user', '/login'时使用Nav,其他使用Nav2

import Footer from '../Footer/Footer'

const ToggleFooter: React.FC<RouteComponentProps> = (props) => {
    let [navType, setNavType] = useState('');
    // 每当路由地址发生改变，就执行useEffect
    useEffect(() => {
        // 切换不同类型
        let rootRouter = ['/login'];
        const path = props.history.location.pathname
        if (rootRouter.includes(path)) {
            setNavType('login')
        }
        // useEffect中返回的函数是一个(清除函数)，相当于componentWillUnmount(卸载)
        // 每次修改location会重新渲染页面，会卸载之前的页面，所有会执行return中的函数
        return ()=>{
            setNavType('')
        }
    }, [props.history.location.pathname])
    return (
        <React.Fragment>
            {navType == 'login' ? '' : <Footer></Footer>}
        </React.Fragment>
    )
}
export default withRouter(ToggleFooter)