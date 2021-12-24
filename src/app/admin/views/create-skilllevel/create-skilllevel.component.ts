import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SkillLevel } from 'src/app/models/skillLevel.model';
import { LoaderToggleService } from 'src/app/services/loader-toggle.service';
import { SkillLevelService } from 'src/app/services/skill-level.service';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-create-skilllevel',
  templateUrl: './create-skilllevel.component.html',
  styleUrls: ['./create-skilllevel.component.scss']
})
export class CreateSkilllevelComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private router: Router,
    private skillLevelService: SkillLevelService,
    private formBuilder: FormBuilder,
    private loaderToggle: LoaderToggleService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.loaderToggle.loaderVisible();

      const skillLevel = new SkillLevel(-1, this.form.value.name);

      this.skillLevelService.add(skillLevel).subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.log(err);
          this.loaderToggle.loaderInvisible();
        },
      });
    } else {
      return;
    }
  }

}
