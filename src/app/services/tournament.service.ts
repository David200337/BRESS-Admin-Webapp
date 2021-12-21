import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Category } from "../models/category.model";
import { Game } from "../models/game.model";
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

	public getAllCategories(tournamentId: number): Observable<Category[]> {
		return this.httpClient.get<Category[]>(
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
	): Observable<Pool[]> {
		return this.httpClient.get<Pool[]>(
			`${this.APIUrl}/${tournamentId}/category/${categoryId}/pool`
		);
	}

	public getPool(
		tournamentId: number,
		categoryId: number,
		poolId: number
	): Observable<Pool> {
		return this.httpClient.get<Pool>(
			`${this.APIUrl}/${tournamentId}/category/${categoryId}/pool/${poolId}`
		);
	}

	public updatePool(
		tournamentId: number,
		categoryId: number,
		poolId: number,
		pool: Pool
	): Observable<Pool> {
		return this.httpClient.post<Pool>(
			`${this.APIUrl}/${tournamentId}/category/${categoryId}/pool/${poolId}`,
			pool
		);
	}

	public getPoolQueue(tournamentId: number): Observable<Game> {
		return this.httpClient.get<Game>(
			`${this.APIUrl}/${tournamentId}/generatepoolqueue`
		);
	}
}
