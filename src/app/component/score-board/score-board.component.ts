import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SWStoreModel } from 'src/app/shared/store/sw-store.model';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.scss'],
})
export class ScoreBoardComponent implements OnInit {
  player1Score!: number;
  player2Score!: number;

  constructor(private store: Store<{ swStore: SWStoreModel }>) {}

  ngOnInit(): void {
    this.store.select('swStore').subscribe((data) => {
      this.player1Score = data.player1Score;
      this.player2Score = data.player2Score;
    });
  }
}
