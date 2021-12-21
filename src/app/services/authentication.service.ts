import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: "root"
})
export class AuthenticationService {
	constructor(private httpClient: HttpClient, private router: Router) {}
	protected readonly APIUrl = environment.apiUrl;

	public login(email: string, password: string) {
		this.httpClient
			.post<any>(this.APIUrl + "/login", {
				email: email,
				password: password
			})
			.subscribe({
				next: (result) => {
					localStorage.setItem("user", JSON.stringify(result.result));
					this.router.navigate(["/dashboard"])
				},
				error: (err) => {
					// TODO: Add error handler
					console.log("LOGIN ERROR: " + err);
				}
			});
	}

	public getToken(): string | null {
		const currentUser: any = this.getCurrentUser();

		if (currentUser.token) {
			return currentUser.token;
		}

		return null;
	}

	public getCurrentUser(): any {
		const stringifiedObject = localStorage.getItem("user");

		if (stringifiedObject) {
			return JSON.parse(stringifiedObject);
		}

		return {};
	}

    public isLoggedIn(): boolean {
        return this.getCurrentUser().expireDate && (new Date(this.getCurrentUser().expireDate) < new Date());
    }
}
