import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    IonicModule.forRoot(),
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],exports:[
    LoginComponent
  ],

})
export class ComponetsModule { }
