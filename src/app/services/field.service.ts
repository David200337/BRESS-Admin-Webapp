import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Field } from '../models/field.model';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root',
})
export class FieldService extends ResourceService<Field> {
  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }

  getResourceUrl(): string {
    return '/Field';
  }
}
