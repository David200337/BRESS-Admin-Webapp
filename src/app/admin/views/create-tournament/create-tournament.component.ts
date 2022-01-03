import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tournament } from 'src/app/models/tournament.model';
import { LoaderToggleService } from 'src/app/services/loader-toggle.service';
import { TournamentService } from 'src/app/services/tournament.service';
import { futureDateValidator } from 'src/app/shared/validation/validators';

@Component({
  selector: 'app-create-tournament',
  templateUrl: './create-tournament.component.html',
  styleUrls: ['./create-tournament.component.scss'],
})
export class CreateTournamentComponent implements OnInit {
  submitted: boolean = false;
  errorMessage: string | undefined = undefined;

  form!: FormGroup;

  constructor(
    private router: Router,
    private tournamentService: TournamentService,
    private formBuilder: FormBuilder,
    private loaderToggle: LoaderToggleService
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      beginDateTime: ['', [Validators.required, futureDateValidator()]],
      maxPlayers: ['', [Validators.required, Validators.min(0)]],
      entryFee: ['', [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.valid) {
      this.loaderToggle.loaderVisible();
      const tournament = new Tournament(
        -1,
        this.form.value.title,
        this.form.value.beginDateTime,
        this.form.value.entryFee,
        this.form.value.maxPlayers,
        0,
        0,
        [],
        [],
        false
      );

      this.tournamentService.add(tournament).subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          if (err.status === 401) {
            this.errorMessage = "U bent niet ingelogd of bevoegd."
          } else if (err.status === 500) {
            this.errorMessage = "Server kan aanvraag niet verwerken."
          }
          this.loaderToggle.loaderInvisible();
        },
      });
      this.submitted = false
    } else {
      return;
    }
  }
}
