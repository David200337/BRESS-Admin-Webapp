import { GenericModel } from "./generic.model";
import { SkillLevel } from "./skillLevel.model";

export class Player extends GenericModel {
	public name: string;
	public email: string;
	public score: number;
	public skillLevel: SkillLevel;

	constructor(
		id: number,
		name: string,
		email: string,
		score: number,
		skillLevel: SkillLevel
	) {
        super(id);
        this.name = name;
        this.email = email;
		this.score = score;
        this.skillLevel = skillLevel;
    }
}
