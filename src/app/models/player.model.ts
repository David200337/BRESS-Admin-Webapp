import { SkillLevel } from "./skillLevel.model";

export class Player {
	public id: number;
	public name: string;
	public email: string;
	public skillLevel: SkillLevel;

	constructor(
		id: number,
		name: string,
		email: string,
		skillLevel: SkillLevel
	) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.skillLevel = skillLevel;
    }
}
