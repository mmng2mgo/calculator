import { useState } from 'react';
import Value from '../consts/Value';
import { isNumber, isOperator, isEqual, isClear } from '../utils/valueUtils';

export default function useCalculator(){
    
    const [resultValue, setResultValue] = useState("0");
    const [right, setRight] = useState(0);
    const [left, setLeft] = useState(0);
    const [lastInput, setLastInput] = useState(null);
    //次に数値を入れてもOK
    const [operator, setOperator] = useState(null);
    const resultValueLimit = 9;

    const isResultValueLimitOver = (value, limit) => {
        const valueString = String(value);
        if(valueString.length >= limit){
            setResultValue("計算結果が有効桁数を超えています。");
            return true;
        }
        return false;
    };
    const calculateWithOperator = (leftHand, rightHand) => {
        let calcResult = 0;
        let error = null;
        switch(operator){
            case Value.PLUS:
                calcResult = leftHand + rightHand;
                break;
            case Value.SUBSTRACT:
                calcResult = leftHand - rightHand;
                break;
            case Value.MULTIPLY:
                calcResult = leftHand * rightHand;
                break;
            case Value.DIVISION:
                if(rightHand === 0){
                    error = "0徐算は出来ません。";
                }else{
                    calcResult = Math.floor(leftHand / rightHand);
                }
                break;
            default:
               calcResult = leftHand;       
        }
        return [calcResult, error];
    }

    const handleOperatorButtonClick = (newOperator) => {
        if(isNumber(lastInput)){
            if(operator !== null){
                const [calcResult, error] = calculateWithOperator(left, right);
                if(error){
                    setResultValue(error);
                }else{
                    if(isResultValueLimitOver(calcResult, resultValueLimit)){
                        return;
                    }
                    setResultValue(calcResult);
                }
                setLeft(resultValue);
                setRight(0);
            }
            setOperator(newOperator);
            setLastInput(newOperator);
        }
    };

    const handleNumberButtonClick = (value) => {
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
            const[calcResult, error] = calculateWithOperator(left, right);
            if(error){
                setResultValue(error);
            }else{
                if(isResultValueLimitOver(calcResult, resultValueLimit)){
                    return;
                }
                setResultValue(calcResult);
            }
        }
        else if(isEqual(lastInput)){
            const[calcResult, error] = calculateWithOperator(resultValue, right);
            if(error){
                setResultValue(error);
            }else{
                setResultValue(calcResult);
            }
        }
        else if(isOperator(lastInput)){
            const[calcResult, error] = calculateWithOperator(left, left);
            if(error){
                setResultValue(error);
            }else{
                setResultValue(calcResult);
            }
        }
        setLastInput(value)
        };   
    return { resultValue, handleEqualButtonClick, handleClearButtonClick, handleOperatorButtonClick, handleNumberButtonClick }
}
    
        