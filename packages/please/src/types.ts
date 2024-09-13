export interface HttpResponse<Headers, Data> {
  status: number;
  headers: Headers;
  data: Data;
}
