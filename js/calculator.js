function add(num1, num2) {
    return num1 + num2;
}

function subract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(num1, num2, operator) {
    switch(operator) {
        case '+':
            return add(num1, num2);
            break;
        case '-':
            return subract(num1, num2);
            break;
        case '*':
            return multiply(num1, num2);
            break;
        case '%':
            return divide(num1, num2);
            break;
    }
}


let calcScreen = document.querySelector('.calc-screen');
let calcMiniScreen = document.querySelector('.calc-mini-screen');
let num1 = '';
let num2 = '';
let operator;

const clearAll = document.querySelector('.clear-all');
clearAll.addEventListener('click', () => {
    calcScreen.value = '';
    calcMiniScreen.value = '';
    num1 = 0;
    num2 = 0;
    operator = '';
});

let numKey = document.querySelectorAll('.num-key');
numKey.forEach( (key) => {
    key.addEventListener('click', () => {
        calcScreen.value += key.textContent;
    });
});

let operatorKey = document.querySelectorAll('.operator-key');
operatorKey.forEach( (key) => {
    key.addEventListener('click', () => {
        
        if(!(calcMiniScreen.value === '') && !(calcScreen.value === '')) {
            // num1 = num2;
            num2 = calcScreen.value;
            
            console.log(`${num1} ${operator} ${num2}`);
            let result = operate(parseInt(num1), parseInt(num2), operator);
            calcMiniScreen.value = `${result} ${operator}`;
            num1 = result;
            calcScreen.value = '';
            operator = key.textContent;
        } else {
            num1 = calcScreen.value;
            operator = key.textContent;
            calcMiniScreen.value += ` ${num1} ${operator}`;
            calcScreen.value = "";
            // // num2 = calcScreen.value;
            // console.log(`${num1} ${operator} ${num2}`);
        }

    });
});

let equalsKey = document.querySelector('.equals-key');
equalsKey.addEventListener('click', () => {
    // do nothing if user click equals without 2nd number
    if ( !(num1 === 0) && !(calcScreen.value === '') && !(calcMiniScreen.value === '') ) {
        num2 = calcScreen.value;
        calcScreen.value = operate(parseInt(num1), parseInt(num2), operator);
        calcMiniScreen.value = `${num1} ${operator} ${num2} =`;
        console.log(`${num1} ${operator} ${num2}`);
        console.log(`num1 = ${num1}, num2 = ${num2}`);
        num2 = num1;
        num1 = 0;
    } 

});

