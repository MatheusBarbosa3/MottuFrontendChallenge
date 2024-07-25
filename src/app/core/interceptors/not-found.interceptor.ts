import {
  HttpEvent,
  HttpInterceptorFn,
  HttpHandlerFn,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const notFoundInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 404) {
        console.error(
          'Recurso não encontrado. Verifique a URL ou tente novamente mais tarde.'
        );
      } else {
        console.error('An error occurred:', error.message);
      }
      return throwError(
        () => new Error(error.message || 'Ocorreu um erro desconhecido')
      );
    })
  );
};
