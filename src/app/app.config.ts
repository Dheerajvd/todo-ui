import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TokenInterceptor } from "./shared/interceptors/token.interceptor";
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { ApiService } from "../app/shared/services/api.service"
import { AuthGuardService } from './guards/auth-guard.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Cache } from './shared/services/cache.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi(),
    ),
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    provideAnimations(),
    provideToastr(),
    importProvidersFrom(AuthGuardService),
    ApiService, Cache,
    provideAnimationsAsync()
  ]
};
