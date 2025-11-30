import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export class Credential  {
  constructor(public  email:string,public  password:string){  }
}

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

   email: string = '';
   password: string = '';
  isValidUser:boolean = false;
  showmsg:boolean=false;

  constructor(private svc:AuthService) {    }  //DI
onSubmit(form: any) {

  if( this.svc.validate(form.value.userEmail,form.value.userPassword)){
this.isValidUser=true

  }
  else
  {
    this.isValidUser=false;
    this.showmsg=true;
  }
  this.email="";
  this.password="";
  console.log(form.value);


}

}
