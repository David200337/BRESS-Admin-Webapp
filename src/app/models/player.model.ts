import { GenericModel } from "./generic.model";
import { SkillLevel } from "./skillLevel.model";
import { Tournament } from "./tournament.model";

export class Player extends GenericModel {

	public firstName: String;
	public lastName: String;
	public email: string;
	public scores: Player.scoreObj[];
	public score?: number;
	public skillLevel: SkillLevel;

	constructor(
		id: number,
		firstName: string,
		lastName: string,
		email: string,
		scores: any,
		skillLevel: SkillLevel
	) {
        super(id);
		this.firstName = firstName
		this.lastName = lastName;
        this.email = email;
		this.scores = scores;
        this.skillLevel = skillLevel;
    }
}

namespace Player {
	export interface scoreObj {
		id: number,
		tournament: Tournament,
		score: number,
		pointBalance: number
	}
}
