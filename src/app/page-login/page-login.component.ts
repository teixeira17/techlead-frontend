import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PoDialogService } from '@po-ui/ng-components';
import { PoPageLogin } from '@po-ui/ng-templates';
import { Users } from '../model/Users';
import { UsersService } from '../services/users.service';
import {
  PoModalPasswordRecoveryType,
  PoPageBlockedUserReasonParams,
  PoPageLoginCustomField,
  PoPageLoginLiterals,
  PoPageLoginRecovery
} from '@po-ui/ng-templates';
import { PoModalAction, PoModalComponent, PoNotificationService} from '@po-ui/ng-components';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.css']
})
export class PageLoginComponent implements OnInit {

  form: FormGroup;
  formNew: FormGroup;
  usuario: Users;
  exceededAttempts: number;
  passwordRecovery: PoPageLoginRecovery = {
    url: 'https://po-sample-api.herokuapp.com/v1/users',
    type: PoModalPasswordRecoveryType.Email,
    contactMail: 'lukkaslemos@gmail.com'
  };

  salvarCadastro: PoModalAction = {
    action: () => {
      this.salvarUsuario();
    },
    label: 'Confirmar'
  };

  cancelarCadastro: PoModalAction = {
    action: () => {
      this.modalSalvarUsuario.close();
    },
    label: 'Cancelar',
    danger: true
  };

  @ViewChild(PoModalComponent, { static: true }) modalSalvarUsuario: PoModalComponent;
  
  constructor(private userService: UsersService, private formBuilder: FormBuilder, private poDialog: PoDialogService, private router: Router, private poNotification: PoNotificationService) { }

  ngOnInit(): void {
    this.iniciarForm();
  
  }

  iniciarForm(): void{
    this.form = this.formBuilder.group({
      email: [''],
      senha : ['',Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(500)]),],
    })
    this.formNew = this.formBuilder.group({
      email: [''],
      password : ['',Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(500)]),],
    })
  }




  loginSubmit(formData: PoPageLogin){
    this.userService.tentarLogar(formData.login,formData.password).subscribe(
      res=>{
        console.log("teste no res do tentar")
        const access_token = JSON.stringify(
          {
            access_token:res.headers.get('Authorization').substring(7)
          }
        );
        localStorage.setItem('access_token',access_token)
        this.router.navigateByUrl('/livros')
      },
      error=>{
        this.poDialog.alert({
          title: 'Atenção',
          message: 'Dados Inválidos'
        })
      }
    )
  }

  salvarUsuario(){
    const usuario = this.formNew.value;
    this.formNew.reset
    this.userService.salvarUsuario(usuario).subscribe(
      res => {
        this.usuario = res;
        this.poNotification.success('Livro salvo com sucesso!');
      },
      error =>{
        this.poNotification.error('Não foi possível salvar o novo livro');
      }
    )
    this.modalSalvarUsuario.close();
    
    
  }
}
