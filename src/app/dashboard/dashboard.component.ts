import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import { ItemService } from './../services/item-service/item.service';
interface User {
  user_id: string;
  name: string;
}
@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: AngularFirestoreCollection<User>;
  user_data:any;
  user_name:string;
  constructor(public afs: AngularFirestore, public router: Router, public itemService:ItemService) { 
  this.user_name = localStorage.getItem("userName");
  }

  ngOnInit() {
    if (localStorage.getItem('userId') == null) {
      this.router.navigate(['']);
    }
    this.users = this.afs.collection('users');
    this.user_data = this.users.valueChanges();
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
