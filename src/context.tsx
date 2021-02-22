import React, { createContext, Dispatch } from 'react'


//暴露值的类型，共享数据的类型,第一个是共享值，第二个是dispatch函数(value={}暴露值)
//action：一个对象，是 reducers的触发器，通过dispatch来触发，action对象需要有type字段
type ContextType = [
    any,
    Dispatch<{}>
]


const context = createContext<ContextType>([ ,()=>{}])

export default context