import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable, expand } from 'rxjs';
import { Location } from '@angular/common';
import { JSONPlaceholderApiPaths, apiPath } from './api-path';
import { ResElement, SwapiResponse } from './models/shared.model';

@Injectable({
  providedIn: 'root',
})
export class SwapiService {
  constructor(private http: HttpClient) {}

  fetchData(category: string): Observable<any> {
    const apiPathByCategory =
      category === 'PEOPLE'
        ? JSONPlaceholderApiPaths.people
        : JSONPlaceholderApiPaths.starships;

    return this.http
      .get<SwapiResponse>(
        Location.joinWithSlash(apiPath.toString(), apiPathByCategory)
      )
      .pipe(
        expand((res: SwapiResponse) =>
          res.next ? this.http.get(res.next) : EMPTY
        )
      );
  }

  fetchElement(category: string, elementId: string): Observable<ResElement> {
    const apiPathByCategory =
      category === 'PEOPLE'
        ? JSONPlaceholderApiPaths.people
        : JSONPlaceholderApiPaths.starships;

    return this.http.get<ResElement>(
      Location.joinWithSlash(
        Location.joinWithSlash(apiPath.toString(), apiPathByCategory),
        elementId
      )
    );
  }
}
