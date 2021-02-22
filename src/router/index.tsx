import React from 'react'
import { Switch, Route, withRouter, Redirect, BrowserRouter } from 'react-router-dom'

import Home from '../pages/home'
import Shop from '../pages/shop'
import Login from '../pages/login'
import Detail from '../pages/detail'
import Miaosha from '../pages/miaosha'
import Huodong from '../pages/huodong'
import Fenlei from '../pages/fenlei'
import ShouCang from '../pages/shoucang'
import YaoCart from '../pages/yaoCart'
import Myjifen from '../pages/myjifen'
import DuiCart from '../pages/duiCart'
import Daohang from '../pages/daohang'
import Sousuo from '../pages/sousuo'
import Paihang from '../pages/paihang'
import Baokuan from '../pages/baokuan'

const RouterMap: React.FC = () => {
    return <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/shop" component={Shop}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/detail/:skuWareCode" component={Detail}></Route>
        <Route path="/miaosha" component={Miaosha}></Route>
        <Route path="/huodong" component={Huodong}></Route>
        <Route path="/fenlei/:start/:end" component={Fenlei}></Route>
        <Route path="/daohang" component={Daohang}></Route>
        <Route path="/sousuo" component={Sousuo}></Route>
        <Route path="/shoucang" component={ShouCang}></Route>
        <Route path="/yaoCart" component={YaoCart}></Route>
        <Route path="/myjifen" component={Myjifen}></Route>
        <Route path="/duicart" component={DuiCart}></Route>
        <Route path="/paihang" component={Paihang}></Route>
        <Route path="/baokuan" component={Baokuan}></Route>
        <Redirect to="/"></Redirect>
    </Switch >

}

export default withRouter(RouterMap);