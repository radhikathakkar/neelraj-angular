import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { OCCUPATION_ARR, STATUS_LIST } from 'src/app/shared/selectionDataArray/selectionArr';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from 'src/app/shared/baseUrl';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  editForm: FormGroup;
  occupationList = OCCUPATION_ARR;
  statusList = STATUS_LIST;
  profileImg: any;
  imageSrc: string;
  id: string;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private http: HttpClient,
  ) {
    this.editUserForm();
    this.id = this.route.snapshot.params.id;
    console.log(this.id);
  }

  ngOnInit(): void {
    this.getUserDetail();
  }

  editUserForm = () => {
    this.editForm = this.fb.group({
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
    });
  }

  setValues = (user) => {
    this.editForm.controls.firstname.setValue(user.firstname);
    this.editForm.controls.middlename.setValue(user.middlename);
    this.editForm.controls.lastname.setValue(user.lastname);
    this.editForm.controls.email.setValue(user.email);
    this.editForm.controls.contactNo.setValue(user.contactNo);
    this.editForm.controls.education.setValue(user.education);
    this.editForm.controls.occupation.setValue(user.occupation);
    this.editForm.controls.fatherOccupation.setValue(user.fatherOccupation);
    this.editForm.controls.motherOccupation.setValue(user.motherOccupation);
    this.editForm.controls.height.setValue(user.height);
    this.editForm.controls.weight.setValue(user.weight);
    this.editForm.controls.jooth.setValue(user.jooth);
    this.editForm.controls.mosad.setValue(user.mosad);
    this.editForm.controls.maritalStatus.setValue(user.maritalStatus);
    this.editForm.controls.manglik.setValue(user.manglik);
    this.editForm.controls.country.setValue(user.country);
    this.editForm.controls.city.setValue(user.city);
    this.editForm.controls.zipCode.setValue(user.zipCode);
    this.editForm.controls.address.setValue(user.address);
  }

  readURL(event): void {
    const file = event.target.files;
    if (file && file.length > 0) {
      this.profileImg = file[0];
      console.log('file =', this.profileImg);
      const reader = new FileReader();
      reader.onloadend = (e: any) => {
        this.imageSrc = e.target.result;
      };

      reader.readAsDataURL(this.profileImg);
    }
  }

  getUserDetail = () => {
    this.userService.getUserById(this.id)
      .subscribe((res: any) => {
        this.setValues(res.data);
      });
  }

  submitImg() {
    const formData = new FormData();
    formData.append('file', this.profileImg);
    this.userService.uploadUserImg(this.id, formData)
      .subscribe(res => {
        alert('Profile Photo Uploaded!');
        window.location.href = '/';
      });
  }

  onSubmit() {
    this.userService.updateUserProfile(this.id, this.editForm.value)
      .subscribe(res => {
        if (res) {
          alert('User Updated Successfully !');
          window.location.href = '/';
        }
      });
  }
}
