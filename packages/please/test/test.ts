import {HttpClient} from '../src';
import {paths} from './openapi-3-1';

const please = new HttpClient<paths>('http://localhost:3000');

const req = please.GET('/pet/{petId}', {
  path: {
    petId: 'id',
  },
});
