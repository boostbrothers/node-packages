import {UnhandledResultError} from '@bbros/result';
import {HttpClient} from '../src';
import {paths} from './openapi-3-1';

const please = new HttpClient<paths>('http://localhost:3000');

const req = await please
  .GET('/pet/{petId}', {
    path: {
      petId: 'id',
    },
  })
  .mapError(e => {
    if (e instanceof UnhandledResultError) {
      throw e;
    }
  })
  .getOrThrow();

req.data;
