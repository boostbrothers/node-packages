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
} from './openapi-typescript-helpers';

export type Simplify<T> = { [KeyType in keyof T]: T[KeyType] } & {};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>;

export type HeadersType = Record<string, string | string[] | undefined>;

export type ExtractParameters<
  Method extends HttpMethod,
  Path extends keyof Paths,
  Paths extends PathObject
> = Paths[Path] extends { [K in Method]: { parameters: infer U } } ? U : {};

export type PathObject<T extends {} = {}> = {
  [K in keyof T]: T[K] & PathItemObject;
};

export type SuccessResponseJSONInMethod<
  Path,
  Method extends HttpMethod
> = SuccessResponse<ResponseObjectMap<FilterKeys<Path, Method>>>;

export type ErrorStatusResponse<T> = {
  [K in keyof T]: K extends ErrorStatus ? T[K] : never;
} & {};
export type ErrorResponseAll<T> = {
  [K in keyof T]: K extends ErrorStatus
    ? JSONLike<ResponseContent<T[K]>> extends { status: number }
      ? Simplify<JSONLike<ResponseContent<T[K]>> & { status: K }>
      : never
    : never;
};
export type SpreadObject<T> = T extends { [K in keyof T]: infer U } ? U : never;
export type ErrorResponseJSONInMethod<
  Path,
  Method extends HttpMethod
> = SpreadObject<ErrorResponseAll<ResponseObjectMap<FilterKeys<Path, Method>>>>;

export type OperationHeader<T, PresetHeaders extends HeadersType> = T extends {
  header: any;
}
  ? {
      headers: Simplify<
        Optional<T['header'], keyof PresetHeaders> & HeadersType
      >;
    }
  : { headers?: HeadersType };

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

export type OperationPath<T, Path> = T extends { path: any }
  ? { path: Simplify<PathParameters<T['path'], Path>> }
  : { path?: never };

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

export type OperationBody<T> = T extends { requestBody: any }
  ? { body: RequestBodyJSON<T> }
  : { body?: string | Buffer };

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

export interface DefaultInputs {
  headers?: HeadersType;
  path?: Record<string, string>;
  query?:
    | string
    | Record<string, string | number | boolean | null | undefined>
    | URLSearchParams;
  body?: string | Buffer;
}

export interface DefaultClientOptions {
  signal?: AbortSignal;
}
