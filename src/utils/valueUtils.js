import Value from '../consts/Value';

export const isNumber = (value) => {
    return value === Value.ZERO || value === Value.ONE || value === Value.TWO || 
        value === Value.THREE || value === Value.FOUR || value === Value.FIVE ||
        value === Value.SIX || value === Value.SEVEN || value === Value.EIGHT || value === Value.NINE
};

export const isOperator = (value) => {
    return value === Value.PLUS || value === Value.SUBSTRACT || value === Value.MULTIPLY || value === Value.DIVISION
};

export const isEqual = (value) => {
    return value === Value.EQUAL
}

export const isClear = (value) => {
    return value === Value.CLEAR
}
