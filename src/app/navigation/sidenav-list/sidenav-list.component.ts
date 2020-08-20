import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSideNav = new EventEmitter<void>();
  isAuth$: Observable<boolean>;
  authSubscription: Subscription;
  constructor(private store: Store<fromRoot.State>, private as: AuthService) { }

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

  onClose() {
    this.closeSideNav.emit();
  }
  onLogout() {
    this.onClose();
    this.as.logout();
  }
}
