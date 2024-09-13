import { URLSearchParams } from 'url';
import {
  ErrorStatus,
  FilterKeys,
  HttpMethod,
  JSONLike,
  PathItemObject,
  RequestBodyJSON,
  ResponseContent,
  ResponseObjectMap,
  SuccessResponse,
} from 'openapi-typescript-helpers';

/**
 * Simplify<T>는 T와 동일하지만 모든 속성이 명시적으로 나열된 새로운 타입을 생성합니다.
 * 이는 일부 경우에 타입 추론을 개선하는 데 유용할 수 있습니다.
 */
export type Simplify<T> = { [KeyType in keyof T]: T[KeyType] } & {};

/**
 * Optional<T, K>는 T를 기반으로 하는 새로운 타입을 생성하며, K로 지정된 속성들은
 * 선택적(optional)으로 만듭니다. 이는 일부 필드만 선택적인 타입을 생성할 때 유용합니다.
 */
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>;

/**
 * HeadersType은 HTTP 헤더의 구조를 나타냅니다.
 * 이는 키가 문자열이고 값이 문자열, 문자열 배열, 또는 undefined일 수 있는 레코드입니다.
 */
export type HeadersType = Record<string, string | string[] | undefined>;

/**
 * ExtractParameters<Method, Path, Paths>는 Paths 객체에서 특정 HTTP 메서드와 경로에 대한
 * 매개변수를 추출합니다. 매개변수가 존재하면 해당 매개변수를 반환하고, 그렇지 않으면 빈 객체를 반환합니다.
 * 이 타입은 OpenAPI 경로 정의에서 타입이 지정된 매개변수를 추출하는 데 유용합니다.
 */
export type ExtractParameters<
  Method extends HttpMethod,
  Path extends keyof Paths,
  Paths extends PathObject
> = Paths[Path] extends { [K in Method]: { parameters: infer U } } ? U : {};

/**
 * PathObject<T>는 경로를 해당 PathItemObject에 매핑합니다.
 * 이는 기본적으로 빈 객체를 확장하는 제네릭 타입으로, 사용자 정의 경로 정의를 허용합니다.
 * 이 타입은 일반적으로 OpenAPI 명세의 paths 섹션을 나타내는 데 사용됩니다.
 */
export type PathObject<T extends {} = {}> = {
  [K in keyof T]: T[K] & PathItemObject;
};

/**
 * SuccessResponseJSONInMethod<Path, Method>는 OpenAPI 명세에서 주어진 Path와 HTTP Method 조합에 대한
 * JSON 형식의 성공 응답 타입을 추출합니다.
 * SuccessResponse와 ResponseObjectMap 유틸리티 타입을 사용하여 적절한 응답 타입을 필터링하고 추출하며,
 * API 성공 응답에 대한 타입 안전성을 보장합니다.
 */
export type SuccessResponseJSONInMethod<
  Path,
  Method extends HttpMethod
> = SuccessResponse<ResponseObjectMap<FilterKeys<Path, Method>>>;

/**
 * ErrorStatusResponse<T>는 객체 타입 T에서 HTTP 오류 상태 코드(4xx 및 5xx)에 해당하는
 * 속성만 필터링합니다. 이 타입은 오류 상태 속성만 유지하고 다른 모든 속성은 'never'로
 * 설정하는 새로운 타입을 생성합니다. 이 타입은 API 명세에서 오류 응답 타입을 추출하는 데
 * 유용합니다.
 */
export type ErrorStatusResponse<T> = {
  [K in keyof T]: K extends ErrorStatus ? T[K] : never;
} & {};
/**
 * ErrorResponseAll<T>는 일반적으로 API 응답을 나타내는 객체 타입 T를 변환합니다.
 * HTTP 오류 상태(4xx 또는 5xx)에 해당하는 각 속성을 처리하여 오류 코드와 일치하는
 * 'status' 필드를 포함하는 새로운 타입을 생성합니다.
 * JSONLike와 ResponseContent 유틸리티 타입을 사용하여 각 오류 응답의 내용을 추출하고
 * 변환하며, 다양한 상태 코드에 걸쳐 API 오류 응답 처리의 타입 안전성과 일관성을
 * 보장합니다.
 */
