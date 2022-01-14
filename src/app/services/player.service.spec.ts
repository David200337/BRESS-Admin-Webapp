import { HttpClient, HttpResponse } from "@angular/common/http";
import { error } from "@angular/compiler/src/util";
import { TestBed } from "@angular/core/testing";
import { createSpyFromClass, Spy } from "jasmine-auto-spies";
import { Player } from "../models/player.model";
import { SkillLevel } from "../models/skillLevel.model";

import { PlayerService } from "./player.service";

describe('PlayerService', () => {
    let service: PlayerService;
    let httpSpy: Spy<HttpClient>;
    const mockSkillLevel = new SkillLevel(0, 'SkillLevel0');
    let mockPlayers = [
        new Player(
            0,
            'name',
            "0",
            'email',
            0,
            mockSkillLevel,
        ),
        new Player(
            1,
            'name',
            "1",
            'email',
            0,
            mockSkillLevel,
        ),
    ];

    beforeEach(() => {
        TestBed.configureTestingModule({
			providers: [
				PlayerService,
				{
					provide: HttpClient,
					useValue: createSpyFromClass(HttpClient)
				}
            ]
		});

        service = TestBed.inject(PlayerService);
        httpSpy = TestBed.inject<any>(HttpClient);
    });

    it('should be created', () => {
		expect(service).toBeTruthy();
	});

    it('should create a new player', (done: DoneFn) => {
        const newPlayer = new Player(
            200,
            'name',
            "200",
            'email',
            0,
            mockSkillLevel
        );

        httpSpy.post.and.nextWith(newPlayer);
        service.add(newPlayer).subscribe({
            next: (player) => { 
                console.log(player);
                expect(player).toEqual(newPlayer);
                done();
            },
            error: () => {
                done.fail();
            }
        });
    });

    it('should update a player with a given id', (done: DoneFn) => {
        const updatedPlayer = new Player(
            0,
            'name',
            "200",
            'email',
            0,
            mockSkillLevel
        );

        httpSpy.put.and.nextWith(updatedPlayer);
        service.update(0, updatedPlayer).subscribe({
            next: (player) => { 
                console.log(player);
                expect(player).toEqual(updatedPlayer);
                done();
            },
            error: () => {
                done.fail();
            }
        });
    });
})
