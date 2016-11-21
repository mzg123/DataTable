require('babel-polyfill');


import Point from './point.js';
var body = document.querySelector('body');
let result=909;
let array1=[1,2,3,4,5,6,7,8,9];
var d=909;
var uni=new Set(array1);
console.log(uni);
for(var item of uni){
    console.log(item);
}
body.textContent = 'Good point: ' + new Point(1, 23)+result;
