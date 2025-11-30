import { Component } from '@angular/core';
import { Product } from '../product';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../product.service';
import { routes } from '../../app.routes';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent {
  //inject product service
  constructor(private productService: ProductService, private route: ActivatedRoute) { }
  product: Product | undefined;
  productid: number | undefined;
  ngOnInit(): void {
    //fetch id form route params
    this.productid = this.route.snapshot.params['id'];
    console.log('Product ID from route:', this.productid);
    //fetch product by id
    this.productService.getProductById(this.productid!).subscribe((data: Product) => {
      this.product = data;
    });
  }
  onUpdate(product: Product): void {
    this.productService.updateProduct(product);
    console.log('Product updated:', product);
  }
}
