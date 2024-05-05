import React from 'react';
import { renderHook } from '@testing-library/react';
import useCVC from '.';

describe('useCVC에 대한 테스트 케이스', () => {
  const testWrongCase = (cvc: string) => {
    const { result } = renderHook(() => useCVC());

    React.act(() => result.current.setCVC(cvc));

    expect(result.current.isValid).toBe(false);
    expect(result.current.errorMessage).not.toBeNull();
  };

  const testValidCase = (cvc: string) => {
    const { result } = renderHook(() => useCVC());

    React.act(() => result.current.setCVC(cvc));

    expect(result.current.isValid).toBe(true);
    expect(result.current.errorMessage).toBeNull();
  };

  describe('유효성 검증에 실패하는 경우', () => {
    test.each(['abc', 'ABC', '12a'])(
      '숫자가 아닌 값(%s)을 입력한 경우 유효하지 않은 값으로 판단한다.',
      testWrongCase
    );

    test.each(['1', '12', '1234'])(
      '3자리가 아닌 경우(%s) 유효하지 않은 값으로 판단한다.',
      testWrongCase
    );

    test.each(['-00', '-000', '-1', '-999'])(
      '음수인 경우(%s) 유효하지 않은 값으로 판단한다.',
      testWrongCase
    );

    test.each(['0.11', '1.11', '1.1', '.11', '.111'])(
      '소수인 경우(%s) 유효하지 않은 값으로 판단한다.',
      testWrongCase
    );
  });

  describe('유효성 검증에 성공하는 경우', () => {
    test.each(['000', '123', '456', '999'])(
      '유효한 CVC(%s)을 입력한 경우 유효한 값으로 판단한다.',
      testValidCase
    );
  });
});
