import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Product } from '../models/Product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private af: AngularFirestore) { }

  fetch(){
    return this.af.collection<Product>("products").snapshotChanges();
  }

  getProductById(prod_id: string){
    return this.af.collection<Product>("products").doc(prod_id).get();
  }
  
}
