import React, { useReducer } from 'react'

const reducer = function (state: any, action: any) {
    console.log(state,"xxxxxccccc");//这是之前的数据源  
    switch (action.type) {
        case "ADDSHOU":
            state.myShou.push(action.info)
            console.log(state);
            //如果直接return newState;不能刷新页面
            //注意:在reducer中数据源改变之后是否刷新页面是看新state和原state的内存地址是否发生变化
            return {...state};
            break;
    }
}

export default reducer