import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
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

  email = '';
  password = '';
  errorMessage = '';
 
  constructor(private router: Router) {}
 onLogin() {
    
    const validUser = {
      email: 'administrator',
      password: 'Streetlatur@1234'
    };

    if (this.email === validUser.email && this.password === validUser.password) {
      this.errorMessage = '';
      alert('Login successful!');
    } else {
      this.errorMessage = 'Invalid email or password';
    }
  }
 navigateToRegister()
 {
  alert('navigateToRegister!');
 }
}