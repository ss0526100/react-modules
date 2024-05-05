import React from 'react';
import { renderHook } from '@testing-library/react';
import useCardNumber from '.';

describe('useCardNumber에 대한 테스트 케이스', () => {
  const CARD_NUMBER_INDEX = 0;

  const testWrongCase = (cardNumberPart: string) => {
    const { result } = renderHook(() => useCardNumber());

    React.act(() =>
      result.current.setCardNumberParts[CARD_NUMBER_INDEX](cardNumberPart)
    );

    expect(result.current.isValidCardNumberParts[CARD_NUMBER_INDEX]).toBe(
      false
    );
    expect(
      result.current.cardPartErrorMessages[CARD_NUMBER_INDEX]
    ).not.toBeNull();
  };

  const testValidCase = (cardNumberPart: string) => {
    const { result } = renderHook(() => useCardNumber());

    React.act(() =>
      result.current.setCardNumberParts[CARD_NUMBER_INDEX](cardNumberPart)
    );

    expect(result.current.isValidCardNumberParts[CARD_NUMBER_INDEX]).toBe(true);
    expect(result.current.cardPartErrorMessages[CARD_NUMBER_INDEX]).toBeNull();
  };

  describe('유효성 검증에 실패하는 경우', () => {
    test.each(['abcd', 'ABCD', 'four', '123A'])(
      '숫자가 아닌 값(%s)을 입력한 경우 유효하지 않은 값으로 판단한다.',
      testWrongCase
    );

    test.each(['1', '12', '123', '12345'])(
      '4자리가 아닌 경우(%s) 유효하지 않은 값으로 판단한다.',
      testWrongCase
    );

    test.each(['-000', '-0000', '-1', '-9999'])(
      '음수인 경우(%s) 유효하지 않은 값으로 판단한다.',
      testWrongCase
    );

    test.each(['0.111', '0.11', '0.1', '.111'])(
      '소수인 경우(%s) 유효하지 않은 값으로 판단한다.',
      testWrongCase
    );
  });

  describe('유효성 검증에 성공하는 경우', () => {
    test.each(['0000', '1234', '5678', '9999'])(
      '유효한 카드번호(%s)을 입력한 경우 유효한 값으로 판단한다.',
      testValidCase
    );
  });
});
