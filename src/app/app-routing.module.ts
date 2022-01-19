import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LivrosListComponent } from './livros/livros-list/livros-list.component';
import { HomePrincipalComponent } from './home-principal/home-principal.component';
import { PageLoginComponent } from './page-login/page-login.component';
import { NovoUsuarioComponent } from './novo-usuario/novo-usuario.component';

const routes: Routes = [
  {
    path: 'login', 
    component: PageLoginComponent
  },
  {
    path: 'home', 
    component: HomePrincipalComponent,canActivate: [AuthGuard]
  },
  {path: '', redirectTo:'/home', pathMatch: 'full'},
  {path:'livros',component:LivrosListComponent, canActivate: [AuthGuard]},
  {
    path: 'novo-usuario',
    component: NovoUsuarioComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
