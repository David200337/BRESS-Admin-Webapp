import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";
import { Player } from "../models/player.model";
import { ResourceService } from "./resource.service";

@Injectable({
	providedIn: "root"
})
export class PlayerService extends ResourceService<Player> {
	constructor(protected override httpClient: HttpClient) {
		super(httpClient);
	}

	public getResourceUrl(): string {
		return "/player"
	}

    public override add(resource: Player): Observable<any> {
        const body = {
            firstName: resource.firstName,
            lastName: resource.lastName,
            email: resource.email,
            skillLevelId: resource.skillLevel.id
        };

        return this.httpClient
			.post(`${this.APIUrl}`, body)
			.pipe(catchError(this.handleError));
    }

    public override update(id: number, resource: Player): Observable<Player> {
        const body = {
            firstName: resource.firstName,
            lastName: resource.lastName,
            email: resource.email,
            skillLevelId: resource.skillLevel.id
        }

        return this.httpClient.put<Player>(
			`${this.APIUrl}/${id}`,
			body
		);
    }
}
