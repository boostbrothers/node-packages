import { Result } from '@boostbrothers/result';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import {
  ClientOptions,
  DefaultClientOptions,
  DefaultInputs,
  ErrorResponseJSONInMethod,
  HeadersType,
  PathObject,
  SuccessResponseJSONInMethod,
} from './extends-types';
import { HttpMethod, PathsWithMethod } from './openapi-typescript-helpers';
import { replaceForm } from './utils';

export class HttpClient<
  Paths extends PathObject,
  PresetHeaders extends HeadersType = {}
> {
  instance: AxiosInstance;

  constructor(
    readonly baseUrl: string,
    readonly options?: {
      headers?: PresetHeaders;
      timeout?: number;
    }
  ) {
    this.instance = axios.create({
      baseURL: baseUrl,
      headers: options?.headers,
      timeout: options?.timeout,
    });
  }

  /**
   * 생성자에 headers를 넣으면 PresetHeaders 타입 추론이 안되기 때문에 메소드로 재생성한다.
   * @example
   * ```typescript
   * const client = new HttpClient<Paths>(baseUrl, { headers: { authorization: string } });
   * // client type은 authorization header가 있는 것으로 보이지 않는다.
   * ```
   *
   * ```typescript
   * const client2 = new HttpClient<Paths, { authorization: string }>(baseUrl, { headers: { authorization: string } });
   * // client2 type은 authorization header가 기본 설정된 것으로 보인다.
   * ```
   *
   * ```typescript
   * const client3 = new HttpClient<Paths>(baseUrl).setHeaders({ authorization: string });
   * // client3 type은 authorization header가 기본 설정된 것으로 보인다.
   * ```
   */
  setHeaders<PresetHeaders2 extends HeadersType>(headers: PresetHeaders2) {
    return new HttpClient<Paths, PresetHeaders & PresetHeaders2>(this.baseUrl, {
      ...this.options,
      headers: {
        ...(this.options?.headers as PresetHeaders),
        ...headers,
      },
    });
  }

  DELETE<Path extends PathsWithMethod<Paths, 'delete'>>(
    url: Path,
    input: ClientOptions<'delete', Path, Paths, PresetHeaders>,
    options?: DefaultClientOptions
  ): Result<
    ErrorResponseJSONInMethod<Paths[Path], 'delete'>,
    SuccessResponseJSONInMethod<Paths[Path], 'delete'>
  > {
    return this.default('delete', url, input, options);
  }

  GET<Path extends PathsWithMethod<Paths, 'get'>>(
    url: Path,
    input: ClientOptions<'get', Path, Paths, PresetHeaders>,
    options?: DefaultClientOptions
  ): Result<
    ErrorResponseJSONInMethod<Paths[Path], 'get'>,
    SuccessResponseJSONInMethod<Paths[Path], 'get'>
  > {
    return this.default('get', url, input, options);
  }

  HEAD<Path extends PathsWithMethod<Paths, 'head'>>(
    url: Path,
    input: ClientOptions<'head', Path, Paths, PresetHeaders>,
    options?: DefaultClientOptions
  ): Result<
    ErrorResponseJSONInMethod<Paths[Path], 'head'>,
    SuccessResponseJSONInMethod<Paths[Path], 'head'>
  > {
    return this.default('head', url, input, options);
  }

  PATCH<Path extends PathsWithMethod<Paths, 'patch'>>(
    url: Path,
    input: ClientOptions<'patch', Path, Paths, PresetHeaders>,
    options?: DefaultClientOptions
  ): Result<
    ErrorResponseJSONInMethod<Paths[Path], 'patch'>,
    SuccessResponseJSONInMethod<Paths[Path], 'patch'>
  > {
    return this.default('patch', url, input, options);
  }

  POST<Path extends PathsWithMethod<Paths, 'post'>>(
    url: Path,
    input: ClientOptions<'post', Path, Paths, PresetHeaders>,
    options?: DefaultClientOptions
  ): Result<
    ErrorResponseJSONInMethod<Paths[Path], 'post'>,
    SuccessResponseJSONInMethod<Paths[Path], 'post'>
  > {
    return this.default('post', url, input, options);
  }

  PUT<Path extends PathsWithMethod<Paths, 'put'>>(
    url: Path,
    input: ClientOptions<'put', Path, Paths, PresetHeaders>,
    options?: DefaultClientOptions
  ): Result<
    ErrorResponseJSONInMethod<Paths[Path], 'put'>,
    SuccessResponseJSONInMethod<Paths[Path], 'put'>
  > {
    return this.default('put', url, input, options);
  }

  private default<Path, Method extends HttpMethod>(
    method: Method,
    url: Path,
    input: DefaultInputs | undefined,
    options?: DefaultClientOptions
  ): Result<any, any> {
    let replacedUrl = url as string;

    if (input?.path) {
      replacedUrl = replaceForm(replacedUrl, input.path);
    }

    const req = this.instance(replacedUrl, {
      method,
      params: input?.query,
      data: input?.body,
      headers: input?.headers,
      signal: options?.signal,
    });

    return Result.from<AxiosResponse, AxiosError>(req)
      .map(response => response.data)
      .mapError(error => error.response?.data);
  }
}
