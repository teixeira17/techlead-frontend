import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LivrosListComponent } from './livros-list/livros-list.component';
import { PoTableModule,PoModule } from '@po-ui/ng-components';
import { PoPageDynamicSearchModule } from '@po-ui/ng-templates';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [LivrosListComponent],
  imports: [
    CommonModule,
    PoTableModule,
    PoPageDynamicSearchModule,
    HttpClientModule,
    PoModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    LivrosListComponent
  ]
})
export class LivrosModule { }
