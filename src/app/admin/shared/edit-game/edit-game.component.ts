import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EditGameService } from 'src/app/services/edit-game.service';
import { LoaderToggleService } from 'src/app/services/loader-toggle.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.scss']
})
export class EditGameComponent implements OnInit {
  @Output() sumbitEvent = new EventEmitter<any>();
  playerScores!: number[][]
  errorVisible = "none";
  errorMessage!: string;

  constructor(
    private editGame: EditGameService,
    private toggleLoader: LoaderToggleService
  ) {
    this.playerScores = [new Array(3).fill(null), new Array(3).fill(null)];
  }

  ngOnInit(): void {
  }

  validateScores(): boolean {
    const setScores = [
      [this.playerScores[0][0], this.playerScores[1][0]], 
      [this.playerScores[0][1], this.playerScores[1][1]],
      [this.playerScores[0][2], this.playerScores[1][2]],
    ];
    let playerWins = [0, 0];

    for (let index = 0; index < setScores.length; index++) {
      const set = setScores[index];
        const bothSet = (set[0] != null) && (set[1] != null);
        const bothNull = (set[0] == null) && (set[1] == null);

        if (bothSet || bothNull) {
          if (bothSet) {
            if (set[0] < 11 && set[1] < 11) {
              this.errorMessage = `Er is niet minimaal 11 punten in set ${index + 1} voor de winnaar`;
              return false;
            } else if (set[0] == set[1]) {
              if (Math.abs(set[0] - set[1]) != 2) {
                this.errorMessage = `Er is een gelijk spel in set ${index + 1}`;
                return false;
              }
            } else if (set[0] > 11 || set[1] > 11) {
              if (Math.abs(set[0] - set[1]) != 2) {
                this.errorMessage = `Er is precies een verschil van 2 nodig in set ${index + 1}`;
                return false;
              }
            } else {
              if (Math.abs(set[0] - set[1]) < 2) {
                this.errorMessage = `Er is minimaal een verschil van 2 nodig in set ${index + 1}`;
                return false;
              }
            }
            if (set[0] > set[1]) {
              playerWins[0]++;
            } else if (set[1] > set[0]) {
              playerWins[1]++;
            }
          }        
        } else {
          this.errorMessage = `Er is een veld leeg in set ${index + 1}`;
          return false;
        }
      }
      if (!playerWins.includes(2)) {
        this.errorMessage = `Een speler moet precies 2 sets winnen`;
        return false;
      }

      return true;
  }

  onSubmit() {
    if (this.validateScores()) {
      let booleanScores: boolean[];

      this.toggleLoader.loaderVisible();
      this.playerScores = [
        this.playerScores[0].filter(n => n != null),
        this.playerScores[1].filter(n => n != null)
      ];

      this.editGame.enterScore(this.playerScores).subscribe((res) => {
        console.log(res);
    
        this.sumbitEvent.emit({ id: this.editGame.gameId, score: this.playerScores });
        this.playerScores = [new Array(3).fill(null), new Array(3).fill(null)];
        this.errorVisible = "none";
        this.errorMessage = "";
      });
    } else {
      this.errorVisible = "block";
    }
    
    
  }

  close() {
    this.editGame.hideEdit();
    this.errorVisible = "none";
    this.errorMessage = "";
    this.playerScores = [new Array(3).fill(null), new Array(3).fill(null)];
  }
}
