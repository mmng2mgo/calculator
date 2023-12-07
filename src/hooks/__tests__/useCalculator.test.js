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
    test('連続して二桁の足し算をする', () => {
        const {result} = renderHook(() => useCalculator());
        act(() => result.current.handleNumberButtonClick(Value.ONE));
        act(() => result.current.handleOperatorButtonClick(Value.PLUS));
        act(() => result.current.handleNumberButtonClick(Value.THREE));
        act(() => result.current.handleNumberButtonClick(Value.NINE));
        act(() => result.current.handleOperatorButtonClick(Value.PLUS));
        expect(result.current.resultValue).toBe(40);
    })
    test('二桁の引き算をする', () => {
        const {result} = renderHook(() => useCalculator());
        act(() => result.current.handleNumberButtonClick(Value.FIVE));
        act(() => result.current.handleNumberButtonClick(Value.ZERO));
        act(() => result.current.handleOperatorButtonClick(Value.SUBSTRACT));
        act(() => result.current.handleNumberButtonClick(Value.FOUR));
        act(() => result.current.handleNumberButtonClick(Value.ZERO));
        act(() => result.current.handleOperatorButtonClick(Value.EQUAL));
        expect(result.current.resultValue).toBe(10);
    })
    test('計算結果がマイナスになる二桁の引き算をする', () => {
        const {result} = renderHook(() => useCalculator());
        act(() => result.current.handleNumberButtonClick(Value.ONE));
        act(() => result.current.handleNumberButtonClick(Value.ZERO));
        act(() => result.current.handleOperatorButtonClick(Value.SUBSTRACT));
        act(() => result.current.handleNumberButtonClick(Value.THREE));
        act(() => result.current.handleNumberButtonClick(Value.ZERO));
        act(() => result.current.handleOperatorButtonClick(Value.EQUAL));
        expect(result.current.resultValue).toBe(-20);
    })
    test('連続して足し算、引き算をする', () => {
        const {result} = renderHook(() => useCalculator());
        act(() => result.current.handleNumberButtonClick(Value.ONE));
        act(() => result.current.handleNumberButtonClick(Value.ZERO));
        act(() => result.current.handleOperatorButtonClick(Value.PLUS));
        act(() => result.current.handleNumberButtonClick(Value.THREE));
        act(() => result.current.handleNumberButtonClick(Value.ZERO));
        act(() => result.current.handleOperatorButtonClick(Value.SUBSTRACT));
        act(() => result.current.handleNumberButtonClick(Value.TWO));
        act(() => result.current.handleOperatorButtonClick(Value.SUBSTRACT));
        expect(result.current.resultValue).toBe(38);
    })
    test('連続して掛け算、引き算をする', () => {
        const {result} = renderHook(() => useCalculator());
        act(() => result.current.handleNumberButtonClick(Value.ONE));
        act(() => result.current.handleNumberButtonClick(Value.ZERO));
        act(() => result.current.handleOperatorButtonClick(Value.MULTIPLY));
        act(() => result.current.handleNumberButtonClick(Value.THREE));
        act(() => result.current.handleNumberButtonClick(Value.ZERO));
        act(() => result.current.handleOperatorButtonClick(Value.SUBSTRACT));
        act(() => result.current.handleNumberButtonClick(Value.TWO));
        act(() => result.current.handleOperatorButtonClick(Value.SUBSTRACT));
        expect(result.current.resultValue).toBe(298);
    })
    test('0の掛け算をする', () => {
        const {result} = renderHook(() => useCalculator());
        act(() => result.current.handleNumberButtonClick(Value.SIX));
        act(() => result.current.handleNumberButtonClick(Value.NINE));
        act(() => result.current.handleOperatorButtonClick(Value.MULTIPLY));
        act(() => result.current.handleNumberButtonClick(Value.ZERO));
        act(() => result.current.handleEqualButtonClick(Value.EQUAL));
        expect(result.current.resultValue).toBe(0);
    })
    test('0の徐算をして、エラーが表示される', () => {
        const {result} = renderHook(() => useCalculator());
        act(() => result.current.handleNumberButtonClick(Value.SIX));
        act(() => result.current.handleNumberButtonClick(Value.NINE));
        act(() => result.current.handleOperatorButtonClick(Value.DIVISION));
        act(() => result.current.handleNumberButtonClick(Value.ZERO));
        act(() => result.current.handleEqualButtonClick(Value.EQUAL));
        expect(result.current.resultValue).toBe("0徐算は出来ません。");
    })
    test('=を連続して押すと、最後の入力による計算を繰り返す', () => {
        const {result} = renderHook(() => useCalculator());
        act(() => result.current.handleNumberButtonClick(Value.SIX));
        act(() => result.current.handleOperatorButtonClick(Value.PLUS));
        act(() => result.current.handleNumberButtonClick(Value.THREE));
        act(() => result.current.handleEqualButtonClick(Value.EQUAL));
        act(() => result.current.handleEqualButtonClick(Value.EQUAL));
        expect(result.current.resultValue).toBe(12);
    })
    test('演算ボタンを押して数値を入力する前にイコールを押すと直前の数値で計算する', () => {
        const {result} = renderHook(() => useCalculator());
        act(() => result.current.handleNumberButtonClick(Value.ONE));
        act(() => result.current.handleOperatorButtonClick(Value.PLUS));
        act(() => result.current.handleEqualButtonClick(Value.EQUAL));
        expect(result.current.resultValue).toBe(2);
    })
    test('計算によって9桁を超えた場合入力、計算結果表示部分にエラーメッセージが表示される', () => {
        const {result} = renderHook(() => useCalculator());
        act(() => result.current.handleNumberButtonClick(Value.NINE));
        act(() => result.current.handleNumberButtonClick(Value.NINE));
        act(() => result.current.handleNumberButtonClick(Value.NINE));
        act(() => result.current.handleNumberButtonClick(Value.NINE));
        act(() => result.current.handleNumberButtonClick(Value.NINE));
        act(() => result.current.handleNumberButtonClick(Value.NINE));
        act(() => result.current.handleNumberButtonClick(Value.NINE));
        act(() => result.current.handleNumberButtonClick(Value.NINE));
        act(() => result.current.handleOperatorButtonClick(Value.PLUS));
        act(() => result.current.handleNumberButtonClick(Value.ONE));
        act(() => result.current.handleEqualButtonClick(Value.EQUAL));
        expect(result.current.resultValue).toBe("計算結果が有効桁数を超えています。");
    });
    test('イコールボタンを２回押下後、有効桁数を超えた場合、計算結果表示部分にエラーメッセージが表示される', () => {
        const {result} = renderHook(() => useCalculator());
        act(() => result.current.handleNumberButtonClick(Value.NINE));
        act(() => result.current.handleNumberButtonClick(Value.NINE));
        act(() => result.current.handleNumberButtonClick(Value.NINE));
        act(() => result.current.handleNumberButtonClick(Value.NINE));
        act(() => result.current.handleNumberButtonClick(Value.NINE));
        act(() => result.current.handleNumberButtonClick(Value.NINE));
        act(() => result.current.handleNumberButtonClick(Value.NINE));
        act(() => result.current.handleNumberButtonClick(Value.EIGHT));
        act(() => result.current.handleOperatorButtonClick(Value.PLUS));
        act(() => result.current.handleNumberButtonClick(Value.ONE));
        act(() => result.current.handleEqualButtonClick(Value.EQUAL));
        act(() => result.current.handleEqualButtonClick(Value.EQUAL));
        expect(result.current.resultValue).toBe("計算結果が有効桁数を超えています。");
    });
    test('イコールボタンを押し結果表示後、再度オペレータボタンを押し、表示された結果と新たに入力した値同士で計算をする。', () => {
        const {result} = renderHook(() => useCalculator());
        act(() => result.current.handleNumberButtonClick(Value.THREE));
        act(() => result.current.handleOperatorButtonClick(Value.PLUS));
        act(() => result.current.handleNumberButtonClick(Value.THREE));
        act(() => result.current.handleEqualButtonClick(Value.EQUAL));
        act(() => result.current.handleOperatorButtonClick(Value.PLUS));
        act(() => result.current.handleNumberButtonClick(Value.THREE));
        act(() => result.current.handleEqualButtonClick(Value.EQUAL));
        expect(result.current.resultValue).toBe(9);
    });
    test('オペレーターボタンが２回押されたときに、直前のオペレーターが適用される', () => {
        const {result} = renderHook(() => useCalculator());
        act(() => result.current.handleNumberButtonClick(Value.NINE));
        act(() => result.current.handleOperatorButtonClick(Value.PLUS));
        act(() => result.current.handleOperatorButtonClick(Value.MULTIPLY));
        act(() => result.current.handleNumberButtonClick(Value.FOUR));
        act(() => result.current.handleEqualButtonClick(Value.EQUAL));
        expect(result.current.resultValue).toBe(36);
    })
});