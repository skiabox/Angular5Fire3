import { Injectable } from '@angular/core';
import {AuthData} from './auth-data.model';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {TrainingService} from '../training/training.service';
import {UiService} from '../shared/ui.service';
import {Store} from '@ngrx/store';

import * as fromApp from '../app.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //event setup
  public authChange = new Subject<boolean>();

  //private user: User;
  private isAuthenticated: boolean = false;

  //inject router
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UiService,
    private store: Store<{ui: fromApp.State}>
    ) { }

    //initialize Firebase Auth Listener
  public initAuthListener(): void
  {
    this.afAuth.authState.subscribe(user => {
      if (user)
      {
        console.log(user);

        //change isAuthenticated flag
        this.isAuthenticated = true;

        //emit the event using the RxJS 6 Subject
        this.authChange.next(true); //user is logged in now

        //redirect user to training component
        this.router.navigate(['/training']);
      }
      else
      {
        //cancel training service subscriptions
        this.trainingService.cancelSubscriptions();

        //this.user = null;
        this.authChange.next(false);  //user is logged out now

        //redirect user to login page
        this.router.navigate(['/login']);

        //change isAuthenticated flag
        this.isAuthenticated = false;
      }
    });
  }

  //methods
  public registerUser(authData: AuthData): void
  {
    //this.uiService.loadingStateChanged.next(true);
    //---
    //dispatch an action (action is an object with a type property)
    this.store.dispatch({ type: 'START_LOADING'});

    //returns firebase.Promise (containing non-null firebase.auth.UserCredential)
    this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        //this.uiService.loadingStateChanged.next(false);
        this.store.dispatch({ type: 'STOP_LOADING'});
      })
      .catch(error => {
        //this.uiService.loadingStateChanged.next(false);
        this.store.dispatch({ type: 'STOP_LOADING'});

        this.uiService.showSnackbar(error.message, null, 3000);

      });


  }

  public login(authData: AuthData): void
  {
    //this.uiService.loadingStateChanged.next(true);
    // this.user = {
    //   email: authData.email,
    //   userId: Math.round(Math.random() * 10000).toString()
    // };
    //---
    //dispatch an action (action is an object with a type property)
    this.store.dispatch({ type: 'START_LOADING'});

    //returns firebase.Promise (containing non-null firebase.auth.UserCredential)
    this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        //console.log(result);
        //use helper method below
        //this.authSuccessfully();
        //---this.uiService.loadingStateChanged.next(false);
        this.store.dispatch({ type: 'STOP_LOADING'});
      })
      .catch(error => {
        //console.log(error);
        //---this.uiService.loadingStateChanged.next(false);
        this.store.dispatch({ type: 'STOP_LOADING'});

        this.uiService.showSnackbar(error.message, null, 3000);
        // this.snackbar.open(error.message, null, {
        //   duration: 3000
        // });
      });

  }

  public logout(): void
  {
    //sign out from AngularFireAuth
    this.afAuth.auth.signOut();
  }

  // public getUser(): User
  // {
  //   return { ...this.user };
  // }

  public isAuth(): boolean
  {
    //return this.user != null; // `!=` rules out both null and undefined
    return this.isAuthenticated;
  }

  //helper methods
  // private authSuccessfully(): void
  // {
  //
  // }
}
