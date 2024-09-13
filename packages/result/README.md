# Result 패키지

## 개요

Result 패키지는 TypeScript로 작성된 라이브러리로, 비동기 작업의 결과를 표현하는 데 사용되는 `Result` 클래스를 제공합니다. 이 클래스는 `Promise<Either<Error, Ok>>`를 확장하여, 성공 또는 실패의 결과를 `Either` 타입으로 감싸서 반환합니다.

## 주요 메서드

- `success(value: Ok)`: 성공한 결과를 생성합니다. `Ok` 타입의 값을 받아 `Result` 인스턴스를 반환합니다.
- `failure(error: Error)`: 실패한 결과를 생성합니다. `Error` 타입의 값을 받아 `Result` 인스턴스를 반환합니다.
- `from(promise: Promise<Ok>)`: 주어진 프로미스를 기반으로 `Result` 인스턴스를 생성합니다.
- `fromNullable(error: Error)`: 주어진 에러를 기반으로 `Result` 인스턴스를 생성합니다.
- `isSuccess(either: Either<Error, Ok>)`: 주어진 `Either` 인스턴스가 성공한 결과인지 확인합니다.
- `isFailure(either: Either<Error, Ok>)`: 주어진 `Either` 인스턴스가 실패한 결과인지 확인합니다.

## 사용 방법

```javascript
import { Result } from 'result';

// 성공한 결과 생성
const successResult = Result.succeed('Success value');

// 실패한 결과 생성
const failureResult = Result.fail(new Error('Failure reason'));

// Promise를 기반으로 Result 생성
const promiseResult = Result.from(Promise.resolve('Promise value'));

// Nullable 값을 기반으로 Result 생성
const nullableResult = Result.fromNullable(new Error('Nullable error'))(Promise.resolve(null));
```

## 설치 방법

Node.js와 npm이 설치되어 있어야 합니다.

```bash
npm install result
```
