
import { TestBed } from "@angular/core/testing";
import { createSpyFromClass, Spy } from "jasmine-auto-spies";
import { of } from "rxjs";
import { Field } from "../models/field.model";
import { FinalGame } from "../models/finalGame.model";
import { Player } from "../models/player.model";
import { PoolGame } from "../models/poolGame.model";
import { SkillLevel } from "../models/skillLevel.model";

import { EditGameService } from "./edit-game.service";
import { TournamentService } from "./tournament.service";

describe('EditGameService', () => {
    let service: EditGameService;
    let tournamentSpy: Spy<TournamentService>;

    const mockField = new Field(0, "mockField", false);
    const mockSkillLevel = new SkillLevel(0, "mockSkillLevel");
    const mockPlayer = new Player(0, "mock", "Player", "email", 0, mockSkillLevel);
    let mockPoolGame = new PoolGame(
        0,
        "",
        0,
        true,
        true,
        mockField,
        mockPlayer,
        mockPlayer
    );
    let mockFinalGame = new FinalGame(
        1,
        "",
        0,
        true,
        true,
        mockField,
        mockPlayer,
        mockPlayer
    )
    
    beforeEach(() => {
        TestBed.configureTestingModule({
			providers: [
				EditGameService,
				{
					provide: TournamentService,
					useValue: createSpyFromClass(TournamentService)
				}
            ]
		});

        service = TestBed.inject(EditGameService);
        tournamentSpy = TestBed.inject<any>(TournamentService);
    });

    it('should be created', () => {
		expect(service).toBeTruthy();
	});
   
    it('should update poolGame scores and return the poolGame', (done: DoneFn) => {
        const scores = [[11, 9, 11], [9, 11, 9]];

        tournamentSpy.getFinalGame.and.throwWith(new Error("Not found"));
        tournamentSpy.updatePoolGame.and.nextWith(mockPoolGame);

        service.tournamentId = 0;
        service.showEdit(0);

        service.enterScore(scores).subscribe({
            next: (poolGame) => {
                expect(poolGame).toEqual(mockPoolGame);
                done();
            },
            error: () => {
                done.fail();
            }
        })
    });

    it('should update finalGame scores and return the finalGame', (done: DoneFn) => {
        const scores = [[11, 9, 11], [9, 11, 9]];

        tournamentSpy.getFinalGame.and.nextWith(mockFinalGame);
        tournamentSpy.updateFinalGame.and.nextWith(mockFinalGame);

        service.tournamentId = 0;
        service.showEdit(1);

        service.enterScore(scores).subscribe({
            next: (poolGame) => {
                expect(poolGame).toEqual(mockFinalGame);
                done();
            },
            error: () => {
                done.fail();
            }
        })
    });
})
