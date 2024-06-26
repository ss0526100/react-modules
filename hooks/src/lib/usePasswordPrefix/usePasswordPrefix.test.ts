import React from "react";
import { renderHook } from "@testing-library/react";
import usePasswordPrefix from ".";

describe("usePasswordPrefix에 대한 테스트 케이스", () => {
  describe("유효성 검증에 실패하는 경우", () => {
    test.each(["ab", "AB", "1a"])(
      "숫자가 아닌 값(%s)을 입력한 경우 유효하지 않은 값으로 판단한다.",
      (value) => {
        const { result } = renderHook(() => usePasswordPrefix());

        React.act(() => result.current.setPasswordPrefix(value));

        expect(result.current.errorStatus.isValid).toBe(false);
        expect(result.current.errorStatus.errorMessage).not.toBeNull();
      }
    );

    test.each(["1", "123"])("2자리가 아닌 경우(%s) 유효하지 않은 값으로 판단한다.", (value) => {
      const { result } = renderHook(() => usePasswordPrefix());

      React.act(() => result.current.setPasswordPrefix(value));

      expect(result.current.errorStatus.isValid).toBe(false);
      expect(result.current.errorStatus.errorMessage).not.toBeNull();
    });

    test.each(["-10", "-1", "-99"])("음수인 경우(%s) 유효하지 않은 값으로 판단한다.", (value) => {
      const { result } = renderHook(() => usePasswordPrefix());

      React.act(() => result.current.setPasswordPrefix(value));

      expect(result.current.errorStatus.isValid).toBe(false);
      expect(result.current.errorStatus.errorMessage).not.toBeNull();
    });
  });

  describe("유효성 검증에 성공하는 경우", () => {
    test.each(["00", "12", "45", "99"])(
      "유효한 비밀번호 앞자리(%s)을 입력한 경우 유효한 값으로 판단한다.",
      (value) => {
        const { result } = renderHook(() => usePasswordPrefix());

        React.act(() => result.current.setPasswordPrefix(value));

        expect(result.current.errorStatus.isValid).toBe(true);
        expect(result.current.errorStatus.errorMessage).toBeNull();
      }
    );
  });
});
