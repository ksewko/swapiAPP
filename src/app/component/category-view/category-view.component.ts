import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.scss']
})
export class CategoryViewComponent {

  @Output() selectCategory = new EventEmitter();

  selectedCategory = new FormControl('PEOPLE', Validators.required);

  categories = [
    'PEOPLE', 'STARSHIP'
  ]

  onSubmit() {
    this.selectCategory.emit(this.selectedCategory.value)
  }
}
