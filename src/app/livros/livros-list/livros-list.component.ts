import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { PoBreadcrumb, PoTableColumn, PoModalAction, PoModalComponent, PoNotificationService, PoTableColumnLabel, PoRadioGroupOption, PoSelectOption} from '@po-ui/ng-components';

import { Livros } from '../Livros';
import {LivrosService} from '../livros.service';

@Component({
  selector: 'app-livros-list',
  templateUrl: './livros-list.component.html',
  styleUrls: ['./livros-list.component.css']
})
export class LivrosListComponent implements OnInit {
  form: FormGroup;
  livro: Livros;

  
  public readonly columns: Array<PoTableColumn> = [
    {
      property: 'id',
      label: 'Código',
      type: 'string'
    },
    {
      property: 'nome',
      label: 'Nome',
      type: 'string'
    },
    {
      property: 'autor',
      label: 'Autor',
      type: 'string', 
    },
    {
      property: 'date',
      label: 'Data de Cadastro',
      type: 'date',
      format: 'dd/MM/yyyy'
    },

  ];

  items: Array<any> = [];
  actionsTable = [
    {
      action: this.perguntaEditarLivro.bind(this),
      label: 'Editar',
      icon: 'po-icon po-icon-edit'
    },
    {
      action: this.perguntaExcluirLivro.bind(this),
      label: 'Excluir',
      icon: 'po-icon po-icon-delete'
    }
  ];

  cancelarCadastro: PoModalAction = {
    action: () => {
      this.modalSalvarLivro.close();
    },
    label: 'Cancelar',
    danger: true
  };

  salvarCadastro: PoModalAction = {
    action: () => {
      this.salvarLivro();
    },
    label: 'Confirmar'
  };

  cancelarCadastroLivro: PoModalAction = {
    action: () => {
      this.perguntaCancelarEdicao();
    },
    label: 'Cancelar',
    danger: true
  };

  editarCadastroLivro: PoModalAction = {
    action: () => {
      this.editarLivro();
    },
    label: 'Confirmar'
  };

  excluirCadastroLivro: PoModalAction = {
    action: () => {
      this.excluirLivro();
    },
    label: 'Confirmar'
  };

  cancelarExclusaoLivro: PoModalAction = {
    action: () => {
      this.cancelarExcluirLivro();
    },
    label: 'Cancelar',
    danger: true
  };



  @ViewChild(PoModalComponent, { static: true }) modalSalvarLivro: PoModalComponent;
  @ViewChild('modalEdicaoLivro', { static: true }) modalEdicaoLivro: PoModalComponent;
  @ViewChild('modalExcluirLivro', { static: true }) modalExcluirLivro: PoModalComponent;
  

  readonly breadcrump: PoBreadcrumb = {
    items:[
      {label: 'Home', link:'/'},
      {label: 'Livros', link: '/livros'},]
  }

  constructor(private service: LivrosService, private formBuilder: FormBuilder, private poNotification: PoNotificationService) {
    this.livro = new Livros();
   }

  ngOnInit(): void {
    this.iniciarForm();
    this.listarLivros();
  }

  iniciarForm(): void{
    this.form = this.formBuilder.group({
      id : [''],
      nome : ['',Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)]),],
      autor : ['',Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)]),],
    })
  }

  listarLivros(): void{
    
    this.service.listarTodos().subscribe(res =>{this.items = res.content
    });
  }

  onQuickSearch(filter:any) {
    filter ? this.searchItems(filter) : this.listarLivros();
  
  }

  private searchItems(filter:any) {
    this.service.listarLivrosFiltroPorNome(filter)
    .subscribe(res =>{this.items = res.content
    });
  }

  novoLivro(){
      this.modalSalvarLivro.open();
  }
  perguntaExcluirLivro(com: Livros){
    this.livro = com;
    this.modalExcluirLivro.open();
  
  }
  excluirLivro(){
    this.service.deletar(this.livro.id).subscribe(
      res=>{
        this.poNotification.success("Livro excluído com sucesso!")
        this.listarLivros();
      },
      error=>{
        this.poNotification.error("Não foi possível excluir o livro!")
      }
    )
    this.modalExcluirLivro.close();
    
  }
  cancelarExcluirLivro(){
    this.modalExcluirLivro.close();
  }
  perguntaCancelarEdicao(){
    this.modalEdicaoLivro.close();
    this.ngOnInit();
    
  }

  salvarLivro(){
    this.form.reset
    this.livro = this.form.value;
    this.service.salvar(this.livro).subscribe(
      res => {
        this.livro = res;
        this.poNotification.success('Livro salvo com sucesso!');
        this.listarLivros();
      },
      error =>{
        this.poNotification.error('Não foi possível salvar o novo livro');
      }
    )
    this.modalSalvarLivro.close();
    
    
  }

  perguntaEditarLivro(com: Livros){
    this.livro = com;
    this.form.get('id')?.setValue(this.livro.id);
    this.form.get('nome')?.setValue(this.livro.nome);
    this.form.get('autor')?.setValue(this.livro.autor);
    this.form.get('data')?.setValue(this.livro.date);
    this.modalEdicaoLivro.open();
  }
    
  editarLivro(){
    this.livro = this.form.value;
    this.service.atualizar(this.livro.id, this.livro).subscribe(
      res => {
        this.livro = res;
        this.poNotification.success('Livro editado com sucesso!');
        this.listarLivros();
      },
      error =>{
        this.poNotification.error('Não foi possível editar livro');
      }
    )
    this.modalEdicaoLivro.close();
  }

  limparForm(): void{
    this.form.get('livro.id')?.setValue(null);
    this.form.get('livro.nome')?.setValue(null);
    this.form.get('livro.autor')?.setValue('');
    this.form.get('livro.data')?.setValue(null);
  }



}
