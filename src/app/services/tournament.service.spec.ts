import { HttpClient, HttpResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { createSpyFromClass, Spy } from "jasmine-auto-spies";
import { map, of, tap } from "rxjs";
import { Game } from "../models/game.model";
import { Player } from "../models/player.model";
import { SkillLevel } from "../models/skillLevel.model";
import { Tournament } from "../models/tournament.model";

import { TournamentService } from "./tournament.service";

describe("TournamentService", () => {
	let service: TournamentService;
	let httpSpy: Spy<HttpClient>;
	const mockPlayer1 = new Player(
		1,
		'player',
		'1',
		'email',
		0,
		new SkillLevel(0, 'skillLever')
	);
	const mockPlayer2 = new Player(
		2,
		'player',
		'2',
		'email',
		0,
		new SkillLevel(0, 'skillLever')
	);
	const mockGame = new Game(
		0,
		'score',
		0,
		true,
		false,
		undefined,
		mockPlayer1,
		mockPlayer2
	);
	const mockGameQueueResponse =  { result: [
		mockGame
	]};
	let fakeTournaments = { result: [
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
		}]
	}
	const mockScores = [
		[11, 9, 11],
		[9, 11, 9]
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
		httpSpy.get.and.returnValue(of(fakeTournaments));

		service.getList().subscribe({
			next: (tournaments) => {
				expect(tournaments).toHaveSize(fakeTournaments.result.length);
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
		let tournament = fakeTournaments.result[0];
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
	
    it('shoul return a poolGame queue for a given tournamentId', (done: DoneFn) => {
		httpSpy.get.and.nextWith(mockGameQueueResponse);
		service.getPoolQueue(0).subscribe({
			next: (response) => {			
				expect(response).toEqual(mockGameQueueResponse.result);
				done();
			},
			error: () => {
				done.fail()
			}
		});
	})

	it('shoul return a finalGame queue for a given tournamentId', (done: DoneFn) => {
		httpSpy.get.and.nextWith(mockGameQueueResponse);
		service.getFinaleQueue(0).subscribe({
			next: (response) => {			
				expect(response).toEqual(mockGameQueueResponse.result);
				done();
			},
			error: () => {
				done.fail()
			}
		});
	});

	it('should update poolGame scores', (done: DoneFn) => {
		const updatedGameResponse = { result: mockGame };
		updatedGameResponse.result.score = '2 - 1'

		httpSpy.put.and.nextWith(updatedGameResponse);
		service.updatePoolGame(0, mockGame.id, mockScores).subscribe({
			next: (response) => {
				expect(response).toEqual(updatedGameResponse.result);
				done();
			},
			error: () => {
				done.fail()
			}
		});
	});

	it('should update finalGame scores', (done: DoneFn) => {
		const updatedGameResponse = { result: mockGame };
		updatedGameResponse.result.score = '2 - 1'

		httpSpy.put.and.nextWith(updatedGameResponse);
		service.updateFinalGame(0, mockGame.id, mockScores).pipe(
            map((item: any) => {
                return item.result;
            })
        ).subscribe({
			next: (response) => {			
				expect(response).toEqual(updatedGameResponse.result);
				done();
			},
			error: () => {
				done.fail()
			}
		});
	});
});
