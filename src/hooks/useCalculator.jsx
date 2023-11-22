import { useState } from 'react';

export default function useCalculator(){
    
    const [resultValue, setResultValue] = useState("0");
    const [right, setRight] = useState(0);
    const [left, setLeft] = useState(0);
    const [lastInput, setLastInput] = useState(null);
    //次に数値を入れてもOK
    const [operator, setOperator] = useState(null);
    const resultValueLimit = 9;
    const [errorMessage, setErrorMessage] = useState("");

    const isResultValueLimitOver = (value, limit) => {
        const valueString = String(value);
        if(valueString.length > limit){
            setErrorMessage("最大桁数を超えています")
            return true;
        }
        setErrorMessage("");
        return false;
    };
    const handleOperatorButtonClick = (newOperator) => {
        if(operator !== null){
            if (operator === "+") {
                setResultValue(left + right);
            } else if (operator === "-") {
                setResultValue(left - right);
            } else if (operator === "×") {
                setResultValue(left * right);
            } else if (operator === "÷") {
                setResultValue(left / right);
            }
            setLeft(resultValue);
            setRight(0);
        }
        // setLeft(resultValue);
        // setRight(0);
        setOperator(newOperator);
    };

    const handleNumberButtonClick = (value) => {
        //次は記号を入れてね
        if(operator === null){
            // const newValue = left * 10 + Number(value);
            // if (!isResultValueLimitOver(newValue, resultValueLimit)){
            //     setLeft(newValue);
            //     setResultValue(newValue);
            // }
            setLeft(left * 10 + Number(value));
            setResultValue(left * 10 + Number(value));
        }   
        else{
            setLeft(resultValue);
            setRight(right*10 + Number(value));
            setResultValue(right * 10 + Number(value));
        }
        setLastInput(value);
    }

    const handleCancelButtonClick = () => {
        setResultValue(0);
        setRight(0);
        setLeft(0);
        setOperator(null);
    }

    const handleCalculate = () =>{
        switch(operator){
            case '+':
                setResultValue(String(left + right));
                break;
            case '-':
                setResultValue(String(left - right));
                break;
            case '×':
                setResultValue(String(left * right));
                break;
            case '÷':
                setResultValue(String(left / right));
                break;
            default:
                setResultValue(String(left));       
        }
        setLeft(0);
        setRight(0);
        };   
    return { resultValue, errorMessage, handleCalculate, handleCancelButtonClick, handleOperatorButtonClick, handleNumberButtonClick }
}
    
        