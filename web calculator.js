const calculator = {
    displayValue: '0',
    firstNumber: null,
    waitingForSecondNumber: false,
    operator: null,
};

function updateDisplay() {
    //select element from 'calculator-screen' class
    const display = document.querySelector('.calculator-screen');
    //update display with content of dsplayValue
    display.value = calculator.displayValue;
}

updateDisplay();

//handle key presses
const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
    //access clicked element
    const{target}=event;

    //check if the clicked element is a button
    //if not, exit the function
    if (!target.matches('button')) {
        return;
    }

    if (target.classList.contains('operator')) {
        handleOperator(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('decimal')) {
        inputDecimal(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('all-clear')) {
        resetCalculator();
        updateDisplay();
        return;
        
    }
    inputDigit(target.value);
    updateDisplay();
});

//input digit to screen
function inputDigit(digit) {
    const {displayValue, waitingForSecondNumber} = calculator;
    //to clear the screen in between inputting first and second number
    if (waitingForSecondNumber === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondNumber = false;
    } else {
    //overwrite 0 in the screen, if not 0, concatenate
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
    console.log(calculator);
}


//input decimal point
function inputDecimal(dot) {
    //fix decimal bug so it can begin with . as a second number
    if (calculator.waitingForSecondNumber === true) {
        calculator.displayValue = '0.'
        calculator.waitingForSecondNumber = false;
        return
    }
    //if the screen does not contain decimal point yet
    if (!calculator.displayValue.includes(dot)) {
        //add decimal point
        calculator.displayValue += dot;
    }
};

//handling operator
function handleOperator (nextOperator) {
    //destructure the calculator object properties
    const { firstNumber, displayValue, operator} = calculator
    const inputValue = parseFloat(displayValue);
    //parse float convert string to float number

    //enabling oparator override(?)
    if (operator && calculator.waitingForSecondNumber) {
        calculator.operator = nextOperator;
        console.log(calculator);
        return;
    }

    //make sure first number is null and not NaN
    if (firstNumber === null && !isNaN(inputValue)) {
        //update firstnumber property
        calculator.firstNumber = inputValue;
    } else if (operator) {
        const result = calculate (firstNumber, inputValue, operator);

        calculator.displayValue = `${parseFloat(result.toFixed(7))}`; //limit float number to 7 digits
        calculator.firstNumber = result;
    }

    calculator.waitingForSecondNumber = true;
    calculator.operator = nextOperator;

    console.log(calculator); //after click an operator, calculator will wait for second number to be input
    //hence, waitingForSecondNumber become true
}

//doing calculation
function calculate(firstNumber, secondNumber, operator) {
    if(operator === '+') {
        return firstNumber + secondNumber;
    } else if (operator === '-') {
        return firstNumber - secondNumber;
    } else if (operator === '*') {
        return firstNumber * secondNumber;
    } else if (operator === '/') {
        return firstNumber / secondNumber;
    }

    return secondNumber;
}

//clear all
function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstNumber = null;
    calculator.waitingForSecondNumber = false;
    calculator.operator = null;
    console.log(calculator);
}
