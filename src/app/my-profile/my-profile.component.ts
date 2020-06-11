import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteProfileComponent } from './delete-profile/delete-profile.component';
import { Users } from '../shared/users';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  id: string;
  user: Users;
  imgUrl: any;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer
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
    this.userService.getUserImageById(this.id)
      .subscribe((res: any) => {
        if (res.data.length > 0) {
          const file = res.data[0];
          this.imgUrl = file.filePath;
          console.log(this.imgUrl);
        }
      });
  }

  cleanURL(oldURL): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(oldURL);
  }

  onSuccessDeleteProfile = () => {
    this.userService.deleteUserProfile(this.id)
      .subscribe((res: any) => {
        if (res.statusCode === 200) {
          localStorage.clear();
          alert('User Deleted Successfully !');
          window.location.href = '/';
        }
      });
  }
  deleteProfile = () => {
    const dialogRef = this.dialog.open(DeleteProfileComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onSuccessDeleteProfile();
      }
    });
  }
}
