import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { SwapiResponse } from 'src/app/shared/models/shared.model';
import {
  resetStore,
  spinnerOff,
  spinnerOn,
} from 'src/app/shared/store/sw-store.actions';
import { SWStoreModel } from 'src/app/shared/store/sw-store.model';
import { SwapiService } from 'src/app/shared/swapi.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  isCategoryChoosed = false;
  idsArray: number[] = [];
  inProgress!: boolean;
  selectedCategoryName!: string;
  protected logoPath = "./assets/pictures/starWarsLogo.png";

  constructor(
    private swapiService: SwapiService,
    private store: Store<{ swStore: SWStoreModel }>,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.store.select('swStore').subscribe((data) => {
      this.inProgress = data.inProgress;
    });
  }

  onPrepareDataSet(categoryName: string) {
    this.isCategoryChoosed = true;
    this.store.dispatch(spinnerOn());
    this.selectedCategoryName = categoryName;

    this.swapiService.fetchData(categoryName).subscribe(
      (res: SwapiResponse) => {
        this.idsArray.push(...res.results.map((el) => +el.uid));
      },
      (err) => {
        this.store.dispatch(spinnerOff());

        this._snackBar.open(`Error: ${err.error}`, 'OK', {
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
        });
      },
      () => {
        this.store.dispatch(spinnerOff());
      }
    );
  }

  onExitClicked() {
    this.store.dispatch(resetStore());
    this.isCategoryChoosed = false;
    this.idsArray = [] as number[];
    this._snackBar.dismiss();
  }
}
