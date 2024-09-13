/**
 * Either 타입의 Left 측을 나타냅니다.
 * @typeparam E - Left 값의 타입입니다.
 * @typeparam T - Right 값의 타입입니다.
 */
export class Left<E, T> {
  /**
   * 지정된 값을 가지고 새로운 Left 인스턴스를 생성합니다.
   * @param left - Left 측의 값입니다.
   * @returns 새로운 Left 인스턴스입니다.
   */
  static of<E, T>(left: E): Either<E, T> {
    return new Left<E, T>(left);
  }

  /**
   * Left 인스턴스를 생성합니다.
   * @param value - Left 측의 값입니다.
   */
  constructor(readonly value: E) {}

  /**
   * 이 인스턴스가 Left 타입인지 확인합니다.
   * @returns 이 인스턴스가 Left 타입인 경우 true를 반환하고, 그렇지 않은 경우 false를 반환합니다.
   */
  isLeft(): this is Left<E, never> {
    return true;
  }

  /**
   * 이 인스턴스가 Right 타입인지 확인합니다.
   * @returns 이 인스턴스가 Right 타입인 경우 true를 반환하고, 그렇지 않은 경우 false를 반환합니다.
   */
  isRight(): this is Right<never, T> {
    return false;
  }

  /**
   * Left 측의 값을 새로운 U 타입의 값으로 매핑합니다.
   * @typeparam U - 새로운 값의 타입입니다.
   * @param op - 매핑 함수입니다.
   * @returns 매핑된 값을 가지고 새로운 Left 인스턴스입니다.
   */
  map<U>(op: (value: T) => U) {
    return Left.of<E, U>(this.value);
  }

  /**
   * Left 측의 값을 새로운 U 타입의 값으로 매핑합니다.
   * @typeparam U - 새로운 값의 타입입니다.
   * @param op - 매핑 함수입니다.
   * @returns 매핑된 값을 가지고 새로운 Left 인스턴스입니다.
   */
  mapLeft<U>(op: (value: E) => U) {
    return Left.of<U, T>(op(this.value));
  }

  /**
   * Left 측의 값과 Right 측의 값을 모두 새로운 값으로 매핑합니다.
   * @typeparam E2 - 새로운 Left 값의 타입입니다.
   * @typeparam U - 새로운 Right 값의 타입입니다.
   * @param options - Left와 Right 값에 대한 매핑 함수입니다.
   */
  mapBoth<E2, U>(options: {
    onLeft: (value: E) => E2;
    onRight: (value: T) => U;
  }) {
    return this.mapLeft(options.onLeft).map(options.onRight);
  }

  /**
   * 현재 값과 동일한 값을 가지는 Right 인스턴스를 반환합니다.
   * @returns {Right<T>} 현재 값과 동일한 값을 가지는 Right 인스턴스
   */
  flip() {
    return Right.of(this.value);
  }

  /**
   * 현재 값이 존재하지 않을 경우 예외를 발생시킵니다.
   * @throws {any} 현재 값
   * @returns {never}
   */
  getOrThrow(): never {
    throw this.value;
  }

  /**
   * 왼쪽 값이 있는 경우, 주어진 함수를 사용하여 예외를 throw합니다.
   * @param onLeft 왼쪽 값이 있는 경우 호출할 함수입니다.
   * @returns 예외를 throw합니다.
   * @throws {E2} 왼쪽 값이 있는 경우, 주어진 함수에서 throw한 예외입니다.
   */
  getOrThrowWith<E2>(onLeft: (left: E) => E2): never {
    throw onLeft(this.value);
  }

  /**
   * left value가 있다면 undefined를 반환합니다.
   * @returns left라면 undefined를 반환합니다.
   */
  getOrUndefined(): undefined {
    return undefined;
  }

  /**
   * left value가 있다면 null을 반환합니다.
   * @returns left라면 null을 반환합니다.
   */
  getOrNull(): null {
    return null;
  }

