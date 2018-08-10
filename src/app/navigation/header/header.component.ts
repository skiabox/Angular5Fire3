import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  //we want to emit a custom event to parent component (app.component) using EventEmitter
  //we will make also this component listenable from the outside using output
  @Output()
  public sidenavToggle = new EventEmitter<void>();

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
  public onToggleSidenav(): void
  {
    this.sidenavToggle.emit();
  }

  public onLogout(): void
  {
    this.authService.logout();
  }

}
