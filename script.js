const calculator = document.querySelector("#Calculator");
const symbols = [".","=","+","-","*","/","C","E"]

for (let index = 0; index < 10; index++) {
    const numberButton = document.createElement("button");
    numberButton.innerText = index;
    numberButton.style.gridArea = `Number${index}`;
    calculator.appendChild(numberButton);
}

symbols.forEach(symbol => {
    const symbolButton = document.createElement("button");
    symbolButton.innerText = symbol;
    switch (symbol) {
        case ".":
            symbolButton.style.gridArea = "Dot";
            break;
        case "=":
            symbolButton.style.gridArea = "Equal";
            break;
        case "+":
            symbolButton.style.gridArea = "Add";
            break;
        case "-":
            symbolButton.style.gridArea = "Substract";
            break;
        case "*":
            symbolButton.style.gridArea = "Multiply";
            break;
        case "/":
            symbolButton.style.gridArea = "Divide";
            break;
        case "C":
            symbolButton.style.gridArea = "CLEAR";
            break;
        case "E":
            symbolButton.style.gridArea = "ERASE";
            break;
    }
    calculator.appendChild(symbolButton);
});

const calculatorDisplay = document.createElement("div");
calculatorDisplay.id = "display";
calculator.appendChild(calculatorDisplay);


function add(a, b){
    return Number(a) + Number(b);
}
function substract(a, b){
    return Number(a) - Number(b)
}
function multiply(a, b){
    return Number(a) * Number(b);
}
function divide(a, b){
    return Number(a) / Number(b);
}
function operate(operator, a, b){
    switch (operator) {
        case "+":
            return add(a,b);
        case "-":
            return substract(a,b);
        case "*":
            return multiply(a,b);
        case "/":
            return divide(a,b);
    }
}