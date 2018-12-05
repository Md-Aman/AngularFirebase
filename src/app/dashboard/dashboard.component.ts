import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import { ItemService } from './../services/item-service/item.service';
interface User {
  user_id: string;
  name: string;
}
interface Item {
  id: string;
  user_id: string,
  item_description: string;
  item_price: string;
  date_time: string;
}
@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: AngularFirestoreCollection<User>;
  postsCol: AngularFirestoreCollection<Item>;
  items: any;
  userName:any;
  // datas: AngularFireList<any[]>;
  data: any[];


  user_data:any;
  user_name:string;
  constructor(public afs: AngularFirestore, public router: Router, public itemService:ItemService) { 
  this.user_name = localStorage.getItem("userName");
  }

  total_price:number = 0;
  ngOnInit() {
    if (localStorage.getItem('userId') == null) {
      this.router.navigate(['']);
    }
    this.users = this.afs.collection('users');
    this.user_data = this.users.valueChanges();

    this.postsCol = this.afs.collection('items');
    this.items = this.postsCol.valueChanges();
    this.items.subscribe(items => {
      console.log("items :", items);
      for (let item of items) {
        this.total_price += item.price;
      }
    });
  }
  dashboard(){
    this.router.navigate(['dashboard']);
  }
  myHistory(){
    this.router.navigate(['items']);
  }
  getUser(userId){
   this.itemService.user_id_for_individual_user_history = userId;
   this.router.navigate(['user-item-histroy']);
  }
}
