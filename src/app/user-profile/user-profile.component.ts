import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { BASE_URL } from '../shared/baseUrl';
import { Users } from '../shared/users';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  id: string;
  user: Users;
  url = BASE_URL;
  imgUrl: string;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
  ) {
    this.id = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    this.validateIdToDisplayData();
  }

  validateIdToDisplayData = () => {
    this.userService.validateUserId(this.id)
      .subscribe((res: any) => {
        if (res === null) {
          localStorage.clear();
          window.location.href = '/';
        } else {
          this.displayProfileDetails();
          this.getImage();
        }
      });
  }

  displayProfileDetails = () => {
    this.userService.getUserProfile(this.id)
      .subscribe((response: any) => {
        this.user = response.data;
      });
  }

  getImage = () => {
    // let objectURL = 'data:image/jpeg;base64,' + baseImage.image;
    this.userService.getUserImageById(this.id)
      .subscribe((res: any) => {
        if (res.data.length > 0) {
          this.readThis(res.data);
        }
      });
  }

  readThis(inputValue: any): void {
    console.log('input =', inputValue);
    // const file: File = inputValue;
    // const myReader: FileReader = new FileReader();
    // console.log(file);
    // myReader.onload = (e) => {
    //   console.log(myReader.result);
    // };
  }

}
