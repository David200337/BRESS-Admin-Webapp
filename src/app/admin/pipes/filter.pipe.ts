import { Pipe, PipeTransform } from "@angular/core";
import { Player } from "src/app/models/player.model";

@Pipe({
	name: "filterPipe"
})
export class FilterPipe implements PipeTransform {
	transform(items: any[], searchTerm: string) {
		if (searchTerm == null) searchTerm = "";

		searchTerm = searchTerm.toLowerCase();

		return items.filter(
			(elem) => (`${elem.firstName} ${elem.lastName}`).toLowerCase().indexOf(searchTerm) > -1
		);
	}
}