# Angular2 Multiselect
Angular 6 bootstrap-style


# [Documentation](http://cuppalabs.github.io/components/multiselectDropdown) | [Demo](https://cuppalabs.github.io/angular2-multiselect-dropdown).

## Getting Started
### Installation
- The Mutiselect Dropdown package is published on the [npm](https://www.npmjs.com/package/ng6-multiselect) Registry. 
- Install the package :
    `npm install ng6-multiselect`

- Once installed import `Ng6MultiSelectModule` from the installed package into your module as follows:

### Usage
Import `Ng6MultiselectModule` into `NgModule` in `app.module.ts`
```js
import { NG6MultiselectModule } from 'angular2-multiselect-checkbox-dropdown/angular2-multiselect-dropdown';

@NgModule({
  // ...
  imports: [
    Ng6MultiselectModule,
  ]
  // ...
})

```

Declare the component data variables and options in your component where you want to consume the dropdown component.

```js

import { Component} from '@angular/core';

export class AppComponent {
    emptyTitle="Select foods";
  selectedTitle="Food item(s) selected";
  data=[];
  displayData:any=[
    {id:"apple", itemName:"Apple", primaryGroup:"Fruit", secondaryGroup:"Tree Grown"},
    {id:"mango", itemName:"Mango", primaryGroup:"Fruit", secondaryGroup:"Tree Grown"},
    {id:"starfruit", itemName:"Starfruit", primaryGroup:"Fruit", secondaryGroup:"Tree Grown"},
    {id:"kiwi", itemName:"Kiwi", primaryGroup:"Fruit", secondaryGroup:"Vine Grown"},
    {id:"pineapple", itemName:"Pineapple", primaryGroup:"Fruit"},
    {id:"peach", itemName:"Peach", primaryGroup:"Fruit", secondaryGroup:"Tree Grown"},
    {id:"bannana", itemName:"Bannana", primaryGroup:"Fruit", secondaryGroup:"Tree Grown"},
    {id:"tomato", itemName:"Tomato", primaryGroup:"Fruit"},
    {id:"orange", itemName:"Orange", primaryGroup:"Fruit", secondaryGroup:"Tree Grown"},
    {id:"strawberry", itemName:"Strawberry", primaryGroup:"Fruit", secondaryGroup:"Berries"},
    {id:"cherry", itemName:"Cherry", primaryGroup:"Fruit", secondaryGroup:"Tree Grown"},
    {id:"raspberry", itemName:"Raspberry", primaryGroup:"Fruit", secondaryGroup:"Berries"},
    {id:"blackberry", itemName:"Blackberry", primaryGroup:"Fruit", secondaryGroup:"Berries"},
    {id:"blackBean", itemName:"Black Bean", primaryGroup:"Vegtable", secondaryGroup:"Legume"},
    {id:"soyBean", itemName:"Soy Bean", primaryGroup:"Vegtable", secondaryGroup:"Legume"},
    {id:"chickPeas", itemName:"Chickpeas", primaryGroup:"Vegtable", secondaryGroup:"Legume"},
    {id:"peanut", itemName:"Peanut", primaryGroup:"Vegtable", secondaryGroup:"Legume"},
    {id:"greenPeas", itemName:"Green Peas", primaryGroup:"Vegtable", secondaryGroup:"Legume"},
    {id:"lentils", itemName:"Lentils", primaryGroup:"Vegtable", secondaryGroup:"Legume"},
    {id:"artichoke", itemName:"Artichoke", primaryGroup:"Vegtable"},
    {id:"eggplant", itemName:"Eggplant", primaryGroup:"Vegtable"},
    {id:"asparagus", itemName:"Asperagus", primaryGroup:"Vegtable"},
    {id:"broccoli", itemName:"Broccoli", primaryGroup:"Vegtable"},
    {id:"brusselsSprouts", itemName:"Brussels Sprouts", primaryGroup:"Vegtable"},
    {id:"cabbage", itemName:"Cabbage", primaryGroup:"Vegtable"},
    {id:"cauliflower", itemName:"Eggplant", primaryGroup:"Vegtable"}
  ];
    
    constructor(){
    }
    onSelectChange(data:string[]){
        console.log(data);
    }

    onSelect(data:string[]){
        console.log(data);
    }

    onDeselect(data:string[]){
        console.log(data);
    }
}
```

Add the following component tag in you template 
```html
<ng6-multiselect [data]="displayData" [(ngModel)]="data" 
    (onSelectChange)="onSelectChange($event)" 
    (onDeselect)="onSelect($event)"
    (onDeselect)="onDeselect($event)"
    [(ngModel)]="data"
    (onSelectAll)="onSelectAll($event)"></ng6-multiselect>

```

### Callback Methods
All callback methods return the data that is in the multiselect as a string array of id's
- `onSelect` - Triggered when a element is selected, on its own or in a group
    Example : (onSelect)="onItemSelect($event)"
- `onDeselect` - Triggered when a element is deselected, on its own or in a group
    Example : (onDeselect)="OnItemDeselect($event)"
- `onSelectChange` - Triggered when a element is selected or deselected, on its own or in a group
    Example : (onSelectChange)="onSelectChange($event)"
    

## Run locally
- Clone the repository or downlod the .zip,.tar files.
- Run `npm install`
- Run `ng serve` for a dev server
- Navigate to `http://localhost:4200/`
 The app will automatically reload if you change any of the source files.

## License
LGPL-3.0 License.