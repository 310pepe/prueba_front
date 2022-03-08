import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators,FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';



import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  protected alerta:HTMLIonAlertElement;
  //* -> Implementacion de propiedad del formGroup
  public login_form: FormGroup
  constructor(
    //* -> propiedad privada que dara las propiedades al grup
    private fb : FormBuilder,
    //* -> Inyeccion del servicio 
    private authService:AuthService,
    // impotación del controlador de alertas
    private alertController: AlertController,
    //importación del controlador de loading
    public loadingController: LoadingController,
    //importacion del router
    private router:Router,
  ) {
    //construcción del formulario
    this.loadFormLogin(); 
   }

  ngOnInit() {  
  }

  // retorna si el campo valido está valido o no
  get emailNoValido(){
    return this.login_form.get('email').invalid && this.login_form.get('password').touched
  }
  //retorna si el campo password se ha ingresado
  get passNoValido(){
    return this.login_form.get('password').invalid && this.login_form.get('password').touched
  }

  //
  loadFormLogin() {
    this.login_form = this.fb.group({
      //* -> Extructura { propiedad: [ tipo_campo&&valor, [ validadores ] ] }
      email: [ '', [ Validators.required, Validators.email ] ],
      password: [ '', [  ] ]

    })
  }

  validCamps( campo: string ) {
    if (!this.login_form.get(campo).invalid || !this.login_form.get(campo).touched) {


      return false
    }else {

      return true
    }
  }

  async presentAlert(titulo:string,msg:string) {
    this.alerta = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: titulo,
      message: msg,
      backdropDismiss:false
    });
  }
  
  

  //* -> metodo que enviara la peticion
  async submitPost() {
    // http://127.0.0.1:8000/api/auth/login
   
    if (this.login_form.invalid){
      return Object.values(this.login_form.controls).forEach(control=>{
        control.markAsTouched();
      })
    }
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Validando'
    });
    await loading.present();

    this.authService.login(this.login_form.value).subscribe(
      async resp => {
        
        this.alerta = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'credenciales validas',
          message: 'bienvenido',
          backdropDismiss:false
        });
        loading.dismiss();
        await this.alerta.present();
        setTimeout(async() => {
          await this.alerta.dismiss();
          this.router.navigateByUrl('/home');
        }, 500);
        
        
        
        console.log(resp);
      }, async err => {
        this.alerta = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'credenciales no validas',
          message: 'Verifique sus datos',
          backdropDismiss:false
        });
        loading.dismiss();
        await this.alerta.present();
        setTimeout(async() => {
          await this.alerta.dismiss();
        }, 500);
        return Object.values(this.login_form.controls).forEach(control=>{
          control.markAsTouched();
        })
        
      }
    )
  }



}
