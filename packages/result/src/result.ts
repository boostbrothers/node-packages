import { Either, Left, Right } from './either';
import { UnhandledResultError } from './error';
import type { InferResultError, InferResultOk } from './result.type';

/**
 * `Result` 클래스는 `Promise`를 상속받은 클래스로, `Either` 타입을 반환하는 비동기 작업을 나타냅니다.
 * `Error`와 `Ok` 제네릭 타입을 받아서 `Either<Error, Ok>`를 반환합니다.
 */
export class Result<Error = UnhandledResultError, Ok = never> extends Promise<
  Either<Error, Ok>
> {
  /**
   * 정적 메서드인 [Symbol.species]의 TSDoc 주석입니다.
   * 이 메서드는 Promise를 반환합니다.
   */
  static get [Symbol.species]() {
    return Promise;
  }

  /**
   * 성공적인 결과를 생성합니다.
   *
   * @template Error - 에러 타입
   * @template Ok - 성공 타입
   * @param value - 성공 값
   * @returns 성공 결과
   * @deprecated use `Result.succeed` instead
   */
  static success<Ok>(value: Ok) {
    return new Result(Promise.resolve(Either.right<never, Ok>(value)));
  }

  /**
   * 성공적인 결과를 생성합니다.
   *
   * @template Error - 에러 타입
   * @template Ok - 성공 타입
   * @param value - 성공 값
   * @returns 성공 결과
   */
  static succeed<Ok>(value: Ok) {
    return new Result(Promise.resolve(Either.right<never, Ok>(value)));
  }

  /**
   * 실패한 결과를 생성합니다.
   *
   * @template Error - 실패한 결과의 에러 타입
   * @template Ok - 실패한 결과의 성공 타입
   * @param {Error} error - 실패한 결과의 에러 객체
   * @returns {Result<Error, Ok>} - 실패한 결과 객체
   * @deprecated use `Result.fail` instead
   */
  static failure<Error>(error: Error) {
    return new Result(Promise.resolve(Either.left<Error, never>(error)));
  }

  /**
   * 실패한 결과를 생성합니다.
   *
   * @template Error - 실패한 결과의 에러 타입
   * @template Ok - 실패한 결과의 성공 타입
   * @param {Error} error - 실패한 결과의 에러 객체
   * @returns {Result<Error, Ok>} - 실패한 결과 객체
   */
  static fail<Error>(error: Error) {
    return new Result(Promise.resolve(Either.left<Error, never>(error)));
  }

  /**
   * Promise를 이용하여 Result 객체를 생성합니다.
   *
   * @template Error - 에러 타입
   * @template Ok - 성공 타입
   * @param {Promise<Ok>} promise - Promise 객체
   * @returns {Result<Error, Ok>} - Result 객체
   */
  static from<Ok, Error = UnhandledResultError>(
    promise: Promise<Ok>
  ): Result<Error, Ok> {
    return new Result(
      promise.then(Either.right, Either.left) as Promise<Either<Error, Ok>>
    );
  }

  /**
   * 지정된 오류를 사용하여 Nullable 값을 Result로 변환합니다.
   *
   * @template Error - 오류 유형
   * @template Ok - 성공 유형
   * @param {Error} error - 변환 중에 발생한 오류
   * @returns - 변환된 Result 객체를 반환하는 함수
   */
  static fromNullable<Error, Ok>(error: Error) {
    return (value: NonNullable<Ok> | null | undefined) =>
      new Result(Promise.resolve(value).then(Either.fromNullable(() => error)));
  }

  /**
   * isSuccess 함수는 Either 타입이 Right인지 확인합니다.
   * @param either Either 타입 객체
   * @returns either가 Right인 경우 true를 반환하고, 그렇지 않은 경우 false를 반환합니다.
   */
  static isSuccess<Error, Ok>(
    either: Either<Error, Ok>
  ): either is Right<never, Ok> {
    return either.isRight();
  }

  /**
   * 주어진 Either 객체가 Failure인지 확인합니다.
   * @param either 확인할 Either 객체
   * @returns 주어진 Either 객체가 Failure인 경우 true, 그렇지 않은 경우 false를 반환합니다.
   */
  static isFailure<Error, Ok>(
    either: Either<Error, Ok>
  ): either is Left<Error, never> {
    return either.isLeft();
  }

  static allOf<Error, Ok, Results extends readonly Result<Error, Ok>[]>(
    results: [...Results]
  ): Result<InferResultError<[...Results]>, InferResultOk<[...Results]>> {
    return new Result(
      Promise.all(results).then(results => {
        const allPassed = results.every(result => result.isRight());

        if (!allPassed) {
          return Either.left(
            results.map(result =>
              result.isLeft() ? result.value : null
            ) as InferResultError<[...Results]>
          );
        }

        return Either.right(
          results.map(result => result.value) as InferResultOk<[...Results]>
        );
      })
    );
  }

  private constructor(private readonly result: Promise<Either<Error, Ok>>) {
    super(resolve =>
      result.then(
        either => resolve(either),
        reason => resolve(Left.of<Error, Ok>(reason))
      )
    );
  }

  /**
   * 새로운 Result를 반환하는 flatMap 함수입니다.
   * 주어진 함수를 사용하여 현재 Result의 값을 변환하고, 변환된 값을 사용하여 새로운 Result를 생성합니다.
   * 만약 현재 Result가 Ok인 경우에만 변환 함수가 실행됩니다.
   * 변환 함수가 Ok 값을 반환하면 변환된 Result가 반환되고, Error 값을 반환하면 변환된 Result에는 Error 값이 추가됩니다.
   *
   * @typeparam Error2 변환 함수가 반환하는 Result의 Error 타입
   * @typeparam Ok2 변환 함수가 반환하는 Result의 Ok 타입
   * @param op 변환 함수
   * @returns 변환된 Result
   *
   * @example
   * const result = new Result<Error, number>(10);
   * const newResult = result.flatMap(value => {
   *   if (value > 0) {
   *     return new Result<Error, string>(`Value is positive: ${value}`);
   *   } else {
   *     return new Result<Error, string>(new Error('Value is not positive'));
   *   }
   * });
   * // newResult: Result<Error, string>
   */
  flatMap<Error2, Ok2>(
    op: (value: Ok) => Result<Error2, Ok2>
  ): Result<Error | Error2, Ok2> {
    return new Result(
      this.then(async either => {
        if (either.isRight()) {
          return await op(either.value);
        }

        return either as Left<Error, never>;
      })
    );
  }

  /** flatMap의 alias입니다. */
  chain = this.flatMap.bind(this) as Result['flatMap'];

  /**
   * 매핑 함수를 적용하여 새로운 Result 객체를 반환합니다.
   *
   * @template Ok2 - 매핑 함수의 반환 타입
   * @param {function(Ok): Ok2} op - 매핑 함수
   * @returns {Result<Ok2>} - 매핑된 결과를 가지는 새로운 Result 객체
   *
   * @example
   * const result = Result.succeed(10);
   * const mappedResult = result.map(value => value * 2);
   * console.log(mappedResult); // Result { value: 20 }
   */
  map<Ok2>(op: (value: Ok) => Ok2) {
    return new Result(this.then(either => either.map(op)));
  }

  /**
   * 매핑된 에러를 반환하는 함수를 적용하여 새로운 Result 객체를 반환합니다.
   * @template Error2 - 매핑된 에러의 타입
   * @param {function} op - 에러를 매핑하는 함수
   * @returns {Result<Error2>} - 매핑된 에러를 가지는 새로운 Result 객체
   * @example
   * const result = Result.fail(new Error('Something went wrong'));
   * const mappedResult = result.mapError(err => new CustomError(err.message));
   * console.log(mappedResult); // Result { value: Left(CustomError: Something went wrong) }
   */
  mapError<Error2>(op: (err: Error) => Error2) {
    return new Result(this.then(either => either.mapLeft(op)));
  }

  /**
   * `mapBoth` 함수는 `Result` 객체의 값을 변환하는 메서드입니다.
   * `onFailure` 콜백 함수는 `Result` 객체가 실패(`Left`)일 경우 호출되며, 에러를 변환하여 반환합니다.
   * `onSuccess` 콜백 함수는 `Result` 객체가 성공(`Right`)일 경우 호출되며, 값을 변환하여 반환합니다.
   *
   * @typeparam Error2 - 실패(`Left`) 시 반환될 에러 타입
   * @typeparam Ok2 - 성공(`Right`) 시 반환될 값 타입
   * @param options - `onFailure`와 `onSuccess` 콜백 함수를 포함한 객체
   * @param options.onFailure - 실패(`Left`) 시 호출될 콜백 함수
   * @param options.onSuccess - 성공(`Right`) 시 호출될 콜백 함수
   * @returns `Result` 객체의 값을 변환한 새로운 `Result` 객체
   *
   * @example
   * const result = Result.succeed<Error, number>(10);
   * const mappedResult = result.mapBoth({
   *   onFailure: (err) => new CustomError(err.message),
   *   onSuccess: (value) => value * 2,
   * });
   * // mappedResult: Result<CustomError, number>
   */
  mapBoth<Error2, Ok2>(options: {
    onFailure: (err: Error) => Error2;
    onSuccess: (value: Ok) => Ok2;
  }) {
    return new Result<Error2, Ok2>(
      this.then(either =>
        either.mapBoth({
          onLeft: options.onFailure,
          onRight: options.onSuccess,
        })
      )
    );
  }

  /**
   * 현재 성공한 Result와 다른 Result를 조합하여 새로운 Result를 반환합니다.
   * @template Error2 - 다른 Result의 에러 타입
   * @template Ok2 - 다른 Result의 성공 타입
   * @param {Result<Error2, Ok2>} other - 다른 Result
   * @returns {Result<Error2, Ok2>} - 조합된 Result
   * @example
   * const result1 = Result.succeed(10);
   * const result2 = Result.fail("Error");
   * const combinedResult = result1.and(result2);
   * // combinedResult: Result<Error, Ok2> = Result.fail("Error")
   */
  and<Error2, Ok2>(other: Result<Error2, Ok2>) {
    return this.flatMap(() => other);
  }

  /**
   * 다른 Result 인스턴스와 결합하여 현재 Result 인스턴스가 에러인 경우에만 다른 Result 인스턴스를 반환합니다.
   *
   * @template Error2 - 다른 Result 인스턴스의 에러 유형
   * @template Ok - 다른 Result 인스턴스의 성공 유형
   * @param {Result<Error2, Ok>} other - 결합할 다른 Result 인스턴스
   * @returns {Result<Error2, Ok>} - 현재 Result 인스턴스가 에러인 경우에만 다른 Result 인스턴스를 반환합니다.
   *
   * @example
   * const result1 = Result.error("Error");
   * const result2 = Result.ok("Success");
   * const combinedResult = result1.or(result2); // result2를 반환합니다.
   */
  or<Error2, Ok>(other: Result<Error2, Ok>) {
    return this.orElse(() => other);
  }

  /**
   * 다른 Result 인스턴스를 반환하는 메서드입니다.
   * 에러가 발생한 경우, 주어진 함수를 실행하여 새로운 Result 인스턴스를 반환합니다.
   * 에러가 발생하지 않은 경우, 현재 Result 인스턴스를 그대로 반환합니다.
   * @typeparam Error2 새로운 Result의 에러 타입
   * @typeparam Ok2 새로운 Result의 성공 타입
   * @param op 에러가 발생한 경우 실행할 함수
   * @returns 새로운 Result 인스턴스 또는 현재 Result 인스턴스
   * @example
   * const result = Result.succeed<Error, number>(10);
   * const newResult = result.orElse((err) => {
   *   console.error(err);
   *   return Result.fail<CustomError, string>("error occurred");
   * });
   */
  orElse<Error2, Ok2>(
    op: (err: Error) => Result<Error2, Ok2>
  ): Result<Error2, Ok | Ok2> {
    return new Result(
      this.then(async either => {
        if (either.isLeft()) {
          return await op(either.value);
        }

        return either as Right<never, Ok>;
      })
    );
  }

  /**
   * 현재 Result 객체에 비동기 작업을 수행하는 함수를 적용하고, 새로운 Result 객체를 반환합니다.
   * 비동기 작업이 성공적으로 수행되면, 원래의 Result 객체를 반환합니다.
   * @param op 비동기 작업을 수행하는 함수
   * @example
   * const result = Result.succeed(10);
   * const newResult = result.tap(async (value) => {
   *   console.log(value); // 10
   *   await someAsyncFunction();
   * });
   */
  tap(op: (value: Ok) => Promise<void>) {
    return new Result(
      this.then(async either => {
        if (Either.isRight(either)) {
          await either.map(op).value;
        }

        return either;
      })
    );
  }

  /**
   * 에러가 발생했을 때 지정된 동작을 수행하는 메서드입니다.
   * @param op 에러가 발생했을 때 수행할 비동기 함수입니다.
   * @example
   * ```typescript
   * const result = Result.fail<Error, Ok>(value);
   * result.tapError(async (err) => {
   *   console.log('에러가 발생했습니다:', err);
   * });
   * ```
   */
  tapError(op: (err: Error) => Promise<void>) {
    return new Result<Error, Ok>(
      this.then(async either => {
        if (Either.isLeft(either)) {
          await either.mapLeft(op).value;
        }

        return either;
      })
    );
  }

  swap() {
    return new Result(this.then(either => either.flip()));
  }

  async getOrThrow(): Promise<Awaited<Ok>> {
    return await this.then(either => either.getOrThrow());
  }

  async getOrThrowWith(op: (err: Error) => unknown): Promise<Awaited<Ok>> {
    return await this.then(either => either.getOrThrowWith(op));
  }

  async getOrUndefined(): Promise<Awaited<Ok> | undefined> {
    return await this.then(either => either.getOrUndefined());
  }

  async getOrNull(): Promise<Awaited<Ok> | null> {
    return await this.then(either => either.getOrNull());
  }

  async getOrElse<Ok2>(op: (err: Error) => Ok2): Promise<Awaited<Ok | Ok2>> {
    return await this.then(either => either.getOrElse(op));
  }

  /**
   * 비동기적으로 Result 값을 매칭하는 메서드입니다.
   *
   * @param options - 매칭 옵션 객체
   * @param options.onFailure - 실패 시 호출될 콜백 함수
   * @param options.onSuccess - 성공 시 호출될 콜백 함수
   * @returns Promise<Ok2 | Ok3> - 실패 시 onFailure의 반환값 또는 성공 시 onSuccess의 반환값을 갖는 Promise 객체
   *
   * @example
   * const result = Result.succeed();
   *
   * const options = {
   *   onFailure: (err: Error) => {
   *     console.error(err);
   *     return "failure";
   *   },
   *   onSuccess: (value: Ok) => {
   *     console.log(value);
   *     return "success";
   *   }
   * };
   *
   * const matchedValue = await result.match(options);
   * console.log(matchedValue); // "failure" 또는 "success"
   */
  async match<Ok2, Ok3 = Ok2>(options: {
    onFailure: (err: Error) => Ok2;
    onSuccess: (value: Ok) => Ok3;
  }): Promise<Ok2 | Ok3> {
    return await this.then(either =>
      either.match({
        onLeft: options.onFailure,
        onRight: options.onSuccess,
      })
    );
  }

  /**
   * 현재 Result 객체를 [Error, undefined] 또는 [undefined, Ok] 형태의 Promise로 변환합니다.
   * @returns [Error, undefined] 또는 [undefined, Ok] 형태의 Promise
   */
  async toPair(): Promise<
    readonly [Error, undefined] | readonly [undefined, Ok]
  > {
    return await this.then(either => either.toPair());
  }
}
