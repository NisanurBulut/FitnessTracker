import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm, ɵNgNoValidate } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from 'src/app/shared/ui-service';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  maxDate;
  isLoading = false;
  private loadingSub: Subscription;

  constructor(private as: AuthService, private uis: UIService) { }

  ngOnInit() {
    this.loadingSub = this.uis.loadingStateSubject.subscribe(isLoad => {
      this.isLoading = isLoad;
    });

    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }
  ngOnDestroy() {
    this.loadingSub.unsubscribe();
  }
  onSubmit(f: NgForm) {
    this.as.registerUser({
      email: f.value.email,
      password: f.value.password
    });
  }
}
