const display = document.querySelector('.calc__display'),
      calcBtn = document.querySelectorAll('.calc__btn'),
      lastResult = display.querySelector('span'),
      res = display.querySelector('.res');

const operatorObject = {
    "*": '*',
    '/': '/',
    '+': '+',
    '-': '-',
    '=': '=',
    '^': '**'
};

const memoryObject = {
    prevResult: null,
    lastResult: null,
    currentOperator: null,
    lastMove: null
}

calcBtn.forEach(btn => {btn.addEventListener('click', (e) => onClickBtns(e.target))});

function onClickBtns(btn) {
    const {prevResult, lastResult, currentOperator} = memoryObject;
    if (btn.classList.contains('digit')) {
        if (prevResult && !currentOperator) {
            printResult(display, memoryObject.prevResult += btn.textContent);
        }
        if (prevResult && currentOperator) {
            printResult(display, memoryObject.lastResult = lastResult ? memoryObject.lastResult += btn.textContent : btn.textContent)
        }
        if (!prevResult) {
            memoryObject.prevResult = btn.textContent;
            printResult(display, memoryObject.prevResult = btn.textContent)
        } 
        // console.log(memoryObject)
    }
    if (btn.classList.contains('operator')) {
        if (btn.classList.contains('all-clear')) {
            memoryObject.prevResult = null;
            memoryObject.lastResult = null;
            memoryObject.currentOperator = null;
            memoryObject.lastMove = null;
            printResult(display, 0);
        }
        if (btn.classList.contains('clear')) {
            // memoryObject.prevResult = null;
            if (memoryObject.lastMove == memoryObject.lastResult) {
                memoryObject.lastResult = null
            } else {memoryObject.currentOperator = null};
            printResult(display, memoryObject.prevResult || 0);
        }
        if (btn.textContent === '=') {
            memoryObject.prevResult = makeCalc(memoryObject.prevResult, memoryObject.lastResult, memoryObject.currentOperator);
            memoryObject.lastResult = null;
            memoryObject.currentOperator = null;
            printResult(display, memoryObject.prevResult);
            console.log(memoryObject)
        }
        if (memoryObject.prevResult && memoryObject.currentOperator && memoryObject.lastResult) {
            memoryObject.prevResult = makeCalc(memoryObject.prevResult, memoryObject.lastResult, memoryObject.currentOperator);
            printResult(display, memoryObject.prevResult);
            memoryObject.lastResult = null;
            memoryObject.currentOperator = operatorObject[btn.textContent]

        }
        if (memoryObject.prevResult && btn.textContent !== '=' && btn.textContent !== 'AC' && btn.textContent !== 'C') {
            memoryObject.currentOperator = operatorObject[btn.textContent];
            printResult(display, memoryObject.currentOperator);
        }
    }
    // printResult(display, lastResult)
    console.log(memoryObject)
}

function printResult(selector, value) {
    selector.textContent = value;
    memoryObject.lastMove = value
}

function makeCalc(a, b, oper) {
    if (oper === '+') return +a + +b;
    if (oper === '-') return +a - +b;
    if (oper === '*') return +a * +b;
    if (oper === '/') return +a / +b;
    if (oper === '**') return a ** b
}
