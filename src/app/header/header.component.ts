import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  showLoginBtn: boolean;
  showLogoutBtn: boolean;
  id: string;
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      this.showLogoutBtn = true;
      this.id = localStorage.getItem('userId');
    } else {
      this.showLogoutBtn = false;
    }
  }

  ngOnInit(): void {
  }


  logout() {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('token');
    this.router.navigate(['/']);
    window.location.reload();
  }

  openProfile() {
    this.router.navigate(['/myProfile/', this.id]);
  }
}
