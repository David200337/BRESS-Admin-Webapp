import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Field } from '../models/field.model';
import { LoaderToggleService } from './loader-toggle.service';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root',
})
export class FieldService extends ResourceService<Field> {
  constructor(protected override httpClient: HttpClient, protected override loaderToggle: LoaderToggleService) {
    super(httpClient, loaderToggle);
  }

  getResourceUrl(): string {
    return '/Field';
  }

  public setFieldsAvailable(): Observable<any> {
    return this.httpClient
      .put(`${this.APIUrl}/setAvailable`, {})
      .pipe(catchError(this.handleError));
  }
}
