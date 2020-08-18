import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
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
  onToggleSidenav() {
    this.sidenavToggle.emit();
  }
  onLogout() {
    this.as.logout();
  }
}
