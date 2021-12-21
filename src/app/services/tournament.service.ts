import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Category } from "../models/category.model";
import { FinalGame } from "../models/finalGame.model";
import { Game } from "../models/game.model";
import { Player } from "../models/player.model";
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

    public getAllPlayers(tournamentId: number): Observable<Player[]> {
        return this.httpClient.get<Player[]>(`${this.APIUrl}/${tournamentId}/player`);
    }
    
    public addPlayer(tournamentId: number, playerId: number): Observable<Player[]> {
        return this.httpClient.post<Player[]>(`${this.APIUrl}/${tournamentId}/player/${playerId}`, {});
    }

    public deletePlayer(tournamentId: number, playerId: number) {
        return this.httpClient.delete<Player>(`${this.APIUrl}/${tournamentId}/player/${playerId}`, {});
    }

	public getAllCategories(tournamentId: number): Observable<Category[]> {
		return this.httpClient.get<Category[]>(
			`${this.APIUrl}/${tournamentId}/category`
		);
	}

    public addCategory(tournamentId: number, category: Category): Observable<Category> {
        return this.httpClient.post<Category>(`${this.APIUrl}/tournament/${tournamentId}`, category)
    }

    public updateCategory(tournamentId: number, categoryId: number, category: Category): Observable<Category> {
        return this.httpClient.put<Category>(`${this.APIUrl}/${tournamentId}/category/${categoryId}`, category);
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

	public getAllFinales(
		tournamentId: number,
		categoryId: number
	): Observable<FinalGame> {
		return this.httpClient.get<FinalGame>(
			`${this.APIUrl}/tournament/${tournamentId}/category/${categoryId}/finale`
		);
	}

	public getFinale(
		tournamentId: number,
		categoryId: number,
		finaleId: number
	): Observable<FinalGame> {
		return this.httpClient.get<FinalGame>(
			`${this.APIUrl}/tournament/${tournamentId}/category/${categoryId}/finale/${finaleId}`
		);
	}

    public updateFinale(
        tournamentId: number,
		categoryId: number,
		finaleId: number,
        finalGame: FinalGame
    ): Observable<FinalGame> {
        return this.httpClient.post<FinalGame>(
			`${this.APIUrl}/tournament/${tournamentId}/category/${categoryId}/finale/${finaleId}`,
            finalGame
		);
    }

	public getPoolQueue(tournamentId: number): Observable<Game> {
		return this.httpClient.get<Game>(
			`${this.APIUrl}/${tournamentId}/generatepoolqueue`
		);
	}
}
