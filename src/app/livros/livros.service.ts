import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Content, Livros} from './Livros'

@Injectable({
  providedIn: 'root'
})
export class LivrosService {

  constructor(private http: HttpClient) {}

  listarTodos():Observable<Content>{
      return this.http.get<Content>(environment.API_URL+'/livros');
  }
  salvar(livros: Livros):Observable<Livros>{
    return this.http.post<Livros>(environment.API_URL+'/livros',livros);
  }
  atualizar(idLivro: number, livro : Livros):Observable<any>{
    return this.http.put<any>(environment.API_URL+`/livros/${idLivro}`, livro);
  }
  deletar(idLivro: number): Observable<any>{
    return this.http.delete<any>(environment.API_URL+`/livros/${idLivro}`);
  }
  listarLivrosFiltroPorNome(nome: string):Observable<Content>{
    return this.http.get<Content>(environment.API_URL+`/livros?nome=${nome}`)
  }

}
