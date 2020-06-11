import { Component, OnInit, EventEmitter, Output, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // @Input() public user;
  // @Output() passEntry: EventEmitter<any> = new EventEmitter();
  loginForm: FormGroup;
  show = true;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LoginComponent>,
    private loginService: LoginService,
    private router: Router,
  ) { }

  ngOnInit() {
    localStorage.setItem('isLoggedIn', 'false');
    this.createLoginForm();
  }

  createLoginForm = () => {
    this.loginForm = this.fb.group({
      email: ['',
        Validators.compose(
          [
            Validators.required,
            Validators.email
          ]
        )
      ],
      password: ['',
        Validators.compose(
          [
            Validators.required,
            Validators.minLength(3)
          ]
        )]
    });
  }

  onSubmit = () => {
    this.show = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loginService.login(this.loginForm.value)
      .subscribe((data: any) => {
        this.resetLoginForm();
        if (data.statusCode === 200) {
          this.show = false;
          this.dialogRef.close({
            data: this.show
          });
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('token', data.token);
          const id = data.id;
          localStorage.setItem('userId', id);
          this.router.navigate(['/myProfile/', id]);
        } else if (data.statusCode === 401) {
          this.show = true;
          this.dialogRef.close({
            data: this.show
          });
          localStorage.setItem('isLoggedIn', 'false');
          alert('wrong password');
        }
      });
  }

  resetLoginForm = () => {
    const obj = this.loginForm.controls;
    // tslint:disable-next-line: forin
    for (const property in obj) {
      obj[property].setValue('');
    }
    // this.loginForm.controls.email.setValue('');
    // this.loginForm.controls.password.setValue('');
  }

  closeDialog = () => {
    this.dialogRef.close({
      data: this.show
    });
  }
}
