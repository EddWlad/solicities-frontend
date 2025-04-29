import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { GenericService } from './generic.service';
import { Company } from 'app/model/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService extends GenericService<Company> {

  constructor() {
    super(
      inject(HttpClient),
      `${environment.HOST}/companies` // Use the environment variable for the API URL
    )
  }

  saveFile(data: File){
    const formData: FormData = new FormData();
    formData.append('file', data);
    return this.http.post(`${environment.HOST}/companies/upload`, formData);
  }
}