  /**
   * left value가 있다면 주어진 함수를 실행한 결과를 반환합니다.
   * @param onLeft left value가 있는 경우 호출할 함수입니다.
   * @returns left value가 있다면 주어진 함수를 실행한 결과를 반환합니다.
   */
  getOrElse<U>(onLeft: (left: E) => U): U {
    return onLeft(this.value);
  }

  /**
   * left value가 있다면 onLeft 함수를 실행하고, right value가 있다면 onRight 함수를 실행합니다.
   * @param options left value가 있는 경우와 right value가 있는 경우를 처리할 함수입니다.
   * @returns left value가 있다면 onLeft 함수를 실행하고, right value가 있다면 onRight 함수를 실행한 결과를 반환합니다.
   */
  match<U, V>(options: { onLeft: (value: E) => U; onRight: (value: T) => V }) {
    return options.onLeft(this.value);
  }

  /**
   * left value와 right value를 쌍으로 묶어 반환합니다.
   * @returns left value와 right value를 쌍으로 묶어 반환합니다.
   */
  toPair() {
    return [this.value, undefined] as const;
  }
}

/**
 * `Right` 클래스는 `Either` 클래스의 오른쪽 값을 나타내는 클래스입니다.
 * @template E - 왼쪽 값의 타입
 * @template T - 오른쪽 값의 타입
 */
export class Right<E, T> {
  /**
   * 주어진 값으로 `Right` 인스턴스를 생성합니다.
   * @param right - 오른쪽 값
   * @returns `Right` 인스턴스
   */
  static of<E, T>(right: T): Either<E, T> {
    return new Right<E, T>(right);
  }

  /**
   * `Right` 인스턴스를 생성합니다.
   * @param value - `Right` 인스턴스의 값을 가져옵니다.
   */
  private constructor(readonly value: T) {}

  /**
   * 현재 인스턴스가 `Left` 인스턴스인지 확인합니다.
   * @returns `Left` 인스턴스인 경우 `true`, 그렇지 않은 경우 `false`
   */
  isLeft(): this is Left<E, never> {
    return false;
  }

  /**
   * 현재 인스턴스가 `Right` 인스턴스인지 확인합니다.
   * @returns `Right` 인스턴스인 경우 `true`, 그렇지 않은 경우 `false`
   */
  isRight(): this is Right<never, T> {
    return true;
  }

  /**
   * 현재 인스턴스의 값을 변환하여 새로운 `Right` 인스턴스를 생성합니다.
   * @param op - 변환 함수
   * @returns 변환된 `Right` 인스턴스
   */
  map<U>(op: (value: T) => U) {
    return Right.of<E, U>(op(this.value));
  }

  /**
   * 현재 인스턴스의 왼쪽 값을 변환하여 새로운 `Right` 인스턴스를 생성합니다.
   * @param op - 변환 함수
   * @returns 변환된 `Right` 인스턴스
   */
  mapLeft<U>(op: (value: E) => U) {
    return Right.of<U, T>(this.value);
  }

  /**
   * 현재 인스턴스의 값을 왼쪽과 오른쪽 모두 변환하여 새로운 `Right` 인스턴스를 생성합니다.
   * @param options - 변환 함수
   * @returns 변환된 `Right` 인스턴스
   */
  mapBoth<E2, U>(options: {
    onLeft: (value: E) => E2;
    onRight: (value: T) => U;
  }) {
    return this.mapLeft(options.onLeft).map(options.onRight);
  }

  /**
   * 현재 인스턴스의 값을 `Left` 인스턴스로 변환합니다.
   * @returns `Left` 인스턴스
   */
  flip() {
    return Left.of(this.value);
  }

  /**
   * 현재 인스턴스의 값을 반환합니다.
   * @returns 현재 인스턴스의 값
   */
  getOrThrow() {
    return this.value;
  }

  /**
   * 현재 인스턴스의 값을 반환합니다. 왼쪽 값이 있는 경우 주어진 함수를 사용하여 예외를 발생시킵니다.
   * @param onLeft - 왼쪽 값이 있는 경우 예외를 발생시키기 위한 함수
   * @returns 현재 인스턴스의 값
   */
  getOrThrowWith<E2>(onLeft: (left: E) => E2) {
    return this.value;
  }

