import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { Category } from "../models/category.model";
import { FinalGame } from "../models/finalGame.model";
import { Game } from "../models/game.model";
import { Player } from "../models/player.model";
import { Pool } from "../models/pool.model";
import { PoolGame } from "../models/poolGame.model";
import { Tournament } from "../models/tournament.model";
import { LoaderToggleService } from "./loader-toggle.service";
import { ResourceService } from "./resource.service";

@Injectable({
	providedIn: "root"
})
export class TournamentService extends ResourceService<Tournament> {
	constructor(protected override httpClient: HttpClient, protected override loaderToggle: LoaderToggleService) {
		super(httpClient, loaderToggle);
	}

	public getResourceUrl(): string {
		return "/tournament";
	}

	public getAllPlayers(tournamentId: number): Observable<Player[]> {
		return this.httpClient.get<Player[]>(
			`${this.APIUrl}/${tournamentId}/player`
		);
	}

	public getAllAvailablePlayers(tournamentId: number): Observable<Player[]> {
		return this.httpClient.get<Player[]>(
			`${this.APIUrl}/${tournamentId}/availablePlayers`
		);
	}

	public addPlayer(
		tournamentId: number,
		playerIds: number[]
	): Observable<any> {
		return this.httpClient.post<Player[]>(
			`${this.APIUrl}/${tournamentId}/players`,
			playerIds
		);
	}

	public deletePlayer(tournamentId: number, playerIds: number[]) {
		return this.httpClient.delete<any>(
			`${this.APIUrl}/${tournamentId}/players`,
			{ body: playerIds }
		);
	}

	public getAllCategories(tournamentId: number): Observable<Category[]> {
		return this.httpClient.get<any>(
			`${this.APIUrl}/${tournamentId}/category`
		).pipe(
			map((item) => {
				return item.result;
			})
		);
	}

	public getCategory(
		tournamentId: number,
		categoryId: number
	): Observable<Category> {
		return this.httpClient.get<Category>(
			`${this.APIUrl}/${tournamentId}/category/${categoryId}`
		);
	}

	public addCategory(
		tournamentId: number,
		category: Category
	): Observable<Category> {
		return this.httpClient.post<Category>(
			`${this.APIUrl}/tournament/${tournamentId}`,
			category
		);
	}

	public updateCategory(
		tournamentId: number,
		categoryId: number,
		category: Category
	): Observable<Category> {
		return this.httpClient.put<Category>(
			`${this.APIUrl}/${tournamentId}/category/${categoryId}`,
			category
		);
	}

	public deleteCategory(
		tournamentId: number,
		categoryId: number
	): Observable<Category> {
		return this.httpClient.delete<Category>(
			`${this.APIUrl}/${tournamentId}/category/${categoryId}`
		);
	}

	public getAllPools(
		tournamentId: number,
		categoryId: number
	): Observable<Pool[]> {
		return this.httpClient.get<any>(
			`${this.APIUrl}/${tournamentId}/category/${categoryId}/pool`
		).pipe(
			map((item) => {
				return item.result;
			})
		);
	}

	public getPool(
		tournamentId: number,
		categoryId: number,
		poolId: number
	): Observable<Pool> {
		return this.httpClient.get<any>(
			`${this.APIUrl}/${tournamentId}/category/${categoryId}/pool/${poolId}`
		).pipe(
			map((item) => {
				return item.result;
			})
		);
	}

	public addPlayerToPool(
		tournamentId: number,
		categoryId: number,
		poolId: number,
		playerId: number
	): Observable<Pool[]> {
		return this.httpClient
			.post<any>(
				`${this.APIUrl}/${tournamentId}/category/${categoryId}/pool/${poolId}/player/${playerId}`,
				{}
			)
			.pipe(
				map((item) => {
					return item.result;
				})
			);
	}

	public deletePlayerFromPool(
		tournamentId: number,
		categoryId: number,
		poolId: number,
		playerId: number
	): Observable<Pool[]> {
		return this.httpClient
			.delete<any>(
				`${this.APIUrl}/${tournamentId}/category/${categoryId}/pool/${poolId}/player/${playerId}`
			)
			.pipe(
				map((item) => {
					return item.result;
				})
			);
	}

	public getGame(
		tournamentId: number,
		categoryId: number,
		gameId: number
	): Observable<Game> {
		return this.httpClient
			.get<any>(
				`${this.APIUrl}/${tournamentId}/category/${categoryId}/poolgame/${gameId}`
			)
			.pipe(
				map((item) => {
					return item.result;
				})
			);
	}

	public updateGame(
		tournamentId: number,
		gameId: number,
		score: number[][]
	): Observable<PoolGame> {
		return this.httpClient
			.put<any>(`${this.APIUrl}/${tournamentId}/${gameId}`, { scorePlayer1: score[0], scorePlayer2: score[1] })
			.pipe(
				map((item) => {
					return item.result;
				}),
			);
	}

	public getAllFinalGames(
		tournamentId: number,
		categoryId: number
	): Observable<FinalGame> {
		return this.httpClient.get<FinalGame>(
			`${this.APIUrl}/tournament/${tournamentId}/category/${categoryId}/finale`
		);
	}

	public getFinalGame(
		tournamentId: number,
		categoryId: number,
		finaleId: number
	): Observable<FinalGame> {
		console.log(`${tournamentId}, ${categoryId}, ${finaleId}`);

		return this.httpClient.get<FinalGame>(
			`${this.APIUrl}/${tournamentId}/category/${categoryId}/finale/${finaleId}`
		);
	}


	public getPoolQueue(tournamentId: number): Observable<Game[]> {
		return this.httpClient
			.get<any>(`${this.APIUrl}/${tournamentId}/generatepoolqueue`)
			.pipe(
				map((item) => {
					return item.result;
				})
			);
	}

	public getRanking(
		tournamentId: number,
		categoryId: number
	): Observable<Player[]> {
		return this.httpClient
			.get<any>(
				`${this.APIUrl}/${tournamentId}/category/${categoryId}/ranking`
			)
			.pipe(
				map((item) => {
					return item.result;
				})
			);
	}

	public editGameScore(tournamentId: number, gameId: number, score: number[][]): Observable<any> {
		return this.httpClient
			.put<any>(`${this.APIUrl}/${tournamentId}/editGame/${gameId}`, { scorePlayer1: score[0], scorePlayer2: score[1] })
			.pipe(
				map((item) => {
					return item.result;
				}),
			);
	}


}
