import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {MatSnackBar} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  //properties - event emitter
  public loadingStateChanged = new Subject<boolean>();

  constructor(private snackbar: MatSnackBar) { }

  //methods
  public showSnackbar(message, action, duration): void
  {
    this.snackbar.open(message, action, {
      duration: duration
    });
  }
}
