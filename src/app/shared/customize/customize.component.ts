import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.scss']
})
export class CustomizeComponent implements OnInit {

    constructor(
      public dialogRef: MatDialogRef<CustomizeComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {

    }

    ngOnInit() {
    }

}
