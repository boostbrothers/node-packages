import { Result } from './result';

export const failNullable =
  <Msg extends string | number | symbol | Error, T>(msg: Msg) =>
  (option: T | null | undefined): Result<Msg, T> => {
    if (option === null || option === undefined) {
      return Result.fail(msg);
    }

    return Result.succeed(option);
  };

export const failFalse =
  <Msg extends string | number | symbol | Error>(msg: Msg) =>
  (option: boolean): Result<Msg, true> => {
    if (option === false) {
      return Result.fail(msg);
    }

    return Result.succeed(option);
  };
