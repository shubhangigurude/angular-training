import { Component } from '@angular/core';
import { Customer } from '../models/customer';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private src:AuthService){

  }


//
  fName:string='';
  lName:string='';
  email:string='';
  age:string='';
  phoneNumber:string='';
  locate:string[]=[];
  birthDate:string='';
 model:Customer=new Customer();

  submitted = false;
  locations = ['Pune','Mumbai','Delhi','Bangalore','Nashik','Chennai'];
  memberShips = [
                 {value:'G',display:'Gold'},
                 {value:'S',display:'Silver'},
                 {value:'P',display:'Platinum'}
  ];

  social =[
             {value:'T',display:'Twitter'},
             {value:'F',display:'Facebook'},
             {value:'B',display:'Blog'},
             {value:'I',display:'Instagram'},
             {value:'L',display:'LinkedIn'}
  ];


  socialStatus = ['T', 'B'];






  onSubmit(form: any): void {
       this.submitted=true;
       console.log('you submitted value:', this.model.firstName);
       this.src.Register(this.model.firstName)
       alert('Client registration done sucessfully');
      // this.model=new Customer();
  }

  showCustomer(form:any){
         return form && form.controls['firstName'] && form.controls['firstName'].value;
  }

  showFormControls(form:any){
     return form && form.controls['firstName'] && form.controls['firstName'].value;
  }


}
