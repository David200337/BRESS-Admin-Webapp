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
import autoTable, { RowInput } from 'jspdf-autotable';
import { Player } from 'src/app/models/player.model';

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
      orientation: 'landscape',
    });
    this.generatePDF(pdf);
  }

  generatePDF(pdf: jsPDF) {
    pdf.setFontSize(20);

    var firstPool = true;

    this.tournament?.categories.forEach((category) => {
      category.pools.forEach((pool) => {
        if (!firstPool) {
          pdf.addPage();
        }
        firstPool = false;

        pdf.text(`${category.name} - poule ${pool.poolNumber + 1}`, 10, 10);

        var players: RowInput[] = pool.players.map((player) => {
          return [
            String(player.id),
            String(player.firstName),
            String(player.lastName),
            String(player.email),
            String(player.skillLevel.name),
            String(`Poule ${pool.poolNumber + 1}`),
          ];
        });

        autoTable(pdf, {
          headStyles: { fillColor: [251, 125, 1] },
          head: [['Id', 'Voornaam', 'Achternaam', 'Email', 'Niveau', 'Poule']],
          body: players,
        });

        var games: RowInput[] = pool.games.map((game) => {
          return [
            String(game.id),
            String(`${game.player1.firstName} ${game.player1.lastName}`),
            String(`${game.player2.firstName} ${game.player2.lastName}`),
            String(game.player1.skillLevel.name),
            String(`Poule ${pool.poolNumber + 1}`),
            String(game.score),
          ];
        });

        autoTable(pdf, {
          headStyles: { fillColor: [251, 125, 1] },
          head: [['Id', 'Speler 1', 'Speler 2', 'Niveau', 'Poule', 'Score']],
          body: games,
        });
      });
    });

    pdf.save(`${this.tournament!.title}.pdf`);
  }
}
