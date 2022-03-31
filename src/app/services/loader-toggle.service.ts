import { Injectable } from '@angular/core';

@Injectable()
export class LoaderToggleService {
  public showLoader: boolean = false;

  constructor() { }

  loaderVisible() {
    this.showLoader = true;
  }

  loaderInvisible() {
    this.showLoader = false;
  }
}
