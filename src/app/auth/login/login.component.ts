import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from 'src/app/shared/ui-service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  private loadingSub: Subscription;
  constructor(private as: AuthService, private uis: UIService, private store: Store<{ ui: fromApp.State }>) {
  }

  ngOnInit() {
    this.store.subscribe(data => { console.log(data); });
    this.loadingSub = this.uis.loadingStateSubject.subscribe(isLo => {
      this.isLoading = isLo;
    });
  }
  ngOnDestroy() {
    if (this.loadingSub) {
      this.loadingSub.unsubscribe();
    }
  }
  onSubmit(f: NgForm) {
    console.log(f);
    this.as.login({
      email: f.value.email,
      password: f.value.password
    });
  }
}
