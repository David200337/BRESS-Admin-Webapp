import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Category } from "../models/category.model";
import { Pool } from "../models/pool.model";
import { Tournament } from "../models/tournament.model";
import { ResourceService } from "./resource.service";

@Injectable({
	providedIn: "root"
})
export class TournamentService extends ResourceService<Tournament> {
	constructor(protected override httpClient: HttpClient) {
		super(httpClient);
	}

	public getResourceUrl(): string {
		return "/tournament";
	}

	public getAllCategories(tournamentId: number): Observable<Category> {
		return this.httpClient.get<Category>(
			`${this.APIUrl}/${tournamentId}/category`
		);
	}

	public getCategory(tournamentId: number): Observable<Category> {
		return this.httpClient.get<Category>(
			`${this.APIUrl}/${tournamentId}/category`
		);
	}

	public getAllPools(
		tournamentId: number,
		categoryId: number
	): Observable<Pool> {
		return this.httpClient.get<Pool>(
			`${this.APIUrl}/${tournamentId}/category/${categoryId}/pool`
		);
	}
}
