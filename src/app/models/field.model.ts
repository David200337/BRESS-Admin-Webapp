import { GenericModel } from "./generic.model";

export class Field extends GenericModel {
	public name: string;
	public isAvailable: boolean;
	public isPrimaryField: boolean

	constructor(id: number, name: string, isAvailable: boolean, isPrimaryField: boolean = false) {
		super(id);
		this.name = name;
		this.isAvailable = isAvailable;
		this.isPrimaryField = isPrimaryField;
	}
}
