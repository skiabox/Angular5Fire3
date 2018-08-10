import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {

  //we want to emit a custom event to parent component (app.component) using EventEmitter
  //we will make also this component listenable from the outside using output
  @Output()
  public closeSidenav = new EventEmitter<void>();

  //auth related
  public isAuth: boolean = false;
  public authSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  //methods
  public onClose(): void
  {
    this.closeSidenav.emit();
  }

  public onLogout(): void
  {
    this.onClose();
    this.authService.logout();
  }
}
