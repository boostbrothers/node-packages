# Please 패키지

## 개요

`Please`는 axios, got, node-fetch 같은 HTTP Request Client 라이브러리입니다.

기존 라이브러리들을 사용하지 않고 새롭게 만들게 된 이유는 하기를 참고하시기 바랍니다.

- ROP Pattern(`@boostbrothers/result`)을 적용하기 위해서
- SDK 생성/관리/사용의 어려움을 우회하기 위해서

### 🚨 **중요 참고사항**은 하기를 참고하시기 바랍니다.

- axios 래핑 구현체이므로 axios의 설정을 따라갑니다.
- 요청의 반환값은 Result 객체입니다.
- HttpClient 생성자 초기화 시, [openapi-typescript](https://openapi-ts.dev/)의 생성된 타입을 넣어주면 url 부터 parameters, response까지 추론됩니다.

## 사용 방법

```javascript
import { HttpClient } from '@boostbrothers/please';
import { paths } from '../models/server';

const API = new HttpClient('Server Base URL', { /* default options */});

const resp: Result<ErrorResponse, SuccessResponse> = API.GET('url', { /* request options */});
```

Please의 요청 반환 값은 Result 패키지로 래핑되어 있습니다.

### HttpClient Default Options

- `headers`: 기본 헤더
- `timeout`: 요청 만료 시간(default: 0)

### Request Options

- `headers`: HTTP Headers
- `path`: URL Path Parameters
- `query`: GET Query Parameters
- `body`: POST, PUT, PATCH, DELETE의 Body Data
- `signal`: AbortSignal Instance

## 설치 방법

Node.js와 npm이 설치되어 있어야 합니다.

```bash
npm install @boostbrothers/please
```
