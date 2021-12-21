import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
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
}
