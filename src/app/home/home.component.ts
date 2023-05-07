import { Component } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from '../service/product.service';
import { CartService } from '../service/cart.service';
import { AuthService } from '../service/auth.service';
import { Cart } from '../models/Cart';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  products: Product[] = [];
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.productService.fetch().subscribe((prod) => {
      prod.map((p) => {
        const pr: Product = {
          id: p.payload.doc.id,
          nev: p.payload.doc.data().nev,
          leiras: p.payload.doc.data().leiras,
          ar: p.payload.doc.data().ar,
          kep: p.payload.doc.data().kep,
        };
        this.products.push(pr);
      });
    });
  }

  addToCart(product: Product) {
    if(localStorage.getItem("user")){
      const user = JSON.parse(localStorage.getItem("user") as string);
      const cartItem: Cart = {
        product_id: product.id,
        product_name: product.nev,
        quantity: 1,
        user_id: user.uid,
        ar: product.ar,
        kep: product.kep
      }
      this.cartService.exsistInCart(product.id, user.uid).subscribe(i => {
        if(!i.empty){
          //Benne van a kosárban
          console.log(i);
          i.forEach(data => {
            this.cartService.updateProductQuantity(data.id, data.data().quantity + 1);
            this.router.navigate(["/home"]);
          });
        }else{
          this.cartService.addToCart(cartItem);
          this.router.navigate(["/home"]);
        }
      });
    }
  }
}
