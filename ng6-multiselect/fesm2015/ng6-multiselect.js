import { Component, Input, EventEmitter, Output, HostListener, ChangeDetectorRef, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const noop = () => { };
class Ng6MultiselectComponent {
    /**
     * @param {?} cd
     */
    constructor(cd) {
        this.cd = cd;
        //The title when the multiselect is empty
        this.emptyTitle = "Select Items";
        //The title when the multiselect has items. The displayed value will be:
        //numSelected+selectedTitle
        this.selectedTitle = "Item(s) Selected";
        //The binding for the selected data. Contains an array of the selected id's
        this.data = [];
        //The data to be displayed for selection. In the format of:
        //[{"id":"idToShowInData","itemName":"nameToDisplay","primaryGroup":"groupThisBelongsTo","secondaryGroup":"aSecondaryGroupForSelection"}]
        //Note that when groups are put in, the select will generate a "Select all $groupname"
        //and the corresponding deselect at the top, as well as put the items into group categories
        this.displayData = [];
        this.displayDataOld = [];
        //Triggered on any item getting selected or unselected
        this.onSelectChange = new EventEmitter();
        //Triggered on an item getting selected
        this.onSelect = new EventEmitter();
        //Triggered on a item getting unselected
        this.onDeselect = new EventEmitter();
        this.displayItems = [];
        this.pgroups = {};
        this.sgroups = {};
        this.ungrouped = [];
        this.focused = false;
        this.open = false;
        this.numSelected = 0;
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.generateDisplayItems();
    }
    /**
     * Generates the items to show in the multiselect
     * @return {?}
     */
    generateDisplayItems() {
        this.pgroups = {};
        this.sgroups = {};
        this.ungrouped = [];
        this.displayItems = [];
        /** @type {?} */
        let all = [];
        for (let i of this.displayData) {
            all.push({ type: "item", id: i.id });
        }
        //Detects all the primary and secondary groups
        for (let item of this.displayData) {
            if (item["primaryGroup"]) {
                this.addPGroup(item);
            }
            else {
                this.addUngrouped(item);
            }
            if (item["secondaryGroup"])
                this.addSGroup(item);
        }
        //Adds the select all option
        if (this.isGroupSelected(all)) {
            this.displayItems.push({ type: "deselectAll" });
        }
        else {
            this.displayItems.push({ type: "selectAll" });
        }
        //Adds the select/deselect secondary group options
        for (let key in this.sgroups) {
            if (this.isGroupSelected(this.sgroups[key])) {
                this.displayItems.push({ type: "deselectS", "group": key });
            }
            else {
                this.displayItems.push({ type: "selectS", "group": key });
            }
        }
        //Adds the ungrouped items
        for (let item of this.ungrouped) {
            this.displayItems.push({ type: "item", "id": item.id, "name": item.itemName, checked: this.data.includes(item.id) });
        }
        //Lastly, adds the groups with items in them
        for (let key in this.pgroups) {
            this.displayItems.push({ type: "gname", title: key, selected: this.isGroupSelected(this.pgroups[key]) });
            for (let item of this.pgroups[key]) {
                this.displayItems.push({ type: "item", id: item.id, name: item.itemName, checked: this.data.includes(item.id) });
            }
        }
        //generate the number of display items selected
        this.numSelected = 0;
        for (let i of this.displayData) {
            if (this.data.includes(i.id))
                this.numSelected++;
        }
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        console.log("check");
        if (JSON.stringify(this.displayData) !== JSON.stringify(this.displayDataOld)) {
            Object.assign(this.displayDataOld, this.displayData);
            this.cd.markForCheck();
            this.generateDisplayItems();
        }
    }
    /**
     * @param {?} items
     * @return {?}
     */
    isGroupSelected(items) {
        for (let item of items) {
            if (!this.data.includes(item.id)) {
                return false;
            }
        }
        return true;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    addPGroup(item) {
        if (this.pgroups[item.primaryGroup] == null) {
            this.pgroups[item.primaryGroup] = [item];
        }
        else {
            this.pgroups[item.primaryGroup].push(item);
        }
    }
    /**
     * @param {?} item
     * @return {?}
     */
    addSGroup(item) {
        if (this.sgroups[item.secondaryGroup] == null) {
            this.sgroups[item.secondaryGroup] = [item];
        }
        else {
            this.sgroups[item.secondaryGroup].push(item);
        }
    }
    /**
     * @param {?} item
     * @return {?}
     */
    addUngrouped(item) {
        this.ungrouped.push(item);
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onClicked($event) {
        $event.preventDefault();
        $event.stopPropagation();
        this.focused = true;
        this.open = !this.open;
        this.hovered = this.displayItems[0] || null;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    setHover(item) {
        this.hovered = item;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    selectItem(item) {
        if (item.type == 'gname') {
            if (item.selected == true) {
                //Loop through the items in the group
                for (let groupItem of this.pgroups[item.title]) {
                    this.data.splice(this.data.indexOf(groupItem.id), 1);
                }
                this.onDeselect.emit(this.data);
                this.onSelectChange.emit(this.data);
            }
            else {
                for (let groupItem of this.pgroups[item.title]) {
                    if (!this.data.includes(groupItem.id)) {
                        this.data.push(groupItem.id);
                    }
                }
                this.onSelect.emit(this.data);
                this.onSelectChange.emit(this.data);
            }
        }
        else if (item.type == 'selectS') {
            for (let groupItem of this.sgroups[item.group]) {
                if (!this.data.includes(groupItem.id)) {
                    this.data.push(groupItem.id);
                }
            }
            this.onSelect.emit(this.data);
            this.onSelectChange.emit(this.data);
        }
        else if (item.type == 'deselectS') {
            for (let groupItem of this.sgroups[item.group]) {
                this.data.splice(this.data.indexOf(groupItem.id), 1);
            }
            this.onDeselect.emit(this.data);
            this.onSelectChange.emit(this.data);
        }
        else if (item.type == "item") {
            if (item.checked) {
                this.data.splice(this.data.indexOf(item.id), 1);
                this.onDeselect.emit(this.data);
                this.onSelectChange.emit(this.data);
            }
            else {
                this.data.push(item.id);
                this.onSelect.emit(this.data);
                this.onSelectChange.emit(this.data);
            }
        }
        else if (item.type == 'selectAll') {
            this.data.splice(0, this.data.length);
            for (let i of this.displayData) {
                this.data.push(i.id);
            }
            this.onSelectChange.emit(this.data);
        }
        else {
            for (let i of this.displayData) {
                this.data.splice(this.data.indexOf(i.id), 1);
            }
            this.onSelectChange.emit(this.data);
        }
        this.generateDisplayItems();
    }
    /**
     * @return {?}
     */
    get value() {
        return this.data;
    }
    ;
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        this.data = value;
        this.onChangeCallback(value);
    }
    /**
     * @return {?}
     */
    onBlur() {
        this.onTouchedCallback();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.data = value;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    clickedOutside($event) {
        if (!this.open) {
            this.focused = false;
        }
        this.open = false;
    }
}
Ng6MultiselectComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng6-multiselect',
                template: `<div onselectstart="return false" class="multiselectElement" (click)="onClicked($event)" [ngClass]="{'multiselectFocus':this.focused}">
    <span style="margin-left:4px;">
        <span *ngIf="numSelected==0">{{this.emptyTitle}}</span>
        <span *ngIf="numSelected>0">{{numSelected +" "+ this.selectedTitle}}</span>
    </span>
    <span class="rightArrow">&#x25bc;</span>
<div *ngIf="this.open" (click)="$event.preventDefault();$event.stopPropagation();" class="dropdown">
    <div class="multiselectRow" (mouseenter)="setHover(item)" (click)="selectItem(item)" [ngClass]="{'hoverHighlight':hovered==item}" *ngFor="let item of displayItems">
        <span *ngIf="item.type=='selectAll'"><input type="checkbox"/>Select All</span>
        <span *ngIf="item.type=='deselectAll'"><input type="checkbox" checked/>UnSelect All</span>
        <span *ngIf="item.type=='selectS'"><input type="checkbox"/>Select All {{item.group}}</span>
        <span *ngIf="item.type=='deselectS'"><input type="checkbox" checked/>UnSelect All {{item.group}}</span>
        <span *ngIf="item.type=='gname'"><input [checked]="item.selected==true" type="checkbox"/><b>{{item.title}}</b></span>
        <span *ngIf="item.type=='item'" style="padding-left:20px"><input [checked]="item.checked==true" type="checkbox"/>{{item.name}}</span>
    </div>
</div>
</div>`,
                styles: [`.multiselectElement{width:100%;height:20px;max-height:34px;border:1px solid #ccc;border-radius:4px;display:block;padding:6px 0;min-width:60px;font-size:14px;line-height:1.42857143;color:#555;cursor:default;transition:border-color .15s ease-in-out;background-color:#fff}.multiselectFocus{box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);outline:0;border:1px solid #66afe9}.dropdown{position:relative;width:calc(100% + 2px);top:7px;left:-1px;z-index:2;box-shadow:0 1px 5px #959595;border:1px solid #ccc;background-color:#fff;min-height:20px;max-height:400px;overflow-y:auto}.rightArrow{color:#555;padding-right:0;font-size:10px;margin:4px 3px auto auto;float:right}.multiselectRow{padding-left:4px}.hoverHighlight{background-color:#cce8ff}input[type=checkbox]{margin-right:5px}`],
                providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: Ng6MultiselectComponent, multi: true }]
            },] },
];
/** @nocollapse */
Ng6MultiselectComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
Ng6MultiselectComponent.propDecorators = {
    emptyTitle: [{ type: Input }],
    selectedTitle: [{ type: Input }],
    data: [{ type: Input, args: ['ngModel',] }],
    displayData: [{ type: Input, args: ['data',] }],
    onSelectChange: [{ type: Output, args: ['onSelectChange',] }],
    onSelect: [{ type: Output, args: ['onSelect',] }],
    onDeselect: [{ type: Output, args: ['onDeselect',] }],
    clickedOutside: [{ type: HostListener, args: ['document:click', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class Ng6MultiselectModule {
}
Ng6MultiselectModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    BrowserModule,
                    FormsModule
                ],
                declarations: [Ng6MultiselectComponent],
                exports: [Ng6MultiselectComponent]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { Ng6MultiselectComponent, Ng6MultiselectModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmc2LW11bHRpc2VsZWN0LmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZzYtbXVsdGlzZWxlY3QvbGliL25nNi1tdWx0aXNlbGVjdC5jb21wb25lbnQudHMiLCJuZzovL25nNi1tdWx0aXNlbGVjdC9saWIvbmc2LW11bHRpc2VsZWN0Lm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQsIEhvc3RMaXN0ZW5lcixPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMsIFNpbXBsZUNoYW5nZSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIERvQ2hlY2t9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5jb25zdCBub29wID0gKCk9Pnt9O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZzYtbXVsdGlzZWxlY3QnLFxuICB0ZW1wbGF0ZTogYDxkaXYgb25zZWxlY3RzdGFydD1cInJldHVybiBmYWxzZVwiIGNsYXNzPVwibXVsdGlzZWxlY3RFbGVtZW50XCIgKGNsaWNrKT1cIm9uQ2xpY2tlZCgkZXZlbnQpXCIgW25nQ2xhc3NdPVwieydtdWx0aXNlbGVjdEZvY3VzJzp0aGlzLmZvY3VzZWR9XCI+XG4gICAgPHNwYW4gc3R5bGU9XCJtYXJnaW4tbGVmdDo0cHg7XCI+XG4gICAgICAgIDxzcGFuICpuZ0lmPVwibnVtU2VsZWN0ZWQ9PTBcIj57e3RoaXMuZW1wdHlUaXRsZX19PC9zcGFuPlxuICAgICAgICA8c3BhbiAqbmdJZj1cIm51bVNlbGVjdGVkPjBcIj57e251bVNlbGVjdGVkICtcIiBcIisgdGhpcy5zZWxlY3RlZFRpdGxlfX08L3NwYW4+XG4gICAgPC9zcGFuPlxuICAgIDxzcGFuIGNsYXNzPVwicmlnaHRBcnJvd1wiPiYjeDI1YmM7PC9zcGFuPlxuPGRpdiAqbmdJZj1cInRoaXMub3BlblwiIChjbGljayk9XCIkZXZlbnQucHJldmVudERlZmF1bHQoKTskZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XCIgY2xhc3M9XCJkcm9wZG93blwiPlxuICAgIDxkaXYgY2xhc3M9XCJtdWx0aXNlbGVjdFJvd1wiIChtb3VzZWVudGVyKT1cInNldEhvdmVyKGl0ZW0pXCIgKGNsaWNrKT1cInNlbGVjdEl0ZW0oaXRlbSlcIiBbbmdDbGFzc109XCJ7J2hvdmVySGlnaGxpZ2h0Jzpob3ZlcmVkPT1pdGVtfVwiICpuZ0Zvcj1cImxldCBpdGVtIG9mIGRpc3BsYXlJdGVtc1wiPlxuICAgICAgICA8c3BhbiAqbmdJZj1cIml0ZW0udHlwZT09J3NlbGVjdEFsbCdcIj48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIvPlNlbGVjdCBBbGw8L3NwYW4+XG4gICAgICAgIDxzcGFuICpuZ0lmPVwiaXRlbS50eXBlPT0nZGVzZWxlY3RBbGwnXCI+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNoZWNrZWQvPlVuU2VsZWN0IEFsbDwvc3Bhbj5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJpdGVtLnR5cGU9PSdzZWxlY3RTJ1wiPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIi8+U2VsZWN0IEFsbCB7e2l0ZW0uZ3JvdXB9fTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJpdGVtLnR5cGU9PSdkZXNlbGVjdFMnXCI+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNoZWNrZWQvPlVuU2VsZWN0IEFsbCB7e2l0ZW0uZ3JvdXB9fTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJpdGVtLnR5cGU9PSdnbmFtZSdcIj48aW5wdXQgW2NoZWNrZWRdPVwiaXRlbS5zZWxlY3RlZD09dHJ1ZVwiIHR5cGU9XCJjaGVja2JveFwiLz48Yj57e2l0ZW0udGl0bGV9fTwvYj48L3NwYW4+XG4gICAgICAgIDxzcGFuICpuZ0lmPVwiaXRlbS50eXBlPT0naXRlbSdcIiBzdHlsZT1cInBhZGRpbmctbGVmdDoyMHB4XCI+PGlucHV0IFtjaGVja2VkXT1cIml0ZW0uY2hlY2tlZD09dHJ1ZVwiIHR5cGU9XCJjaGVja2JveFwiLz57e2l0ZW0ubmFtZX19PC9zcGFuPlxuICAgIDwvZGl2PlxuPC9kaXY+XG48L2Rpdj5gLFxuICBzdHlsZXM6IFtgLm11bHRpc2VsZWN0RWxlbWVudHt3aWR0aDoxMDAlO2hlaWdodDoyMHB4O21heC1oZWlnaHQ6MzRweDtib3JkZXI6MXB4IHNvbGlkICNjY2M7Ym9yZGVyLXJhZGl1czo0cHg7ZGlzcGxheTpibG9jaztwYWRkaW5nOjZweCAwO21pbi13aWR0aDo2MHB4O2ZvbnQtc2l6ZToxNHB4O2xpbmUtaGVpZ2h0OjEuNDI4NTcxNDM7Y29sb3I6IzU1NTtjdXJzb3I6ZGVmYXVsdDt0cmFuc2l0aW9uOmJvcmRlci1jb2xvciAuMTVzIGVhc2UtaW4tb3V0O2JhY2tncm91bmQtY29sb3I6I2ZmZn0ubXVsdGlzZWxlY3RGb2N1c3tib3gtc2hhZG93Omluc2V0IDAgMXB4IDFweCByZ2JhKDAsMCwwLC4wNzUpLDAgMCA4cHggcmdiYSgxMDIsMTc1LDIzMywuNik7b3V0bGluZTowO2JvcmRlcjoxcHggc29saWQgIzY2YWZlOX0uZHJvcGRvd257cG9zaXRpb246cmVsYXRpdmU7d2lkdGg6Y2FsYygxMDAlICsgMnB4KTt0b3A6N3B4O2xlZnQ6LTFweDt6LWluZGV4OjI7Ym94LXNoYWRvdzowIDFweCA1cHggIzk1OTU5NTtib3JkZXI6MXB4IHNvbGlkICNjY2M7YmFja2dyb3VuZC1jb2xvcjojZmZmO21pbi1oZWlnaHQ6MjBweDttYXgtaGVpZ2h0OjQwMHB4O292ZXJmbG93LXk6YXV0b30ucmlnaHRBcnJvd3tjb2xvcjojNTU1O3BhZGRpbmctcmlnaHQ6MDtmb250LXNpemU6MTBweDttYXJnaW46NHB4IDNweCBhdXRvIGF1dG87ZmxvYXQ6cmlnaHR9Lm11bHRpc2VsZWN0Um93e3BhZGRpbmctbGVmdDo0cHh9LmhvdmVySGlnaGxpZ2h0e2JhY2tncm91bmQtY29sb3I6I2NjZThmZn1pbnB1dFt0eXBlPWNoZWNrYm94XXttYXJnaW4tcmlnaHQ6NXB4fWBdLFxuICBwcm92aWRlcnM6IFt7cHJvdmlkZTpOR19WQUxVRV9BQ0NFU1NPUix1c2VFeGlzdGluZzpOZzZNdWx0aXNlbGVjdENvbXBvbmVudCxtdWx0aTp0cnVlfV1cbn0pXG5leHBvcnQgY2xhc3MgTmc2TXVsdGlzZWxlY3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIERvQ2hlY2ssIENvbnRyb2xWYWx1ZUFjY2Vzc29ye1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpe31cblxuICAgIC8vVGhlIHRpdGxlIHdoZW4gdGhlIG11bHRpc2VsZWN0IGlzIGVtcHR5XG4gICAgQElucHV0KClcbiAgICBlbXB0eVRpdGxlOiBzdHJpbmc9XCJTZWxlY3QgSXRlbXNcIjtcbiAgICBcbiAgICAvL1RoZSB0aXRsZSB3aGVuIHRoZSBtdWx0aXNlbGVjdCBoYXMgaXRlbXMuIFRoZSBkaXNwbGF5ZWQgdmFsdWUgd2lsbCBiZTpcbiAgICAvL251bVNlbGVjdGVkK3NlbGVjdGVkVGl0bGVcbiAgICBASW5wdXQoKVxuICAgIHNlbGVjdGVkVGl0bGU6IHN0cmluZz1cIkl0ZW0ocykgU2VsZWN0ZWRcIjtcblxuICAgIC8vVGhlIGJpbmRpbmcgZm9yIHRoZSBzZWxlY3RlZCBkYXRhLiBDb250YWlucyBhbiBhcnJheSBvZiB0aGUgc2VsZWN0ZWQgaWQnc1xuICAgIEBJbnB1dCgnbmdNb2RlbCcpXG4gICAgZGF0YTogQXJyYXk8c3RyaW5nPj1bXTtcblxuICAgIC8vVGhlIGRhdGEgdG8gYmUgZGlzcGxheWVkIGZvciBzZWxlY3Rpb24uIEluIHRoZSBmb3JtYXQgb2Y6XG4gICAgLy9be1wiaWRcIjpcImlkVG9TaG93SW5EYXRhXCIsXCJpdGVtTmFtZVwiOlwibmFtZVRvRGlzcGxheVwiLFwicHJpbWFyeUdyb3VwXCI6XCJncm91cFRoaXNCZWxvbmdzVG9cIixcInNlY29uZGFyeUdyb3VwXCI6XCJhU2Vjb25kYXJ5R3JvdXBGb3JTZWxlY3Rpb25cIn1dXG4gICAgLy9Ob3RlIHRoYXQgd2hlbiBncm91cHMgYXJlIHB1dCBpbiwgdGhlIHNlbGVjdCB3aWxsIGdlbmVyYXRlIGEgXCJTZWxlY3QgYWxsICRncm91cG5hbWVcIiBcbiAgICAvL2FuZCB0aGUgY29ycmVzcG9uZGluZyBkZXNlbGVjdCBhdCB0aGUgdG9wLCBhcyB3ZWxsIGFzIHB1dCB0aGUgaXRlbXMgaW50byBncm91cCBjYXRlZ29yaWVzXG4gICAgQElucHV0KCdkYXRhJylcbiAgICBkaXNwbGF5RGF0YTogQXJyYXk8YW55Pj1bXTtcblxuICAgIGRpc3BsYXlEYXRhT2xkOiBBcnJheTxhbnk+PVtdO1xuXG4gICAgLy9UcmlnZ2VyZWQgb24gYW55IGl0ZW0gZ2V0dGluZyBzZWxlY3RlZCBvciB1bnNlbGVjdGVkXG4gICAgQE91dHB1dCgnb25TZWxlY3RDaGFuZ2UnKVxuICAgIG9uU2VsZWN0Q2hhbmdlOiBFdmVudEVtaXR0ZXI8QXJyYXk8c3RyaW5nPj4gPSBuZXcgRXZlbnRFbWl0dGVyPEFycmF5PHN0cmluZz4+KCk7XG5cbiAgICAvL1RyaWdnZXJlZCBvbiBhbiBpdGVtIGdldHRpbmcgc2VsZWN0ZWRcbiAgICBAT3V0cHV0KCdvblNlbGVjdCcpXG4gICAgb25TZWxlY3Q6IEV2ZW50RW1pdHRlcjxBcnJheTxzdHJpbmc+PiA9IG5ldyBFdmVudEVtaXR0ZXI8QXJyYXk8c3RyaW5nPj4oKTtcblxuICAgIC8vVHJpZ2dlcmVkIG9uIGEgaXRlbSBnZXR0aW5nIHVuc2VsZWN0ZWRcbiAgICBAT3V0cHV0KCdvbkRlc2VsZWN0JylcbiAgICBvbkRlc2VsZWN0OiBFdmVudEVtaXR0ZXI8QXJyYXk8c3RyaW5nPj4gPSBuZXcgRXZlbnRFbWl0dGVyPEFycmF5PHN0cmluZz4+KCk7XG5cblxuICAgIC8vSW50ZXJuYWwgdmFyaWFibGVzIHRvIGJlIG1vZGlmaWVkIHRvIGluZmx1ZW5jZSB0aGUgdmlld1xuICAgIFxuICAgIC8vVGhlIGxpc3Qgb2YgaXRlbXMgdG8gc2hvdyBpbiB0aGUgc2VsZWN0XG4gICAgcHVibGljIGRpc3BsYXlJdGVtczogQXJyYXk8YW55Pj1bXTtcblxuICAgIC8vUHJpbWFyeSBncm91cHMgYW5kIGNvbnRlbnRzXG4gICAgcHJpdmF0ZSBwZ3JvdXBzOiBhbnk9e307XG4gICAgLy9TZWNvbmRhcnkgZ3JvdXBzIGFuZCBjb250ZW50c1xuICAgIHByaXZhdGUgc2dyb3VwczogYW55PXt9O1xuICAgIC8vVW5ncm91cGVkIGl0ZW1zXG4gICAgcHJpdmF0ZSB1bmdyb3VwZWQ6IEFycmF5PGFueT49W107XG5cbiAgICAvL2lmIHRoZSBkaXYgaXMgZm9jdXNlZFxuICAgIHB1YmxpYyBmb2N1c2VkOmJvb2xlYW49ZmFsc2U7XG4gICAgLy9pZiB0aGUgZGl2IGlzIG9wZW5cbiAgICBwdWJsaWMgb3Blbjpib29sZWFuPWZhbHNlO1xuICAgIC8vdGhlIGN1cnJlbnRseSBob3ZlcmVkIGl0ZW1cbiAgICBwdWJsaWMgaG92ZXJlZDogYW55O1xuXG4gICAgLy9UaGUgbnVtYmVyIGZyb20gdGhlIGxpc3QgdGhhdCBhcmUgc2VsZWN0ZWQoaGFzIHRvIGJlIGNhbGN1bGF0ZWQgc2luY2UgZGF0YSBjYW4gYmUgc2hhcmVkIGJldHdlZW4gbXVsdGlzZWxlY3RzKVxuICAgIHB1YmxpYyBudW1TZWxlY3RlZD0wO1xuXG4gICAgbmdPbkluaXQoKXtcbiAgICAgICAgdGhpcy5nZW5lcmF0ZURpc3BsYXlJdGVtcygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyB0aGUgaXRlbXMgdG8gc2hvdyBpbiB0aGUgbXVsdGlzZWxlY3RcbiAgICAgKi9cbiAgICBwcml2YXRlIGdlbmVyYXRlRGlzcGxheUl0ZW1zKCk6dm9pZHtcbiAgICAgICAgdGhpcy5wZ3JvdXBzPXt9O1xuICAgICAgICB0aGlzLnNncm91cHM9e307XG4gICAgICAgIHRoaXMudW5ncm91cGVkPVtdO1xuICAgICAgICB0aGlzLmRpc3BsYXlJdGVtcz1bXTtcbiAgICAgICAgbGV0IGFsbD1bXTtcbiAgICAgICAgZm9yKGxldCBpIG9mIHRoaXMuZGlzcGxheURhdGEpe1xuICAgICAgICAgICAgYWxsLnB1c2goe3R5cGU6XCJpdGVtXCIsaWQ6aS5pZH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vRGV0ZWN0cyBhbGwgdGhlIHByaW1hcnkgYW5kIHNlY29uZGFyeSBncm91cHNcbiAgICAgICAgZm9yKGxldCBpdGVtIG9mIHRoaXMuZGlzcGxheURhdGEpe1xuICAgICAgICAgICAgaWYoaXRlbVtcInByaW1hcnlHcm91cFwiXSl7dGhpcy5hZGRQR3JvdXAoaXRlbSk7fVxuICAgICAgICAgICAgZWxzZXt0aGlzLmFkZFVuZ3JvdXBlZChpdGVtKTt9XG4gICAgICAgICAgICBpZihpdGVtW1wic2Vjb25kYXJ5R3JvdXBcIl0pdGhpcy5hZGRTR3JvdXAoaXRlbSk7XG4gICAgICAgIH1cbiAgICAgICAgLy9BZGRzIHRoZSBzZWxlY3QgYWxsIG9wdGlvblxuICAgICAgICBpZih0aGlzLmlzR3JvdXBTZWxlY3RlZChhbGwpKXtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheUl0ZW1zLnB1c2goe3R5cGU6XCJkZXNlbGVjdEFsbFwifSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5SXRlbXMucHVzaCh7dHlwZTpcInNlbGVjdEFsbFwifSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vQWRkcyB0aGUgc2VsZWN0L2Rlc2VsZWN0IHNlY29uZGFyeSBncm91cCBvcHRpb25zXG4gICAgICAgIGZvcihsZXQga2V5IGluIHRoaXMuc2dyb3Vwcyl7XG4gICAgICAgICAgICBpZih0aGlzLmlzR3JvdXBTZWxlY3RlZCh0aGlzLnNncm91cHNba2V5XSkpe1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheUl0ZW1zLnB1c2goe3R5cGU6XCJkZXNlbGVjdFNcIixcImdyb3VwXCI6a2V5fSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlJdGVtcy5wdXNoKHt0eXBlOlwic2VsZWN0U1wiLFwiZ3JvdXBcIjprZXl9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvL0FkZHMgdGhlIHVuZ3JvdXBlZCBpdGVtc1xuICAgICAgICBmb3IobGV0IGl0ZW0gb2YgdGhpcy51bmdyb3VwZWQpe1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5SXRlbXMucHVzaCh7dHlwZTpcIml0ZW1cIixcImlkXCI6aXRlbS5pZCxcIm5hbWVcIjppdGVtLml0ZW1OYW1lLCBjaGVja2VkOnRoaXMuZGF0YS5pbmNsdWRlcyhpdGVtLmlkKX0pO1xuICAgICAgICB9XG4gICAgICAgIC8vTGFzdGx5LCBhZGRzIHRoZSBncm91cHMgd2l0aCBpdGVtcyBpbiB0aGVtXG4gICAgICAgIGZvcihsZXQga2V5IGluIHRoaXMucGdyb3Vwcyl7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlJdGVtcy5wdXNoKHt0eXBlOlwiZ25hbWVcIix0aXRsZTprZXksIHNlbGVjdGVkOnRoaXMuaXNHcm91cFNlbGVjdGVkKHRoaXMucGdyb3Vwc1trZXldKX0pO1xuICAgICAgICAgICAgZm9yKGxldCBpdGVtIG9mIHRoaXMucGdyb3Vwc1trZXldKXtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlJdGVtcy5wdXNoKHt0eXBlOlwiaXRlbVwiLGlkOml0ZW0uaWQsbmFtZTppdGVtLml0ZW1OYW1lLCBjaGVja2VkOnRoaXMuZGF0YS5pbmNsdWRlcyhpdGVtLmlkKX0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vZ2VuZXJhdGUgdGhlIG51bWJlciBvZiBkaXNwbGF5IGl0ZW1zIHNlbGVjdGVkXG4gICAgICAgIHRoaXMubnVtU2VsZWN0ZWQ9MDtcbiAgICAgICAgZm9yKGxldCBpIG9mIHRoaXMuZGlzcGxheURhdGEpe1xuICAgICAgICAgICAgaWYodGhpcy5kYXRhLmluY2x1ZGVzKGkuaWQpKXRoaXMubnVtU2VsZWN0ZWQrKztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nRG9DaGVjaygpe1xuICAgICAgY29uc29sZS5sb2coXCJjaGVja1wiKVxuICAgICAgaWYoSlNPTi5zdHJpbmdpZnkodGhpcy5kaXNwbGF5RGF0YSkhPT1KU09OLnN0cmluZ2lmeSh0aGlzLmRpc3BsYXlEYXRhT2xkKSl7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5kaXNwbGF5RGF0YU9sZCx0aGlzLmRpc3BsYXlEYXRhKTtcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgdGhpcy5nZW5lcmF0ZURpc3BsYXlJdGVtcygpO1xuICAgICAgfVxuICAgIH1cbiAgICAvL0xvb3BzIHRocm91Z2ggdGhlIGFycmF5IG9mIGl0ZW0gaWRzIGFuZCBjaGVja3MgaWYgYWxsIG9mIHRoZW0gYXJlIHNlbGVjdGVkLiBJZiBzbywgcmV0dXJucyB0cnVlLCBvdGhlcndpc2UgZmFsc2VcbiAgICBwcml2YXRlIGlzR3JvdXBTZWxlY3RlZChpdGVtczogYW55W10pOiBib29sZWFue1xuICAgICAgICBmb3IobGV0IGl0ZW0gb2YgaXRlbXMpe1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZighdGhpcy5kYXRhLmluY2x1ZGVzKGl0ZW0uaWQpKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7fVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vQWRkcyBhbiBpdGVtIHRvIHRoZSBwcmltYXJ5IGdyb3VwIGxpc3QgYW5kIGFkZHMgaXRzIGdyb3VwIGlmIGl0IGRvc24ndCBleGlzdFxuICAgIHByaXZhdGUgYWRkUEdyb3VwKGl0ZW06YW55KTp2b2lke1xuICAgICAgICBpZih0aGlzLnBncm91cHNbaXRlbS5wcmltYXJ5R3JvdXBdPT1udWxsKXtcbiAgICAgICAgICAgIHRoaXMucGdyb3Vwc1tpdGVtLnByaW1hcnlHcm91cF09W2l0ZW1dO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMucGdyb3Vwc1tpdGVtLnByaW1hcnlHcm91cF0ucHVzaChpdGVtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vQWRkcyBhbiBpdGVtIHRvIHRoZSBzZWNvbmRhcnkgZ3JvdXAgbGlzdCBhbmQgYWRkcyBpdHMgZ3JvdXAgaWYgaXQgZG9zbid0IGV4aXN0XG4gICAgcHJpdmF0ZSBhZGRTR3JvdXAoaXRlbTphbnkpOnZvaWR7XG4gICAgICAgIGlmKHRoaXMuc2dyb3Vwc1tpdGVtLnNlY29uZGFyeUdyb3VwXT09bnVsbCl7XG4gICAgICAgICAgICB0aGlzLnNncm91cHNbaXRlbS5zZWNvbmRhcnlHcm91cF09W2l0ZW1dO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMuc2dyb3Vwc1tpdGVtLnNlY29uZGFyeUdyb3VwXS5wdXNoKGl0ZW0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy9BZGRzIGFuIGl0ZW0gdG8gdGhlIHVuZ3JvdXBlZCBsaXN0XG4gICAgcHJpdmF0ZSBhZGRVbmdyb3VwZWQoaXRlbTphbnkpOnZvaWR7XG4gICAgICAgIHRoaXMudW5ncm91cGVkLnB1c2goaXRlbSk7XG4gICAgfVxuXG4gICAgLy9XaGVuIHRoZSBtYWluIGJveCBpcyBjbGlja2VkLCB0aGlzIGlzIHRyaWdnZXJlZFxuICAgIHB1YmxpYyBvbkNsaWNrZWQoJGV2ZW50KXtcbiAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdGhpcy5mb2N1c2VkPXRydWU7XG4gICAgICAgIHRoaXMub3Blbj0hdGhpcy5vcGVuO1xuICAgICAgICB0aGlzLmhvdmVyZWQ9dGhpcy5kaXNwbGF5SXRlbXNbMF0gfHwgbnVsbDtcbiAgICB9XG5cbiAgICAvL1NldHMgdGhlIGN1cnJlbnQgaG92ZXJlZCBpdGVtKHVzZWQgaW5zdGVhZCBvZiBjc3MgdG8ga2VlcCB0aGUgaG92ZXIgcGVyc2lzdGFudClcbiAgICBzZXRIb3ZlcihpdGVtKTogdm9pZHtcbiAgICAgICAgdGhpcy5ob3ZlcmVkPWl0ZW07XG4gICAgfVxuXG4gICAgLy9TZWxlY3RzIHRoZSBpdGVtIGluIHRoZSBkYXRhXG4gICAgc2VsZWN0SXRlbShpdGVtOiBhbnkpOiB2b2lke1xuICAgICAgICBpZihpdGVtLnR5cGU9PSdnbmFtZScpe1xuICAgICAgICAgICAgaWYoaXRlbS5zZWxlY3RlZD09dHJ1ZSl7XG4gICAgICAgICAgICAgICAgLy9Mb29wIHRocm91Z2ggdGhlIGl0ZW1zIGluIHRoZSBncm91cFxuICAgICAgICAgICAgICAgIGZvcihsZXQgZ3JvdXBJdGVtIG9mIHRoaXMucGdyb3Vwc1tpdGVtLnRpdGxlXSl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zcGxpY2UodGhpcy5kYXRhLmluZGV4T2YoZ3JvdXBJdGVtLmlkKSwgMSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5vbkRlc2VsZWN0LmVtaXQodGhpcy5kYXRhKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uU2VsZWN0Q2hhbmdlLmVtaXQodGhpcy5kYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBncm91cEl0ZW0gb2YgdGhpcy5wZ3JvdXBzW2l0ZW0udGl0bGVdKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoIXRoaXMuZGF0YS5pbmNsdWRlcyhncm91cEl0ZW0uaWQpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5wdXNoKGdyb3VwSXRlbS5pZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5vblNlbGVjdC5lbWl0KHRoaXMuZGF0YSk7XG4gICAgICAgICAgICAgICAgdGhpcy5vblNlbGVjdENoYW5nZS5lbWl0KHRoaXMuZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNlIGlmKGl0ZW0udHlwZT09J3NlbGVjdFMnKXtcbiAgICAgICAgICAgIGZvcihsZXQgZ3JvdXBJdGVtIG9mIHRoaXMuc2dyb3Vwc1tpdGVtLmdyb3VwXSl7XG4gICAgICAgICAgICAgICAgaWYoIXRoaXMuZGF0YS5pbmNsdWRlcyhncm91cEl0ZW0uaWQpKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLnB1c2goZ3JvdXBJdGVtLmlkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm9uU2VsZWN0LmVtaXQodGhpcy5kYXRhKTtcbiAgICAgICAgICAgIHRoaXMub25TZWxlY3RDaGFuZ2UuZW1pdCh0aGlzLmRhdGEpO1xuICAgICAgICB9ZWxzZSBpZihpdGVtLnR5cGU9PSdkZXNlbGVjdFMnKXtcbiAgICAgICAgICAgIGZvcihsZXQgZ3JvdXBJdGVtIG9mIHRoaXMuc2dyb3Vwc1tpdGVtLmdyb3VwXSl7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnNwbGljZSh0aGlzLmRhdGEuaW5kZXhPZihncm91cEl0ZW0uaWQpLCAxKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5vbkRlc2VsZWN0LmVtaXQodGhpcy5kYXRhKTtcbiAgICAgICAgICAgIHRoaXMub25TZWxlY3RDaGFuZ2UuZW1pdCh0aGlzLmRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoaXRlbS50eXBlPT1cIml0ZW1cIil7XG4gICAgICAgICAgICBpZihpdGVtLmNoZWNrZWQpe1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zcGxpY2UodGhpcy5kYXRhLmluZGV4T2YoaXRlbS5pZCksIDEpXG4gICAgICAgICAgICAgICAgdGhpcy5vbkRlc2VsZWN0LmVtaXQodGhpcy5kYXRhKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uU2VsZWN0Q2hhbmdlLmVtaXQodGhpcy5kYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnB1c2goaXRlbS5pZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5vblNlbGVjdC5lbWl0KHRoaXMuZGF0YSk7XG4gICAgICAgICAgICAgICAgdGhpcy5vblNlbGVjdENoYW5nZS5lbWl0KHRoaXMuZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihpdGVtLnR5cGU9PSdzZWxlY3RBbGwnKXtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zcGxpY2UoMCx0aGlzLmRhdGEubGVuZ3RoKTtcbiAgICAgICAgICAgIGZvcihsZXQgaSBvZiB0aGlzLmRpc3BsYXlEYXRhKXtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEucHVzaChpLmlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMub25TZWxlY3RDaGFuZ2UuZW1pdCh0aGlzLmRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBmb3IobGV0IGkgb2YgdGhpcy5kaXNwbGF5RGF0YSl7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnNwbGljZSh0aGlzLmRhdGEuaW5kZXhPZihpLmlkKSwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm9uU2VsZWN0Q2hhbmdlLmVtaXQodGhpcy5kYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBcblxuICAgICAgICB0aGlzLmdlbmVyYXRlRGlzcGxheUl0ZW1zKCk7XG4gICAgfVxuICAgIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xuICAgIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86YW55KSA9PiB2b2lkID0gbm9vcDtcblxuICAgIGdldCB2YWx1ZSgpOiBhbnl7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGE7XG4gICAgfTtcblxuICAgIHNldCB2YWx1ZSh2YWx1ZSl7XG4gICAgICAgIHRoaXMuZGF0YT12YWx1ZTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHZhbHVlKTtcbiAgICB9XG5cbiAgICBvbkJsdXIoKSB7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgICB9XG5cbiAgICB3cml0ZVZhbHVlKHZhbHVlOmFueSk6IHZvaWR7XG4gICAgICAgIHRoaXMuZGF0YT12YWx1ZTtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOmFueSk6IHZvaWR7XG4gICAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjaz1mbjtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjphbnkpOiB2b2lke1xuICAgICAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrPWZuO1xuICAgIH1cblxuICAgIC8vRGV0ZWN0cyB3aGVuIHRoZSBtb3VzZSBjbGlja3Mgb3V0c2lkZSBvZiB0aGlzIGNvbXBvbmVudFxuICAgIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmNsaWNrJyxbJyRldmVudCddKSBjbGlja2VkT3V0c2lkZSgkZXZlbnQpe1xuICAgICAgICBpZighdGhpcy5vcGVuKXt0aGlzLmZvY3VzZWQ9ZmFsc2U7fVxuICAgICAgICB0aGlzLm9wZW49ZmFsc2U7XG4gICAgICAgIFxuICAgIH1cbn0iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmc2TXVsdGlzZWxlY3RDb21wb25lbnQgfSBmcm9tICcuL25nNi1tdWx0aXNlbGVjdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBCcm93c2VyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBCcm93c2VyTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW05nNk11bHRpc2VsZWN0Q29tcG9uZW50XSxcbiAgZXhwb3J0czogW05nNk11bHRpc2VsZWN0Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBOZzZNdWx0aXNlbGVjdE1vZHVsZSB7IH1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBR0EsTUFBTSxJQUFJLEdBQUcsU0FBTSxDQUFDOzs7OztJQTBCaEIsWUFBb0IsRUFBcUI7UUFBckIsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7OzBCQUl0QixjQUFjOzs7NkJBS1gsa0JBQWtCOztvQkFJcEIsRUFBRTs7Ozs7MkJBT0UsRUFBRTs4QkFFQyxFQUFFOzs4QkFJaUIsSUFBSSxZQUFZLEVBQWlCOzt3QkFJdkMsSUFBSSxZQUFZLEVBQWlCOzswQkFJL0IsSUFBSSxZQUFZLEVBQWlCOzRCQU0zQyxFQUFFO3VCQUdiLEVBQUU7dUJBRUYsRUFBRTt5QkFFTyxFQUFFO3VCQUdULEtBQUs7b0JBRVIsS0FBSzsyQkFLTixDQUFDO2lDQWdMb0IsSUFBSTtnQ0FDQSxJQUFJO0tBMU9KOzs7O0lBMkQ1QyxRQUFRO1FBQ0osSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7S0FDL0I7Ozs7O0lBS08sb0JBQW9CO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUMsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxPQUFPLEdBQUMsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxTQUFTLEdBQUMsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxZQUFZLEdBQUMsRUFBRSxDQUFDOztRQUNyQixJQUFJLEdBQUcsR0FBQyxFQUFFLENBQUM7UUFDWCxLQUFJLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUM7WUFDMUIsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDO1NBQ25DOztRQUVELEtBQUksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBQztZQUM3QixJQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBQztnQkFBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQUM7aUJBQzNDO2dCQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7YUFBQztZQUM5QixJQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztnQkFBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2xEOztRQUVELElBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsRUFBQztZQUN6QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFDLElBQUksRUFBQyxhQUFhLEVBQUMsQ0FBQyxDQUFDO1NBQ2hEO2FBQUk7WUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFDLElBQUksRUFBQyxXQUFXLEVBQUMsQ0FBQyxDQUFDO1NBQzlDOztRQUdELEtBQUksSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBQztZQUN4QixJQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFDO2dCQUN2QyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFDLElBQUksRUFBQyxXQUFXLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxDQUFDLENBQUM7YUFDMUQ7aUJBQUk7Z0JBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsQ0FBQyxDQUFDO2FBQ3hEO1NBQ0o7O1FBRUQsS0FBSSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFDO1lBQzNCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQztTQUNoSDs7UUFFRCxLQUFJLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUM7WUFDeEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUUsUUFBUSxFQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztZQUNuRyxLQUFJLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUM7Z0JBQzlCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxFQUFFLEVBQUMsSUFBSSxDQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQzthQUM1RztTQUNKOztRQUVELElBQUksQ0FBQyxXQUFXLEdBQUMsQ0FBQyxDQUFDO1FBQ25CLEtBQUksSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBQztZQUMxQixJQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ2xEOzs7OztJQUdMLFNBQVM7UUFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ3BCLElBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUM7WUFDeEUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNwRCxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1NBQzdCO0tBQ0Y7Ozs7O0lBRU8sZUFBZSxDQUFDLEtBQVk7UUFDaEMsS0FBSSxJQUFJLElBQUksSUFBSSxLQUFLLEVBQUM7WUFFbEIsSUFBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBQztnQkFDNUIsT0FBTyxLQUFLLENBQUM7YUFBQztTQUNyQjtRQUNELE9BQU8sSUFBSSxDQUFDOzs7Ozs7SUFJUixTQUFTLENBQUMsSUFBUTtRQUN0QixJQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFFLElBQUksRUFBQztZQUNyQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzFDO2FBQUk7WUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDOUM7Ozs7OztJQUlHLFNBQVMsQ0FBQyxJQUFRO1FBQ3RCLElBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUUsSUFBSSxFQUFDO1lBQ3ZDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDNUM7YUFBSTtZQUNELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNoRDs7Ozs7O0lBSUcsWUFBWSxDQUFDLElBQVE7UUFDekIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7OztJQUl2QixTQUFTLENBQUMsTUFBTTtRQUNuQixNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDeEIsTUFBTSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxPQUFPLEdBQUMsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxJQUFJLEdBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUM7Ozs7OztJQUk5QyxRQUFRLENBQUMsSUFBSTtRQUNULElBQUksQ0FBQyxPQUFPLEdBQUMsSUFBSSxDQUFDO0tBQ3JCOzs7OztJQUdELFVBQVUsQ0FBQyxJQUFTO1FBQ2hCLElBQUcsSUFBSSxDQUFDLElBQUksSUFBRSxPQUFPLEVBQUM7WUFDbEIsSUFBRyxJQUFJLENBQUMsUUFBUSxJQUFFLElBQUksRUFBQzs7Z0JBRW5CLEtBQUksSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUM7b0JBQzFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtpQkFDdkQ7Z0JBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNoQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDdkM7aUJBQ0c7Z0JBQ0EsS0FBSSxJQUFJLFNBQVMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBQztvQkFDMUMsSUFBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBQzt3QkFDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO3FCQUNoQztpQkFDSjtnQkFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzlCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN2QztTQUNKO2FBQUssSUFBRyxJQUFJLENBQUMsSUFBSSxJQUFFLFNBQVMsRUFBQztZQUMxQixLQUFJLElBQUksU0FBUyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFDO2dCQUMxQyxJQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFDO29CQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQ2hDO2FBQ0o7WUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3ZDO2FBQUssSUFBRyxJQUFJLENBQUMsSUFBSSxJQUFFLFdBQVcsRUFBQztZQUM1QixLQUFJLElBQUksU0FBUyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFDO2dCQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7YUFDdkQ7WUFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3ZDO2FBQ0ksSUFBRyxJQUFJLENBQUMsSUFBSSxJQUFFLE1BQU0sRUFBQztZQUN0QixJQUFHLElBQUksQ0FBQyxPQUFPLEVBQUM7Z0JBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO2dCQUMvQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN2QztpQkFDRztnQkFDQSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDOUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3ZDO1NBQ0o7YUFDSSxJQUFHLElBQUksQ0FBQyxJQUFJLElBQUUsV0FBVyxFQUFDO1lBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3JDLEtBQUksSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBQztnQkFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ3hCO1lBQ0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3ZDO2FBQ0c7WUFDQSxLQUFJLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUM7Z0JBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUNoRDtZQUNELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN2QztRQUdELElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO0tBQy9COzs7O0lBSUQsSUFBSSxLQUFLO1FBQ0wsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0tBQ3BCOzs7Ozs7SUFFRCxJQUFJLEtBQUssQ0FBQyxLQUFLO1FBQ1gsSUFBSSxDQUFDLElBQUksR0FBQyxLQUFLLENBQUM7UUFDaEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ2hDOzs7O0lBRUQsTUFBTTtRQUNGLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0tBQzVCOzs7OztJQUVELFVBQVUsQ0FBQyxLQUFTO1FBQ2hCLElBQUksQ0FBQyxJQUFJLEdBQUMsS0FBSyxDQUFDO0tBQ25COzs7OztJQUVELGdCQUFnQixDQUFDLEVBQU07UUFDbkIsSUFBSSxDQUFDLGdCQUFnQixHQUFDLEVBQUUsQ0FBQztLQUM1Qjs7Ozs7SUFFRCxpQkFBaUIsQ0FBQyxFQUFNO1FBQ3BCLElBQUksQ0FBQyxpQkFBaUIsR0FBQyxFQUFFLENBQUM7S0FDN0I7Ozs7O0lBRzBDLGNBQWMsQ0FBQyxNQUFNO1FBQzVELElBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDO1lBQUMsSUFBSSxDQUFDLE9BQU8sR0FBQyxLQUFLLENBQUM7U0FBQztRQUNuQyxJQUFJLENBQUMsSUFBSSxHQUFDLEtBQUssQ0FBQztLQUVuQjs7O1lBbFNKLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7T0FnQkw7Z0JBQ0wsTUFBTSxFQUFFLENBQUMsaXlCQUFpeUIsQ0FBQztnQkFDM3lCLFNBQVMsRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFDLGlCQUFpQixFQUFDLFdBQVcsRUFBQyx1QkFBdUIsRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLENBQUM7YUFDeEY7Ozs7WUExQjRHLGlCQUFpQjs7O3lCQWdDekgsS0FBSzs0QkFLTCxLQUFLO21CQUlMLEtBQUssU0FBQyxTQUFTOzBCQU9mLEtBQUssU0FBQyxNQUFNOzZCQU1aLE1BQU0sU0FBQyxnQkFBZ0I7dUJBSXZCLE1BQU0sU0FBQyxVQUFVO3lCQUlqQixNQUFNLFNBQUMsWUFBWTs2QkFxT25CLFlBQVksU0FBQyxnQkFBZ0IsRUFBQyxDQUFDLFFBQVEsQ0FBQzs7Ozs7OztBQ25TN0M7OztZQUtDLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsYUFBYTtvQkFDYixXQUFXO2lCQUNaO2dCQUNELFlBQVksRUFBRSxDQUFDLHVCQUF1QixDQUFDO2dCQUN2QyxPQUFPLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQzthQUNuQzs7Ozs7Ozs7Ozs7Ozs7OyJ9