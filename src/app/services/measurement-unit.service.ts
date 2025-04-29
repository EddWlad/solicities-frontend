import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MeasurementUnit } from 'app/model/measurementUnit';
import { environment } from 'environments/environment.development';
import { catchError, Observable, throwError } from 'rxjs';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class MeasurementUnitService extends GenericService<MeasurementUnit> {
  constructor() {
    super(
      inject(HttpClient),
      `${environment.HOST}/measurement-units` // Use the environment variable for the API URL
      );
   }


}
