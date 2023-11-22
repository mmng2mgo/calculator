import React from 'react';
import { Display }　from './Display';
import { Button } from './Button';
import useCalculator from '../hooks/useCalculator';
import styles from './Calculator.module.css';

export function Calculator(){
    const { resultValue, errorMessage, handleCalculate, handleCancelButtonClick, handleOperatorButtonClick, handleNumberButtonClick } = useCalculator();

    const BUTTONS = [
        "7", "8", "9", "÷",
        "4", "5", "6", "×",
        "1", "2", "3", "-",
        "C", "0", "=", "+"
    ]

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
