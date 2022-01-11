import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "filterPipe"
})
export class FilterPipe implements PipeTransform {
	transform(items: any[], searchTerm: string) {
		if (searchTerm == null) searchTerm = "";

		searchTerm = searchTerm.toLowerCase();

		return items.filter(
			(elem) => elem.name.toLowerCase().indexOf(searchTerm) > -1
		);
	}
}