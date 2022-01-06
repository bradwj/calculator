const display = document.querySelector('.display');
const clearBtn = document.querySelector('#clearBtn');
const deleteBtn = document.querySelector('#deleteBtn');
const percentBtn = document.querySelector('#percentBtn');
const buttons = document.querySelectorAll('.calculator > button');

// Stores the selected numbers to perform operations on
let firstNumber = 0;
let secondNumber = '';
let operation = null;

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0)
        return "bruh";
    return a / b;
    
}

function updateDisplay(number) {
    display.textContent = number;
}

function resetInput() {
    firstNumber = 0;
    secondNumber = '';
    operation = null;
}

function clear() {
    console.log('clear');
    resetInput();
    updateDisplay(0);
}

function backspace() {
    console.log('delete');

    if (!operation) {
        if (firstNumber.length > 1) firstNumber = firstNumber.slice(0, -1);
        else firstNumber = 0;

        updateDisplay(firstNumber);
    }
    else {
        if (secondNumber.length > 1) secondNumber = secondNumber.slice(0, -1);
        else secondNumber = 0;

        updateDisplay(secondNumber);
    }
}

function selectDecimal() {
    console.log('.');

    if (!operation) {
        if (!String(firstNumber).includes('.')) {
            if (firstNumber === '') firstNumber = '0.';
            else firstNumber += '.';
            updateDisplay(firstNumber);
        }
    }
    else {
        if (!String(secondNumber).includes('.')) {
            if (secondNumber === '') secondNumber = '0.';
            else secondNumber += '.';
            updateDisplay(secondNumber);
        }
    }

}

function selectNumber(number) {
    console.log(number);

    if (!operation) {
        if (firstNumber === 0) firstNumber = number;
        else firstNumber += number;

        updateDisplay(firstNumber);
    }
    else {
        if (secondNumber === 0) secondNumber = number;
        else secondNumber += number;

        updateDisplay(secondNumber);
    }
}

function selectOperation(op) {
    console.log(op);

    if (operation) {
        performOperation(firstNumber, secondNumber, operation);
    }
    operation = op;
}

function selectPlusMinus() {
    console.log("±");

    if (!operation) {
        firstNumber *= -1;
        updateDisplay(firstNumber);
    }
    else {
        secondNumber *= -1;
        updateDisplay(secondNumber);
    }
}

function selectPercent() {
    console.log('%');

    if (!operation) {
        firstNumber = Number(firstNumber) / 100;
        updateDisplay(firstNumber);
    }
    else {
        secondNumber = Number(secondNumber) / 100;
        updateDisplay(secondNumber);
    }
}

function performOperation(a, b, op) {
    if (!firstNumber || !secondNumber || !operation) return;
    let result;
    switch (op) {
        case '/':
            result = divide(a, b);
            break;
        case '*':
            result = multiply(a, b);
            break;
        case '+':
            result = add(a, b);
            break;
        case '-':
            result = subtract(a, b);
            break;
    }
    console.log(a, op, b, '=', result);
    resetInput();
    firstNumber = result;
    updateDisplay(result);
    return result;
}

buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const type = e.target.getAttribute('data-type');

        if (type === "number") {
            selectNumber(btn.value);
        }
        if (type === "operator") {
            selectOperation(btn.value);
        }
        if (type === "plusminus") {
            selectPlusMinus();
        }
        if (type === "decimal") {
            selectDecimal();
        }
        if (type === "percent") {
            selectPercent();
        }
        if (type === "equal") {
            performOperation(Number(firstNumber), Number(secondNumber), operation);
        }
        if (type === "clear") {
            clear();
        }
        if (type === "delete") {
            backspace();
        }
    });
});