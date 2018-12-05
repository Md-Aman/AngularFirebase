import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Router } from '@angular/router';
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
  constructor(public afs: AngularFirestore, public router: Router) { 
  this.user_name = localStorage.getItem("userName");
  console.log("this.user_name :", this.user_name);
  }

  ngOnInit() {
    if (localStorage.getItem('userId') == null) {
      this.router.navigate(['']);
    }
    this.users = this.afs.collection('users');
    this.user_data = this.users.valueChanges();
  }
  getUser(userId){
   console.log("userId :", userId);
  }
}
