import { Component, OnInit, ViewChild } from "@angular/core";
import { Field } from "src/app/models/field.model";
import { FieldService } from "src/app/services/field.service";

@Component({
	selector: "app-field-list",
	templateUrl: "./field-list.component.html",
	styleUrls: ["./field-list.component.scss"]
})
export class FieldListComponent implements OnInit {
	public fields!: Field[];
	public searchTerm!: string;
	public tableSizes: number[] = [10, 25, 100];
	public tableSize: number = this.tableSizes[0];
	public page = 1;
	public count = 0;

	constructor(private fieldService: FieldService) {}

	ngOnInit(): void {
		this.loadFields();
	}

	public loadFields(): void {
		this.fieldService.getList().subscribe({
			next: (fields) => {
				this.fields = fields;
                console.log(fields);
			},
			error: (err) => {
				// TODO: Handle error
				console.log(err);
			}
		});
	}

	public onDelete(id: number): void {
		this.fieldService.delete(id).subscribe({
			next: (res) => {
				if (res.result) {
					this.fields = this.fields.filter((f) => f.id !== id);                    
					alert("Zaal successvol verwijderd.");
				}
			},
			error: (err) => {
				// TODO: Handle error
				console.log(err);
			}
		});
	}

    public onTableDataChange(event: any): void {
        this.page = event;
        this.loadFields();
    }

    public onTableSizeChange(event: any): void {
        this.tableSize = event.target.value;
        this.page = 1;
        this.loadFields();
    }
}
