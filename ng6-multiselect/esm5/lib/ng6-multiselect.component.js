/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, EventEmitter, Output, HostListener, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
/** @type {?} */
var noop = function () { };
var ɵ0 = noop;
var Ng6MultiselectComponent = /** @class */ (function () {
    function Ng6MultiselectComponent(cd) {
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
    Ng6MultiselectComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.generateDisplayItems();
    };
    /**
     * Generates the items to show in the multiselect
     * @return {?}
     */
    Ng6MultiselectComponent.prototype.generateDisplayItems = /**
     * Generates the items to show in the multiselect
     * @return {?}
     */
    function () {
        this.pgroups = {};
        this.sgroups = {};
        this.ungrouped = [];
        this.displayItems = [];
        /** @type {?} */
        var all = [];
        try {
            for (var _a = tslib_1.__values(this.displayData), _b = _a.next(); !_b.done; _b = _a.next()) {
                var i = _b.value;
                all.push({ type: "item", id: i.id });
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        try {
            //Detects all the primary and secondary groups
            for (var _d = tslib_1.__values(this.displayData), _e = _d.next(); !_e.done; _e = _d.next()) {
                var item = _e.value;
                if (item["primaryGroup"]) {
                    this.addPGroup(item);
                }
                else {
                    this.addUngrouped(item);
                }
                if (item["secondaryGroup"])
                    this.addSGroup(item);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_f = _d.return)) _f.call(_d);
            }
            finally { if (e_2) throw e_2.error; }
        }
        //Adds the select all option
        if (this.isGroupSelected(all)) {
            this.displayItems.push({ type: "deselectAll" });
        }
        else {
            this.displayItems.push({ type: "selectAll" });
        }
        //Adds the select/deselect secondary group options
        for (var key in this.sgroups) {
            if (this.isGroupSelected(this.sgroups[key])) {
                this.displayItems.push({ type: "deselectS", "group": key });
            }
            else {
                this.displayItems.push({ type: "selectS", "group": key });
            }
        }
        try {
            //Adds the ungrouped items
            for (var _g = tslib_1.__values(this.ungrouped), _h = _g.next(); !_h.done; _h = _g.next()) {
                var item = _h.value;
                this.displayItems.push({ type: "item", "id": item.id, "name": item.itemName, checked: this.data.includes(item.id) });
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_h && !_h.done && (_j = _g.return)) _j.call(_g);
            }
            finally { if (e_3) throw e_3.error; }
        }
        //Lastly, adds the groups with items in them
        for (var key in this.pgroups) {
            this.displayItems.push({ type: "gname", title: key, selected: this.isGroupSelected(this.pgroups[key]) });
            try {
                for (var _k = tslib_1.__values(this.pgroups[key]), _l = _k.next(); !_l.done; _l = _k.next()) {
                    var item = _l.value;
                    this.displayItems.push({ type: "item", id: item.id, name: item.itemName, checked: this.data.includes(item.id) });
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_l && !_l.done && (_m = _k.return)) _m.call(_k);
                }
                finally { if (e_4) throw e_4.error; }
            }
        }
        //generate the number of display items selected
        this.numSelected = 0;
        try {
            for (var _o = tslib_1.__values(this.displayData), _p = _o.next(); !_p.done; _p = _o.next()) {
                var i = _p.value;
                if (this.data.includes(i.id))
                    this.numSelected++;
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_p && !_p.done && (_q = _o.return)) _q.call(_o);
            }
            finally { if (e_5) throw e_5.error; }
        }
        var e_1, _c, e_2, _f, e_3, _j, e_4, _m, e_5, _q;
    };
    /**
     * @return {?}
     */
    Ng6MultiselectComponent.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        console.log("check");
        if (JSON.stringify(this.displayData) !== JSON.stringify(this.displayDataOld)) {
            Object.assign(this.displayDataOld, this.displayData);
            this.cd.markForCheck();
            this.generateDisplayItems();
        }
    };
    /**
     * @param {?} items
     * @return {?}
     */
    Ng6MultiselectComponent.prototype.isGroupSelected = /**
     * @param {?} items
     * @return {?}
     */
    function (items) {
        try {
            for (var items_1 = tslib_1.__values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
                var item = items_1_1.value;
                if (!this.data.includes(item.id)) {
                    return false;
                }
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (items_1_1 && !items_1_1.done && (_a = items_1.return)) _a.call(items_1);
            }
            finally { if (e_6) throw e_6.error; }
        }
        return true;
        var e_6, _a;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    Ng6MultiselectComponent.prototype.addPGroup = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (this.pgroups[item.primaryGroup] == null) {
            this.pgroups[item.primaryGroup] = [item];
        }
        else {
            this.pgroups[item.primaryGroup].push(item);
        }
    };
    /**
     * @param {?} item
     * @return {?}
     */
    Ng6MultiselectComponent.prototype.addSGroup = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (this.sgroups[item.secondaryGroup] == null) {
            this.sgroups[item.secondaryGroup] = [item];
        }
        else {
            this.sgroups[item.secondaryGroup].push(item);
        }
    };
    /**
     * @param {?} item
     * @return {?}
     */
    Ng6MultiselectComponent.prototype.addUngrouped = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this.ungrouped.push(item);
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    Ng6MultiselectComponent.prototype.onClicked = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        this.focused = true;
        this.open = !this.open;
        this.hovered = this.displayItems[0] || null;
    };
    //Sets the current hovered item(used instead of css to keep the hover persistant)
    /**
     * @param {?} item
     * @return {?}
     */
    Ng6MultiselectComponent.prototype.setHover = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this.hovered = item;
    };
    //Selects the item in the data
    /**
     * @param {?} item
     * @return {?}
     */
    Ng6MultiselectComponent.prototype.selectItem = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (item.type == 'gname') {
            if (item.selected == true) {
                try {
                    //Loop through the items in the group
                    for (var _a = tslib_1.__values(this.pgroups[item.title]), _b = _a.next(); !_b.done; _b = _a.next()) {
                        var groupItem = _b.value;
                        this.data.splice(this.data.indexOf(groupItem.id), 1);
                    }
                }
                catch (e_7_1) { e_7 = { error: e_7_1 }; }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                    }
                    finally { if (e_7) throw e_7.error; }
                }
                this.onDeselect.emit(this.data);
                this.onSelectChange.emit(this.data);
            }
            else {
                try {
                    for (var _d = tslib_1.__values(this.pgroups[item.title]), _e = _d.next(); !_e.done; _e = _d.next()) {
                        var groupItem = _e.value;
                        if (!this.data.includes(groupItem.id)) {
                            this.data.push(groupItem.id);
                        }
                    }
                }
                catch (e_8_1) { e_8 = { error: e_8_1 }; }
                finally {
                    try {
                        if (_e && !_e.done && (_f = _d.return)) _f.call(_d);
                    }
                    finally { if (e_8) throw e_8.error; }
                }
                this.onSelect.emit(this.data);
                this.onSelectChange.emit(this.data);
            }
        }
        else if (item.type == 'selectS') {
            try {
                for (var _g = tslib_1.__values(this.sgroups[item.group]), _h = _g.next(); !_h.done; _h = _g.next()) {
                    var groupItem = _h.value;
                    if (!this.data.includes(groupItem.id)) {
                        this.data.push(groupItem.id);
                    }
                }
            }
            catch (e_9_1) { e_9 = { error: e_9_1 }; }
            finally {
                try {
                    if (_h && !_h.done && (_j = _g.return)) _j.call(_g);
                }
                finally { if (e_9) throw e_9.error; }
            }
            this.onSelect.emit(this.data);
            this.onSelectChange.emit(this.data);
        }
        else if (item.type == 'deselectS') {
            try {
                for (var _k = tslib_1.__values(this.sgroups[item.group]), _l = _k.next(); !_l.done; _l = _k.next()) {
                    var groupItem = _l.value;
                    this.data.splice(this.data.indexOf(groupItem.id), 1);
                }
            }
            catch (e_10_1) { e_10 = { error: e_10_1 }; }
            finally {
                try {
                    if (_l && !_l.done && (_m = _k.return)) _m.call(_k);
                }
                finally { if (e_10) throw e_10.error; }
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
            try {
                for (var _o = tslib_1.__values(this.displayData), _p = _o.next(); !_p.done; _p = _o.next()) {
                    var i = _p.value;
                    this.data.push(i.id);
                }
            }
            catch (e_11_1) { e_11 = { error: e_11_1 }; }
            finally {
                try {
                    if (_p && !_p.done && (_q = _o.return)) _q.call(_o);
                }
                finally { if (e_11) throw e_11.error; }
            }
            this.onSelectChange.emit(this.data);
        }
        else {
            try {
                for (var _r = tslib_1.__values(this.displayData), _s = _r.next(); !_s.done; _s = _r.next()) {
                    var i = _s.value;
                    this.data.splice(this.data.indexOf(i.id), 1);
                }
            }
            catch (e_12_1) { e_12 = { error: e_12_1 }; }
            finally {
                try {
                    if (_s && !_s.done && (_t = _r.return)) _t.call(_r);
                }
                finally { if (e_12) throw e_12.error; }
            }
            this.onSelectChange.emit(this.data);
        }
        this.generateDisplayItems();
        var e_7, _c, e_8, _f, e_9, _j, e_10, _m, e_11, _q, e_12, _t;
    };
    Object.defineProperty(Ng6MultiselectComponent.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this.data;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.data = value;
            this.onChangeCallback(value);
        },
        enumerable: true,
        configurable: true
    });
    ;
    /**
     * @return {?}
     */
    Ng6MultiselectComponent.prototype.onBlur = /**
     * @return {?}
     */
    function () {
        this.onTouchedCallback();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    Ng6MultiselectComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.data = value;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    Ng6MultiselectComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    Ng6MultiselectComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouchedCallback = fn;
    };
    //Detects when the mouse clicks outside of this component
    /**
     * @param {?} $event
     * @return {?}
     */
    Ng6MultiselectComponent.prototype.clickedOutside = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        if (!this.open) {
            this.focused = false;
        }
        this.open = false;
    };
    Ng6MultiselectComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ng6-multiselect',
                    template: "<div onselectstart=\"return false\" class=\"multiselectElement\" (click)=\"onClicked($event)\" [ngClass]=\"{'multiselectFocus':this.focused}\">\n    <span style=\"margin-left:4px;\">\n        <span *ngIf=\"numSelected==0\">{{this.emptyTitle}}</span>\n        <span *ngIf=\"numSelected>0\">{{numSelected +\" \"+ this.selectedTitle}}</span>\n    </span>\n    <span class=\"rightArrow\">&#x25bc;</span>\n<div *ngIf=\"this.open\" (click)=\"$event.preventDefault();$event.stopPropagation();\" class=\"dropdown\">\n    <div class=\"multiselectRow\" (mouseenter)=\"setHover(item)\" (click)=\"selectItem(item)\" [ngClass]=\"{'hoverHighlight':hovered==item}\" *ngFor=\"let item of displayItems\">\n        <span *ngIf=\"item.type=='selectAll'\"><input type=\"checkbox\"/>Select All</span>\n        <span *ngIf=\"item.type=='deselectAll'\"><input type=\"checkbox\" checked/>UnSelect All</span>\n        <span *ngIf=\"item.type=='selectS'\"><input type=\"checkbox\"/>Select All {{item.group}}</span>\n        <span *ngIf=\"item.type=='deselectS'\"><input type=\"checkbox\" checked/>UnSelect All {{item.group}}</span>\n        <span *ngIf=\"item.type=='gname'\"><input [checked]=\"item.selected==true\" type=\"checkbox\"/><b>{{item.title}}</b></span>\n        <span *ngIf=\"item.type=='item'\" style=\"padding-left:20px\"><input [checked]=\"item.checked==true\" type=\"checkbox\"/>{{item.name}}</span>\n    </div>\n</div>\n</div>",
                    styles: [".multiselectElement{width:100%;height:20px;max-height:34px;border:1px solid #ccc;border-radius:4px;display:block;padding:6px 0;min-width:60px;font-size:14px;line-height:1.42857143;color:#555;cursor:default;transition:border-color .15s ease-in-out;background-color:#fff}.multiselectFocus{box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);outline:0;border:1px solid #66afe9}.dropdown{position:relative;width:calc(100% + 2px);top:7px;left:-1px;z-index:2;box-shadow:0 1px 5px #959595;border:1px solid #ccc;background-color:#fff;min-height:20px;max-height:400px;overflow-y:auto}.rightArrow{color:#555;padding-right:0;font-size:10px;margin:4px 3px auto auto;float:right}.multiselectRow{padding-left:4px}.hoverHighlight{background-color:#cce8ff}input[type=checkbox]{margin-right:5px}"],
                    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: Ng6MultiselectComponent, multi: true }]
                },] },
    ];
    /** @nocollapse */
    Ng6MultiselectComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
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
    return Ng6MultiselectComponent;
}());
export { Ng6MultiselectComponent };
if (false) {
    /** @type {?} */
    Ng6MultiselectComponent.prototype.emptyTitle;
    /** @type {?} */
    Ng6MultiselectComponent.prototype.selectedTitle;
    /** @type {?} */
    Ng6MultiselectComponent.prototype.data;
    /** @type {?} */
    Ng6MultiselectComponent.prototype.displayData;
    /** @type {?} */
    Ng6MultiselectComponent.prototype.displayDataOld;
    /** @type {?} */
    Ng6MultiselectComponent.prototype.onSelectChange;
    /** @type {?} */
    Ng6MultiselectComponent.prototype.onSelect;
    /** @type {?} */
    Ng6MultiselectComponent.prototype.onDeselect;
    /** @type {?} */
    Ng6MultiselectComponent.prototype.displayItems;
    /** @type {?} */
    Ng6MultiselectComponent.prototype.pgroups;
    /** @type {?} */
    Ng6MultiselectComponent.prototype.sgroups;
    /** @type {?} */
    Ng6MultiselectComponent.prototype.ungrouped;
    /** @type {?} */
    Ng6MultiselectComponent.prototype.focused;
    /** @type {?} */
    Ng6MultiselectComponent.prototype.open;
    /** @type {?} */
    Ng6MultiselectComponent.prototype.hovered;
    /** @type {?} */
    Ng6MultiselectComponent.prototype.numSelected;
    /** @type {?} */
    Ng6MultiselectComponent.prototype.onTouchedCallback;
    /** @type {?} */
    Ng6MultiselectComponent.prototype.onChangeCallback;
    /** @type {?} */
    Ng6MultiselectComponent.prototype.cd;
}
export { ɵ0 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmc2LW11bHRpc2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nNi1tdWx0aXNlbGVjdC8iLCJzb3VyY2VzIjpbImxpYi9uZzYtbXVsdGlzZWxlY3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBVSxLQUFLLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQXlDLGlCQUFpQixFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQzlKLE9BQU8sRUFBRSxpQkFBaUIsRUFBd0IsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFFekUsSUFBTSxJQUFJLEdBQUcsZUFBTSxDQUFDOzs7SUEwQmhCLGlDQUFvQixFQUFxQjtRQUFyQixPQUFFLEdBQUYsRUFBRSxDQUFtQjs7MEJBSXRCLGNBQWM7Ozs2QkFLWCxrQkFBa0I7O29CQUlwQixFQUFFOzs7OzsyQkFPRSxFQUFFOzhCQUVDLEVBQUU7OzhCQUlpQixJQUFJLFlBQVksRUFBaUI7O3dCQUl2QyxJQUFJLFlBQVksRUFBaUI7OzBCQUkvQixJQUFJLFlBQVksRUFBaUI7NEJBTTNDLEVBQUU7dUJBR2IsRUFBRTt1QkFFRixFQUFFO3lCQUVPLEVBQUU7dUJBR1QsS0FBSztvQkFFUixLQUFLOzJCQUtOLENBQUM7aUNBZ0xvQixJQUFJO2dDQUNBLElBQUk7S0ExT0o7Ozs7SUEyRDVDLDBDQUFROzs7SUFBUjtRQUNJLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO0tBQy9COzs7OztJQUtPLHNEQUFvQjs7Ozs7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBQyxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLE9BQU8sR0FBQyxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLFNBQVMsR0FBQyxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLFlBQVksR0FBQyxFQUFFLENBQUM7O1FBQ3JCLElBQUksR0FBRyxHQUFDLEVBQUUsQ0FBQzs7WUFDWCxHQUFHLENB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QUMsZ0JBQWdCLEVBQUMsQ0FBQyxRQUFRLENBQUM7O2tDQW5TN0M7O1NBMkJhLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXQsIElucHV0LCBFdmVudEVtaXR0ZXIsIE91dHB1dCwgSG9zdExpc3RlbmVyLE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcywgU2ltcGxlQ2hhbmdlLCBDaGFuZ2VEZXRlY3RvclJlZiwgRG9DaGVja30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmNvbnN0IG5vb3AgPSAoKT0+e307XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nNi1tdWx0aXNlbGVjdCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBvbnNlbGVjdHN0YXJ0PVwicmV0dXJuIGZhbHNlXCIgY2xhc3M9XCJtdWx0aXNlbGVjdEVsZW1lbnRcIiAoY2xpY2spPVwib25DbGlja2VkKCRldmVudClcIiBbbmdDbGFzc109XCJ7J211bHRpc2VsZWN0Rm9jdXMnOnRoaXMuZm9jdXNlZH1cIj5cbiAgICA8c3BhbiBzdHlsZT1cIm1hcmdpbi1sZWZ0OjRweDtcIj5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJudW1TZWxlY3RlZD09MFwiPnt7dGhpcy5lbXB0eVRpdGxlfX08L3NwYW4+XG4gICAgICAgIDxzcGFuICpuZ0lmPVwibnVtU2VsZWN0ZWQ+MFwiPnt7bnVtU2VsZWN0ZWQgK1wiIFwiKyB0aGlzLnNlbGVjdGVkVGl0bGV9fTwvc3Bhbj5cbiAgICA8L3NwYW4+XG4gICAgPHNwYW4gY2xhc3M9XCJyaWdodEFycm93XCI+JiN4MjViYzs8L3NwYW4+XG48ZGl2ICpuZ0lmPVwidGhpcy5vcGVuXCIgKGNsaWNrKT1cIiRldmVudC5wcmV2ZW50RGVmYXVsdCgpOyRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcIiBjbGFzcz1cImRyb3Bkb3duXCI+XG4gICAgPGRpdiBjbGFzcz1cIm11bHRpc2VsZWN0Um93XCIgKG1vdXNlZW50ZXIpPVwic2V0SG92ZXIoaXRlbSlcIiAoY2xpY2spPVwic2VsZWN0SXRlbShpdGVtKVwiIFtuZ0NsYXNzXT1cInsnaG92ZXJIaWdobGlnaHQnOmhvdmVyZWQ9PWl0ZW19XCIgKm5nRm9yPVwibGV0IGl0ZW0gb2YgZGlzcGxheUl0ZW1zXCI+XG4gICAgICAgIDxzcGFuICpuZ0lmPVwiaXRlbS50eXBlPT0nc2VsZWN0QWxsJ1wiPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIi8+U2VsZWN0IEFsbDwvc3Bhbj5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJpdGVtLnR5cGU9PSdkZXNlbGVjdEFsbCdcIj48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2hlY2tlZC8+VW5TZWxlY3QgQWxsPC9zcGFuPlxuICAgICAgICA8c3BhbiAqbmdJZj1cIml0ZW0udHlwZT09J3NlbGVjdFMnXCI+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiLz5TZWxlY3QgQWxsIHt7aXRlbS5ncm91cH19PC9zcGFuPlxuICAgICAgICA8c3BhbiAqbmdJZj1cIml0ZW0udHlwZT09J2Rlc2VsZWN0UydcIj48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2hlY2tlZC8+VW5TZWxlY3QgQWxsIHt7aXRlbS5ncm91cH19PC9zcGFuPlxuICAgICAgICA8c3BhbiAqbmdJZj1cIml0ZW0udHlwZT09J2duYW1lJ1wiPjxpbnB1dCBbY2hlY2tlZF09XCJpdGVtLnNlbGVjdGVkPT10cnVlXCIgdHlwZT1cImNoZWNrYm94XCIvPjxiPnt7aXRlbS50aXRsZX19PC9iPjwvc3Bhbj5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJpdGVtLnR5cGU9PSdpdGVtJ1wiIHN0eWxlPVwicGFkZGluZy1sZWZ0OjIwcHhcIj48aW5wdXQgW2NoZWNrZWRdPVwiaXRlbS5jaGVja2VkPT10cnVlXCIgdHlwZT1cImNoZWNrYm94XCIvPnt7aXRlbS5uYW1lfX08L3NwYW4+XG4gICAgPC9kaXY+XG48L2Rpdj5cbjwvZGl2PmAsXG4gIHN0eWxlczogW2AubXVsdGlzZWxlY3RFbGVtZW50e3dpZHRoOjEwMCU7aGVpZ2h0OjIwcHg7bWF4LWhlaWdodDozNHB4O2JvcmRlcjoxcHggc29saWQgI2NjYztib3JkZXItcmFkaXVzOjRweDtkaXNwbGF5OmJsb2NrO3BhZGRpbmc6NnB4IDA7bWluLXdpZHRoOjYwcHg7Zm9udC1zaXplOjE0cHg7bGluZS1oZWlnaHQ6MS40Mjg1NzE0Mztjb2xvcjojNTU1O2N1cnNvcjpkZWZhdWx0O3RyYW5zaXRpb246Ym9yZGVyLWNvbG9yIC4xNXMgZWFzZS1pbi1vdXQ7YmFja2dyb3VuZC1jb2xvcjojZmZmfS5tdWx0aXNlbGVjdEZvY3Vze2JveC1zaGFkb3c6aW5zZXQgMCAxcHggMXB4IHJnYmEoMCwwLDAsLjA3NSksMCAwIDhweCByZ2JhKDEwMiwxNzUsMjMzLC42KTtvdXRsaW5lOjA7Ym9yZGVyOjFweCBzb2xpZCAjNjZhZmU5fS5kcm9wZG93bntwb3NpdGlvbjpyZWxhdGl2ZTt3aWR0aDpjYWxjKDEwMCUgKyAycHgpO3RvcDo3cHg7bGVmdDotMXB4O3otaW5kZXg6Mjtib3gtc2hhZG93OjAgMXB4IDVweCAjOTU5NTk1O2JvcmRlcjoxcHggc29saWQgI2NjYztiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7bWluLWhlaWdodDoyMHB4O21heC1oZWlnaHQ6NDAwcHg7b3ZlcmZsb3cteTphdXRvfS5yaWdodEFycm93e2NvbG9yOiM1NTU7cGFkZGluZy1yaWdodDowO2ZvbnQtc2l6ZToxMHB4O21hcmdpbjo0cHggM3B4IGF1dG8gYXV0bztmbG9hdDpyaWdodH0ubXVsdGlzZWxlY3RSb3d7cGFkZGluZy1sZWZ0OjRweH0uaG92ZXJIaWdobGlnaHR7YmFja2dyb3VuZC1jb2xvcjojY2NlOGZmfWlucHV0W3R5cGU9Y2hlY2tib3hde21hcmdpbi1yaWdodDo1cHh9YF0sXG4gIHByb3ZpZGVyczogW3twcm92aWRlOk5HX1ZBTFVFX0FDQ0VTU09SLHVzZUV4aXN0aW5nOk5nNk11bHRpc2VsZWN0Q29tcG9uZW50LG11bHRpOnRydWV9XVxufSlcbmV4cG9ydCBjbGFzcyBOZzZNdWx0aXNlbGVjdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgRG9DaGVjaywgQ29udHJvbFZhbHVlQWNjZXNzb3J7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZil7fVxuXG4gICAgLy9UaGUgdGl0bGUgd2hlbiB0aGUgbXVsdGlzZWxlY3QgaXMgZW1wdHlcbiAgICBASW5wdXQoKVxuICAgIGVtcHR5VGl0bGU6IHN0cmluZz1cIlNlbGVjdCBJdGVtc1wiO1xuICAgIFxuICAgIC8vVGhlIHRpdGxlIHdoZW4gdGhlIG11bHRpc2VsZWN0IGhhcyBpdGVtcy4gVGhlIGRpc3BsYXllZCB2YWx1ZSB3aWxsIGJlOlxuICAgIC8vbnVtU2VsZWN0ZWQrc2VsZWN0ZWRUaXRsZVxuICAgIEBJbnB1dCgpXG4gICAgc2VsZWN0ZWRUaXRsZTogc3RyaW5nPVwiSXRlbShzKSBTZWxlY3RlZFwiO1xuXG4gICAgLy9UaGUgYmluZGluZyBmb3IgdGhlIHNlbGVjdGVkIGRhdGEuIENvbnRhaW5zIGFuIGFycmF5IG9mIHRoZSBzZWxlY3RlZCBpZCdzXG4gICAgQElucHV0KCduZ01vZGVsJylcbiAgICBkYXRhOiBBcnJheTxzdHJpbmc+PVtdO1xuXG4gICAgLy9UaGUgZGF0YSB0byBiZSBkaXNwbGF5ZWQgZm9yIHNlbGVjdGlvbi4gSW4gdGhlIGZvcm1hdCBvZjpcbiAgICAvL1t7XCJpZFwiOlwiaWRUb1Nob3dJbkRhdGFcIixcIml0ZW1OYW1lXCI6XCJuYW1lVG9EaXNwbGF5XCIsXCJwcmltYXJ5R3JvdXBcIjpcImdyb3VwVGhpc0JlbG9uZ3NUb1wiLFwic2Vjb25kYXJ5R3JvdXBcIjpcImFTZWNvbmRhcnlHcm91cEZvclNlbGVjdGlvblwifV1cbiAgICAvL05vdGUgdGhhdCB3aGVuIGdyb3VwcyBhcmUgcHV0IGluLCB0aGUgc2VsZWN0IHdpbGwgZ2VuZXJhdGUgYSBcIlNlbGVjdCBhbGwgJGdyb3VwbmFtZVwiIFxuICAgIC8vYW5kIHRoZSBjb3JyZXNwb25kaW5nIGRlc2VsZWN0IGF0IHRoZSB0b3AsIGFzIHdlbGwgYXMgcHV0IHRoZSBpdGVtcyBpbnRvIGdyb3VwIGNhdGVnb3JpZXNcbiAgICBASW5wdXQoJ2RhdGEnKVxuICAgIGRpc3BsYXlEYXRhOiBBcnJheTxhbnk+PVtdO1xuXG4gICAgZGlzcGxheURhdGFPbGQ6IEFycmF5PGFueT49W107XG5cbiAgICAvL1RyaWdnZXJlZCBvbiBhbnkgaXRlbSBnZXR0aW5nIHNlbGVjdGVkIG9yIHVuc2VsZWN0ZWRcbiAgICBAT3V0cHV0KCdvblNlbGVjdENoYW5nZScpXG4gICAgb25TZWxlY3RDaGFuZ2U6IEV2ZW50RW1pdHRlcjxBcnJheTxzdHJpbmc+PiA9IG5ldyBFdmVudEVtaXR0ZXI8QXJyYXk8c3RyaW5nPj4oKTtcblxuICAgIC8vVHJpZ2dlcmVkIG9uIGFuIGl0ZW0gZ2V0dGluZyBzZWxlY3RlZFxuICAgIEBPdXRwdXQoJ29uU2VsZWN0JylcbiAgICBvblNlbGVjdDogRXZlbnRFbWl0dGVyPEFycmF5PHN0cmluZz4+ID0gbmV3IEV2ZW50RW1pdHRlcjxBcnJheTxzdHJpbmc+PigpO1xuXG4gICAgLy9UcmlnZ2VyZWQgb24gYSBpdGVtIGdldHRpbmcgdW5zZWxlY3RlZFxuICAgIEBPdXRwdXQoJ29uRGVzZWxlY3QnKVxuICAgIG9uRGVzZWxlY3Q6IEV2ZW50RW1pdHRlcjxBcnJheTxzdHJpbmc+PiA9IG5ldyBFdmVudEVtaXR0ZXI8QXJyYXk8c3RyaW5nPj4oKTtcblxuXG4gICAgLy9JbnRlcm5hbCB2YXJpYWJsZXMgdG8gYmUgbW9kaWZpZWQgdG8gaW5mbHVlbmNlIHRoZSB2aWV3XG4gICAgXG4gICAgLy9UaGUgbGlzdCBvZiBpdGVtcyB0byBzaG93IGluIHRoZSBzZWxlY3RcbiAgICBwdWJsaWMgZGlzcGxheUl0ZW1zOiBBcnJheTxhbnk+PVtdO1xuXG4gICAgLy9QcmltYXJ5IGdyb3VwcyBhbmQgY29udGVudHNcbiAgICBwcml2YXRlIHBncm91cHM6IGFueT17fTtcbiAgICAvL1NlY29uZGFyeSBncm91cHMgYW5kIGNvbnRlbnRzXG4gICAgcHJpdmF0ZSBzZ3JvdXBzOiBhbnk9e307XG4gICAgLy9Vbmdyb3VwZWQgaXRlbXNcbiAgICBwcml2YXRlIHVuZ3JvdXBlZDogQXJyYXk8YW55Pj1bXTtcblxuICAgIC8vaWYgdGhlIGRpdiBpcyBmb2N1c2VkXG4gICAgcHVibGljIGZvY3VzZWQ6Ym9vbGVhbj1mYWxzZTtcbiAgICAvL2lmIHRoZSBkaXYgaXMgb3BlblxuICAgIHB1YmxpYyBvcGVuOmJvb2xlYW49ZmFsc2U7XG4gICAgLy90aGUgY3VycmVudGx5IGhvdmVyZWQgaXRlbVxuICAgIHB1YmxpYyBob3ZlcmVkOiBhbnk7XG5cbiAgICAvL1RoZSBudW1iZXIgZnJvbSB0aGUgbGlzdCB0aGF0IGFyZSBzZWxlY3RlZChoYXMgdG8gYmUgY2FsY3VsYXRlZCBzaW5jZSBkYXRhIGNhbiBiZSBzaGFyZWQgYmV0d2VlbiBtdWx0aXNlbGVjdHMpXG4gICAgcHVibGljIG51bVNlbGVjdGVkPTA7XG5cbiAgICBuZ09uSW5pdCgpe1xuICAgICAgICB0aGlzLmdlbmVyYXRlRGlzcGxheUl0ZW1zKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIHRoZSBpdGVtcyB0byBzaG93IGluIHRoZSBtdWx0aXNlbGVjdFxuICAgICAqL1xuICAgIHByaXZhdGUgZ2VuZXJhdGVEaXNwbGF5SXRlbXMoKTp2b2lke1xuICAgICAgICB0aGlzLnBncm91cHM9e307XG4gICAgICAgIHRoaXMuc2dyb3Vwcz17fTtcbiAgICAgICAgdGhpcy51bmdyb3VwZWQ9W107XG4gICAgICAgIHRoaXMuZGlzcGxheUl0ZW1zPVtdO1xuICAgICAgICBsZXQgYWxsPVtdO1xuICAgICAgICBmb3IobGV0IGkgb2YgdGhpcy5kaXNwbGF5RGF0YSl7XG4gICAgICAgICAgICBhbGwucHVzaCh7dHlwZTpcIml0ZW1cIixpZDppLmlkfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy9EZXRlY3RzIGFsbCB0aGUgcHJpbWFyeSBhbmQgc2Vjb25kYXJ5IGdyb3Vwc1xuICAgICAgICBmb3IobGV0IGl0ZW0gb2YgdGhpcy5kaXNwbGF5RGF0YSl7XG4gICAgICAgICAgICBpZihpdGVtW1wicHJpbWFyeUdyb3VwXCJdKXt0aGlzLmFkZFBHcm91cChpdGVtKTt9XG4gICAgICAgICAgICBlbHNle3RoaXMuYWRkVW5ncm91cGVkKGl0ZW0pO31cbiAgICAgICAgICAgIGlmKGl0ZW1bXCJzZWNvbmRhcnlHcm91cFwiXSl0aGlzLmFkZFNHcm91cChpdGVtKTtcbiAgICAgICAgfVxuICAgICAgICAvL0FkZHMgdGhlIHNlbGVjdCBhbGwgb3B0aW9uXG4gICAgICAgIGlmKHRoaXMuaXNHcm91cFNlbGVjdGVkKGFsbCkpe1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5SXRlbXMucHVzaCh7dHlwZTpcImRlc2VsZWN0QWxsXCJ9KTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlJdGVtcy5wdXNoKHt0eXBlOlwic2VsZWN0QWxsXCJ9KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy9BZGRzIHRoZSBzZWxlY3QvZGVzZWxlY3Qgc2Vjb25kYXJ5IGdyb3VwIG9wdGlvbnNcbiAgICAgICAgZm9yKGxldCBrZXkgaW4gdGhpcy5zZ3JvdXBzKXtcbiAgICAgICAgICAgIGlmKHRoaXMuaXNHcm91cFNlbGVjdGVkKHRoaXMuc2dyb3Vwc1trZXldKSl7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5SXRlbXMucHVzaCh7dHlwZTpcImRlc2VsZWN0U1wiLFwiZ3JvdXBcIjprZXl9KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheUl0ZW1zLnB1c2goe3R5cGU6XCJzZWxlY3RTXCIsXCJncm91cFwiOmtleX0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vQWRkcyB0aGUgdW5ncm91cGVkIGl0ZW1zXG4gICAgICAgIGZvcihsZXQgaXRlbSBvZiB0aGlzLnVuZ3JvdXBlZCl7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlJdGVtcy5wdXNoKHt0eXBlOlwiaXRlbVwiLFwiaWRcIjppdGVtLmlkLFwibmFtZVwiOml0ZW0uaXRlbU5hbWUsIGNoZWNrZWQ6dGhpcy5kYXRhLmluY2x1ZGVzKGl0ZW0uaWQpfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy9MYXN0bHksIGFkZHMgdGhlIGdyb3VwcyB3aXRoIGl0ZW1zIGluIHRoZW1cbiAgICAgICAgZm9yKGxldCBrZXkgaW4gdGhpcy5wZ3JvdXBzKXtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheUl0ZW1zLnB1c2goe3R5cGU6XCJnbmFtZVwiLHRpdGxlOmtleSwgc2VsZWN0ZWQ6dGhpcy5pc0dyb3VwU2VsZWN0ZWQodGhpcy5wZ3JvdXBzW2tleV0pfSk7XG4gICAgICAgICAgICBmb3IobGV0IGl0ZW0gb2YgdGhpcy5wZ3JvdXBzW2tleV0pe1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheUl0ZW1zLnB1c2goe3R5cGU6XCJpdGVtXCIsaWQ6aXRlbS5pZCxuYW1lOml0ZW0uaXRlbU5hbWUsIGNoZWNrZWQ6dGhpcy5kYXRhLmluY2x1ZGVzKGl0ZW0uaWQpfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy9nZW5lcmF0ZSB0aGUgbnVtYmVyIG9mIGRpc3BsYXkgaXRlbXMgc2VsZWN0ZWRcbiAgICAgICAgdGhpcy5udW1TZWxlY3RlZD0wO1xuICAgICAgICBmb3IobGV0IGkgb2YgdGhpcy5kaXNwbGF5RGF0YSl7XG4gICAgICAgICAgICBpZih0aGlzLmRhdGEuaW5jbHVkZXMoaS5pZCkpdGhpcy5udW1TZWxlY3RlZCsrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdEb0NoZWNrKCl7XG4gICAgICBjb25zb2xlLmxvZyhcImNoZWNrXCIpXG4gICAgICBpZihKU09OLnN0cmluZ2lmeSh0aGlzLmRpc3BsYXlEYXRhKSE9PUpTT04uc3RyaW5naWZ5KHRoaXMuZGlzcGxheURhdGFPbGQpKXtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLmRpc3BsYXlEYXRhT2xkLHRoaXMuZGlzcGxheURhdGEpO1xuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB0aGlzLmdlbmVyYXRlRGlzcGxheUl0ZW1zKCk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vTG9vcHMgdGhyb3VnaCB0aGUgYXJyYXkgb2YgaXRlbSBpZHMgYW5kIGNoZWNrcyBpZiBhbGwgb2YgdGhlbSBhcmUgc2VsZWN0ZWQuIElmIHNvLCByZXR1cm5zIHRydWUsIG90aGVyd2lzZSBmYWxzZVxuICAgIHByaXZhdGUgaXNHcm91cFNlbGVjdGVkKGl0ZW1zOiBhbnlbXSk6IGJvb2xlYW57XG4gICAgICAgIGZvcihsZXQgaXRlbSBvZiBpdGVtcyl7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKCF0aGlzLmRhdGEuaW5jbHVkZXMoaXRlbS5pZCkpe1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTt9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy9BZGRzIGFuIGl0ZW0gdG8gdGhlIHByaW1hcnkgZ3JvdXAgbGlzdCBhbmQgYWRkcyBpdHMgZ3JvdXAgaWYgaXQgZG9zbid0IGV4aXN0XG4gICAgcHJpdmF0ZSBhZGRQR3JvdXAoaXRlbTphbnkpOnZvaWR7XG4gICAgICAgIGlmKHRoaXMucGdyb3Vwc1tpdGVtLnByaW1hcnlHcm91cF09PW51bGwpe1xuICAgICAgICAgICAgdGhpcy5wZ3JvdXBzW2l0ZW0ucHJpbWFyeUdyb3VwXT1baXRlbV07XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5wZ3JvdXBzW2l0ZW0ucHJpbWFyeUdyb3VwXS5wdXNoKGl0ZW0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy9BZGRzIGFuIGl0ZW0gdG8gdGhlIHNlY29uZGFyeSBncm91cCBsaXN0IGFuZCBhZGRzIGl0cyBncm91cCBpZiBpdCBkb3NuJ3QgZXhpc3RcbiAgICBwcml2YXRlIGFkZFNHcm91cChpdGVtOmFueSk6dm9pZHtcbiAgICAgICAgaWYodGhpcy5zZ3JvdXBzW2l0ZW0uc2Vjb25kYXJ5R3JvdXBdPT1udWxsKXtcbiAgICAgICAgICAgIHRoaXMuc2dyb3Vwc1tpdGVtLnNlY29uZGFyeUdyb3VwXT1baXRlbV07XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5zZ3JvdXBzW2l0ZW0uc2Vjb25kYXJ5R3JvdXBdLnB1c2goaXRlbSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL0FkZHMgYW4gaXRlbSB0byB0aGUgdW5ncm91cGVkIGxpc3RcbiAgICBwcml2YXRlIGFkZFVuZ3JvdXBlZChpdGVtOmFueSk6dm9pZHtcbiAgICAgICAgdGhpcy51bmdyb3VwZWQucHVzaChpdGVtKTtcbiAgICB9XG5cbiAgICAvL1doZW4gdGhlIG1haW4gYm94IGlzIGNsaWNrZWQsIHRoaXMgaXMgdHJpZ2dlcmVkXG4gICAgcHVibGljIG9uQ2xpY2tlZCgkZXZlbnQpe1xuICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB0aGlzLmZvY3VzZWQ9dHJ1ZTtcbiAgICAgICAgdGhpcy5vcGVuPSF0aGlzLm9wZW47XG4gICAgICAgIHRoaXMuaG92ZXJlZD10aGlzLmRpc3BsYXlJdGVtc1swXSB8fCBudWxsO1xuICAgIH1cblxuICAgIC8vU2V0cyB0aGUgY3VycmVudCBob3ZlcmVkIGl0ZW0odXNlZCBpbnN0ZWFkIG9mIGNzcyB0byBrZWVwIHRoZSBob3ZlciBwZXJzaXN0YW50KVxuICAgIHNldEhvdmVyKGl0ZW0pOiB2b2lke1xuICAgICAgICB0aGlzLmhvdmVyZWQ9aXRlbTtcbiAgICB9XG5cbiAgICAvL1NlbGVjdHMgdGhlIGl0ZW0gaW4gdGhlIGRhdGFcbiAgICBzZWxlY3RJdGVtKGl0ZW06IGFueSk6IHZvaWR7XG4gICAgICAgIGlmKGl0ZW0udHlwZT09J2duYW1lJyl7XG4gICAgICAgICAgICBpZihpdGVtLnNlbGVjdGVkPT10cnVlKXtcbiAgICAgICAgICAgICAgICAvL0xvb3AgdGhyb3VnaCB0aGUgaXRlbXMgaW4gdGhlIGdyb3VwXG4gICAgICAgICAgICAgICAgZm9yKGxldCBncm91cEl0ZW0gb2YgdGhpcy5wZ3JvdXBzW2l0ZW0udGl0bGVdKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLnNwbGljZSh0aGlzLmRhdGEuaW5kZXhPZihncm91cEl0ZW0uaWQpLCAxKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLm9uRGVzZWxlY3QuZW1pdCh0aGlzLmRhdGEpO1xuICAgICAgICAgICAgICAgIHRoaXMub25TZWxlY3RDaGFuZ2UuZW1pdCh0aGlzLmRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGdyb3VwSXRlbSBvZiB0aGlzLnBncm91cHNbaXRlbS50aXRsZV0pe1xuICAgICAgICAgICAgICAgICAgICBpZighdGhpcy5kYXRhLmluY2x1ZGVzKGdyb3VwSXRlbS5pZCkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLnB1c2goZ3JvdXBJdGVtLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLm9uU2VsZWN0LmVtaXQodGhpcy5kYXRhKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uU2VsZWN0Q2hhbmdlLmVtaXQodGhpcy5kYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfWVsc2UgaWYoaXRlbS50eXBlPT0nc2VsZWN0Uycpe1xuICAgICAgICAgICAgZm9yKGxldCBncm91cEl0ZW0gb2YgdGhpcy5zZ3JvdXBzW2l0ZW0uZ3JvdXBdKXtcbiAgICAgICAgICAgICAgICBpZighdGhpcy5kYXRhLmluY2x1ZGVzKGdyb3VwSXRlbS5pZCkpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEucHVzaChncm91cEl0ZW0uaWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMub25TZWxlY3QuZW1pdCh0aGlzLmRhdGEpO1xuICAgICAgICAgICAgdGhpcy5vblNlbGVjdENoYW5nZS5lbWl0KHRoaXMuZGF0YSk7XG4gICAgICAgIH1lbHNlIGlmKGl0ZW0udHlwZT09J2Rlc2VsZWN0Uycpe1xuICAgICAgICAgICAgZm9yKGxldCBncm91cEl0ZW0gb2YgdGhpcy5zZ3JvdXBzW2l0ZW0uZ3JvdXBdKXtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc3BsaWNlKHRoaXMuZGF0YS5pbmRleE9mKGdyb3VwSXRlbS5pZCksIDEpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm9uRGVzZWxlY3QuZW1pdCh0aGlzLmRhdGEpO1xuICAgICAgICAgICAgdGhpcy5vblNlbGVjdENoYW5nZS5lbWl0KHRoaXMuZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihpdGVtLnR5cGU9PVwiaXRlbVwiKXtcbiAgICAgICAgICAgIGlmKGl0ZW0uY2hlY2tlZCl7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnNwbGljZSh0aGlzLmRhdGEuaW5kZXhPZihpdGVtLmlkKSwgMSlcbiAgICAgICAgICAgICAgICB0aGlzLm9uRGVzZWxlY3QuZW1pdCh0aGlzLmRhdGEpO1xuICAgICAgICAgICAgICAgIHRoaXMub25TZWxlY3RDaGFuZ2UuZW1pdCh0aGlzLmRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEucHVzaChpdGVtLmlkKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uU2VsZWN0LmVtaXQodGhpcy5kYXRhKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uU2VsZWN0Q2hhbmdlLmVtaXQodGhpcy5kYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGl0ZW0udHlwZT09J3NlbGVjdEFsbCcpe1xuICAgICAgICAgICAgdGhpcy5kYXRhLnNwbGljZSgwLHRoaXMuZGF0YS5sZW5ndGgpO1xuICAgICAgICAgICAgZm9yKGxldCBpIG9mIHRoaXMuZGlzcGxheURhdGEpe1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5wdXNoKGkuaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5vblNlbGVjdENoYW5nZS5lbWl0KHRoaXMuZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGZvcihsZXQgaSBvZiB0aGlzLmRpc3BsYXlEYXRhKXtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc3BsaWNlKHRoaXMuZGF0YS5pbmRleE9mKGkuaWQpLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMub25TZWxlY3RDaGFuZ2UuZW1pdCh0aGlzLmRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIFxuXG4gICAgICAgIHRoaXMuZ2VuZXJhdGVEaXNwbGF5SXRlbXMoKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG4gICAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzphbnkpID0+IHZvaWQgPSBub29wO1xuXG4gICAgZ2V0IHZhbHVlKCk6IGFueXtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YTtcbiAgICB9O1xuXG4gICAgc2V0IHZhbHVlKHZhbHVlKXtcbiAgICAgICAgdGhpcy5kYXRhPXZhbHVlO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodmFsdWUpO1xuICAgIH1cblxuICAgIG9uQmx1cigpIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICAgIH1cblxuICAgIHdyaXRlVmFsdWUodmFsdWU6YW55KTogdm9pZHtcbiAgICAgICAgdGhpcy5kYXRhPXZhbHVlO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46YW55KTogdm9pZHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrPWZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOmFueSk6IHZvaWR7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2s9Zm47XG4gICAgfVxuXG4gICAgLy9EZXRlY3RzIHdoZW4gdGhlIG1vdXNlIGNsaWNrcyBvdXRzaWRlIG9mIHRoaXMgY29tcG9uZW50XG4gICAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6Y2xpY2snLFsnJGV2ZW50J10pIGNsaWNrZWRPdXRzaWRlKCRldmVudCl7XG4gICAgICAgIGlmKCF0aGlzLm9wZW4pe3RoaXMuZm9jdXNlZD1mYWxzZTt9XG4gICAgICAgIHRoaXMub3Blbj1mYWxzZTtcbiAgICAgICAgXG4gICAgfVxufSJdfQ==