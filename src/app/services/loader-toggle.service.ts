import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderToggleService {
  public showLoader: boolean = false;

  constructor() { }

  loaderVisible() {
    console.log('show loader')
    this.showLoader = true;
  }

  loaderInvisible() {
    console.log('unshow loader')
    this.showLoader = false;
  }
}