  /**
   * 현재 인스턴스의 값을 반환합니다.
   * @returns 현재 인스턴스의 값
   */
  getOrUndefined() {
    return this.value;
  }

  /**
   * 현재 인스턴스의 값을 반환합니다.
   * @returns 현재 인스턴스의 값
   */
  getOrNull() {
    return this.value;
  }

  /**
   * 현재 인스턴스의 값을 반환합니다. 왼쪽 값이 있는 경우 주어진 함수를 사용하여 대체 값을 반환합니다.
   * @param onLeft - 왼쪽 값이 있는 경우 대체 값을 반환하기 위한 함수
   * @returns 현재 인스턴스의 값 또는 대체 값을 반환
   */
  getOrElse<U>(onLeft: (left: E) => U) {
    return this.value;
  }

  /**
   * 현재 인스턴스의 값을 주어진 함수에 맞게 처리합니다.
   * @param options - 처리 함수
   * @returns 처리 결과
   */
  match<U, V>(options: { onLeft: (value: E) => U; onRight: (value: T) => V }) {
    return options.onRight(this.value);
  }

  /**
   * 현재 인스턴스의 값을 `[undefined, value]` 형태의 배열로 반환합니다.
   * @returns `[undefined, value]` 형태의 배열
   */
  toPair() {
    return [undefined, this.value] as const;
  }
}

/**
 * Either 타입은 Left 또는 Right로 구성된 유니온 타입입니다.
 *
 * @template E Left 타입의 제네릭 타입 매개변수입니다.
 * @template T Right 타입의 제네릭 타입 매개변수입니다.
 */
export type Either<E, T> = Left<E, T> | Right<E, T>;

/**
 * Either 모나드를 생성하는 유틸리티 함수를 제공하는 객체입니다.
 */
export const Either = {
  /**
   * 왼쪽 값을 가지는 Either 인스턴스를 생성합니다.
   * @param error - 왼쪽 값으로 사용될 에러 객체
   * @returns 왼쪽 값을 가지는 Either 인스턴스
   */
  left<E, T>(error: E) {
    return Left.of<E, T>(error);
  },

  /**
   * 오른쪽 값을 가지는 Either 인스턴스를 생성합니다.
   * @param value - 오른쪽 값으로 사용될 값
   * @returns 오른쪽 값을 가지는 Either 인스턴스
   */
  right<E, T>(value: T) {
    return Right.of<E, T>(value);
  },

  /**
   * 널 또는 정의되지 않은 값을 처리하는 Either 인스턴스를 생성하는 함수를 반환합니다.
   * @param error - 널 또는 정의되지 않은 값일 경우 사용될 에러 객체
   * @returns 널 또는 정의되지 않은 값을 처리하는 Either 인스턴스를 생성하는 함수
   */
  fromNullable<E, T>(error: E) {
    return (value: T) => {
      if (value === null || value === undefined) {
        return Either.left<E, NonNullable<T>>(error);
      }

      return Either.right<E, NonNullable<T>>(value);
    };
  },

  /**
   * 주어진 Either 인스턴스가 왼쪽 값을 가지는지 여부를 확인합니다.
   * @param either - 확인할 Either 인스턴스
   * @returns 주어진 Either 인스턴스가 왼쪽 값을 가지면 true, 그렇지 않으면 false를 반환합니다.
   */
  isLeft<E, T>(either: Either<E, T>): either is Left<E, never> {
    return either.isLeft();
  },

  /**
   * 주어진 Either 인스턴스가 오른쪽 값을 가지는지 여부를 확인합니다.
   * @param either - 확인할 Either 인스턴스
   * @returns 주어진 Either 인스턴스가 오른쪽 값을 가지면 true, 그렇지 않으면 false를 반환합니다.
   */
  isRight<E, T>(either: Either<E, T>): either is Either<never, T> {
    return either.isRight();
  },
};
