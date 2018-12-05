import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
// import { AngularFireAuth } from 'angularfire2/auth';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import * as firebase from 'firebase';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ItemsComponent } from './items/items.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routers: Routes = [
  {
    path:"", component:LoginComponent
  },
  {
    path:"items", component:ItemsComponent
  },
  {
    path:"dashboard", component:DashboardComponent
  }
]
firebase.initializeApp(environment.firebase)
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersComponent,
    ItemsComponent,
    DashboardComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot(routers),


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
