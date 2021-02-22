import React, { useEffect, useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
// 实现Nav的切换，获取url中的地址，'/'  '/user', '/login'时使用Nav,其他使用Nav2

import MySearch from '../Search/Search'
import Header from '../Header/Header'
const ToggleNav: React.FC<RouteComponentProps<any>> = (props) => {
    let [navType, setNavType] = useState('');

    // 每当路由地址发生改变，就执行useEffect
    useEffect(() => {
        // 切换不同类型
        console.log(props.history.location.pathname);
        let rootRouter = ['/login'];
        const path = props.history.location.pathname
        if (rootRouter.includes(path)) {
            setNavType('login')
        }
        return () => {
            setNavType('')
        }
    }, [props.history.location.pathname])
    return (
        <React.Fragment>
            {navType === 'login' ? '' : <Header></Header>}
            {navType === 'login' ? '' : <MySearch></MySearch>}
        </React.Fragment>
    )
}
export default withRouter(ToggleNav)