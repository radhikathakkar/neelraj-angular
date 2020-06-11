import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ConfirmedValidator } from '../common/passwordValidator';
import { OCCUPATION_ARR, GENDER_LIST, STATUS_LIST } from '../shared/selectionDataArray/selectionArr';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  occupationList = OCCUPATION_ARR;
  genderSelection = GENDER_LIST;
  statusList = STATUS_LIST;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm = () => {
    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      middlename: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['',
        Validators.compose(
          [
            Validators.required,
            Validators.email,
          ]
        )
      ],
      contactNo: ['',
        Validators.compose(
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
          ]
        )],
      password: ['',
        Validators.compose(
          [
            Validators.required,
            Validators.minLength(4)
          ]
        )],
      conformPassword: ['',
        Validators.compose(
          [
            Validators.required,
            Validators.minLength(4)
          ]
        )],
      DOB: [new Date(), Validators.required],
      gender: ['', Validators.required],
      birthTime: ['', Validators.required],
      birthPlace: ['', Validators.required],
      education: ['', Validators.required],
      occupation: ['', Validators.required],
      fatherOccupation: ['', Validators.required],
      motherOccupation: ['', Validators.required],
      height: ['', Validators.required],
      weight: ['', Validators.required],
      jooth: ['', Validators.required],
      mosad: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      manglik: [Boolean, Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
      address: ['', Validators.required],
    }, {
      validator: ConfirmedValidator('password', 'conformPassword')
    });
  }

  openLoginModal = () => {
    this.dialog.open(LoginComponent, {
      width: '500px',
      height: '320px'
    });
  }


  onSubmit = () => {
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.userService.registerUser(this.registerForm.value)
      .subscribe(data => {
        console.log('data =', data);
        this.resetRegisterForm();
      });
  }

  resetRegisterForm = () => {
    const obj = this.registerForm.controls;
    // tslint:disable-next-line: forin
    for (const property in obj) {
      obj[property].setValue('');
    }
  }
}
