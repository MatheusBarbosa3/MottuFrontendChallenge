import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { map, Observable, take } from 'rxjs';
import { IResponse } from '../interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private http: HttpClient) { }

  private readonly baseUrl: string = environment.apiUrl;

  public getUrl<T>(endpoint: string): Observable<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    return this.http
      .get<IResponse<T>>(url)
      .pipe(
        take(1),
        map(response => this.getData(response))
      );
  }

  private getData<T>(response: IResponse<T>): T {
    return response && response.results ? response.results as T : response as T;
  }
}
