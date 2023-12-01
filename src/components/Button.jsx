import React from 'react';
import {isNumber, isOperator, isEqual, isClear } from '../utils/valueUtils';

export function Button({ value, handle }){
    let buttonClassName;

    if(isOperator(value)){
        buttonClassName = "operator-button";
    }else if(isEqual(value)){
        buttonClassName = "equal-button";
    }else if(isClear(value)){
        buttonClassName = "clear-button";
    }else if(isNumber(value)){
        buttonClassName = "number-button";
    }

    return(
        <button className={buttonClassName} onClick={() => handle(value)}>
            {value}
        </button>
    );
}
