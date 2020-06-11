import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  users: any;
  files = [];
  userNameArr = [];
  femaleArr = [];
  maleArr = [];
  firstname: string;
  gender: string;
  city: string;
  age: number;
  public birthdate: Date;
  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  // Get All users from database
  getUsers = () => {
    this.userService.getUserData()
      .subscribe(
        (data: any) => {
          if (data) {
            this.users = data;
            data.map(x => {
              this.files.push(x.files);
            });
            this.userNameArr = this.users;
            this.getMaleFemale(this.users);
          } else {
            alert('no records found');
          }
        },
        err => err
      );
  }

  // Store all females and males in different array
  getMaleFemale = (users: any) => {
    if (users.length > 0) {
      users.filter(user => {
        if (user.gender === 'female') {
          this.femaleArr.push(user);
        } else {
          this.maleArr.push(user);
        }
      });
    }
  }

  // To apply Filter on available User's Data
  applyFilter(filterValue: string, key) {
    // Key Based filter for users
    if (key === 'firstname') {
      if (filterValue.length > 0) {
        this.users = this.users.filter(res => {
          return res.firstname.toLowerCase().match(this.firstname.toLowerCase());
        });
      } else {
        this.users = this.userNameArr;
      }
    } else if (key === 'gender') {
      if (filterValue.length > 0) {
        this.users.filter(res => {
          if (this.gender === 'female') {
            this.users = this.femaleArr;
            return res.gender.toLowerCase().match(this.firstname.toLowerCase());
          } else if (this.gender === 'male') {
            this.users = this.maleArr;
            return res.gender.toLowerCase().match(this.firstname.toLowerCase());
          } else {
            this.users = this.userNameArr;
          }
        });
      } else {
        this.users = this.userNameArr;
      }
    }
  }
}
