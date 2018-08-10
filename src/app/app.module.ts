import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';

import { WelcomeComponent } from './welcome/welcome.component';
import {AppRoutingModule} from './app-routing.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import {environment} from '../environments/environment';
import {AngularFireModule} from 'angularfire2';
import {AuthModule} from './auth/auth.module';
import {AngularFirestoreModule} from 'angularfire2/firestore';

import { StoreModule } from '@ngrx/store';
import {appReducer} from './app.reducer';     //import reducer function from app.reducer.ts

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AuthModule,
    StoreModule.forRoot({ui: appReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
