import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";

@Injectable({
	providedIn: "root"
})
export abstract class ResourceService<T> {
	private readonly APIUrl = process.env.API_URL + this.getResourceUrl();

	constructor(protected httpClient: HttpClient) {}

	abstract getResourceUrl(): string;

	public getList(): Observable<T[]> {
		return this.httpClient
			.get<T[]>(`/${this.APIUrl}`)
			.pipe(catchError(this.handleError));
	}

	public get(id: number): Observable<T> {
		return this.httpClient
			.get<T>(`/${this.APIUrl}/${id}`)
			.pipe(catchError(this.handleError));
	}

	public add(resource: T): Observable<any> {
		return this.httpClient
			.post(`/${this.APIUrl}`, resource)
			.pipe(catchError(this.handleError));
	}

	public delete(id: number): Observable<any> {
		return this.httpClient
			.delete(`/${this.APIUrl}/${id}`)
			.pipe(catchError(this.handleError));
	}

	public update(resource: T): Observable<any> {
		return this.httpClient
			.put(`/${this.APIUrl}`, resource)
			.pipe(catchError(this.handleError));
	}

	private handleError(error: HttpErrorResponse) {
		// Handle HTTP errors
		return throwError(() => new Error("HTTP Request failed."));
	}
}
