import { HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt'
import { Users } from '../model/Users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http:HttpClient) { }

  tokenURL: string = environment.API_URL + environment.obterTokenUrl
  clientID: string = environment.clientId;
  clientSecret: string = environment.clientSecret;
  jwtHelper: JwtHelperService = new JwtHelperService();

  obterToken(){
    const tokenString = localStorage.getItem('access_token');
    if(tokenString){
      const token =JSON.parse(tokenString).access_token;
      return token;
    }
    return null;
  }

  isAuthenticated(): boolean{
    const token = this.obterToken();
    if(token){
      const expired = this.jwtHelper.isTokenExpired(token);
      return !expired
    }
    return false
  }
  
  listarTodos(): Observable<Users[]>{
    return this.http.get<Users[]>(environment.API_URL+'/users')
  }

  salvarUsuario(usuarios : Users): Observable<Users>{
    return this.http.post<Users>(environment.API_URL+'/users', usuarios)
  }

  excluir(id: number): Observable<any>{
    return this.http.delete<any>(environment.API_URL+`/users/${id}`)
  }
  
  getUsuarioByEmail() :Observable<Users>{
    return this.http.get<Users>(environment.API_URL+`/users?email=`+this.getUsuarioAutenticado());
  }

  deslogar(){
    localStorage.removeItem('access_token');
  }

  getUsuarioAutenticado(){
    const token = this.obterToken();
    if(token){
      const usuario = this.jwtHelper.decodeToken(token).user_name;
      return usuario;
    }
    return null;
  }


  tentarLogar(username: string, password: string) : Observable<any>{
    console.log("tentar logar")
                        const obj = {
                          email:username,
                          password:password
                        }
    const headers = { 
      'Authorization': 'Basic ' + btoa(`${this.clientID}:${this.clientSecret}`),
      'Content-Type':'application/x-www-form-urlencoded'
    }                    
    return this.http.post( this.tokenURL, obj, { headers, observe: 'response',
    responseType: 'text'//Define que a resposta será um texto e não JSON, já que o endpoint /login não retorna nada como Json, somente no header
    })
    
  }
}
