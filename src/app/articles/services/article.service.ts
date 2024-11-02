import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ApproveResponse, CreateArticleRequest, CreateArticleResponse, DeleteArticleResponse, GetDetailArticleResponse, ListArticleRequest, ListArticleResponse, PublishResponse, RejectResponse, RequestApprovalResponse, ToggleReactionRequest, ToggleReactionResponse, UpdateArticleRequest, UpdateArticleResponse } from './types';
import { environment } from '../../../environments/environment';
import { toSnakeCase } from '../../shared/utils/case-converter';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = `${environment.apiUrl}/v1`;

  constructor(private http: HttpClient) { }

  getAllArticles(request: ListArticleRequest): Observable<ListArticleResponse> {
    let params: HttpParams = new HttpParams();
    const snakeCaseRequest = toSnakeCase(request);

    for (const key in snakeCaseRequest) {
      if (snakeCaseRequest.hasOwnProperty(key)) {
        params = params.append(key, snakeCaseRequest[key as keyof ListArticleRequest]);
      }
    }

    return this.http.get<ListArticleResponse>(`${this.apiUrl}/articles`, { params }).pipe(
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
    return this.http.get<GetDetailArticleResponse>(`${this.apiUrl}/articles/${id}`).pipe(
      tap((response) => {
        return response;
      }),
      catchError((error) => {
        console.error('Failed to fetch article details', error);
        return throwError(() => new Error('Failed to fetch article details'));
      })
    );
  }

  create(request: CreateArticleRequest): Observable<CreateArticleResponse> {
    return this.http.post<CreateArticleResponse>(`${this.apiUrl}/articles`, request).pipe(
      tap((response) => {
        return response;
      }),
      catchError((error) => {
        console.error('Failed to create article', error);
        return throwError(() => error.error || { message: 'Failed to create article' });
      })
    );
  }

  update(id: string, request: UpdateArticleRequest): Observable<UpdateArticleResponse> {
    return this.http.put<UpdateArticleResponse>(`${this.apiUrl}/articles/${id}`, request).pipe(
      tap((response) => {
        return response;
      }),
      catchError((error) => {
        console.error('Failed to update article', error);
        return throwError(() => error.error || { message: 'Failed to update article' });
      })
    );
  }

  delete(id: string): Observable<DeleteArticleResponse> {
    return this.http.delete<DeleteArticleResponse>(`${this.apiUrl}/articles/${id}`).pipe(
      tap((response) => {
        return response;
      }),
      catchError((error) => {
        console.error('Failed to delete article', error);
        return throwError(() => error.error || { message: 'Failed to delete article' });
      })
    );
  }

  requestApproval(id: string): Observable<RequestApprovalResponse> {
    return this.http.post<RequestApprovalResponse>(`${this.apiUrl}/articles/${id}/request-approval`, {}).pipe(
      tap((response) => {
        return response;
      }),
      catchError((error) => {
        console.error('Failed to request approval', error);
        return throwError(() => error.error || { message: 'Failed to request approval' });
      })
    );
  }

  approve(id: string): Observable<ApproveResponse> {
    return this.http.post<ApproveResponse>(`${this.apiUrl}/articles/${id}/approve`, {}).pipe(
      tap((response) => {
        return response;
      }),
      catchError((error) => {
        console.error('Failed to approve article', error);
        return throwError(() => error.error || { message: 'Failed to approve article' });
      })
    );
  }

  reject(id: string): Observable<RejectResponse> {
    return this.http.post<RejectResponse>(`${this.apiUrl}/articles/${id}/reject`, {}).pipe(
      tap((response) => {
        return response;
      }),
      catchError((error) => {
        console.error('Failed to reject article', error);
        return throwError(() => error.error || { message: 'Failed to reject article' });
      })
    );
  }

  publish(id: string): Observable<PublishResponse> {
    return this.http.post<ApproveResponse>(`${this.apiUrl}/articles/${id}/publish`, {}).pipe(
      tap((response) => {
        return response;
      }),
      catchError((error) => {
        console.error('Failed to publish article', error);
        return throwError(() => error.error || { message: 'Failed to publish article' });
      })
    );
  }

  unpublish(id: string): Observable<PublishResponse> {
    return this.http.post<ApproveResponse>(`${this.apiUrl}/articles/${id}/unpublish`, {}).pipe(
      tap((response) => {
        return response;
      }),
      catchError((error) => {
        console.error('Failed to unpublish article', error);
        return throwError(() => error.error || { message: 'Failed to unpublish article' });
      })
    );
  }

  toggleReaction(id: string, request: ToggleReactionRequest): Observable<ToggleReactionResponse> {
    return this.http.post<ToggleReactionResponse>(`${this.apiUrl}/articles/${id}/toggle-reaction`, request).pipe(
      tap((response) => {
        return response;
      }),
      catchError((error) => {
        console.error(`Failed to toggle reaction ${request.type}`, error);
        return throwError(() => error.error || { message: `Failed to toggle ${request.type}` });
      })
    );
  }
}
