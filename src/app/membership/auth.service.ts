import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthService {
  status:boolean=false;
 List: String[] =[
 "Sandip"
 ]
  validate(user: string, password: string): boolean {
   if(this.List.includes(user))
      return true;

   return false;

 }
 Register(Name:string):boolean{
  this.List.push(Name);
  return true;
 }
 logout(): any {   }
 getUser(): any {   }
 isLoggedIn(): boolean {   return false;  }
}
