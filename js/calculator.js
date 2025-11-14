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


function clearAllScreen() {
    calcScreen.value = '';
    calcMiniScreen.value = '';
    num1 = 0;
    num2 = 0;
    operator = '';
}


function erase() {
    let mainscreen = calcScreen.value;
    calcScreen.value = mainscreen.slice(0, -1);
}


function getOperator(key) {
     // do nothing if both screens are empty while clicking the operator
    if (calcScreen.value === '' && calcMiniScreen.value === '') {
        // return operator = '';
        return;
    }

    // if the user already input the first number and operator then click the operator/other operator again
    // update the mini screen with the new operator
    if ( !(calcMiniScreen.value === '') && !(operator === '') && calcScreen.value === '' ) {
        operator = key.textContent;
        calcMiniScreen.value = `${num1} ${operator}`;
        return;
    }
    
    if ( !(num1 === 0) && (num2 === 0) && !(operator === '') && !(calcScreen.value === '') ) {
        // assign the main screen value to num2
        num2 = calcScreen.value;
        // calculate the result
        let result = operate(parseFloat(num1), parseFloat(num2), operator);
        result = Math.round(result * 100) / 100; // round result to 2 decimal place
        num1 = result;
        // clear the num2
        num2 = 0;
        // assign the new operator
        operator = key;
        // display the result and new operator
        calcMiniScreen.value = `${result} ${operator}`;
        // clear the main screen
        calcScreen.value = '';
    } else {
        // assign main screen value to num1 when the top mini screen is empty
        num1 = calcScreen.value;
        // clear the main screen
        calcScreen.value = '';
        operator = key;
        calcMiniScreen.value = `${num1} ${operator}`;
    } 
}


function calculateTotal() {
    // do nothing if user click equals without 2nd number
    if ( !(calcScreen.value === '') && !(calcMiniScreen.value === '') ) {
        // assign main screen to num2
        num2 = calcScreen.value;

        if (num1 === '0' && num2 === '0' && operator === '%') {
            operator = '';
            num1 = 0;
            num2 = 0;
            return calcScreen.value = 'Error';
        } else if ( operator === '%' && num2 === '0' ) {
            operator = '';
            num1 = 0;
            num2 = 0;
            return calcScreen.value = "Can't divide by 0";
        }

        let result = operate(parseFloat(num1), parseFloat(num2), operator);

        result = Math.round(result * 100) / 100; // round it to 2 decimal places
        
        calcScreen.value = result;
        calcMiniScreen.value = `${num1} ${operator} ${num2} = `;
        num1 = result;
        num2 = 0;
        operator = '';
    } 
}


// add event listener to the page on keydown
document.addEventListener('keydown', (e) => {
    const numbers = '0123456789.'
    if (numbers.includes(e.key)) {
        numKeyPress(e.key);
    }

    const operators = '+-*%';
    if(operators.includes(e.key)) {
        getOperator(e.key);
    }

    if(e.key === '=' || e.key === 'Enter') {
        calculateTotal();
    }

    if(e.key === 'Backspace') {
        erase();
    }

});


function numKeyPress(k) {
    // if user click the decimal button while the screen is empty, display '0.'
    if(calcScreen.value === '' && k === '.') {
        return calcScreen.value = `${num1}.`;
    }
    let screen = calcScreen.value;
    // do nothing when the user clicks the decimal button and it is already present on screen
    if(screen.includes('.') && k === '.') {
        return;
    }
    calcScreen.value += k;
}


const backspace = document.querySelector('.backspace');
backspace.addEventListener('click', () => {
    erase();
});

const clearAll = document.querySelector('.clear-all');
clearAll.addEventListener('click', clearAllScreen);


const clearEntry = document.querySelector('.clear-entry');
clearEntry.addEventListener('click', () => {
    const miniScreen = calcMiniScreen.value
    // if the mini screen has '=', clear all entry
    if (miniScreen.includes('=')) {
        clearAllScreen();
    } else {
        calcScreen.value = '';
    }
});


let numKey = document.querySelectorAll('.num-key');
numKey.forEach( (key) => {
    key.addEventListener('click', () => {
        numKeyPress(key.textContent);
    });
});

let operatorKey = document.querySelectorAll('.operator-key');
operatorKey.forEach( (key) => {
    key.addEventListener('click', () => {
        getOperator(key.textContent);
    });
});

let equalsKey = document.querySelector('.equals-key');
equalsKey.addEventListener('click', () => {
    calculateTotal();
});

