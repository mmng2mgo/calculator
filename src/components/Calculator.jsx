import React from 'react';
import { Display }　from './Display';
import { Button } from './Button';
import useCalculator from '../hooks/useCalculator';
import './Button.css';
import styles from './Calculator.module.css';
import Value from '../consts/Value';

export function Calculator(){
    const { 
        resultValue,
        displayTextClass,
        handleEqualButtonClick,
        handleClearButtonClick,
        handleOperatorButtonClick,
        handleNumberButtonClick
    } = useCalculator();

    const BUTTONS = [
        Value.SEVEN, Value.EIGHT, Value.NINE, Value.DIVISION,
        Value.FOUR, Value.FIVE, Value.SIX, Value.MULTIPLY,
        Value.ONE, Value.TWO, Value.THREE, Value.SUBSTRACT,
        Value.CLEAR, Value.ZERO, Value.EQUAL, Value.PLUS
    ]

    const selectFunction = (buttonValue) => {
        if(buttonValue === Value.EQUAL){
            return () => handleEqualButtonClick(buttonValue);
        }
        else if(buttonValue === Value.CLEAR){
            return () => handleClearButtonClick(buttonValue);
        }
        else if(buttonValue === Value.DIVISION || buttonValue === Value.MULTIPLY || buttonValue === Value.SUBSTRACT || buttonValue === Value.PLUS){
            return () => handleOperatorButtonClick(buttonValue);
        }
        else{
            return () => handleNumberButtonClick(buttonValue);
        }
    };

    return (
    <div className={styles.container}>
            <Display selectedValue={ resultValue } displayTextClass={ displayTextClass }></Display>
            <div className="buttons">
                {BUTTONS.map((button, index) => (
                    <React.Fragment key={index}>
                        <Button 
                            key={index}
                            value={button}
                            handle={selectFunction(button)}
                        />
                    </React.Fragment>
                    ))}
            </div>
    </div>
    );
}
