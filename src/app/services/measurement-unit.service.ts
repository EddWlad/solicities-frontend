import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MeasurementUnit } from 'app/model/measurementUnit';
import { environment } from 'environments/environment.development';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class MeasurementUnitService extends GenericService<MeasurementUnit> {
  constructor() {
    super(
      inject(HttpClient),
      `${environment.HOST}/measurement-units`
      );
   }


}
