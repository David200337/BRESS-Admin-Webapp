import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { of, Subscription, switchMap } from 'rxjs';
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
  tournamentId: number | undefined = undefined;
  tournament: Tournament | undefined = undefined;
  toBeRemoved: number[] = [];
  toBeAdded: number[] = [];
  sub!: Subscription;
  showSearch : boolean = false;
  availablePlayers: Player[] | undefined = undefined;
  filteredList: Player[] | undefined = undefined;

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
    // Create formcontrols
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      beginDateTime: ['', [Validators.required]],
      maxPlayers: ['', [Validators.required, Validators.min(0)]],
      entryFee: ['', [Validators.required, Validators.min(0)]],
    })

    // Get tournament details and available players
    this.route.paramMap.pipe(
      switchMap((paramMap: ParamMap) => {
        this.tournamentId = Number.parseInt(paramMap.get('id')!);
        if(this.tournamentId != null) {
          return this.tournamentService.get(this.tournamentId)
        } else {
          return of(null);
        }
      }),
      switchMap((response: any) => {
        this.tournament = response;
        this.form.setValue({
          title: this.tournament?.title,
          beginDateTime: this.datePipe.transform(this.tournament?.beginDateTime, 'yyyy-MM-dd'),
          maxPlayers: this.tournament?.maxPlayers,
          entryFee: this.tournament?.entryFee,
        })
        return this.tournamentService.getAllAvailablePlayers(this.tournamentId!);
      })
    ).subscribe({
      next: (response: any) => {
        this.availablePlayers = response.result;
        this.filteredList = response.result;
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
      
      // Update tournament details
      this.tournamentService.update(this.tournamentId! ,this.tournament).subscribe({
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

      // Remove players
      if(this.tournamentId != null && this.toBeRemoved.length != 0) {
          this.tournamentService.deletePlayer(this.tournamentId, this.toBeRemoved)
            .subscribe()
            .add(() => {
              console.log("unsubscribe")
            })
      }

      // Add players
      if(this.tournamentId != null && this.toBeAdded.length != 0) {
        this.tournamentService.addPlayer(this.tournamentId, this.toBeAdded)
          .subscribe()
          .add(() => {
            console.log("unsubscribe")
          })
      }
      this.submitted = false;
    } else {
      return
    }
  }

  onRemovePlayer(playerId: number): void {
    let index = -1;
    this.tournament?.players.forEach((player, i) => {
      if (player.id == playerId) {index = i; this.toBeRemoved.push(player.id)}
    })
    this.tournament?.players.splice(index, 1);
  }

  onAddPlayer(playerId: number): void {
    let index1 = -1;
    let index2 = -1;
    this.availablePlayers?.forEach((player, i) => {
      if (player.id == playerId) {index1 = i;}
    })
    console.log(index1, index2)
    this.availablePlayers?.splice(index1, 1);
    this.filteredList = this.availablePlayers;
    let searchbar: HTMLInputElement = document.getElementById("searchPlayers")! as HTMLInputElement;
    searchbar.value = '';

    this.toBeAdded.push(playerId)
  }


  searchInvisible(){
    this.showSearch = false;
  }

  searchVisible(){
    this.showSearch = true;
  }

  onSearch(event: any) {
    let key = event.target.value.toLowerCase();
    this.filteredList = this.availablePlayers?.filter(p => p.name.toLowerCase().includes(key))
  }

}
