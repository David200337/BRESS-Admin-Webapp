import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SkillLevel } from '../models/skillLevel.model';
import { LoaderToggleService } from './loader-toggle.service';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class SkillLevelService extends ResourceService<SkillLevel>{
  constructor(protected override httpClient: HttpClient, protected override loaderToggle: LoaderToggleService) {
    super(httpClient, loaderToggle);
  }

  getResourceUrl(): string {
    return "/skilllevel";
  }

}
