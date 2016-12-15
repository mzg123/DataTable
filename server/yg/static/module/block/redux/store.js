//import {combineReducers,createStore} from "redux";
var redux=require("redux");
var combineReducers=redux.combineReducers,createStore=redux.createStore;
/**
 * 这是一个 reducer，形式为 (state, action) => state 的纯函数。
 * 描述了 action 如何把 state 转变成下一个 state。
 *
 * state 的形式取决于你，可以是基本类型、数组、对象、
 * 甚至是 Immutable.js 生成的数据结构。惟一的要点是
 * 当 state 变化时需要返回全新的对象，而不是修改传入的参数。
 *
 * 下面例子使用 `switch` 语句和字符串来做判断，但你可以写帮助类(helper)
 * 根据不同的约定（如方法映射）来判断，只要适用你的项目即可。
 */

function counter(state,action) {
    state||(state={mzg:"mzg"});
    switch (action.type) {
        case 'INCREMENT':
            return state;
        case 'DECREMENT':
            return state;
        default:
            return state;
    }
}
function todoApp(state , action) {
    state||(state={mzg:"mzg",cc1:4});
    //if (typeof state === 'undefined') {
    //    return 0
    //}
    switch (action.type) {
        case 1:
            //return Object.assign({}, state, {
            //    visibilityFilter: action.filter
            //}) $.extend({},state,{cc1:Math.random()})
            state.cc1=Math.random();
            //return state;
          var d=$.extend({},state);
            return d;
        case 2:
            //return Object.assign({}, state, {
            //    todos: [
            //        state.todos,
            //        {
            //            text: action.text,
            //            completed: false
            //        }
            //    ]
            //})
            state.cc1=Math.random();
            return  state;
        default:
            state.cc1=Math.random();
            return  state;
    }
}
// 创建 Redux store 来存放应用的状态。
// API 是 { subscribe, dispatch, getState }。
var reducer = combineReducers({counter,todoApp });
var store = createStore(todoApp);

// 可以手动订阅更新，也可以事件绑定到视图层。
//store.subscribe(function(comptent){
//
//        var newState = store.getState();
//        comptent.setState({
//            items: store.getState()
//        });
//    }
//
//);
store.sub=function(fn){
    store.subscribe(fn);
}
// 改变内部 state 惟一方法是 dispatch 一个 action。
// action 可以被序列化，用日记记录和储存下来，后期还可以以回放的方式执行
// store.dispatch({ type: 'INCREMENT' });
 //store.dispatch({ type: 1 });
//// 1
//store.dispatch({ type: 'INCREMENT' });
//// 2
//store.dispatch({ type: 'DECREMENT' });
// 1
module.exports =store;
