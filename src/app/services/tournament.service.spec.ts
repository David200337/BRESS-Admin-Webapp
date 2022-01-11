import { HttpClient, HttpResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { createSpyFromClass, Spy } from "jasmine-auto-spies";
import { Tournament } from "../models/tournament.model";

import { TournamentService } from "./tournament.service";

describe("TournamentService", () => {
	let service: TournamentService;
	let httpSpy: Spy<HttpClient>;
	let fakeTournaments: Tournament[] = [
		{
			id: 0,
			title: "Tournament 0",
			beginDateTime: new Date(),
			entryFee: 7.5,
			maxPlayers: 32,
			minPlayers: 4,
			idealPoolSize: 5,
			categories: [],
			players: [],
			hasStarted: false
		},
		{
			id: 1,
			title: "Tournament 1",
			beginDateTime: new Date(),
			entryFee: 7.5,
			maxPlayers: 32,
			minPlayers: 4,
			idealPoolSize: 5,
			categories: [],
			players: [],
			hasStarted: false
		}
	];

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				TournamentService,
				{
					provide: HttpClient,
					useValue: createSpyFromClass(HttpClient)
				}
			]
		});

		service = TestBed.inject(TournamentService);
		httpSpy = TestBed.inject<any>(HttpClient);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	it("should return an expected list of tournaments", (done: DoneFn) => {
		httpSpy.get.and.nextWith(fakeTournaments);

		service.getList().subscribe({
			next: (tournaments) => {
				expect(tournaments).toHaveSize(fakeTournaments.length);
				done();
			},
			error: () => {
				done.fail;
			}
		});

		expect(httpSpy.get.calls.count()).toBe(1);
	});

	it("should create a new tournament", (done: DoneFn) => {
		let newTournament = {
			id: 2,
			title: "Added Tournament 2",
			beginDateTime: new Date(),
			entryFee: 7.5,
			maxPlayers: 32,
			minPlayers: 4,
			idealPoolSize: 5,
			categories: [],
			players: [],
            hasStarted: false
		};

		httpSpy.post.and.nextWith(newTournament);

		service.add(newTournament).subscribe({
			next: (tournament) => {
				expect(tournament).toEqual(newTournament);
				done();
			},
			error: () => {
				done.fail;
			}
		});
	});

	it("should update a tournament with a given tournament id", (done: DoneFn) => {
		let tournament = fakeTournaments[0];
		tournament.title = "Updated Tournament";

		httpSpy.put.and.nextWith(tournament);

		service.update(tournament.id, tournament).subscribe({
			next: (tournament) => {
				expect(tournament.title).toEqual("Updated Tournament");
				done();
			},
			error: () => {
				done.fail;
			}
		});
	});

	it("should delete an existing tournament", (done: DoneFn) => {
		httpSpy.delete.and.nextWith(
			new HttpResponse({
				status: 200
			})
		);

		service.delete(1).subscribe({
			next: (response) => {
				expect(response.status).toEqual(200);
				done();
			},
			error: () => {
				done.fail;
			}
		});

		expect(httpSpy.delete.calls.count()).toBe(1);
	});
});
