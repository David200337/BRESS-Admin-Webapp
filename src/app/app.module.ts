import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AdminModule } from "./admin/admin.module";
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { SharedModule } from './shared/shared.module';

import { LoginComponent } from "./views/login/login.component";
import { RegisterComponent } from "./views/register/register.component";
import { ReactiveFormsModule } from "@angular/forms";
import { TokenInterceptor } from "./services/token.interceptor";
import { TournamentService } from './services/tournament.service';

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		LoginComponent,
		RegisterComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		AdminModule,
		SharedModule,
		ReactiveFormsModule,
		HttpClientModule
	],
	exports: [
	],
	providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },],
	bootstrap: [AppComponent]
})
export class AppModule { }
