const add = (a, b) => a+b;
const subtract = (a, b) => a-b;
const multiply = (a, b) => a*b;
const divide = (a, b) => a/b;
const keyPress = (key) => {
    inputArray.push(key.textContent);
    console.log(inputArray);
    key.classList.add('pressed');
}

const keys = document.querySelectorAll('.calcBtn');
const displayInput = document.getElementById('cssDisplayInput');
const displayAnswer = document.getElementById('cssDisplayAnswer');
let inputArray = [];
window.addEventListener('keydown', (e) => {
    const key = document.querySelector(`.calcBtn[data-key1='${e.keyCode}']`) || document.querySelector(`.calcBtn[data-key2='${e.keyCode}']`);
    if(!key){
        return;
    }
    keyPress(key);
});
keys.forEach((key) => {
    key.addEventListener('mousedown', (e) => keyPress(e.target));
});
keys.forEach((key) => {
    key.addEventListener('transitionend', (e) => {
        e.target.classList.remove('pressed');
    });
});