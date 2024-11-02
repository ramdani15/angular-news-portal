import { HttpEvent, HttpEventType, HttpHandlerFn, HttpInterceptorFn, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { toCamelCase, toSnakeCase } from '../shared/utils/case-converter';


export const camelCaseInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {

  const snakeCaseBody = req.body ? toSnakeCase(req.body) : req.body;

  let params = new HttpParams();
  req.params.keys().forEach((key) => {
    const snakeKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
    params = params.set(snakeKey, req.params.get(key) as string);
  });

  const snakeCaseReq = req.clone({
    body: snakeCaseBody,
    params,
  });

  return next(snakeCaseReq).pipe(
    map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse && event.body) {
        const camelCaseBody = toCamelCase(event.body);
        return event.clone({ body: camelCaseBody });
      }
      return event;
    })
  );
};