export type ErrorResponseAll<T> = {
  [K in keyof T]: K extends ErrorStatus
    ? JSONLike<ResponseContent<T[K]>> extends { status: number }
      ? Simplify<JSONLike<ResponseContent<T[K]>> & { status: K }>
      : never
    : never;
};
/**
 * SpreadObject<T>는 객체 타입 T를 "펼치는" 유틸리티 타입입니다.
 * T의 모든 값 타입의 유니온을 추출합니다.
 * 이는 중첩된 객체 타입을 평탄화하거나
 * 객체 속성에서 유니온 타입을 만드는 데 유용합니다.
 */
export type SpreadObject<T> = T extends { [K in keyof T]: infer U } ? U : never;
/**
 * ErrorResponseJSONInMethod<Path, Method>는 OpenAPI 명세에서 주어진 Path와 HTTP Method 조합에 대한
 * JSON 형식의 오류 응답 타입을 추출하고 처리합니다.
 * ErrorResponseAll, ResponseObjectMap, FilterKeys 유틸리티 타입을 사용하여 모든 가능한 오류 상태 코드에 걸쳐
 * 오류 응답을 추출, 변환 및 결합합니다.
 * 이 타입은 API 오류 응답을 처리할 때 타입 안전성과 일관성을 보장합니다.
 */
export type ErrorResponseJSONInMethod<
  Path,
  Method extends HttpMethod
> = SpreadObject<ErrorResponseAll<ResponseObjectMap<FilterKeys<Path, Method>>>>;

/**
 * OperationHeader<T, PresetHeaders>는 작업의 HTTP 헤더 구조를 정의합니다.
 * T가 'header' 속성을 포함하면, 작업별 헤더(T['header'])와 사전 설정 헤더(PresetHeaders)를
 * 결합하는 'headers' 타입을 생성하며, 사전 설정 헤더를 선택적으로 만듭니다.
 * T에 'header' 속성이 없으면 선택적 HeadersType으로 기본 설정됩니다.
 * 이 타입은 API 요청에서 작업별 헤더와 사전 설정 헤더를 모두 처리하는 데 유용합니다.
 */
export type OperationHeader<T, PresetHeaders extends HeadersType> = T extends {
  header: any;
}
  ? {
      headers: Simplify<
        Optional<T['header'], keyof PresetHeaders> & HeadersType
      >;
    }
  : { headers?: HeadersType };

/**
 * PathParameters<T, Path>는 URL 경로 문자열에서 경로 매개변수를 추출하는 재귀적 타입입니다.
 * Path 문자열을 파싱하여 중괄호 {} 안에 있는 매개변수를 식별하고,
 * 이러한 매개변수를 키로 하는 타입을 생성합니다. 각 키의 값 타입은
 * T에서 해당 키를 찾아 결정되며, 찾지 못한 경우 기본값은 string입니다.
 * 이 타입은 API 라우트 정의와 요청에서 동적 URL 경로를 다룰 때
 * 타입 안전성을 보장하는 데 중요합니다.
 */
export type PathParameters<
  T extends {},
  Path
> = Path extends `${infer Head}{${infer P}}${infer Tail}`
  ? {
      [key in P]: never extends FilterKeys<T, key>
        ? string
        : FilterKeys<T, key>;
    } & PathParameters<T, Tail>
  : { [others: string]: string };

/**
 * OperationPath<T, Path>는 API 작업의 경로 매개변수 구조를 정의합니다.
 * T가 'path' 속성을 포함하면, PathParameters를 사용하여 Path 문자열에서
 * 경로 매개변수를 추출하고 타입을 지정하는 'path' 필드를 가진 타입을 생성합니다.
 * T에 'path' 속성이 없으면 'path'를 선택적 never 타입으로 설정합니다.
 * 이 타입은 API 요청의 동적 경로 매개변수를 처리하는 데 필수적이며,
 * URL 경로 세그먼트의 타입 안전성과 올바른 사용을 보장합니다.
 */
export type OperationPath<T, Path> = T extends { path: any }
  ? { path: Simplify<PathParameters<T['path'], Path>> }
  : { path?: never };

