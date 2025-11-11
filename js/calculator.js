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

        // if (!(calcMiniScreen.value === '') && calcScreen.value === '') {
        //     calcMiniScreen.value = `${num1} ${operator}`;
        //     operator = key.textContent;
        //     return;
        // }
        //     // num1 = calcScreen.value;

        // // if screens are not empty
        // if( !(calcMiniScreen.value === '') && !(calcScreen.value === '') ) {
        //     console.log(`${num1} ${operator} ${num2}`);
        //     operator = key.textContent;
        //     // num1 = calcScreen.value;
        //     num2 = num1;
        //     num1 = calcScreen.value;

        //     let result = operate(parseInt(num1), parseInt(num2), operator);
        //     num1 = result;

        //     calcMiniScreen.value = `${result} ${operator}`;
        //     num2 = 0;
        //     // operator = '';
        //     calcScreen.value = '';
        // } else {
        //     operator = key.textContent;
            
        //     if(calcScreen.value === '') {
        //         num1 = 0;
        //     } else {                
        //         num1 = calcScreen.value;
        //         calcMiniScreen.value += ` ${num1} ${operator}`;
        //         calcScreen.value = "";
        //     }
        // }

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
            const result = operate(parseInt(num1), parseInt(num2), operator);
            // assign the result to num1
            num1 = result;
            // clear the num2
            num2 = 0;
            // assign the new operator
            operator = key.textContent;
            // display the result and new operator
            calcMiniScreen.value = `${result} ${operator}`;
            // clear the main screen
            calcScreen.value = '';
        } else {
            // assign main screen value to num1 when the top mini screen is empty
            num1 = calcScreen.value;
            // clear the main screen
            calcScreen.value = '';
            operator = key.textContent;
            calcMiniScreen.value = `${num1} ${operator}`;
        }

        

    });
});

let equalsKey = document.querySelector('.equals-key');
equalsKey.addEventListener('click', () => {
    // do nothing if user click equals without 2nd number
    if ( !(calcScreen.value === '') && !(calcMiniScreen.value === '') ) {
        // assign main screen to num2
        num2 = calcScreen.value;
        const result = operate(parseFloat(num1), parseFloat(num2), operator)
        calcScreen.value = result;
        calcMiniScreen.value = `${num1} ${operator} ${num2} = `;
        num1 = result;
        num2 = 0;
        operator = '';
    } 

    if (num1 === '0' && num2 === '0' && operator === '%') {
        calcScreen.value = 'Error';
        operator = '';
        num1 = 0;
        num2 = 0;
    }

});

