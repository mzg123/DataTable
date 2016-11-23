require('babel-polyfill');


import Point from './point.js';
var body = document.querySelector('body');
let result=909;
let array1=[1,2,3,4,5,6,7,8,9];
var d=909;
var uni=new Set(array1);
console.log(uni);
for(var item of uni){
   // console.log(item);
}
body.textContent = 'Good point: ' + new Point(1, 23)+result;


//function *foo() {
//    try {
//        var x = yield 3;
//        console.log( "x: " + x ); // may never get here!
//    }
//    catch (err) {
//        console.log( "Error: " + err );
//    }
//}


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
    console.log( v );
}