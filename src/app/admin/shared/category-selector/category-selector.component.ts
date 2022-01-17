import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-category-selector',
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.scss']
})
export class CategorySelectorComponent implements OnInit {
  @Input() categoryList!: Category[];
  selectedCategoryList!: boolean[];
  @Output() selectedCategoryEvent = new EventEmitter<Category>();

  constructor() {
  }

  ngOnInit(): void {
    this.selectedCategoryList = new Array(this.categoryList.length).fill(false);
    this.selectedCategoryList[0] = true;
    this.selectedCategoryEvent.emit(this.categoryList[0]);

  }

  /**
   * @description emits an event containing the category a user has selected
   * @param c the selected category
   */
  selectCategory(c: Category) {
    const i = this.categoryList.indexOf(c);
    this.selectedCategoryList = new Array(this.categoryList.length).fill(false);
    this.selectedCategoryList[i] = true;
    this.selectedCategoryEvent.emit(c);
  }

  selectCategoryByIndex(i: number) {
    this.selectedCategoryList = new Array(this.categoryList.length).fill(false);
    this.selectedCategoryList[i] = true;
    this.selectedCategoryEvent.emit(this.categoryList[i]);
  }
}
