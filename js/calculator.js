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
let num1 = 0;
let num2 = 0;
let operator;

let numKey = document.querySelectorAll('.num-key');
numKey.forEach( (key) => {
    key.addEventListener('click', () => {
        calcScreen.value += key.textContent;
    });
});

let operatorKey = document.querySelectorAll('.operator-key');
operatorKey.forEach( (key) => {
    key.addEventListener('click', () => {
        if ( !(calcScreen.value === '') ) {
            num1 = calcScreen.value;
        operator = key.textContent;

        calcMiniScreen.value = `${num1} ${operator}`;
        calcScreen.value = "";
        }
        
    });
});

let equalsKey = document.querySelector('.equals-key');
equalsKey.addEventListener('click', () => {
    // do nothing if user click equals without 2nd number
    if ( !(num1 === 0) && !(calcScreen.value === '') ) {
        num2 = calcScreen.value;
        calcScreen.value = operate(parseInt(num1), parseInt(num2), operator);
        calcMiniScreen.value += ` ${num2} =`;
        console.log(`${num1} ${operator} ${num2}`);
        num1 = 0;
    } 

});

