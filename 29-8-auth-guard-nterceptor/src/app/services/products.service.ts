import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { IS_API_lOGIN } from '../core/interceptors/auth.interceptor';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  get() {
    const products = [...new Array(50)].map((it, index) => ({
      id: index + 1,
      name: `Product ${index + 1}`,
      price: 100,
      description: `This is product ${index + 1}`,
    }));
    return of(products).pipe(
      delay(3000), // Simulate network latency
    );
  }

  // Add here  : https://angular.dev/api/common/http/HttpContext?tab=usage-notes
  // for log in and check at interceptor if it comes as true. if yes then escape otherwise pass the token.
  // getProducts() {
  //   return this.http.get('https://jsonplaceholder.typicode.com/todos')
  // }

  getProducts() {
    return this.http.get('https://jsonplaceholder.typicode.com/todos', {
      context: new HttpContext().set(IS_API_lOGIN, true),
    });
  }
}
