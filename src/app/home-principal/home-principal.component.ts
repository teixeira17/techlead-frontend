import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-home-principal',
  templateUrl: './home-principal.component.html',
  styleUrls: ['./home-principal.component.css']
})
export class HomePrincipalComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  readonly menus: Array<PoMenuItem> = [
    
    { label: 'Livros', action: this.navegarLivros.bind(this), icon: 'po-icon-device-desktop'  }
  ];

  private navegarLivros(){
    this.router.navigateByUrl('/livros')
  }
}

