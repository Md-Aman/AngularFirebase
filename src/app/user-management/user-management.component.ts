import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
interface User {
  user_id: string;
  name: string;
  status: boolean;
}
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: AngularFirestoreCollection<User>;
  usersDoc: AngularFirestoreDocument<User>;

  user_data: any = [];
  user_info: any = [];

  constructor(private router: Router, public afs: AngularFirestore) { }


  ngOnInit() {
    if(localStorage.getItem('userId') == null){
      this.router.navigate(['']);
    }
    this.users = this.afs.collection('users', ref => ref.orderBy('name'));
    this.user_data = this.users.valueChanges();
    this.user_data.subscribe(userInfo => {
      this.user_info = userInfo;
      console.log("users :", this.user_info);
    });
  }


  changeStatus(name, userId, status) {
   
   
  }

  dashboard() {
    this.router.navigate(['dashboard']);
  }
  myHistory() {
    this.router.navigate(['items']);
  }
  inventory() {
    this.router.navigate(['inventory']);
  }
  logOut() {
    firebase.auth().signOut();
    localStorage.clear();
    this.router.navigate(['']);
  }

}
