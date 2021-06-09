const calculator = document.querySelector("#Calculator");
const upperDisplay = document.querySelector("#upperDisplay");
const lowerDisplay = document.querySelector("#lowerDisplay");
const symbols = {
    Dot: ".",
    Add: "+",
    Substract: "-",
    Multiply: "*",
    Divide: "/",
    Equal: "=",
    Clear: "C",
    Erase: "E"
}
// const symbols = [".","+","-","*","/","=","C","E"]
let upperDisplayNumber = "";
let lowerDisplayNumber ="";
let operatorSelected = "";
let dotPlaced = false;

for (let index = 0; index < 10; index++) {
    const numberButton = document.createElement("button");
    numberButton.innerText = index;
    numberButton.classList.add("Number");
    numberButton.style.gridArea = `Number${index}`;
    numberButton.addEventListener("click", numberClicked)
    calculator.appendChild(numberButton);
}

for (const nameSymbol in symbols) {   
    const symbolButton = document.createElement("button");
    symbolButton.innerText = symbols[nameSymbol];
    switch (nameSymbol) {
        case "Dot":
            symbolButton.classList.add("Dot");
            symbolButton.addEventListener("click", dotClicked);            
            break;
        case "Equal":            
            symbolButton.classList.add("Equal");
            symbolButton.addEventListener("click", equalClicled);
            break;
        case "C":
            symbolButton.addEventListener("click", clearClicked);
            break;
        case "E":
            symbolButton.addEventListener("click", eraseClicked);
            break;
        default:
            symbolButton.classList.add("Operator");
            symbolButton.addEventListener("click", operatorClicked);
            break;
    }    
    symbolButton.style.gridArea = nameSymbol;    
    calculator.appendChild(symbolButton);
}

function dotClicked(e){
    if(e.target.classList.contains("Dot") && !dotPlaced){
        lowerDisplayNumber += ".";
        lowerDisplay.innerText = lowerDisplayNumber;
        dotPlaced = true;
    }
}

function equalClicled(e){
    if(e.target.classList.contains("Equal")){
        lowerDisplay.innerText  = lowerDisplayNumber = operate(operatorSelected, upperDisplayNumber, lowerDisplayNumber);        
        upperDisplay.innerText = upperDisplayNumber =  "";
        removeOperatorSelected();
    }
}

function removeOperatorSelected(){
    operatorSelected = "";
    const operatorElemSelected = Array.from(document.querySelectorAll(".operatorSelected"));
    operatorElemSelected.forEach(elem => {
        elem.classList.remove("operatorSelected")
    });
}

function operatorClicked(e){
    if(e.target.classList.contains("Operator")){
        upperDisplay.innerText = upperDisplayNumber = lowerDisplayNumber;
        operatorSelected = e.target.innerText;
        lowerDisplayNumber = lowerDisplay.innerText = "";
        e.target.classList.add("operatorSelected");
        dotPlaced = false;
    }
}

function numberClicked(e){
    if (e.target.className === "Number") {
        if(lowerDisplayNumber.length < 25){
            lowerDisplayNumber += e.target.innerText;
            lowerDisplay.innerText = lowerDisplayNumber;
        }
    }
}

function clearClicked(e){
    upperDisplay.innerText = "";
    lowerDisplay.innerText = "";
    lowerDisplayNumber = "";
    dotPlaced = false;
}

function eraseClicked(e){
    if (lowerDisplayNumber.slice(-1) === "."){
        dotPlaced = false;
    }
    lowerDisplayNumber = lowerDisplayNumber.slice(0,-1);
    lowerDisplay.innerText = lowerDisplayNumber;
}

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