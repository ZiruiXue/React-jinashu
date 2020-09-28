import * as constants from './constants';
import { fromJS } from 'immutable';

// 定义聚焦状态,初始状态下，false，NavSearch的class为空
const defaultState = fromJS ({
    focused: false,
    mouseIn: false,
    list: [],
    page: 1,
    totalPage: 1
});

// immutable对象的set方法，会结合之前immutable对象的值和设置的值，返回一个全新的对象
export default (state = defaultState, action) => {
    switch(action.type){
        case constants.SEARCH_FOCUS:
            return state.set('focused',true);
        case constants.SEARCH_BLUR:
            return state.set('focused',false);  
        case constants.CHANGE_LIST: 
            // 以为用了fromJS，state中的list也成为一个immutable对象
            // 但是调用state.set，list会变成一个普通的数据，会出错
            return state.merge({
                list: action.data,
                totalPage: action.totalPage
            })
        case constants.MOUSE_ENTER:
            return state.set('mouseIn',true);
        case constants.MOUSE_LEAVE:
            return state.set('mouseIn',false);
        case constants.CHANGE_PAGE:
            return state.set('page',action.page);
        default:
            return state;  
    }
}





