import { GenericModel } from "./generic.model";
import { SkillLevel } from "./skillLevel.model";

export class Player extends GenericModel {
	public name: string;
	public email: string;
	public skillLevel: SkillLevel;

	constructor(
		id: number,
		name: string,
		email: string,
		skillLevel: SkillLevel
	) {
        super(id);
        this.name = name;
        this.email = email;
        this.skillLevel = skillLevel;
    }
}
