import { Result } from '../src/result';
import { test } from 'node:test';
import * as assert from 'assert';

test('[TEST] Result.allOf', async () => {
  const result = Result.allOf([Result.succeed(1), Result.succeed(2), Result.succeed(3)])
    .map(([a, b, c]) => {
      assert.strictEqual(a, 1, 'a should be 1');
      assert.strictEqual(b, 2, 'b should be 2');
      assert.strictEqual(c, 3, 'c should be 3');
    })
    .getOrThrow();

  await assert.doesNotReject(() => result, 'result should be success');
});

test('[TEST] Result.allOf with failure', async () => {
  const result = Result.allOf([Result.succeed(1), Result.fail('error'), Result.succeed(3)])
    .map(() => {
      assert.fail('should not be called');
    })
    .getOrThrow();

  await assert.rejects(() => result, [null, 'error', null], 'result should be failure');
});
