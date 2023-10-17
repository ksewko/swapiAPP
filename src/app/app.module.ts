import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { swapiReducer } from './shared/store/sw-store.reducer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './component/home-page/home-page.component';
import { BattleFieldComponent } from './component/battle-field/battle-field.component';
import { ScoreBoardComponent } from './component/score-board/score-board.component';
import { CategoryViewComponent } from './component/category-view/category-view.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    BattleFieldComponent,
    ScoreBoardComponent,
    CategoryViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    StoreModule.forRoot({swStore: swapiReducer}),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
