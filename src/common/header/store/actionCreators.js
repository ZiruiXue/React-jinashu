import * as constants from './constants';
import axios from 'axios';
import { fromJS } from 'immutable';


export const searchFocus = () => ({
    type: constants.SEARCH_FOCUS
});

export const searchBlur = () => ({
    type: constants.SEARCH_BLUR
});

export const mouseEnter = () => ({
    type: constants.MOUSE_ENTER
});

export const mouseLeave = () => ({
    type: constants.MOUSE_LEAVE
});

export const changePage = (page) => ({
    type: constants.CHANGE_PAGE,
    page
})

// 用了redux-thunk可以返回一个函数
// 做一个假数据
export const getList = () => {
    return (dispatch) => {
        axios.get('/api/headerList.json').then((res)=>{
            const data = res.data;
            dispatch(changeList(data.data));
        }).catch(() =>{
            console.log('failed')
        })
    }  
};


// 我们将data先变成immutable类型,不需要导出
const changeList = (data) => ({
    type:  constants.CHANGE_LIST,
    data: fromJS(data),
    totalPage: Math.ceil(data.length/10)
});





