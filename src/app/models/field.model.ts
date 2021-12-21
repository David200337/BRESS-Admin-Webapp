import { GenericModel } from "./generic.model";

export class Field extends GenericModel {
	public name: string;
	public isAvailable: boolean;

	constructor(id: number, name: string, isAvailable: boolean) {
		super(id);
		this.name = name;
		this.isAvailable = isAvailable;
	}
}
