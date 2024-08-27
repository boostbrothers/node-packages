export class UnhandledResultError extends Error {
  constructor(readonly cause: unknown) {
    super();
  }
}
