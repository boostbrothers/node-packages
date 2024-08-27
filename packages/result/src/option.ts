/**
 * None 클래스는 값이 없는 옵션을 나타내는 클래스입니다.
 * @template T - 옵션의 값의 타입입니다. 기본값은 `never`입니다.
 */
export class None<T = never> {
  value = undefined;

  /**
   * None 객체를 생성하여 반환합니다.
   * @returns {None} None 객체
   */
  static Do() {
    return new None();
  }

  /**
   * 현재 옵션이 None인지 확인합니다.
   * @returns {boolean} 현재 옵션이 None인 경우 true, 그렇지 않은 경우 false
   */
  isNone(): this is None {
    return true;
  }

  /**
   * 현재 옵션이 Some인지 확인합니다.
   * @returns {boolean} 현재 옵션이 Some인 경우 true, 그렇지 않은 경우 false
   */
  isSome(): this is Some<T> {
    return false;
  }

  /**
   * 현재 옵션에 매핑 함수를 적용한 결과를 반환합니다.
   * @returns {None} 현재 옵션
   */
  map() {
    return this;
  }

  /**
   * 현재 옵션에 평면 매핑 함수를 적용한 결과를 반환합니다.
   * @returns {None} 현재 옵션
   */
  flatMap() {
    return this;
  }

  /**
   * 현재 옵션과 다른 옵션을 조합한 결과를 반환합니다.
   * @param {Option<T>} other - 다른 옵션
   * @returns {None} 현재 옵션
   */
  and(other: Option<T>) {
    return this;
  }

  /**
   * 현재 옵션과 다른 옵션을 대체한 결과를 반환합니다.
   * @param {Option<T>} other - 다른 옵션
   * @returns {Option<T>} 대체된 옵션
   */
  or(other: Option<T>) {
    return other;
  }

  /**
   * 현재 옵션의 값을 반환하거나, 에러를 던집니다.
   * @param {Error} error - 에러 객체
   * @returns {never} 에러를 던집니다.
   * @throws {Error} 에러 객체
   */
  getOrThrow(error: Error) {
    throw error;
  }

  /**
   * 현재 옵션의 값을 반환하거나, undefined를 반환합니다.
   * @returns {undefined} undefined
   */
  getOrUndefined() {
    return undefined;
  }

  /**
   * 현재 옵션의 값을 반환하거나, null을 반환합니다.
   * @returns {null} null
   */
  getOrNull() {
    return null;
  }

  /**
   * 현재 옵션의 값을 반환하거나, 다른 값을 반환합니다.
   * @param {() => U} onNone - None일 경우 반환할 값 또는 함수
   * @returns {U} 반환값
   */
  getOr<U>(onNone: () => U) {
    return onNone();
  }

  /**
   * 현재 옵션의 값을 패턴 매칭하여 처리합니다.
   * @param {{ onNone: () => U; onSome: (value: T) => V }} options - 패턴 매칭 옵션
   * @returns {U} None일 경우 onNone 함수의 반환값
   */
  match<U, V>(options: { onNone: () => U; onSome: (value: T) => V }) {
    return options.onNone();
  }

  /**
   * 현재 옵션의 값을 반환합니다.
   * @returns {undefined} undefined
   */
  valueOf() {
    return this.value;
  }

  /**
   * 현재 옵션을 JSON 문자열로 변환합니다.
   * @returns {string} JSON 문자열
   */
  toJSON() {
    return JSON.stringify(this.value);
  }
}

/**
 * 옵션(Some) 클래스는 값이 있는 경우를 나타내는 클래스입니다.
 * @template T - 값의 타입
 */
export class Some<T> {
  /**
   * 주어진 값으로 Some 인스턴스를 생성합니다.
   * @param value - 값
   * @returns 생성된 Some 인스턴스
   */
  static of<T>(value: T) {
    return new Some(value);
  }

  /**
   * Some 인스턴스를 생성합니다.
   * @param value - 값
   */
  constructor(public value: T) {}

  /**
   * None인지 확인합니다.
   * @returns None이면 true, 아니면 false
   */
  isNone(): this is None {
    return false;
  }

  /**
   * Some인지 확인합니다.
   * @returns Some이면 true, 아니면 false
   */
  isSome(): this is Some<T> {
    return true;
  }

