import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { GetDetailArticleResponse, ListArticleRequest, ListArticleResponse } from './types';
import { environment } from '../../../environments/environment';
import { toSnakeCase } from '../../shared/utils/case-converter';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = `${environment.apiUrl}/v1`;

  constructor(private http: HttpClient) { }

  getAll(request: ListArticleRequest): Observable<ListArticleResponse> {
    let params: HttpParams = new HttpParams();
    const snakeCaseRequest = toSnakeCase(request);

    for (const key in snakeCaseRequest) {
      if (snakeCaseRequest.hasOwnProperty(key)) {
        params = params.append(key, snakeCaseRequest[key as keyof ListArticleRequest]);
      }
    }

    return this.http.get<ListArticleResponse>(`${this.apiUrl}/dashboard`, { params }).pipe(
      tap((response) => {
        return response;
      }),
      catchError((error) => {
        console.error('Failed to fetch articles', error);
        return throwError(() => new Error('Failed to fetch articles'));
      })
    );
  }

  getById(id: string): Observable<GetDetailArticleResponse> {
    return this.http.get<GetDetailArticleResponse>(`${this.apiUrl}/dashboard/${id}`).pipe(
      tap((response) => {
        return response;
      }),
      catchError((error) => {
        console.error('Failed to fetch article details', error);
        return throwError(() => new Error('Failed to fetch article details'));
      })
    );
  }
}
