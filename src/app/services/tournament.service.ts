import { HttpClient } from "@angular/common/http";
import { Tournament } from "../models/tournament.model";
import { ResourceService } from "./resource.service";

export class TournamentService extends ResourceService<Tournament> {
    constructor(protected override httpClient: HttpClient) {
        super(httpClient);
    }

    public getResourceUrl(): string {
        return "/tournament";
    }
}