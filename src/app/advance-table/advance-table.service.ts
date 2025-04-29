import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AdvanceTable } from './advance-table.model';

@Injectable({
  providedIn: 'root',
})
export class AdvanceTableService {
  private readonly API_URL = 'assets/data/advanceTable.json';

  constructor(private httpClient: HttpClient) {}

  /** GET: Fetch all advance tables */
  getAllAdvanceTables(): Observable<AdvanceTable[]> {
    return this.httpClient
      .get<AdvanceTable[]>(this.API_URL)
      .pipe(catchError(this.handleError));
  }

  /** POST: Add a new advance table */
  addAdvanceTable(advanceTable: AdvanceTable): Observable<AdvanceTable> {
    return this.httpClient.post<AdvanceTable>(this.API_URL, advanceTable).pipe(
      map((response) => {
        return advanceTable; // return response from API
      }),
      catchError(this.handleError)
    );
  }

  /** PUT: Update an existing advance table */
  updateAdvanceTable(advanceTable: AdvanceTable): Observable<AdvanceTable> {
    return this.httpClient
      .put<AdvanceTable>(`${this.API_URL}`, advanceTable)
      .pipe(
        map((response) => {
          return advanceTable; // return response from API
        }),
        catchError(this.handleError)
      );
  }

  /** DELETE: Remove an advance table by ID */
  deleteAdvanceTable(id: number): Observable<number> {
    return this.httpClient.delete<void>(`${this.API_URL}`).pipe(
      map((response) => {
        return id; // return response from API
      }),
      catchError(this.handleError)
    );
  }

  /** Handle Http operation that failed. */
  private handleError(error: HttpErrorResponse) {
    // Customize this method based on your needs
    console.error('An error occurred:', error.message);
    return throwError(
      () => new Error('Something went wrong; please try again later.')
    );
  }
}
