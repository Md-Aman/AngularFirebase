import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from './../services/item-service/item.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-pmm',
  templateUrl: './pmm.component.html',
  styleUrls: ['./pmm.component.css']
})
export class PmmComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
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
  userManage(){
    this.router.navigate(['user-management']);
  }
  logOut() {
    firebase.auth().signOut();
    localStorage.clear();
    this.router.navigate(['']);
  }
}
