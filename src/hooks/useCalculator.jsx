import { useState } from 'react';
import Value from '../consts/Value';

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

    const isNumber = (value) => {
        return value === Value.ZERO || value === Value.ONE || value === Value.TWO || 
            value === Value.THREE || value === Value.FOUR || value === Value.FIVE || 
            value === Value.SEVEN || value === Value.EIGHT || value === Value.NINE
    };

    const isOperator = (value) => {
        return value === Value.PLUS || value === Value.SUBSTRACT || value === Value.MULTIPLY || value === Value.DIVISION
    };

    const isEqual = (value) => {
        return value === Value.EQUAL
    }

    const isClear = (value) => {
        return value === Value.CLEAR
    }

    const calculateWithOperator = (leftHand, rightHand) => {
        switch(operator){
            case Value.PLUS:
                setResultValue(leftHand + rightHand);
                break;
            case Value.SUBSTRACT:
                setResultValue(leftHand - rightHand);
                break;
            case Value.MULTIPLY:
                setResultValue(leftHand * rightHand);
                break;
            case Value.DIVISION:
                setResultValue(leftHand / rightHand);
                if(rightHand === 0){
                    console.log("0徐算は出来ません。")
                }
                break;
            default:
                setResultValue(leftHand);       
        }
    }

    const handleOperatorButtonClick = (newOperator) => {
        if(isNumber(lastInput)){
            if(operator !== null){
                calculateWithOperator(left, right);
                setLeft(resultValue);
                setRight(0);
            }
            setOperator(newOperator);
            setLastInput(newOperator);
        }
    };

    const handleNumberButtonClick = (value) => {
        //次は記号を入れてね
        if(isNumber(lastInput)){
            if(operator === null){
                setLeft(left * 10 + Number(value));
                setResultValue(left * 10 + Number(value));
            }else{
                setRight(right * 10 + Number(value));   
                setResultValue(right * 10 + Number(value));
            }
        }
        else if(isOperator(lastInput)){
            setLeft(resultValue);
            setRight(right * 10 + Number(value));
            setResultValue(right * 10 + Number(value));
        }
        else{
            setLeft(Number(value));
            setResultValue(Number(value));
        }
        setLastInput(value);
    }

    const handleClearButtonClick = (value) => {
        if(isClear(value)){
            setResultValue(0);
            setRight(0);
            setLeft(0);
            setOperator(null);
            setLastInput(null);
        }
    }

    const handleEqualButtonClick = (value) =>{
        if(isNumber(lastInput)){
            calculateWithOperator(left, right);
            setLeft(0);
            setRight(0);
        }
        else if(isEqual(lastInput)){
            calculateWithOperator(resultValue, right);
        }
        else if(isOperator(lastInput)){
            calculateWithOperator(left, left);
        }
        setLastInput(value)
        };   
    return { resultValue, errorMessage, handleEqualButtonClick, handleClearButtonClick, handleOperatorButtonClick, handleNumberButtonClick }
}
    
        