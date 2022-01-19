import { Component, OnInit, ViewChild} from '@angular/core';
import { PoPageChangePasswordComponent } from '@po-ui/ng-templates';
import { PoFieldModule } from '@po-ui/ng-components';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { PoBreadcrumb, PoSelectOption, PoNotificationService } from '@po-ui/ng-components';
import { Router } from '@angular/router';

import { Users } from '../model/Users';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css']
})
export class NovoUsuarioComponent implements OnInit {
  @ViewChild(PoPageChangePasswordComponent) changePassword: PoPageChangePasswordComponent;
  form: FormGroup;
  users: Users;
  url= "";
  autocomplet=true;

  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/documentation/po-page-change-password' }, { label: 'Profile' }]
  };

  constructor(private formBuilder: FormBuilder, private service: UsersService, private poNotification: PoNotificationService, private router: Router){}

  public readonly cityOptions: Array<PoSelectOption> = [{ label: 'São Paulo', value: 'sp' }];

  public readonly countryOptions: Array<PoSelectOption> = [{ label: 'Brazil', value: 'br' }];

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.form = this.formBuilder.group({
      name : ['',Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)]),],
      email : ['',Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)]),],
      password : ['',Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)]),],
      senhacorreta : ['',Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)]),],
    })
  }

  onSubmit() {
    this.changePassword.openConfirmation();
  }

  showChangePasswordScreen() {
  }

  showProfileScreen() {
    
  }

  salvarUsario(){
    this.form.reset
    
    this.users = this.form.value;
    console.log(this.users)
    this.service.salvarUsuario(this.users).subscribe(
      res => {
        this.users = res;
        this.poNotification.success('Usuario salvo com sucesso!');
        this.router.navigateByUrl('/livros')
      },
      error =>{
        this.poNotification.error('Não foi possível salvar o novo usuario');
      }
    )
    
  }

}
