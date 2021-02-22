import React, { useReducer } from 'react'
import './App.scss';
import { HashRouter } from 'react-router-dom'
import RouterMap from './router'
import ToggleNav from './components/toggle'
import ToggleFooter from './components/toggleFooter'
//使用context来包裹组件，为所有子孙组件暴露共享值
import MyContext from './context'
import reducer from './reducer'

let productlist: any = {
  myShou:[]
}

const App: React.FC = (props) => {
  let [products, dispatch] = useReducer(reducer, productlist)
  return (
    <MyContext.Provider value={[products = productlist, dispatch]}>
      <HashRouter>
        <ToggleNav></ToggleNav>
        <RouterMap></RouterMap>
        <ToggleFooter></ToggleFooter>
      </HashRouter>
    </MyContext.Provider>
  )
}

export default App;
{/* <Header></Header>
    <MySearch></MySearch> */}
/**
  proId:'1',
  proName:'消食片',
  proCount:1,
  proPrice:8900,
  isXuan:false,
  proImg:"https://jf-asset2.10086.cn/pic/ware/202012/5fe45b1d928df22e3f1bfcdd.jpg"
 */