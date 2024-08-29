import {
  HttpContextToken,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const IS_API_lOGIN = new HttpContextToken<boolean>(() => false);

export function loggingInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const jwtToken = inject(AuthService).getJWT();

  // if (req.url === "https://jsonplaceholder.typicode.com/todos") {
  //   return next(req);
  // }

  // THIS API COULD BE A LOG IN THAT WE DON'T WANT HEADERS - AND SO WE SKIP
  if (req.context.get(IS_API_lOGIN) === true) {
    console.log('IT IS LOG IN');

    return next(req);
  }

  const reqWithHeader = req.clone({
    headers: req.headers.set('X-New-Header', jwtToken),
  });

  return next(reqWithHeader);
}