  /**
   * 주어진 함수를 사용하여 값을 변환한 후, 새로운 Some 인스턴스를 반환합니다.
   * @template U - 변환된 값의 타입
   * @param op - 변환 함수
   * @returns 변환된 값으로 생성된 Some 인스턴스
   */
  map<U>(op: (value: T) => U): Some<U> {
    return Some.of(op(this.value));
  }

  /**
   * 주어진 함수를 사용하여 값을 변환한 후, 변환된 Some 인스턴스를 반환합니다.
   * @param op - 변환 함수
   * @returns 변환된 Some 인스턴스
   */
  flatMap(op: (value: T) => Some<T>): Some<T> {
    return op(this.value);
  }

  /**
   * 다른 옵션과 함께 사용할 때, 다른 옵션을 반환합니다.
   * @param other - 다른 옵션
   * @returns 다른 옵션
   */
  and(other: Option<T>) {
    return other;
  }

  /**
   * 다른 옵션과 함께 사용할 때, 현재 옵션을 반환합니다.
   * @param other - 다른 옵션
   * @returns 현재 옵션
   */
  or(other: Option<T>) {
    return this;
  }

  /**
   * 값이 존재하면 해당 값을 반환하고, 값이 없으면 주어진 에러를 throw합니다.
   * @param error - 에러
   * @returns 값
   * @throws 주어진 에러
   */
  getOrThrow(error: Error) {
    return this.value;
  }

  /**
   * 값이 존재하면 해당 값을 반환하고, 값이 없으면 undefined를 반환합니다.
   * @returns 값 또는 undefined
   */
  getOrUndefined() {
    return this.value;
  }

  /**
   * 값이 존재하면 해당 값을 반환하고, 값이 없으면 null을 반환합니다.
   * @returns 값 또는 null
   */
  getOrNull() {
    return this.value;
  }

  /**
   * 값이 존재하면 해당 값을 반환하고, 값이 없으면 주어진 함수의 반환값을 반환합니다.
   * @template U - 반환값의 타입
   * @param onNone - 값이 없을 때 호출할 함수
   * @returns 값 또는 주어진 함수의 반환값
   */
  getOr<U>(onNone: () => U) {
    return this.value;
  }

  /**
   * None 또는 Some에 대한 처리를 수행합니다.
   * @template U - None일 때 반환값의 타입
   * @template V - Some일 때 반환값의 타입
   * @param options - None 및 Some에 대한 처리 함수들
   * @returns None 또는 Some에 대한 처리 결과
   */
  match<U, V>(options: { onNone: () => U; onSome: (value: T) => V }) {
    return options.onSome(this.value);
  }

  /**
   * 현재 값의 원시 타입 값을 반환합니다.
   * @returns 원시 타입 값
   */
  valueOf() {
    return this.value;
  }

  /**
   * 현재 값을 JSON 문자열로 변환합니다.
   * @returns JSON 문자열
   */
  toJSON() {
    return JSON.stringify(this.value);
  }
}

/**
 * 옵션 타입입니다.
 * @template T - 값의 타입
 */
export type Option<T> = None<T> | Some<T>;

/**
 * 옵션 객체를 생성하는 유틸리티 함수를 제공합니다.
 */
export const Option = {
  /**
   * 값이 없는 옵션 객체를 생성합니다.
   * @returns {None} 값이 없는 옵션 객체
   */
  none() {
    return new None();
  },

  /**
   * 주어진 값으로 옵션 객체를 생성합니다.
   * @param {T} value - 옵션 객체에 포함될 값
   * @returns {Some<T>} 주어진 값으로 생성된 옵션 객체
   */
  some<T>(value: T) {
    return new Some(value);
  },

  /**
   * 주어진 값이 null 또는 undefined인 경우 값이 없는 옵션 객체를 생성하고,
   * 그렇지 않은 경우 주어진 값으로 옵션 객체를 생성합니다.
   * @param {T} value - 옵션 객체에 포함될 값
   * @returns {None<NonNullable<T>> | Some<NonNullable<T>>} 주어진 값에 따라 생성된 옵션 객체
   */
  fromNullable<T>(value: T) {
    if (value === null || value === undefined) {
      return new None<NonNullable<T>>();
    }

    return new Some<NonNullable<T>>(value);
  },
};
