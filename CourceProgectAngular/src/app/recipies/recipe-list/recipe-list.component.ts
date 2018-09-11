import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipies: Recipe[] = [
    new Recipe('recipe1', 'test recipe',
      'http://store.foodforhealthinternational.com' +
      '/images/products/7117.jpg'),
    new Recipe('recipe1', 'test recipe',
      'http://store.foodforhealthinternational.com' +
      '/images/products/7117.jpg')
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
