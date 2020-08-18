import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() closeSideNav = new EventEmitter<void>();
  isAuth: boolean;
  authSubscription: Subscription;
  constructor(private as: AuthService) { }

  ngOnInit() {
    this.authSubscription = this.as.authChange.subscribe((authStatus) => {
      this.isAuth = authStatus;
    });
  }
  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
  onClose() {
    this.closeSideNav.emit();
  }
  onLogout() {
    this.onClose();
    this.as.logout();
  }
}
