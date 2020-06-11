import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: any;
  topNineUser = [];
  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers = () => {
    this.userService.getUserData()
      .subscribe(
        data => {
          if (data) {
            this.users = data;
            this.getFirstNineUser(data);
          } else {
            alert('no records found');
          }
        },
        err => err
      );
  }

  getFirstNineUser = (users) => {
    let count = 0;
    users.forEach(user => {
      if (count < 9) {
        this.topNineUser.push(user);
        count++;
      }
    });
  }
}
