import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { CreateCommentRequest, CreateCommentResponse, ListCommentRequest, ListCommentResponse, ToggleReactionRequest, ToggleReactionResponse } from './types';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = `${environment.apiUrl}/v1`;

  constructor(private http: HttpClient) { }

  getArticleComments(params: ListCommentRequest): Observable<ListCommentResponse> {
    const httpParams = new HttpParams({ fromObject: params as any });
    return this.http.get<ListCommentResponse>(`${this.apiUrl}/dashboard/${params.articleId}/comments`, { params: httpParams }).pipe(
      tap((response) => {
        return response;
      }),
      catchError((error) => {
        console.error('Failed to fetch comments', error);
        return throwError(() => new Error('Failed to fetch comments'));
      })
    );
  }

  add(request: CreateCommentRequest): Observable<CreateCommentResponse> {
    let url = `${this.apiUrl}/comments`;
    if (request.parentId) {
      url = `${this.apiUrl}/comments/${request.parentId}/reply`;
    }
    return this.http.post<CreateCommentResponse>(`${url}`, request).pipe(
      tap((response) => {
        return response;
      }),
      catchError((error) => {
        console.error('Failed to create comment', error);
        return throwError(() => error.error || { message: 'Failed to create comment' });
      })
    );
  }

  toggleReaction(id: string, request: ToggleReactionRequest): Observable<ToggleReactionResponse> {
    return this.http.post<ToggleReactionResponse>(`${this.apiUrl}/comments/${id}/toggle-reaction`, request).pipe(
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
