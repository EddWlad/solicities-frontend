import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Inject, inject } from '@angular/core';
import { Material } from 'app/model/material';
import { environment } from 'environments/environment.development';
import { catchError, map, Observable, throwError } from 'rxjs';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class MaterialService extends GenericService<Material> {

  constructor() {
    super(
      inject(HttpClient),
      `${environment.HOST}/materials` // Use the environment variable for the API URL
    )
  }

  saveFile(data: File){
    const formData: FormData = new FormData();
    formData.append('file', data);
    return this.http.post(`${environment.HOST}/materials/upload`, formData);
  }

}
