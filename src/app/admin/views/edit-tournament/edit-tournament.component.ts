import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { filter, of, Subscription, switchMap } from 'rxjs';
import { Player } from 'src/app/models/player.model';
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
  playersErrorMessage: string | undefined = undefined;
  tournamentId: number | undefined = undefined;
  tournament: Tournament | undefined = undefined;
  toBeRemoved: number[] = [];
  toBeAdded: Player[] = [];
  sub!: Subscription;
  showSearch: boolean = false;
  availablePlayers: Player[] | undefined = undefined;
  filteredList: Player[] | undefined = undefined;
  toNewPlayer: boolean = false;

  form!: FormGroup;

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
    // Create formcontrols
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      beginDateTime: ['', [Validators.required, futureDateValidator()]],
      maxPlayers: ['', [Validators.required, Validators.min(0)]],
      entryFee: ['', [Validators.required, Validators.min(0)]],
    });

    // Get tournament details and available players
    this.route.paramMap
      .pipe(
        switchMap((paramMap: ParamMap) => {
          this.tournamentId = Number.parseInt(paramMap.get('id')!);
          if (this.tournamentId != null) {
            return this.tournamentService.get(this.tournamentId);
          } else {
            return of(null);
          }
        }),
        switchMap((response: any) => {
          this.tournament = response;
          this.form.setValue({
            title: this.tournament?.title,
            beginDateTime: this.datePipe.transform(
              this.tournament?.beginDateTime,
              'yyyy-MM-dd'
            ),
            maxPlayers: this.tournament?.maxPlayers,
            entryFee: this.tournament?.entryFee,
          });
          return this.tournamentService.getAllAvailablePlayers(
            this.tournamentId!
          );
        })
      )
      .subscribe({
        next: (response: any) => {
          this.availablePlayers = response.result;
          this.filteredList = [...this.tournament!.players, ...this.toBeAdded]
          this.loaderToggle.loaderInvisible();
        },
        error: (err) => {
          console.log(err);
          this.loaderToggle.loaderInvisible();
        },
      });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onSubmit(toNewPlayer: boolean): void {
    this.submitted = true;
    if (this.tournament && this.form.valid) {
      this.loaderToggle.loaderVisible();
      this.tournament.title = this.form.value.title;
      this.tournament.entryFee = this.form.value.entryFee;
      this.tournament.maxPlayers = this.form.value.maxPlayers;

      // Update tournament details
      this.tournamentService
        .update(this.tournamentId!, this.tournament)
        .subscribe({
          next: (res) => {
            console.log(toNewPlayer);
            if (!toNewPlayer) {
              this.router.navigate(['/dashboard']);
            } else {
              this.loaderToggle.loaderInvisible();
              this.router.navigate(['/players/create']);
            }
          },
          error: (err) => {
            if (err.status === 401) {
              this.errorMessage = 'U bent niet ingelogd of bevoegd.';
            } else if (err.status === 500) {
              this.errorMessage = 'Server kan aanvraag niet verwerken.';
            }
            this.loaderToggle.loaderInvisible();
          },
        });

      // Remove players
      if (this.tournamentId != null && this.toBeRemoved.length != 0) {
        this.tournamentService
          .deletePlayer(this.tournamentId, this.toBeRemoved)
          .subscribe()
          .add(() => {
            console.log('unsubscribe');
          });
      }

      // Add players
      if (this.tournamentId != null && this.toBeAdded.length != 0) {
        const addedIds: number[] = [];
        this.toBeAdded.forEach((p) => {
          addedIds.push(p.id);
        });
        this.tournamentService
          .addPlayer(this.tournamentId, addedIds)
          .subscribe()
          .add(() => {
            console.log('unsubscribe');
          });
      }
      this.submitted = false;
    } else {
      return;
    }
  }

  onRemovePlayer(playerId: number): void {
    let index = -1;
    this.tournament?.players.forEach((player, i) => {
      if (player.id == playerId) {
        index = i;
        this.toBeRemoved.push(player.id);
      }
    });
    this.tournament?.players.splice(index, 1);
  }

  onRemoveToBeAddedPlayer(removedAddedPlayer: Player): void {
    let index = -1;

    this.toBeAdded.forEach((player, i) => {
      if (player.id == removedAddedPlayer.id) {
        index = i;
      }
    });
    if (index > -1) {
      this.toBeAdded.splice(index, 1);
      this.availablePlayers?.push(removedAddedPlayer);
      this.availablePlayers = this.availablePlayers!.sort((a, b) => {
        if (a.firstName > b.firstName) {
          return 1;
        }
        if (a.firstName < b.firstName) {
          return -1;
        }
        return 0;
      });
    }
  }

  onAddPlayer(toBeAddedPlayer: Player): void {
    if (
      this.toBeAdded.length + this.tournament!.players.length >=
      this.tournament!.maxPlayers
    ) {
      this.playersErrorMessage =
        'Speler kan niet toegevoegd worden, maximaal spelers in een wedstrijd bereikt.';
      return;
    }

    let index1 = -1;
    let index2 = -1;
    this.availablePlayers?.forEach((player, i) => {
      if (player.id == toBeAddedPlayer.id) {
        index1 = i;
      }
    });
    this.availablePlayers?.splice(index1, 1);
    this.filteredList = this.availablePlayers;
    let searchbar: HTMLInputElement = document.getElementById(
      'searchPlayers'
    )! as HTMLInputElement;
    searchbar.value = '';

    this.toBeAdded.push(toBeAddedPlayer);
  }

  toggleSearch() {
    if (this.showSearch) {
      this.searchInvisible();
    } else {
      this.searchVisible();
    }
  }

  searchInvisible() {
    this.filteredList = [...this.toBeAdded, ...this.tournament!.players];
    this.showSearch = false;
  }

  searchVisible() {
    this.filteredList = this.availablePlayers;
    this.showSearch = true;
  }

  onSearch(event: any) {
    let key = event.target.value.toLowerCase();
    if (this.showSearch) {
      this.filteredList = this.availablePlayers?.filter((p) =>
        `${p.firstName} ${p.lastName}`.toLowerCase().includes(key)
      );
    } else {
      let toBeAddedFiltered = this.toBeAdded?.filter((p) =>
        `${p.firstName} ${p.lastName}`.toLowerCase().includes(key)
      );
      let playersFiltered = this.tournament!.players.filter((p) =>
        `${p.firstName} ${p.lastName}`.toLowerCase().includes(key)
      );;

      this.filteredList = [...toBeAddedFiltered, ...playersFiltered];
    }
  }
}
