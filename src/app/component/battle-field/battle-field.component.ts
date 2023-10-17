import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { forkJoin } from 'rxjs';
import {
  BattleElementFormatted,
  ResElement,
  initialBattleElement,
} from 'src/app/shared/models/shared.model';
import {
  battleDrawScore,
  gameStarted,
  scoreIncrement,
  spinnerOff,
  spinnerOn,
} from 'src/app/shared/store/sw-store.actions';
import { SWStoreModel } from 'src/app/shared/store/sw-store.model';
import { SwapiService } from 'src/app/shared/swapi.service';

@Component({
  selector: 'app-battle-field',
  templateUrl: './battle-field.component.html',
  styleUrls: ['./battle-field.component.scss'],
})
export class BattleFieldComponent implements OnInit {
  @Input() categoryName!: string;
  @Input() idsArray: number[] = [];
  @Output() exitClicked = new EventEmitter();

  player1Fighter: BattleElementFormatted = initialBattleElement;
  player2Fighter: BattleElementFormatted = initialBattleElement;

  isGameStarted!: boolean;

  constructor(
    private swapiService: SwapiService,
    private _snackBar: MatSnackBar,
    private store: Store<{ swStore: SWStoreModel }>
  ) {}

  ngOnInit(): void {
    this.store.select('swStore').subscribe((data) => {
      this.isGameStarted = data.isGameStarted;
    });
  }

  private randomNumber(max: number) {
    max = Math.floor(max);
    return Math.floor(Math.random() * (max + 1));
  }

  onDrawClick() {
    const maxRange = this.idsArray.length - 1;
    this.store.dispatch(gameStarted());

    const randomIdIndexPlayer1 = this.randomNumber(maxRange);
    const randomIdPlayer1 = this.idsArray[randomIdIndexPlayer1].toString();

    const randomIdIndexPlayer2 = this.randomNumber(maxRange);
    const randomIdPlayer2 = this.idsArray[randomIdIndexPlayer2].toString();

    this.fetchOpponents(randomIdPlayer1, randomIdPlayer2);
  }

  onExit() {
    this.exitClicked.emit();
  }

  private async fetchOpponents(idPlayer1: string, idPlayer2: string) {
    this.store.dispatch(spinnerOn());
    forkJoin([
      this.swapiService.fetchElement(this.categoryName, idPlayer1),
      this.swapiService.fetchElement(this.categoryName, idPlayer2),
    ]).subscribe(
      ([player1Res, player2Res]) => {
        if (player1Res && player2Res) {
          this.player1Fighter = this.formatPlayerFighter(player1Res);
          this.player2Fighter = this.formatPlayerFighter(player2Res);
          this.beginFight();
        }
      },
      (err) => {
        this.store.dispatch(spinnerOff());
        this.displayTheMessage('center', `Error: ${err.error}`);
      },
      () => {
        this.store.dispatch(spinnerOff());
      }
    );
  }

  private formatPlayerFighter(playerRes: ResElement): BattleElementFormatted {
    const categoryNameCondition = this.categoryName === 'PEOPLE';
    const playerSuperPower: string = categoryNameCondition
      ? playerRes.result.properties.mass
      : playerRes.result.properties.crew;
    return {
      name: playerRes.result.properties.name,
      superPower:
        playerSuperPower !== 'unknown' ? parseInt(playerSuperPower) : 0,
    };
  }

  private beginFight() {
    if (this.player1Fighter.superPower > this.player2Fighter.superPower) {
      this.store.dispatch(scoreIncrement({ playerNumber: 1 }));
      this.displayTheMessage('start', `The winner is ${this.player1Fighter.name}`);
    } else if (
      this.player2Fighter.superPower > this.player1Fighter.superPower
    ) {
      this.store.dispatch(scoreIncrement({ playerNumber: 2 }));
      this.displayTheMessage('end', `The winner is ${this.player2Fighter.name}`);
    } else {
      this.store.dispatch(battleDrawScore());
      this.displayTheMessage('center', 'DRAW - both teams scored the point');
    }
  }

  private displayTheMessage(position: MatSnackBarHorizontalPosition, message: string){
    this._snackBar.open(message, 'OK', {
      horizontalPosition: `${position}`,
      verticalPosition: 'bottom',
      duration: 2000
    });
  }
}
