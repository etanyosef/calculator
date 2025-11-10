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

        if (!(calcMiniScreen.value === '') && calcScreen.value === '') {
            calcMiniScreen.value = `${num1} ${operator}`;
            operator = key.textContent;
            return;
        }

        
            // num1 = calcScreen.value;

        // if screens are not empty
        if( !(calcMiniScreen.value === '') && !(calcScreen.value === '') ) {
            console.log(`${num1} ${operator} ${num2}`);
            operator = key.textContent;
            // num1 = calcScreen.value;
            num2 = num1;
            num1 = calcScreen.value;

            let result = operate(parseInt(num1), parseInt(num2), operator);
            num1 = result;

            calcMiniScreen.value = `${result} ${operator}`;
            num2 = 0;
            // operator = '';
            calcScreen.value = '';
        } else {
            operator = key.textContent;
            
            if(calcScreen.value === '') {
                num1 = 0;
            } else {                
                num1 = calcScreen.value;
                calcMiniScreen.value += ` ${num1} ${operator}`;
                calcScreen.value = "";
            }
        }

    });
});

let equalsKey = document.querySelector('.equals-key');
equalsKey.addEventListener('click', () => {
    // do nothing if user click equals without 2nd number
    if ( !(calcScreen.value === '') && !(calcMiniScreen.value === '') ) {
        num2 = calcScreen.value;
        const result = operate(parseInt(num1), parseInt(num2), operator)
        calcScreen.value = result;
        calcMiniScreen.value = `${num1} ${operator} ${num2} =`;
        num1 = result;
        num2 = 0;
    } 

    if (num1 === '0' && num2 === '0' && operator === '%') {
        calcScreen.value = 'Error';
        operator = '';
        num1 = 0;
        num2 = 0;
    }

});

