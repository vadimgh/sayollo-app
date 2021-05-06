import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError, map } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private _subscriptions = new Subscription();
  form: FormGroup;

  private _createForm() {
    this.form = this.fb.group({
      username: [''],
      password: [''],
    });
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toasterService: ToasterService,
    private router: Router
  ) {}

  ngOnInit() {
    this._createForm();
  }

  // event handlers (start)
  onLogin() {
    const username = this.form.get('username').value;
    const password = this.form.get('password').value;

    this._subscriptions.add(
      this.authService
        .logIn({ username, password })
        .pipe(
          map(() => {
            this.toasterService.popAsync(
              'success',
              'sign up',
              'Successfuly logged in'
            );
            this.router.navigate(['/']);
            return of({});
          }),
          catchError(() => {
            this.toasterService.popAsync(
              'error',
              'sign up',
              'Cannot login at the moment. Please, try later'
            );
            return of({});
          })
        )
        .subscribe()
    );
  }
  // evnet handlers (end)

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }
}
