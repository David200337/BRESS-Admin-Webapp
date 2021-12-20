export class Field {
	public id: number;
	public name: string;
	public isAvailable: boolean;

	constructor(id: number, name: string, isAvailable: boolean) {
		this.id = id;
		this.name = name;
		this.isAvailable = isAvailable;
	}
}
