import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SkillLevel } from '../models/skillLevel.model';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class SkillLevelService extends ResourceService<SkillLevel>{
  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }

  getResourceUrl(): string {
    return "/skilllevel";
  }

}
