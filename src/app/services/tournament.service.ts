import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Category } from "../models/category.model";
import { Tournament } from "../models/tournament.model";
import { ResourceService } from "./resource.service";

@Injectable({
	providedIn: "root"
})
export class TournamentService extends ResourceService<Tournament> {
    // private readonly APIUrl = environment.apiUrl + this.getResourceUrl();

    constructor(protected override httpClient: HttpClient) {
        super(httpClient);
    }

    public getResourceUrl(): string {
        return "/tournament";
    }

    public getAllCategories(id: number): Observable<Category> {
        return this.httpClient.get<Category>(`${this.APIUrl}/${id}/category`);
    }
}