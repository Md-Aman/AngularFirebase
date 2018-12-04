import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';


import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase';

import {formatDate } from '@angular/common';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
interface Item {
  id: string;
  user_id:string,
  item_description: string;
  item_price: string;
  date_time: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  items: any;
  // datas: AngularFireList<any[]>;
  data: any[];
  postsCol: AngularFirestoreCollection<Item>;
  postsDoc: AngularFirestoreDocument<Item>;
  usersUpdate: Observable<Item>;

  view: boolean = false;
  updateDa: any;

  // createNewData: boolean = false;
  register: FormGroup;
  // updater: FormGroup;

  submitted = false;
  constructor(public afs: AngularFirestore, public router: Router, private formBuilder: FormBuilder) {
  }

   
  item_description: string;
  item_price: number;

  goBack() {
    this.router.navigate(['']);
  }
  logOut() {
    firebase.auth().signOut();
    localStorage.clear();
    this.router.navigate(['']);
  }
  // isUser: boolean;
  total_price=[];
  object_length:object;
  ngOnInit() {
    if(localStorage.getItem('userId')==null){
      this.router.navigate(['']);
    }
    this.postsCol = this.afs.collection('items', ref => ref.where('user_id', '==', localStorage.getItem('userId')));
    // console.log("this.postsCol :", this.postsCol);
    // this.users = this.postsCol.valueChanges();

    var user = firebase.auth().currentUser;

    // if (user == null) {
    //   this.router.navigate(['']);
    // } else {
    
      this.items = this.postsCol.snapshotChanges()
        .map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as Item;
            this.object_length = Object.keys(data);
            const id = a.payload.doc.id;
          //   for (prop of data) { 
          //     this.total_price.push(data[prop]);
          //  }
            return { id, data };
          });
        });
      this.register = this.formBuilder.group({
        ItemDescription: ['', [Validators.required]],
        Price: ['', [Validators.required]]
      });

      // this.updater = this.formBuilder.group({
      //   namer: ['', [Validators.required]],
      //   companyr: ['', [Validators.required]],
      //   addressr: ['', [Validators.required]],
      // });
      // if(user != null){
      //    this.isUser = true;
      // } else {
      //   this.isUser = false;
      // }
    // }
  }
  today= new Date();
  date_time = '';



  // namer: string;
  // companyr: string;
  // addressr: string;
  get f() { return this.register.controls; }
  // get g() { return this.updater.controls; }

  onSubmitItem() {
    this.submitted = true;
    this.date_time = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', 'GMT+8');
    // doc('my-custom-id').set({}) for update or reset
    if (!this.register.invalid) {
      this.afs.collection('items').add({
        'user_id':localStorage.getItem('userId'),
        'item_description': this.item_description,
        'price': this.item_price,
        'date_time': this.date_time
      })
    }
    // this.register.reset();
    // return false;
  }

  deleteDoc(id) {
    this.afs.collection('users').doc(id).delete();
  }

  updateId: string;
  update(id) {
    this.updateId = id;
    this.view = true;
    this.postsDoc = this.afs.collection('users').doc(id);
    // this.postsDoc = this.afs.doc('posts/'+id);
    this.updateDa = this.postsDoc.valueChanges().subscribe(updateData => {
      this.updateDa = updateData;
      // this.namer = this.updateDa.username;
      // this.companyr = this.updateDa.company;
      // this.addressr = this.updateDa.location;
    })
  };
  //   console.log(" this.usersUpdate :", this.usersUpdate);
  //   this.usersUpdate.subscribe(updateData => {
  //     this.updateDa = updateData;
  //     console.log("this.updateDa :", this.updateDa.company);
  //   })
  // }

  // onUpdate() {
  //   if (this.updater.valid) {
  //     this.afs.collection('users').doc(this.updateId).set({
  //       'username': this.namer,
  //       'company': this.companyr,
  //       'location': this.addressr
  //     })
  //   }

  // }
}
