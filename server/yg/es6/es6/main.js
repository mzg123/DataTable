require('babel-polyfill');
require('babel-plugin-transform-es3-member-expression-literals');
    require('babel-plugin-transform-es3-property-literals');

import React from'react';
import ReactDOM from'react-dom';

var Content=React.createClass({
    render:function(){
        return(
            <div id="content">
                <textarea value="3333333333">
                </textarea>
            </div>
        );
    }
})

ReactDOM.render(
    <Content></Content>,
    document.getElementById("react")
);

//class
import Point from './point.js';
var body = document.querySelector('body');
let result=909;
let array1=[1,2,3,4,5,6,7,8,9,19];
var d=909;
//类扩展
class basec {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    toString() {
        return `(${this.x}, ${this.y})`;
    }
}
class Programmer extends basec{
    constructor(x,y){
        super(x,y);
    }
    text(){
        return `123456`;
    }
}
//console.log(new Programmer(5,9).text() )
//箭头函数
//array1.forEach(v =>console.log(v));
//set
var uni=new Set(array1);
//console.log(uni);
for(var item of uni){
   // console.log(item);
}
//body.textContent = 'Good point: ' + new Point(1, 23)+result;

console.log(3399999999999);
console.log(body.textContent);
//function *foo() {
//    try {
//        var x = yield 3;
//        console.log( "x: " + x ); // may never get here!
//    }
//    catch (err) {
//        console.log( "Error: " + err );
//    }
//}

//生成器
function *foo() {
    yield 3;
    yield 4;
}

function *bar() {
    yield 1;
    yield 2;
    yield *foo(); // `yield *` delegates iteration control to `foo()`
    yield 5;
}

for (var v of bar()) {
   //console.log( v );
}


//增强字面量
var human = {
    breathe() {
        console.log('breathing...');
    }
};
var worker = {
    __proto__: human, //设置此对象的原型为human,相当于继承human
    company: 'freelancer',
    work() {
        console.log('working...');
    }
};
human.breathe();//输出 ‘breathing...’
//调用继承来的breathe方法
//worker.breathe();//输出 ‘breathing...’

////////////////////////字符串模板
var num=Math.random();
//将这个数字输出到console
console.log(`your num is ${num}`);

//////////////////////解构
var [x,y]=getVal(),//函数返回值的解构
    [name,,age]=['wayou','male','secrect'];//数组解构

function getVal() {
    return [ 1, 2 ];
}

console.log('x:'+x+', y:'+y);//输出：x:1, y:2
console.log('name:'+name+', age:'+age);//输出： name:wayou, age:secrect

/////////////参数默认值，
function sayHello(name){
    //传统的指定默认参数的方式
    var name=name||'dude';
    console.log('Hello '+name);
}
//运用ES6的默认参数
function sayHello2(name='dude'){
    console.log(`Hello ${name}`);
}
sayHello();//输出：Hello dude
sayHello('Wayou');//输出：Hello Wayou
sayHello2();//输出：Hello dude
sayHello2('Wayou');//输出：Hello Wayou

//////////////////////不定参数，
function add(...x){
    return x.reduce((m,n)=>m+n);
}
//传递任意个数的参数
console.log(add(1,2,3));//输出：6
console.log(add(1,2,3,4,5));//输出：15


//////////////////拓展参数
var people=['Wayou','John','Sherlock'];
//sayHello函数本来接收三个单独的参数人妖，人二和人三
function sayHello(people1,people2,people3){
    console.log(`Hello ${people1},${people2},${people3}`);
}
//但是我们将一个数组以拓展参数的形式传递，它能很好地映射到每个单独的参数
sayHello(...people);//输出：Hello Wayou,John,Sherlock

//而在以前，如果需要传递数组当参数，我们需要使用函数的apply方法
sayHello.apply(null,people);//输出：Hello Wayou,John,Sherlock


// Sets
var s = new Set();
s.add("hello").add("goodbye").add("hello");
s.size === 2;
s.has("hello") === true;

// Maps
var m = new Map();
m.set("hello", 42);
m.set(s, 34);
m.get(s) == 34;

console.log(s,m);

//////////Symbols
var key = Symbol("key");
function MyClass(privateData) {
    this[key] = privateData;
}
var c = new MyClass("hello")
c[key] =="33344444";//无法访问该属性，因为是私有的
console.log(c[key]);

///////////////////Math，Number，String，Object 的新API
Number.EPSILON
Number.isInteger(Infinity) // false
Number.isNaN("NaN") // false

Math.acosh(3) // 1.762747174039086
Math.hypot(3, 4) // 5
Math.imul(Math.pow(2, 32) - 1, Math.pow(2, 32) - 2) // 2

//"abcde".contains("cd") // true
//"abc".repeat(3) // "abcabcabc"

//Array.from(document.querySelectorAll('*')) // Returns a real Array
//Array.of(1, 2, 3) // Similar to new Array(...), but without special one-arg behavior
//    [0, 0, 0].fill(7, 1) // [0,7,7]
//    [1,2,3].findIndex(x => x == 2) // 1
//    ["a", "b", "c"].entries() // iterator [0, "a"], [1,"b"], [2,"c"]
//    ["a", "b", "c"].keys() // iterator 0, 1, 2
//    ["a", "b", "c"].values() // iterator "a", "b", "c"
//
//Object.assign(Point, { origin: new Point(0,0) })
//


//////////////////////  Promise
//创建promise
var promise = new Promise(function(resolve, reject) {
    // 进行一些异步或耗时操作
    console.log(111111111111111);
    if ( true ) {
        resolve("Stuff worked!");
    } else {
        reject(Error("It broke"));
    }
});
//绑定处理程序
promise.then(function(result) {
    //promise成功的话会执行这里
    console.log(result); // "Stuff worked!"
}, function(err) {
    //promise失败会执行这里
    console.log(err); // Error: "It broke"
}).then(function(result) {
    //promise成功的话会执行这里
    console.log(result); // "Stuff worked!"
}, function(err) {
    //promise失败会执行这里
    console.log(-2222222); // Error: "It broke"
});
