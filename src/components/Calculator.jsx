import React, { useState } from 'react';
import {Display} from './Display';
import { Button } from './Button';
import styles from './Calculator.module.css';

export function Calculator(){
    const [resultValue, setResultValue] = useState("0");
    const [right, setRight] = useState(0);
    const [left, setLeft] = useState(0);
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

    const BUTTONS = [
        "7", "8", "9", "÷",
        "4", "5", "6", "×",
        "1", "2", "3", "-",
        "C", "0", "=", "+"
    ]
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
    
        const selectFunction = (buttonValue) => {
            if(buttonValue === "="){
                return handleCalculate;
            }
            else if(buttonValue === "C"){
                return handleCancelButtonClick;
            }
            else if(buttonValue === "÷" || buttonValue === "×" || buttonValue === "-" || buttonValue === "+"){
                return () => handleOperatorButtonClick(buttonValue);
            }
            else{
                return () => handleNumberButtonClick(buttonValue);
            }
            
        };

    return (
    <div className={styles.background}>
        <Display selectedValue={ resultValue }></Display>
        <p>{ errorMessage }</p>
        <div>
            {BUTTONS.map((button, index) => (
                <React.Fragment key={index}>
                    <Button 
                        key={index}
                        value={button}
                        handle={selectFunction(button)}
                    />
                    {(index + 1) % 4 === 0 && <br />}
                </React.Fragment>
                ))}
        </div>
    </div>
    );
}
