import { HttpClient, HttpResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { createSpyFromClass, Spy } from "jasmine-auto-spies";
import { SkillLevel } from "../models/skillLevel.model";
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
			categories: [
				{
					id: 0,
					name: "Beginners",
					rounds: []
				},
				{
					id: 1,
					name: "Half-Gevorderden",
					rounds: []
				}
			],
			players: [
				{
					id: 0,
					name: "Player 0",
					email: "player0@email.com",
					skillLevel: new SkillLevel(0, "Beginners")
				},
				{
					id: 1,
					name: "Player 1",
					email: "player1@email.com",
					skillLevel: new SkillLevel(1, "Half-Gevorderden")
				}
			]
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
			players: [
				{
					id: 1,
					name: "Player 1",
					email: "player1@email.com",
					skillLevel: new SkillLevel(1, "Half-Gevorderden")
				}
			]
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
			players: []
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

	it("should return an expected list of players", (done: DoneFn) => {
		httpSpy.get.and.nextWith(fakeTournaments[0].players);

		service.getAllPlayers(0).subscribe({
			next: (players) => {
				expect(players).toHaveSize(fakeTournaments[0].players.length);
				done();
			},
			error: () => {
				done.fail;
			}
		});

		expect(httpSpy.get.calls.count()).toBe(1);
	});

	it("should add a new player to an existing tournament", (done: DoneFn) => {
		// TODO: Implement method
		done();
	});

	it("should delete an existing player from a tournament", (done: DoneFn) => {
		let deletedPlayer = fakeTournaments[0].players[1];
		httpSpy.delete.and.nextWith(fakeTournaments[0].players[1]);

		service.deletePlayer(0, 1).subscribe({
			next: (player) => {
				expect(player).toEqual(deletedPlayer);
				done();
			},
			error: () => {
				done.fail;
			}
		});

		expect(httpSpy.delete.calls.count()).toBe(1);
	});

	it("should return an expected list of categories", (done: DoneFn) => {
		httpSpy.get.and.nextWith({
			result: fakeTournaments[0].categories
		});

		service.getAllCategories(0).subscribe({
			next: (categories) => {

				expect(categories).toHaveSize(
					fakeTournaments[0].categories.length
				);
				done();
			},
			error: () => {
				done.fail;
			}
		});

		expect(httpSpy.get.calls.count()).toBe(1);
	});
});
