import { renderHook, act } from '@testing-library/react';
import Value from '../../consts/Value';
import useCalculator from '../useCalculator';

describe('基本仕様', () => {
    test('初期表示　resultValue:0', () => {
        const {result} = renderHook(() => useCalculator());
        expect(result.current.resultValue).toBe("0");
    });
    test('数字ボタンを押す', () => {
        const {result} = renderHook(() => useCalculator());
        act(() => result.current.handleNumberButtonClick(Value.NINE));
        expect(result.current.resultValue).toBe(9);
        act(() => result.current.handleNumberButtonClick(Value.NINE));
        expect(result.current.resultValue).toBe(99);
    });
    test('一桁の足し算をする', () => {
        const {result} = renderHook(() => useCalculator());
        act(() => result.current.handleNumberButtonClick(Value.ONE));
        act(() => result.current.handleOperatorButtonClick(Value.PLUS));
        act(() => result.current.handleNumberButtonClick(Value.ONE));
        act(() => result.current.handleOperatorButtonClick(Value.EQUAL));
        expect(result.current.resultValue).toBe(2);
    })
    test('二桁の足し算をする', () => {
        const {result} = renderHook(() => useCalculator());
        act(() => result.current.handleNumberButtonClick(Value.FIVE));
        act(() => result.current.handleNumberButtonClick(Value.ZERO));
        act(() => result.current.handleOperatorButtonClick(Value.PLUS));
        act(() => result.current.handleNumberButtonClick(Value.FOUR));
        act(() => result.current.handleNumberButtonClick(Value.ZERO));
        act(() => result.current.handleOperatorButtonClick(Value.EQUAL));
        expect(result.current.resultValue).toBe(90);
    })
    // test('連続して二桁の足し算をする', () => {
    //     const {result} = renderHook(() => useCalculator());
    //     act(() => result.current.handleNumberButtonClick(1));
    //     act(() => result.current.handleOperatorButtonClick("+"));
    //     act(() => result.current.handleNumberButtonClick(15));
    //     act(() => result.current.handleOperatorButtonClick("+"));
    //     expect(result.current.resultValue).toBe(20);

    // })
});