import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { Tournament } from 'src/app/models/tournament.model';
import { LoaderToggleService } from 'src/app/services/loader-toggle.service';
import { TournamentService } from 'src/app/services/tournament.service';
import { futureDateValidator } from 'src/app/shared/validation/validators';

@Component({
  selector: 'app-edit-tournament',
  templateUrl: './edit-tournament.component.html',
  styleUrls: ['./edit-tournament.component.scss'],
})
export class EditTournamentComponent implements OnInit {
  submitted: boolean = false;
  errorMessage: string | undefined = undefined;
  tournamentId: number | undefined = undefined;
  tournament: Tournament | undefined = undefined;
  sub!: Subscription;

  form!: FormGroup

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tournamentService: TournamentService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private loaderToggle: LoaderToggleService
  ) {
    loaderToggle.loaderVisible();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.tournamentId = Number.parseInt(paramMap.get('id')!);
    });

    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      beginDateTime: ['', [Validators.required, futureDateValidator()]],
      maxPlayers: ['', [Validators.required, Validators.min(0)]],
      entryFee: ['', [Validators.required, Validators.min(0)]],
    })

    if (this.tournamentId) {
      this.sub = this.tournamentService.get(this.tournamentId).subscribe({
        next: (response: any) => {
          this.tournament = response;
          this.form.setValue({
            title: this.tournament?.title,
            beginDateTime: this.datePipe.transform(this.tournament?.beginDateTime, 'yyyy-MM-dd'),
            maxPlayers: this.tournament?.maxPlayers,
            entryFee: this.tournament?.entryFee,
          })
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
      this.sub.unsubscribe()
    }
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.tournament && this.form.valid) {
      this.loaderToggle.loaderVisible();
      this.tournament.title = this.form.value.title
      this.tournament.entryFee = this.form.value.entryFee
      this.tournament.maxPlayers = this.form.value.maxPlayers

      this.tournamentService.update(this.tournamentId!, this.tournament).subscribe({
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
      this.submitted = false;
    } else {
      return
    }
  }
}
