import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-bottom-header',
  templateUrl: './bottom-header.component.html',
  styleUrls: ['./bottom-header.component.css']
})
export class BottomHeaderComponent implements OnInit {

  showLoginBtn: boolean;
  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      this.showLoginBtn = false;
    } else {
      this.showLoginBtn = true;
    }
  }

  openLoginModal = () => {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '500px',
      height: '320px'
    });
    dialogRef.afterClosed().subscribe(result => {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      if (isLoggedIn === 'true') {
        this.showLoginBtn = false;
      }
      // this.showLogoutBtn = !result.data;
      // console.log('show logout = ', this.showLogoutBtn);
    });
  }
}
