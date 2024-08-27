import { Result } from './result';

export type InferResultError<R extends Result<unknown, unknown>[]> = {
  -readonly [P in keyof R]: R[P] extends Result<infer E, any> ? E : never;
};

export type InferResultOk<R extends Result<unknown, unknown>[]> = {
  -readonly [P in keyof R]: R[P] extends Result<any, infer O> ? O : never;
};
