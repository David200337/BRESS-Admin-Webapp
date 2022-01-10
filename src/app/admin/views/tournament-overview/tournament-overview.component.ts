import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription, switchMap, tap } from 'rxjs';
import { Tournament } from 'src/app/models/tournament.model';
import { LoaderToggleService } from 'src/app/services/loader-toggle.service';
import { RpcService } from 'src/app/services/rpc.service';
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
  canStart: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tournamentService: TournamentService,
    private loaderToggle: LoaderToggleService,
    private rpcService: RpcService
  ) {
    loaderToggle.loaderVisible();
  }

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
          this.tournament = response;
          this.canStart = this.tournament!.hasStarted;
          this.loaderToggle.loaderInvisible();
        },
        error: (err) => {
          this.loaderToggle.loaderInvisible();
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
      this.loaderToggle.loaderVisible();
      this.tournamentService.delete(this.tournamentId).subscribe({
        next: (response) => {
          console.log(response)
          this.router.navigate(["/dashboard"])
        }, error: (err) => {
          console.log(err)
          this.loaderToggle.loaderInvisible();
        }
      })
    }
  }

  startTournament(): void {
    this.loaderToggle.loaderVisible();
    this.rpcService.startTournament(this.tournamentId).subscribe((res) => {
      this.canStart = true;
      this.loaderToggle.loaderInvisible();
    });
  }
}
