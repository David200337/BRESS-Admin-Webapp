
import { TestBed } from "@angular/core/testing";
import { createSpyFromClass, Spy } from "jasmine-auto-spies";
import { Player } from "../models/player.model";
import { SkillLevel } from "../models/skillLevel.model";

import { EditGameService } from "./edit-game.service";
import { TournamentService } from "./tournament.service";

describe('EditGameService', () => {
    let service: EditGameService;
    let tournamentSpy: Spy<TournamentService>;
    
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
   
    it('should update finalGame scores when ')
})
