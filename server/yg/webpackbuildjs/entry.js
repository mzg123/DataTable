var text=require('./text.js');

function readPage(){
    alert("Hello");
}
console.log(document.getElementsByTagName("mzg"));
//
window.onload = function () {
    document.getElementById('mzg').onclick=text;

};