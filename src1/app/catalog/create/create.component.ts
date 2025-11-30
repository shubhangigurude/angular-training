import { Component } from '@angular/core';
import { CartService } from '../../shopping-cart/cart.service';
import { Product } from '../product';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  productForm!: FormGroup;
  product: Product = new Product();
  constructor(private svc: ProductService) {

  }
  ngOnInit(): void {
    this.productForm = new FormGroup({
      title: new FormControl(this.product.title, [Validators.required, Validators.minLength(3)]),
      price: new FormControl(this.product.price, [Validators.required, Validators.min(0)]),
      description: new FormControl(this.product.description, [Validators.required, Validators.minLength(10)]),
      imageurl: new FormControl(this.product.imageurl, [Validators.required, Validators.pattern('(https?://.*\\.(?:png|jpg))')])  
    });
  }
  onUpdate(): void {
    console.log(this.productForm.value);
    // get product form post using controls
    this.product.title = this.productForm.get('title')?.value;
    this.product.price = this.productForm.get('price')?.value;
    this.product.description = this.productForm.get('description')?.value;

    this.svc.addProduct(this.product);

    console.log('Product created:', this.product);
  }
}
