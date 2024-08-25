import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-userstatusdialog',
  standalone: true,
  imports: [MatDialogModule,MatButtonModule],
  templateUrl: './userstatusdialog.component.html',
  styleUrl: './userstatusdialog.component.scss'
})
export class UserstatusdialogComponent {
  userStatus: string;

  constructor(
    public dialogRef: MatDialogRef<UserstatusdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userStatus = data.currentStatus;
  }

  onStatusChange(status: string) {
    this.dialogRef.close(status);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