/**
 * OperationQuery<T>는 API 작업의 쿼리 매개변수 구조를 정의합니다.
 * T가 'query' 속성을 포함하면, 같은 타입의 'query' 필드를 가진 타입을 생성합니다.
 * T가 선택적 'query' 속성을 가지면, 선택적 'query' 필드를 생성합니다.
 * T에 'query' 속성이 없으면, 문자열, 키-값 쌍의 레코드, 또는 URLSearchParams일 수 있는
 * 선택적 필드로 기본 설정됩니다.
 * 이 타입은 API 요청에서 다양한 형태의 쿼리 매개변수를 처리하는 데 유용합니다.
 */
export type OperationQuery<T> = T extends { query: any }
  ? { query: T['query'] }
  : T extends { query?: any }
  ? { query?: T['query'] }
  : {
      query?:
        | string
        | Record<string, string | number | boolean | null | undefined>
        | URLSearchParams;
    };

/**
 * OperationBody<T>는 API 작업의 요청 본문 구조를 정의합니다.
 * T가 'requestBody' 속성을 포함하면, RequestBodyJSON<T>를 사용하여
 * 요청 본문을 추출하고 타입을 지정하는 'body' 필드를 가진 타입을 생성합니다.
 * T에 'requestBody' 속성이 없으면 'body'를 선택적 문자열 또는 Buffer 타입으로 설정합니다.
 * 이 타입은 API 작업의 요청 본문을 처리하는 데 필수적이며,
 * 요청 데이터의 타입 안전성과 올바른 사용을 보장합니다.
 */
export type OperationBody<T> = T extends { requestBody: any }
  ? { body: RequestBodyJSON<T> }
  : { body?: string | Buffer };

/**
 * ClientOptions<Method, Path, Paths, PresetHeaders>는 API 클라이언트 요청을 위한
 * 종합적인 옵션 타입을 생성하기 위해 다양한 작업별 타입을 결합합니다.
 * 포함되는 항목:
 * - 헤더 (OperationHeader에서)
 * - 경로 매개변수 (OperationPath에서)
 * - 쿼리 매개변수 (OperationQuery에서)
 * - 요청 본문 (OperationBody에서)
 * - 요청 취소를 위한 선택적 AbortSignal
 * 이 타입은 특정 Method, Path, PresetHeaders에 맞춰진 API 요청의 모든 측면에 대해
 * 타입 안전성과 완전성을 보장합니다.
 */
export type ClientOptions<
  Method extends HttpMethod,
  Path extends keyof Paths,
  Paths extends PathObject,
  PresetHeaders extends HeadersType
> = OperationHeader<ExtractParameters<Method, Path, Paths>, PresetHeaders> &
  OperationPath<ExtractParameters<Method, Path, Paths>, Path> &
  OperationQuery<ExtractParameters<Method, Path, Paths>> &
  OperationBody<FilterKeys<Paths[Path], Method>> & {
    signal?: AbortSignal;
  };

/**
 * DefaultInputs는 API 요청의 기본 입력 옵션 구조를 정의합니다.
 * 다음과 같은 선택적 필드를 포함합니다:
 * - headers: HTTP 헤더
 * - path: 키-값 쌍으로 된 경로 매개변수
 * - query: 문자열, 키-값 쌍, 또는 URLSearchParams 형태의 쿼리 매개변수
 * - body: 문자열 또는 Buffer 형태의 요청 본문
 * 이 인터페이스는 API 클라이언트 작업에서 다양한 유형의 입력을 처리하기 위한
 * 유연한 구조를 제공하며, 다양한 형식의 데이터를 전달할 수 있게 합니다.
 */
export interface DefaultInputs {
  headers?: HeadersType;
  path?: Record<string, string>;
  query?:
    | string
    | Record<string, string | number | boolean | null | undefined>
    | URLSearchParams;
  body?: string | Buffer;
}

/**
 * DefaultClientOptions는 클라이언트 작업의 기본 옵션을 정의합니다.
 * 현재는 진행 중인 요청을 취소하는 데 사용할 수 있는 선택적 AbortSignal 속성을 포함합니다.
 * 이 인터페이스는 다양한 작업에 걸쳐 API 클라이언트 메서드에 공통 옵션을 전달하기 위한
 * 표준 구조를 제공합니다.
 */
export interface DefaultClientOptions {
  signal?: AbortSignal;
}

export type ResponseHeaders<T> = T extends { headers: any }
  ? T['headers']
  : unknown;

export type HttpResponsees<Path, Method extends HttpMethod> = ResponseObjectMap<FilterKeys<Path, Method>>
