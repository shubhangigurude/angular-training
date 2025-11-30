import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Product } from './product';

//angular Modules:
//Angular modules we used:
//CommonModule, RouterModule,
//FormsModule
//HttpClientModule



//Angular Directives

//ngModel
//ngStyle
//ngclass
//ngfor
//ngIf ....

//Decorators:
//@input
//@output
//@ngModule
//@Component
//@Directive
//@Pipe
//@Injectable


//Classes
//HttpClient
//get, post, put, delete,patch ,etc.
//Asynchronous programming style to fetch rest api
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  list: any = [];

  constructor(private http: HttpClient) { }

  private apiUrl: string = "http://localhost:8000/flowers";

  getAllProducts(): Observable<Product[]> {
    //fetch REST API to retrive all flower

    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<Product> {
    console.log("selected product id=" + id);
    //string formation

    return this.http.get<Product>(this.apiUrl + "/" + id);

    // return this.list.find((p: any) => { return p.id == id });
  }

  updateProduct(prod: any): void {
    console.log("updating product", prod);
    //call REST API to update product
    this.http.put(this.apiUrl + "/" + prod.id, prod).subscribe({
      next: () => console.log("✔ PUT call SUCCESS"),
      error: (e) => console.log("❌ PUT call FAILED", e)
    });
    console.log("api url: " + this.apiUrl + "/" + prod.id);
    // let index=this.list.findIndex((p:any)=> p.id==prod.id);
    // if(index != -1)
    //  this.list[index]=prod;
  }
  addProduct(prod: any): void {
    console.log("updating product", prod);
    //call REST API to update product
    this.http.post(this.apiUrl , prod).subscribe({
      next: () => console.log("✔ PUT call SUCCESS"),
      error: (e) => console.log("❌ PUT call FAILED", e)
    });
  }
}
