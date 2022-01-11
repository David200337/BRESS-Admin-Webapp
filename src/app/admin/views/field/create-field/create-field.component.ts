import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Field } from "src/app/models/field.model";
import { FieldService } from "src/app/services/field.service";

@Component({
	selector: "app-create-field",
	templateUrl: "./create-field.component.html",
	styleUrls: ["./create-field.component.scss"]
})
export class CreateFieldComponent implements OnInit {
	public form!: FormGroup;
	public submitted: Boolean = false;

	constructor(
		private router: Router,
		private formBuilder: FormBuilder,
		private fieldService: FieldService
	) {}

	ngOnInit(): void {
		this.form = this.formBuilder.group({
			name: ["", Validators.required]
		});
	}

	onSubmit(): void {
		this.submitted = true;
		if (this.form.valid) {
			const field = new Field(-1, this.form.value.name, true);

			this.fieldService.add(field).subscribe({
				next: (res) => {
					this.router.navigate(["../../dashboard"]);
				},
				error: (err) => {
					console.log(err);
				}
			});
		} else {
			return;
		}
	}
}
