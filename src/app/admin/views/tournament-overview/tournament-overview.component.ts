import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription, switchMap, tap } from 'rxjs';
import { Tournament } from 'src/app/models/tournament.model';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-tournament-overview',
  templateUrl: './tournament-overview.component.html',
  styleUrls: ['./tournament-overview.component.scss'],
})
export class TournamentOverviewComponent implements OnInit {
  tournamentId!: number;
  tournament: Tournament | undefined = undefined;
  sub!: Subscription

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tournamentService: TournamentService
  ) {}

  ngOnInit(): void {
    this.sub = this.route.paramMap
      .pipe(
        switchMap((paramMap: ParamMap) => {
          this.tournamentId = Number.parseInt(paramMap.get('id')!);
          return this.tournamentService.get(this.tournamentId);
        })
      )
      .subscribe({
        next: (response: any) => {
          this.tournament = response.result;
        },
        error: (err) => {
          console.log(err);
        },
      })
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe()
    }
  }

  deleteTournament(): void {
    if (confirm(`Weet u zeker dat u ${this.tournament?.title} wilt verwijderen?`)) {
      this.tournamentService.delete(this.tournamentId).subscribe({next:(response) => {
        console.log(response)
        this.router.navigate(["/dashboard"])
      }, error: (err) => {
        console.log(err)
      }})
    }
  }
}
