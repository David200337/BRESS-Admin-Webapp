import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthenticationService } from "./authentication.service";
import { Injectable } from "@angular/core";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	constructor(private authenticationService: AuthenticationService) {}

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		const token = this.authenticationService.getToken();

		if (token) {
			req = req.clone({
				setHeaders: {
					Authorization: `Bearer ${token}`
				}
			});
		}

		return next.handle(req);
	}
}
