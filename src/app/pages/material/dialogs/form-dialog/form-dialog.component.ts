import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogClose,
} from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { MaterialService } from '../../../../services/material.service';

import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormBuilder,
} from '@angular/forms';

import {
  MAT_DATE_LOCALE,
  MatNativeDateModule,
  MatOptionModule,
} from '@angular/material/core';
import { formatDate } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { Material } from 'app/model/material';
import { MeasurementUnit } from 'app/model/measurementUnit';
import { MeasurementUnitService } from 'app/services/measurement-unit.service';

export interface DialogData {
  id: number;
  action: string;
  material: Material;
}

@Component({
    selector: 'app-form-dialog',
    templateUrl: './form-dialog.component.html',
    styleUrls: ['./form-dialog.component.scss'],
    providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
    imports: [
        MatButtonModule,
        MatIconModule,
        MatDialogContent,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatDatepickerModule,
        MatSelectModule,
        MatOptionModule,
        MatDialogClose,
        MatNativeDateModule,
        MatMomentDateModule,
    ]
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  materialForm: FormGroup;
  material: Material;
  url: string | null = null;

  measureUnit: MeasurementUnit[];

  fileName: string[] = [];

  selectedFiles: FileList;

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public materialService: MaterialService,
    private fb: FormBuilder,
    private measureUnitService: MeasurementUnitService
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle =
        data.material.name;
      this.material = data.material;
    } else {
      this.dialogTitle = 'New Material';
      this.material = new Material();
    }
    this.materialForm = this.createMaterialForm();
  }


  ngOnInit() {
    this.measureUnitService.findAll().subscribe((data) => {
      this.measureUnit = data;
    });
  }

  compareMeasurementUnit(a: MeasurementUnit, b: MeasurementUnit): boolean {
    return a && b ? a.idUnit === b.idUnit : a === b;
  }

  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }
  createMaterialForm(): UntypedFormGroup {
    return this.fb.group({
      idMaterial: [this.material.idMaterial],
      name: [this.material.name, [Validators.required]],
      description: [this.material.description, [Validators.required]],
      cost: [this.material.cost],
      measurementUnit: [this.material.measurementUnit],
      images: [this.material.images],
      status: [this.material.status],
      /*birthDate: [
        formatDate(this.advanceTable.birthDate, 'yyyy-MM-dd', 'en'),
        [Validators.required],
      ],*/
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  submit() {
    if (this.materialForm.valid) {
      const idData = this.materialForm.get('idMaterial')?.value;

      const enviarDatos = (urlList: string[] = []) => {
        // Actualizamos solo si hay imagen nueva
        if (urlList.length > 0) {
          this.materialForm.get('images')?.setValue(urlList);
        }
        const formData = this.materialForm.getRawValue();

        if (this.action === 'edit') {
          this.materialService.update(idData, formData).subscribe({
            next: (response) => this.dialogRef.close(response),
            error: (error) => console.error('Update Error:', error),
          });
        } else {
          this.materialService.add(formData).subscribe({
            next: (response) => {
              this.dialogRef.close(response);
            },
            error: (error) => console.error('Add Error:', error),
          });
        }
      };

      if (this.selectedFiles && this.selectedFiles.length > 0) {
        this.materialService.saveFile(this.selectedFiles.item(0)).subscribe({
          next: (urlList: string[]) => enviarDatos(urlList),
          error: (error) => {
            console.error('Upload Error:', error);
            enviarDatos(); // Editar sin nueva imagen si falla
          },
        });
      } else {
        enviarDatos(); // No se subió imagen nueva
      }
    }
  }

  onSelectFile(event: any) {

    this.fileName = event.target.files[0]?.name;
    this.selectedFiles = event.target.files;
  }

  upload(){
    this.materialService.saveFile(this.selectedFiles.item(0)).subscribe();
  }
}
