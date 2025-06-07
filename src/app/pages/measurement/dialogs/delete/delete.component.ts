import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MeasurementUnitService } from 'app/services/measurement-unit.service';

export interface DialogData {
  idUnit: number;
  name: string;
}

@Component({
    selector: 'app-delete',
    templateUrl: './delete.component.html',
    styleUrls: ['./delete.component.scss'],
    imports: [
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatButtonModule,
        MatDialogClose,
    ]
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public measurementService: MeasurementUnitService,
  ) {}
  confirmDelete(): void {
    this.measurementService.delete(this.data.idUnit).subscribe({
      next: (response) => {
        this.dialogRef.close(response);
      },
      error: (error) => {
        console.error('Delete Error:', error);
      },
    });
  }
}
