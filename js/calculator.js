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

let numKey = document.querySelectorAll('.num-key');
numKey.forEach( (key) => {
    key.addEventListener('click', () => {
        calcScreen.value += key.textContent;
    });
});

let operatorKey = document.querySelectorAll('.operator-key');
operatorKey.forEach( (key) => {
    key.addEventListener('click', () => {
        let num1 = calcScreen.value;
        let num2 = 0;
        let operator = key.textContent;

        calcMiniScreen.value = `${num1} ${operator}`;
        calcScreen.value = "";
    });
});

let equalsKey = document.querySelector('.equals-key');
equalsKey.addEventListener('click', () => {
    
});

