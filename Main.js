// Returns calculated value based on the operator passed as the argument
const operate = (value1, operation, value2) => {
    if(operation === '/' && value2 === 0) {
        alert('Hmmm, I see you are trying to divide by zero. Are you that dumb?');
        tempInputValue.splice(0, tempInputValue.length);
        inputArray.splice(0, inputArray.length);
        return;
    }
    switch(operation){
        case '+': return value1 + value2;
        break;
        case '-': return value1 - value2;
        break;
        case '*': return value1 * value2;
        break;
        case '/': return value1 / value2;
        break;
    }
};

// Gets integer value from given key element tag
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

// Logs all keypresses inside the inputArray and takes action when an operation key is pressed
const keyPress = (key) => {
    if(numericalCharacters.includes(key)){
        // makes sure there are no multiple decimal present in the number
        if(key === keydecimal && tempInputValue.includes('.')){
            return;
        }
        tempInputValue.push(getNumberFromKey(key));
    }
    else if(operationCharacters.includes(key)){
        // Finalizes the value being typed(including decimal) and stores it in inputArray when non-number key is pressed
        if(tempInputValue.includes('.')){
            let decimalIndex = tempInputValue.indexOf('.');
            let floatNumber = tempInputValue.reduce((acc, cur, curIndex) => {
                if(curIndex < decimalIndex){
                    acc += cur*Math.pow(10, decimalIndex-curIndex-1);
                    return acc;
                }
                else if(curIndex === decimalIndex){
                    return acc;
                }
                else{
                    acc += cur*Math.pow(10, decimalIndex-curIndex);
                    return acc;
                }
            }, 0);
            // Reduces FLOATING POINT ERROR
            inputArray.push(Number.parseFloat(floatNumber.toPrecision(tempInputValue.length-1)));
        }
        // Finalizes the value being typed and stores it in inputArray when non-number key is pressed
        else{
            inputArray.push(tempInputValue.reduce((acc, cur, curIndex) => acc += cur*Math.pow(10, tempInputValue.length-curIndex-1), 0));
        }
        tempInputValue.splice(0, tempInputValue.length);
        switch(key){
            case keyadd: inputArray.push('+');
            break;
            case keysub: inputArray.push('-');
            break;
            case keymul: inputArray.push('*');
            break;
            case keydiv: inputArray.push('/');
            break;
            case keyequal: finalize();
            break;
        }
    }
    else if(key === backspacekey){
        tempInputValue.pop();
    }
    else if(key === clearKey){
        tempInputValue.splice(0, tempInputValue.length);
        inputArray.splice(0, inputArray.length);
    }
    displayInput.textContent = inputArray.join(' ');
    displayAnswer.textContent = tempInputValue.join('');
    key.classList.add('pressed');
};

// Evaluates the expression inside inputArray and returns it
const finalize = () => {
    // Non PEMDAS approach
    // while(inputArray.length !== 1) {
    //     inputArray.splice(0, 3, operate(inputArray[0], inputArray[1], inputArray[2]));
    // }
    // PEMDAS approach
    PEMDAS.forEach((PEMDASCurrentSet) => {
        for(let i = 0; i < inputArray.length; i++) {
            if(PEMDASCurrentSet.includes(inputArray[i])) {
                inputArray.splice(i-1, 3, operate(inputArray[i-1], inputArray[i], inputArray[i+1]));
                i--;
            }
        }
    });
    tempInputValue.push(inputArray.pop());
}

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
const PEMDAS = [['*', '/'], ['+', '-']];
// Holds all keys pressed
let inputArray = [];
// Holds all the numbers untill an operation key is pressed and then pushes the final number to inputArray
let tempInputValue = [];
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
