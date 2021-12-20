import { GenericModel } from "./generic.model";

export class SkillLevel extends GenericModel {
	public name: string;

	constructor(id: number, name: string) {
		super(id);
		this.name = name;
	}
}
