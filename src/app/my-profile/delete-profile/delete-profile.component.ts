import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-profile',
  templateUrl: './delete-profile.component.html',
  styleUrls: ['./delete-profile.component.css']
})
export class DeleteProfileComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DeleteProfileComponent>,
  ) { }

  ngOnInit(): void {
  }

}
