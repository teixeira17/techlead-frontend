import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoModule } from '@po-ui/ng-components';
import { PoPageLoginModule, PoTemplatesModule } from '@po-ui/ng-templates';
import { RouterModule } from '@angular/router';
import { HomePrincipalComponent } from './home-principal/home-principal.component';
import { PageLoginComponent } from './page-login/page-login.component';
import { LivrosModule } from './livros/livros.module';
import {TokenInterceptor } from './token.interceptor'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UsersService } from './services/users.service';
import { NovoUsuarioComponent } from './novo-usuario/novo-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    PageLoginComponent,
    HomePrincipalComponent,
    NovoUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PoModule,
    RouterModule.forRoot([]),
    PoPageLoginModule,
    PoTemplatesModule,
    ReactiveFormsModule,
    FormsModule,
    LivrosModule
  ],
  providers: [
    
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
