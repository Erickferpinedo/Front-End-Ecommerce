import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),  // Enables zone change detection with event coalescing
    provideRouter(routes, withComponentInputBinding()),     // Provides the router with input binding
    provideHttpClient()                                     // Provides the HTTP client service
  ],
};
