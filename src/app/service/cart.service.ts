import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Cart } from '../models/Cart';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CartService {

  constructor(private af: AngularFirestore, private _snackbar: MatSnackBar) {}


  addToCart(item: Cart) {
    this.af.collection<Cart>('carts').add(item);
    this._snackbar.open('1 terméket hozzáadtunk a kosaradhoz!', 'Ok', { duration: 2000 });
  }

  getCart(user_id: string) {
    return this.af
      .collection<Cart>('carts', (ref) => ref.where('user_id', '==', user_id))
      .snapshotChanges();
  }

  updateProductQuantity(doc_id: string, newQuantity: number, inCart: boolean = false): void {
    const productDoc = this.af.collection('carts').doc(doc_id);
    productDoc.update({ quantity: newQuantity });
    this._snackbar.open(inCart ? '1 termék mennyiségét frissítetted a kosárban!' : '1 terméket hozzáadtunk a kosaradhoz!', 'Ok', { duration: 2000 });
  }

  exsistInCart(product_id: string, user_id: string) {
    return this.af
      .collection<Cart>('carts', (ref) =>
        ref
          .where('user_id', '==', user_id)
          .where('product_id', '==', product_id)
      )
      .get();
  }

  getCartItemCount(user_id : string): Observable<number> {
    if(user_id != undefined){
      return this.af.collection('carts',ref => ref.where("user_id","==", user_id)).get().pipe(
        map(querySnapshot => querySnapshot.size)
      );
    }
    return new Observable<number>();
  }

  removeFromCart(doc_id: string){
    return this.af.collection<Cart>('carts').doc(doc_id).delete();
  }
}
