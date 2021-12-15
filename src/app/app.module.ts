import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdminModule } from './admin/admin.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { PoolPlayersItemComponent } from './shared/pool-players-item/pool-players-item.component';

import { LoginComponent } from './views/login/login.component';
import { PoolGamesItemComponent } from './shared/pool-games-item/pool-games-item.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PoolPlayersItemComponent,
    LoginComponent,
    PoolGamesItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
