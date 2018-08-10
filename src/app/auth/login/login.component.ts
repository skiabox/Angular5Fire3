import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {UiService} from '../../shared/ui.service';
import {Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';

import { map } from 'rxjs/operators';

import * as fromApp from '../../app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  //public isLoading: boolean = false;
  public isLoading$: Observable<boolean>;

  //private loadingSubs: Subscription;

  constructor(private authService: AuthService, private uiService: UiService, private store: Store<{ui: fromApp.State}>) { }

  ngOnInit() {

    //subscribe to the ngrx store
    //this.store.subscribe(data => console.log(data));

    //we want to subscribe from inside the template with the async pipe and not here
    this.isLoading$ = this.store.pipe(map(state => state.ui.isLoading));

    //---old code
    // this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => {
    //   this.isLoading = isLoading;
    // });

    this.loginForm = new FormGroup({
      email: new FormControl('', {validators: [Validators.required, Validators.email]}),
      password: new FormControl('', {validators: [Validators.required]})
    });
  }

  // ngOnDestroy() {
  //   if (this.loadingSubs)
  //     this.loadingSubs.unsubscribe();
  // }

  //methods
  public onSubmit(): void
  {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }

}
