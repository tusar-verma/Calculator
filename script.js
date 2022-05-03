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
        case "Clear":
            symbolButton.addEventListener("click", clearClicked);
            break;
        case "Erase":
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
        upperDisplay.innerText = upperDisplayNumber = operate(operatorSelected, upperDisplayNumber, lowerDisplayNumber).toString();        
        lowerDisplay.innerText = lowerDisplayNumber =  "";
        dotPlaced = false;       
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
        // si clickeo en un operador, entonces el siguiente numero puede poner una coma
        dotPlaced = false;
        // si no hay nada en el display de arriba, no se debe operar todavia
        if (upperDisplayNumber != ""){
            //si hay numeros en el display de abajo, hace la operacion y utiliza el numero operando para la nueva operacion                     
            if (lowerDisplayNumber != ""){
                upperDisplay.innerText = upperDisplayNumber = operate(operatorSelected, upperDisplayNumber, lowerDisplayNumber).toString(); 
                lowerDisplayNumber = lowerDisplay.innerText = "";

                dotPlaced = false;       
            }                         
            // si en el display de abajo no hay numeros, o una vez hecho la operacion, cambia el operando
            removeOperatorSelected()
        } else {   
            // se pone los numeros del display de abajo en el display de arriba
            upperDisplay.innerText = upperDisplayNumber = lowerDisplayNumber;
            lowerDisplay.innerText = lowerDisplayNumber = "";
        }
        operatorSelected = e.target.innerText;
        e.target.classList.add("operatorSelected"); 
    }
}

function numberClicked(e){
    if (e.target.className === "Number") {
        if(operatorSelected == ""){
           upperDisplay.innerText = upperDisplayNumber = ""; 
        }
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
    upperDisplayNumber = "";
    dotPlaced = false;
    removeOperatorSelected()
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
        default:
            return "";
    }
}
