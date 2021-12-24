import { Component, OnInit } from '@angular/core';
import { Tournament } from 'src/app/models/tournament.model';
import { LoaderToggleService } from 'src/app/services/loader-toggle.service';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  tournaments: Tournament[] | undefined = undefined;

  constructor(
    private tournamentService: TournamentService,
    private loaderToggle: LoaderToggleService
  ) { loaderToggle.loaderVisible() }

  ngOnInit(): void {
    this.tournamentService.getList().subscribe({
      next: (response: any) => {
        this.tournaments = response;
        this.loaderToggle.loaderInvisible();
      },
      error: (err) => console.log(err),
    })
  }
}
