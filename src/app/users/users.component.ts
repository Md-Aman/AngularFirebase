import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';


import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase';


import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
interface User {
  id: string;
  name: string;
  company: string;
  location: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  users: any;
  // datas: AngularFireList<any[]>;
  data: any[];
  postsCol: AngularFirestoreCollection<User>;
  postsDoc: AngularFirestoreDocument<User>;
  usersUpdate: Observable<User>;

  view: boolean = false;
  updateDa: any;

  createNewData: boolean = false;
  register: FormGroup;
  updater: FormGroup;
  submitted = false;
  constructor(public afs: AngularFirestore, public router: Router, private formBuilder: FormBuilder) {
  }
  goBack() {
    this.router.navigate(['']);
  }
  logOut() {
    firebase.auth().signOut()
    this.router.navigate(['']);
  }
  // isUser: boolean;
  ngOnInit() {
    this.postsCol = this.afs.collection('users');
    // console.log("this.postsCol :", this.postsCol);
    // this.users = this.postsCol.valueChanges();

    var user = firebase.auth().currentUser;

    if (user == null) {
      this.router.navigate(['']);
    } else {
      this.users = this.postsCol.snapshotChanges()
        .map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as User;
            const id = a.payload.doc.id;
            return { id, data };
          });
        });

      this.register = this.formBuilder.group({
        name: ['', [Validators.required]],
        company: ['', [Validators.required]],
        address: ['', [Validators.required]],
      });

      this.updater = this.formBuilder.group({
        namer: ['', [Validators.required]],
        companyr: ['', [Validators.required]],
        addressr: ['', [Validators.required]],
      });
      // if(user != null){
      //    this.isUser = true;
      // } else {
      //   this.isUser = false;
      // }
    }
  }

  name: string;
  company: string;
  address: string;
  namer: string;
  companyr: string;
  addressr: string;
  get f() { return this.register.controls; }
  get g() { return this.updater.controls; }
  onSubmit() {
    // doc('my-custom-id').set({}) for update or reset
    this.submitted = true;
    if (!this.register.invalid) {
      this.afs.collection('users').add({
        'username': this.name,
        'company': this.company,
        'location': this.address
      })
    }
    this.register.reset();
    // return false;
  }

  deleteDoc(id) {
    this.afs.collection('users').doc(id).delete();
  }

  updateId: string;
  update(id) {
    this.updateId = id;
    this.view = true;
    this.createNewData = false;
    this.postsDoc = this.afs.collection('users').doc(id);
    // this.postsDoc = this.afs.doc('posts/'+id);
    this.updateDa = this.postsDoc.valueChanges().subscribe(updateData => {
      this.updateDa = updateData;
      this.namer = this.updateDa.username;
      this.companyr = this.updateDa.company;
      this.addressr = this.updateDa.location;
    })
  };
  //   console.log(" this.usersUpdate :", this.usersUpdate);
  //   this.usersUpdate.subscribe(updateData => {
  //     this.updateDa = updateData;
  //     console.log("this.updateDa :", this.updateDa.company);
  //   })
  // }
  add() {
    this.createNewData = true;
    this.view = false;
  }
  onUpdate() {
    if (this.updater.valid) {
      this.afs.collection('users').doc(this.updateId).set({
        'username': this.namer,
        'company': this.companyr,
        'location': this.addressr
      })
    }

  }
}
