import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-field',
  templateUrl: './create-field.component.html',
  styleUrls: ['./create-field.component.scss']
})
export class CreateFieldComponent implements OnInit {
  public form!: FormGroup
  private submitted: Boolean = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ["", Validators.required]
    })
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.valid) {

    } else {
      return;
    }
  }
}
