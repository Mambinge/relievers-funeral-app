import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JwtModule } from '@auth0/angular-jwt';
import { EnvironmentInterface, _environment } from './models';
import { AuthService } from './services';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HTTPListener, HTTPStatus } from './services/http-interceptor';
import { AuthGuard } from './guard/auth-guard';

@NgModule({
  exports: [

  ],
  declarations: [],
  imports: [
    CommonModule,
    JwtModule.forRoot({
      config: { tokenGetter: token, skipWhenExpired: true }
    }),
  ],
  providers:[
    AuthGuard,
    HTTPListener,
    HTTPStatus,
    { provide: HTTP_INTERCEPTORS, useClass: HTTPListener, multi: true },

  ]
})
export class SharedModule {
  constructor(@Optional() @SkipSelf() parentModule: SharedModule) {
    throwIfAlreadyLoaded(parentModule, 'SharedModule');
  }

  static forRoot(config: EnvironmentInterface): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        {
          provide: _environment,
          useValue: config
        }
      ]
    };
  }
}
function throwIfAlreadyLoaded(parentModule: unknown, moduleName: string) {
  if (!parentModule) return;
  throw new Error(`${moduleName} has already been loaded. Import Core modules in the AppModule only.`);
}

export function token(): string {
  return AuthService.TOKEN;
}
