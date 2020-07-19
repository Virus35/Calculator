// returns calculated value based on the operator passed as the argument
const operate = (value1, operation, value2) => {
    switch(operation){
        case '+': return value1 + value2;
        break;
        case '-': return value1 - value2;
        break;
        case '*': return value1 - value2;
        break;
        case '/': return value1 / value2;
        break;
    }
};

// gets integer value from given key element tag
const getNumberFromKey = (key) => {
    switch(key){
        case key1: return 1;
        break;
        case key2: return 2;
        break;
        case key3: return 3;
        break;
        case key4: return 4;
        break;
        case key5: return 5;
        break;
        case key6: return 6;
        break;
        case key7: return 7;
        break;
        case key8: return 8;
        break;
        case key9: return 9;
        break;
        case key0: return 0;
        break;
        case keydecimal: return '.';
        break;
    }
};

// logs all keypresses inside the inputArray and takes action when an operation key is pressed
const keyPress = (key) => {
    if(numericalCharacters.includes(key)){
        if(key === keydecimal && tempInputValue.includes('.')){
            return;
        }
        tempInputValue.push(getNumberFromKey(key));
    }
    else if(operationCharacters.includes(key)){
        if(tempInputValue.includes('.')){   // finalizes the value being typed(including decimal) and stores it in inputArray when non-number key is pressed
            let decimalIndex = tempInputValue.indexOf('.');
            let floatNumber = tempInputValue.reduce((acc, cur, curIndex) => {
                if(curIndex < decimalIndex){
                    acc += cur*Math.pow(10, decimalIndex-curIndex-1);
                    console.log(acc, decimalIndex-curIndex-1);
                    return acc;
                }
                else if(curIndex === decimalIndex){
                    return acc;
                }
                else{
                    acc += cur*Math.pow(10, decimalIndex-curIndex);
                    console.log(acc, decimalIndex-curIndex);
                    return acc;
                }
            }, 0);
            inputArray.push(floatNumber.toPrecision(tempInputValue.length-1)); // Reduces FLOATING POINT ERROR
        }
        else{   // finalizes the value being typed and stores it in inputArray when non-number key is pressed
            inputArray.push(tempInputValue.reduce((acc, cur, curIndex) => acc += cur*Math.pow(10, tempInputValue.length-curIndex-1), 0));
        }
        console.log(inputArray);
        tempInputValue.splice(0, tempInputValue.length);
    }
    else if(key === backspacekey){
        tempInputValue.pop();
    }
    else if(key === clearKey){
        tempInputValue.splice(0, tempInputValue.length);
        inputArray.splice(0, inputArray.length);
    }
    console.log(tempInputValue);
    key.classList.add('pressed');
};

const key1 = document.getElementById('cssKey1');
const key2 = document.getElementById('cssKey2');
const key3 = document.getElementById('cssKey3');
const key4 = document.getElementById('cssKey4');
const key5 = document.getElementById('cssKey5');
const key6 = document.getElementById('cssKey6');
const key7 = document.getElementById('cssKey7');
const key8 = document.getElementById('cssKey8');
const key9 = document.getElementById('cssKey9');
const key0 = document.getElementById('cssKey0');
const keydecimal = document.getElementById('cssDecimal');
const keyadd = document.getElementById('cssAdd');
const keysub = document.getElementById('cssSubtract');
const keymul = document.getElementById('cssMultiply');
const keydiv = document.getElementById('cssDivide');
const keyequal = document.getElementById('cssEqual');
const clearKey = document.getElementById('cssClear');
const backspacekey = document.getElementById('cssErase');
const keys = document.querySelectorAll('.calcBtn');
const displayInput = document.getElementById('cssDisplayInput');
const displayAnswer = document.getElementById('cssDisplayAnswer');
let numericalCharacters = [key1, key2, key3, key3, key4, key5, key6, key7, key8, key9, key0, keydecimal];
let operationCharacters = [keyadd, keysub, keymul, keydiv, keyequal];
let inputArray = []; // holds all keys pressed
let tempInputValue = []; // holds all the numbers untill an operation key is pressed and then pushes the final number to inputArray
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