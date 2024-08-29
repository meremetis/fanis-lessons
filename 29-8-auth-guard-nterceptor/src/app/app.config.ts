import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withDebugTracing,
  withInMemoryScrolling,
} from '@angular/router';
import { routes } from './routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loggingInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([loggingInterceptor]),
    ),
    provideRouter(
      routes,
      // withDebugTracing(),// tells you in comments what happens.
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
      }),
    ),
  ],
};
