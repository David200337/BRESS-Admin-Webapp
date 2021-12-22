import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tournament } from 'src/app/models/tournament.model';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-create-tournament',
  templateUrl: './create-tournament.component.html',
  styleUrls: ['./create-tournament.component.scss'],
})
export class CreateTournamentComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private router: Router,
    private tournamentService: TournamentService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      beginDateTime: ['', Validators.required],
      maxPlayers: ['', Validators.required],
      entryFee: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const tournament = new Tournament(
        -1,
        this.form.value.title,
        this.form.value.beginDateTime,
        this.form.value.entryFee,
        this.form.value.maxPlayers,
        0,
        0,
        [],
        []
      );
      
      this.tournamentService.add(tournament).subscribe({
        next: (res) => {
          console.log(res);
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
