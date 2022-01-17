import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Field } from 'src/app/models/field.model';
import { FieldService } from 'src/app/services/field.service';
import { LoaderToggleService } from 'src/app/services/loader-toggle.service';

@Component({
  selector: 'app-edit-field',
  templateUrl: './edit-field.component.html',
  styleUrls: ['./edit-field.component.scss'],
})
export class EditFieldComponent implements OnInit {
  public fieldId: number | undefined;
  public field: Field | undefined;
  private sub!: Subscription;
  public form!: FormGroup;
  public submitted: Boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private fieldService: FieldService,
    private loaderToggle: LoaderToggleService
  ) {
    loaderToggle.loaderVisible();
  }

  ngOnInit(): void {
		this.route.paramMap.subscribe((paramMap: ParamMap) => {
			this.fieldId = Number.parseInt(paramMap.get("id")!);
		});

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      isAvailable: ['', Validators.required],
    });

    if (this.fieldId) {
      this.sub = this.fieldService.get(this.fieldId).subscribe({
        next: (response: any) => {
          this.field = response;
          console.log(this.field);

          this.form.setValue({
            name: this.field?.name,
            isAvailable: this.field?.isAvailable,
          });

          this.loaderToggle.loaderInvisible();
        },
        error: (err) => {
          console.log(err);
          this.loaderToggle.loaderInvisible();
        },
      });
    }
  }

	ngOnDestroy(): void {
		if (this.sub) {
			this.sub.unsubscribe();
		}
	}

  onSubmit(): void {
    this.submitted = true;
    if (this.form.valid) {
      this.field!.name = this.form.value.name;
      this.field!.isAvailable = this.form.value.isAvailable;
      this.fieldService.update(this.fieldId!, this.field!).subscribe({
        next: (res) => {
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      return;
    }
  }
}
