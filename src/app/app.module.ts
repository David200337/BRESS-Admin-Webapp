import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdminModule } from './admin/admin.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/navbar/navbar.component';

import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule
  ],
  exports: [
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
