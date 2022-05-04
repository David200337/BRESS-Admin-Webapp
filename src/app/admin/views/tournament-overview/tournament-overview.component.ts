import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription, switchMap, lastValueFrom } from 'rxjs';
import { Field } from 'src/app/models/field.model';
import { Tournament } from 'src/app/models/tournament.model';
import { FieldService } from 'src/app/services/field.service';
import { LoaderToggleService } from 'src/app/services/loader-toggle.service';
import { RpcService } from 'src/app/services/rpc.service';
import { TournamentService } from 'src/app/services/tournament.service';
import { jsPDF } from 'jspdf';
import { Pool } from 'src/app/models/pool.model';

@Component({
  selector: 'app-tournament-overview',
  templateUrl: './tournament-overview.component.html',
  styleUrls: ['./tournament-overview.component.scss'],
})
export class TournamentOverviewComponent implements OnInit {
  tournamentId!: number;
  tournament: Tournament | undefined = undefined;
  sub!: Subscription;
  canStart: boolean = true;
  fields!: Field[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tournamentService: TournamentService,
    private loaderToggle: LoaderToggleService,
    private rpcService: RpcService,
    private fieldService: FieldService
  ) {
    loaderToggle.loaderVisible();
  }

  ngOnInit(): void {
    this.fieldService.getList().subscribe({
      next: (fields: any) => {
        this.fields = fields;
        console.log(fields);
      },
      error: (err) => {
        // TODO: Handle error
        console.log(err);
      },
    });
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
      });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  deleteTournament(): void {
    if (
      confirm(`Weet u zeker dat u ${this.tournament?.title} wilt verwijderen?`)
    ) {
      this.loaderToggle.loaderVisible();
      this.tournamentService.delete(this.tournamentId).subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.log(err);
          this.loaderToggle.loaderInvisible();
        },
      });
    }
  }

  startTournament(): void {
    this.loaderToggle.loaderVisible();
    this.rpcService
      .startTournament(this.tournamentId)
      .subscribe((res) => {
        this.canStart = true;
      })
      .add(() => {
        this.loaderToggle.loaderInvisible();
      });
  }

  createPDF() {
    const pdf = new jsPDF({
      orientation: 'portrait',
      format: [600, 400],
    });
    for (let i = 0; i < 2; i++) {
      this.generatePDF(i == 0, pdf);
      pdf.addPage();
    }
  }

  generatePDF(games: boolean, pdf: jsPDF) {
    pdf.setFontSize(20);
    pdf.setTextColor('#FB7D01');
    pdf.text(
      `${this.tournament!.title} ${
        games ? ' - Poolindelingen' : ' - Wedstrijden in poule'
      }`,
      10,
      10
    );
    // pdf.text(this.tournament!.beginDateTime.toLocaleDateString(), 10, 100);

    var categoryIndex = 0;
    this.tournament?.categories.forEach((category) => {
      let startX = 10 + 100 * categoryIndex;
      pdf.setFontSize(15);
      pdf.setTextColor('#FB7D01');
      pdf.text(category.name, startX, 20);

      pdf.setFontSize(11);

      var poolIndex = 0;
      var amountOfPeople = 0;

      category.pools.forEach((pool) => {
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor('#FB7D01');
        pdf.text(
          `Pool ${pool.poolNumber + 1}`,
          startX,
          30 + amountOfPeople * 11
        );

        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor('#000000');

        if (games) {
          var playerIndex = 0;
          pool.players.forEach((player) => {
            pdf.text(
              `${player.firstName} ${player.lastName}`,
              startX,
              30 + amountOfPeople * 11 + playerIndex * 10 + 10
            );
            playerIndex += 1;
          });
          poolIndex += 1;
          amountOfPeople += pool.players.length;
        } else {
          var playerIndex = 0;
          pool.games.forEach((game) => {
            pdf.text(
              `${game.player1.firstName} - ${game.player2.firstName}`,
              startX,
              30 + amountOfPeople * 11 + playerIndex * 10 + 10
            );
            playerIndex += 1;
          });
          poolIndex += 1;
          amountOfPeople += pool.games.length;
        }
      });

      categoryIndex += 1;
    });

    pdf.save(`${this.tournament!.title}.pdf`);
  }
}
