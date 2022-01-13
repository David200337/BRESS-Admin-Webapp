import { GenericModel } from "./generic.model";
import { SkillLevel } from "./skillLevel.model";

export class Player extends GenericModel {
	public firstName: String;
	public lastName: String;
	public email: string;
	public score: number;
	public skillLevel: SkillLevel;

	constructor(
		id: number,
		firstName: string,
		lastName: string,
		email: string,
		score: number,
		skillLevel: SkillLevel
	) {
        super(id);
		this.firstName = firstName
		this.lastName = lastName;
        this.email = email;
		this.score = score;
        this.skillLevel = skillLevel;
    }
}
