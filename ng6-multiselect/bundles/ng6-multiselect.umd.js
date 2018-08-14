(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/platform-browser')) :
    typeof define === 'function' && define.amd ? define('ng6-multiselect', ['exports', '@angular/core', '@angular/forms', '@angular/platform-browser'], factory) :
    (factory((global['ng6-multiselect'] = {}),global.ng.core,global.ng.forms,global.ng.platformBrowser));
}(this, (function (exports,core,forms,platformBrowser) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m)
            return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length)
                    o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var noop = function () { };
    var Ng6MultiselectComponent = (function () {
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
            this.onSelectChange = new core.EventEmitter();
            //Triggered on an item getting selected
            this.onSelect = new core.EventEmitter();
            //Triggered on a item getting unselected
            this.onDeselect = new core.EventEmitter();
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
                    for (var _a = __values(this.displayData), _b = _a.next(); !_b.done; _b = _a.next()) {
                        var i = _b.value;
                        all.push({ type: "item", id: i.id });
                    }
                }
                catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return))
                            _c.call(_a);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
                }
                try {
                    //Detects all the primary and secondary groups
                    for (var _d = __values(this.displayData), _e = _d.next(); !_e.done; _e = _d.next()) {
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
                catch (e_2_1) {
                    e_2 = { error: e_2_1 };
                }
                finally {
                    try {
                        if (_e && !_e.done && (_f = _d.return))
                            _f.call(_d);
                    }
                    finally {
                        if (e_2)
                            throw e_2.error;
                    }
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
                    for (var _g = __values(this.ungrouped), _h = _g.next(); !_h.done; _h = _g.next()) {
                        var item = _h.value;
                        this.displayItems.push({ type: "item", "id": item.id, "name": item.itemName, checked: this.data.includes(item.id) });
                    }
                }
                catch (e_3_1) {
                    e_3 = { error: e_3_1 };
                }
                finally {
                    try {
                        if (_h && !_h.done && (_j = _g.return))
                            _j.call(_g);
                    }
                    finally {
                        if (e_3)
                            throw e_3.error;
                    }
                }
                //Lastly, adds the groups with items in them
                for (var key in this.pgroups) {
                    this.displayItems.push({ type: "gname", title: key, selected: this.isGroupSelected(this.pgroups[key]) });
                    try {
                        for (var _k = __values(this.pgroups[key]), _l = _k.next(); !_l.done; _l = _k.next()) {
                            var item = _l.value;
                            this.displayItems.push({ type: "item", id: item.id, name: item.itemName, checked: this.data.includes(item.id) });
                        }
                    }
                    catch (e_4_1) {
                        e_4 = { error: e_4_1 };
                    }
                    finally {
                        try {
                            if (_l && !_l.done && (_m = _k.return))
                                _m.call(_k);
                        }
                        finally {
                            if (e_4)
                                throw e_4.error;
                        }
                    }
                }
                //generate the number of display items selected
                this.numSelected = 0;
                try {
                    for (var _o = __values(this.displayData), _p = _o.next(); !_p.done; _p = _o.next()) {
                        var i = _p.value;
                        if (this.data.includes(i.id))
                            this.numSelected++;
                    }
                }
                catch (e_5_1) {
                    e_5 = { error: e_5_1 };
                }
                finally {
                    try {
                        if (_p && !_p.done && (_q = _o.return))
                            _q.call(_o);
                    }
                    finally {
                        if (e_5)
                            throw e_5.error;
                    }
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
                    for (var items_1 = __values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
                        var item = items_1_1.value;
                        if (!this.data.includes(item.id)) {
                            return false;
                        }
                    }
                }
                catch (e_6_1) {
                    e_6 = { error: e_6_1 };
                }
                finally {
                    try {
                        if (items_1_1 && !items_1_1.done && (_a = items_1.return))
                            _a.call(items_1);
                    }
                    finally {
                        if (e_6)
                            throw e_6.error;
                    }
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
                            for (var _a = __values(this.pgroups[item.title]), _b = _a.next(); !_b.done; _b = _a.next()) {
                                var groupItem = _b.value;
                                this.data.splice(this.data.indexOf(groupItem.id), 1);
                            }
                        }
                        catch (e_7_1) {
                            e_7 = { error: e_7_1 };
                        }
                        finally {
                            try {
                                if (_b && !_b.done && (_c = _a.return))
                                    _c.call(_a);
                            }
                            finally {
                                if (e_7)
                                    throw e_7.error;
                            }
                        }
                        this.onDeselect.emit(this.data);
                        this.onSelectChange.emit(this.data);
                    }
                    else {
                        try {
                            for (var _d = __values(this.pgroups[item.title]), _e = _d.next(); !_e.done; _e = _d.next()) {
                                var groupItem = _e.value;
                                if (!this.data.includes(groupItem.id)) {
                                    this.data.push(groupItem.id);
                                }
                            }
                        }
                        catch (e_8_1) {
                            e_8 = { error: e_8_1 };
                        }
                        finally {
                            try {
                                if (_e && !_e.done && (_f = _d.return))
                                    _f.call(_d);
                            }
                            finally {
                                if (e_8)
                                    throw e_8.error;
                            }
                        }
                        this.onSelect.emit(this.data);
                        this.onSelectChange.emit(this.data);
                    }
                }
                else if (item.type == 'selectS') {
                    try {
                        for (var _g = __values(this.sgroups[item.group]), _h = _g.next(); !_h.done; _h = _g.next()) {
                            var groupItem = _h.value;
                            if (!this.data.includes(groupItem.id)) {
                                this.data.push(groupItem.id);
                            }
                        }
                    }
                    catch (e_9_1) {
                        e_9 = { error: e_9_1 };
                    }
                    finally {
                        try {
                            if (_h && !_h.done && (_j = _g.return))
                                _j.call(_g);
                        }
                        finally {
                            if (e_9)
                                throw e_9.error;
                        }
                    }
                    this.onSelect.emit(this.data);
                    this.onSelectChange.emit(this.data);
                }
                else if (item.type == 'deselectS') {
                    try {
                        for (var _k = __values(this.sgroups[item.group]), _l = _k.next(); !_l.done; _l = _k.next()) {
                            var groupItem = _l.value;
                            this.data.splice(this.data.indexOf(groupItem.id), 1);
                        }
                    }
                    catch (e_10_1) {
                        e_10 = { error: e_10_1 };
                    }
                    finally {
                        try {
                            if (_l && !_l.done && (_m = _k.return))
                                _m.call(_k);
                        }
                        finally {
                            if (e_10)
                                throw e_10.error;
                        }
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
                        for (var _o = __values(this.displayData), _p = _o.next(); !_p.done; _p = _o.next()) {
                            var i = _p.value;
                            this.data.push(i.id);
                        }
                    }
                    catch (e_11_1) {
                        e_11 = { error: e_11_1 };
                    }
                    finally {
                        try {
                            if (_p && !_p.done && (_q = _o.return))
                                _q.call(_o);
                        }
                        finally {
                            if (e_11)
                                throw e_11.error;
                        }
                    }
                    this.onSelectChange.emit(this.data);
                }
                else {
                    try {
                        for (var _r = __values(this.displayData), _s = _r.next(); !_s.done; _s = _r.next()) {
                            var i = _s.value;
                            this.data.splice(this.data.indexOf(i.id), 1);
                        }
                    }
                    catch (e_12_1) {
                        e_12 = { error: e_12_1 };
                    }
                    finally {
                        try {
                            if (_s && !_s.done && (_t = _r.return))
                                _t.call(_r);
                        }
                        finally {
                            if (e_12)
                                throw e_12.error;
                        }
                    }
                    this.onSelectChange.emit(this.data);
                }
                this.generateDisplayItems();
                var e_7, _c, e_8, _f, e_9, _j, e_10, _m, e_11, _q, e_12, _t;
            };
        Object.defineProperty(Ng6MultiselectComponent.prototype, "value", {
            get: /**
             * @return {?}
             */ function () {
                return this.data;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                this.data = value;
                this.onChangeCallback(value);
            },
            enumerable: true,
            configurable: true
        });
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
            { type: core.Component, args: [{
                        selector: 'ng6-multiselect',
                        template: "<div onselectstart=\"return false\" class=\"multiselectElement\" (click)=\"onClicked($event)\" [ngClass]=\"{'multiselectFocus':this.focused}\">\n    <span style=\"margin-left:4px;\">\n        <span *ngIf=\"numSelected==0\">{{this.emptyTitle}}</span>\n        <span *ngIf=\"numSelected>0\">{{numSelected +\" \"+ this.selectedTitle}}</span>\n    </span>\n    <span class=\"rightArrow\">&#x25bc;</span>\n<div *ngIf=\"this.open\" (click)=\"$event.preventDefault();$event.stopPropagation();\" class=\"dropdown\">\n    <div class=\"multiselectRow\" (mouseenter)=\"setHover(item)\" (click)=\"selectItem(item)\" [ngClass]=\"{'hoverHighlight':hovered==item}\" *ngFor=\"let item of displayItems\">\n        <span *ngIf=\"item.type=='selectAll'\"><input type=\"checkbox\"/>Select All</span>\n        <span *ngIf=\"item.type=='deselectAll'\"><input type=\"checkbox\" checked/>UnSelect All</span>\n        <span *ngIf=\"item.type=='selectS'\"><input type=\"checkbox\"/>Select All {{item.group}}</span>\n        <span *ngIf=\"item.type=='deselectS'\"><input type=\"checkbox\" checked/>UnSelect All {{item.group}}</span>\n        <span *ngIf=\"item.type=='gname'\"><input [checked]=\"item.selected==true\" type=\"checkbox\"/><b>{{item.title}}</b></span>\n        <span *ngIf=\"item.type=='item'\" style=\"padding-left:20px\"><input [checked]=\"item.checked==true\" type=\"checkbox\"/>{{item.name}}</span>\n    </div>\n</div>\n</div>",
                        styles: [".multiselectElement{width:100%;height:20px;max-height:34px;border:1px solid #ccc;border-radius:4px;display:block;padding:6px 0;min-width:60px;font-size:14px;line-height:1.42857143;color:#555;cursor:default;transition:border-color .15s ease-in-out;background-color:#fff}.multiselectFocus{box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);outline:0;border:1px solid #66afe9}.dropdown{position:relative;width:calc(100% + 2px);top:7px;left:-1px;z-index:2;box-shadow:0 1px 5px #959595;border:1px solid #ccc;background-color:#fff;min-height:20px;max-height:400px;overflow-y:auto}.rightArrow{color:#555;padding-right:0;font-size:10px;margin:4px 3px auto auto;float:right}.multiselectRow{padding-left:4px}.hoverHighlight{background-color:#cce8ff}input[type=checkbox]{margin-right:5px}"],
                        providers: [{ provide: forms.NG_VALUE_ACCESSOR, useExisting: Ng6MultiselectComponent, multi: true }]
                    },] },
        ];
        /** @nocollapse */
        Ng6MultiselectComponent.ctorParameters = function () {
            return [
                { type: core.ChangeDetectorRef }
            ];
        };
        Ng6MultiselectComponent.propDecorators = {
            emptyTitle: [{ type: core.Input }],
            selectedTitle: [{ type: core.Input }],
            data: [{ type: core.Input, args: ['ngModel',] }],
            displayData: [{ type: core.Input, args: ['data',] }],
            onSelectChange: [{ type: core.Output, args: ['onSelectChange',] }],
            onSelect: [{ type: core.Output, args: ['onSelect',] }],
            onDeselect: [{ type: core.Output, args: ['onDeselect',] }],
            clickedOutside: [{ type: core.HostListener, args: ['document:click', ['$event'],] }]
        };
        return Ng6MultiselectComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var Ng6MultiselectModule = (function () {
        function Ng6MultiselectModule() {
        }
        Ng6MultiselectModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            platformBrowser.BrowserModule,
                            forms.FormsModule
                        ],
                        declarations: [Ng6MultiselectComponent],
                        exports: [Ng6MultiselectComponent]
                    },] },
        ];
        return Ng6MultiselectModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.Ng6MultiselectComponent = Ng6MultiselectComponent;
    exports.Ng6MultiselectModule = Ng6MultiselectModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmc2LW11bHRpc2VsZWN0LnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbbnVsbCwibmc6Ly9uZzYtbXVsdGlzZWxlY3QvbGliL25nNi1tdWx0aXNlbGVjdC5jb21wb25lbnQudHMiLCJuZzovL25nNi1tdWx0aXNlbGVjdC9saWIvbmc2LW11bHRpc2VsZWN0Lm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXQsIElucHV0LCBFdmVudEVtaXR0ZXIsIE91dHB1dCwgSG9zdExpc3RlbmVyLE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcywgU2ltcGxlQ2hhbmdlLCBDaGFuZ2VEZXRlY3RvclJlZiwgRG9DaGVja30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmNvbnN0IG5vb3AgPSAoKT0+e307XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nNi1tdWx0aXNlbGVjdCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBvbnNlbGVjdHN0YXJ0PVwicmV0dXJuIGZhbHNlXCIgY2xhc3M9XCJtdWx0aXNlbGVjdEVsZW1lbnRcIiAoY2xpY2spPVwib25DbGlja2VkKCRldmVudClcIiBbbmdDbGFzc109XCJ7J211bHRpc2VsZWN0Rm9jdXMnOnRoaXMuZm9jdXNlZH1cIj5cbiAgICA8c3BhbiBzdHlsZT1cIm1hcmdpbi1sZWZ0OjRweDtcIj5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJudW1TZWxlY3RlZD09MFwiPnt7dGhpcy5lbXB0eVRpdGxlfX08L3NwYW4+XG4gICAgICAgIDxzcGFuICpuZ0lmPVwibnVtU2VsZWN0ZWQ+MFwiPnt7bnVtU2VsZWN0ZWQgK1wiIFwiKyB0aGlzLnNlbGVjdGVkVGl0bGV9fTwvc3Bhbj5cbiAgICA8L3NwYW4+XG4gICAgPHNwYW4gY2xhc3M9XCJyaWdodEFycm93XCI+JiN4MjViYzs8L3NwYW4+XG48ZGl2ICpuZ0lmPVwidGhpcy5vcGVuXCIgKGNsaWNrKT1cIiRldmVudC5wcmV2ZW50RGVmYXVsdCgpOyRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcIiBjbGFzcz1cImRyb3Bkb3duXCI+XG4gICAgPGRpdiBjbGFzcz1cIm11bHRpc2VsZWN0Um93XCIgKG1vdXNlZW50ZXIpPVwic2V0SG92ZXIoaXRlbSlcIiAoY2xpY2spPVwic2VsZWN0SXRlbShpdGVtKVwiIFtuZ0NsYXNzXT1cInsnaG92ZXJIaWdobGlnaHQnOmhvdmVyZWQ9PWl0ZW19XCIgKm5nRm9yPVwibGV0IGl0ZW0gb2YgZGlzcGxheUl0ZW1zXCI+XG4gICAgICAgIDxzcGFuICpuZ0lmPVwiaXRlbS50eXBlPT0nc2VsZWN0QWxsJ1wiPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIi8+U2VsZWN0IEFsbDwvc3Bhbj5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJpdGVtLnR5cGU9PSdkZXNlbGVjdEFsbCdcIj48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2hlY2tlZC8+VW5TZWxlY3QgQWxsPC9zcGFuPlxuICAgICAgICA8c3BhbiAqbmdJZj1cIml0ZW0udHlwZT09J3NlbGVjdFMnXCI+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiLz5TZWxlY3QgQWxsIHt7aXRlbS5ncm91cH19PC9zcGFuPlxuICAgICAgICA8c3BhbiAqbmdJZj1cIml0ZW0udHlwZT09J2Rlc2VsZWN0UydcIj48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2hlY2tlZC8+VW5TZWxlY3QgQWxsIHt7aXRlbS5ncm91cH19PC9zcGFuPlxuICAgICAgICA8c3BhbiAqbmdJZj1cIml0ZW0udHlwZT09J2duYW1lJ1wiPjxpbnB1dCBbY2hlY2tlZF09XCJpdGVtLnNlbGVjdGVkPT10cnVlXCIgdHlwZT1cImNoZWNrYm94XCIvPjxiPnt7aXRlbS50aXRsZX19PC9iPjwvc3Bhbj5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJpdGVtLnR5cGU9PSdpdGVtJ1wiIHN0eWxlPVwicGFkZGluZy1sZWZ0OjIwcHhcIj48aW5wdXQgW2NoZWNrZWRdPVwiaXRlbS5jaGVja2VkPT10cnVlXCIgdHlwZT1cImNoZWNrYm94XCIvPnt7aXRlbS5uYW1lfX08L3NwYW4+XG4gICAgPC9kaXY+XG48L2Rpdj5cbjwvZGl2PmAsXG4gIHN0eWxlczogW2AubXVsdGlzZWxlY3RFbGVtZW50e3dpZHRoOjEwMCU7aGVpZ2h0OjIwcHg7bWF4LWhlaWdodDozNHB4O2JvcmRlcjoxcHggc29saWQgI2NjYztib3JkZXItcmFkaXVzOjRweDtkaXNwbGF5OmJsb2NrO3BhZGRpbmc6NnB4IDA7bWluLXdpZHRoOjYwcHg7Zm9udC1zaXplOjE0cHg7bGluZS1oZWlnaHQ6MS40Mjg1NzE0Mztjb2xvcjojNTU1O2N1cnNvcjpkZWZhdWx0O3RyYW5zaXRpb246Ym9yZGVyLWNvbG9yIC4xNXMgZWFzZS1pbi1vdXQ7YmFja2dyb3VuZC1jb2xvcjojZmZmfS5tdWx0aXNlbGVjdEZvY3Vze2JveC1zaGFkb3c6aW5zZXQgMCAxcHggMXB4IHJnYmEoMCwwLDAsLjA3NSksMCAwIDhweCByZ2JhKDEwMiwxNzUsMjMzLC42KTtvdXRsaW5lOjA7Ym9yZGVyOjFweCBzb2xpZCAjNjZhZmU5fS5kcm9wZG93bntwb3NpdGlvbjpyZWxhdGl2ZTt3aWR0aDpjYWxjKDEwMCUgKyAycHgpO3RvcDo3cHg7bGVmdDotMXB4O3otaW5kZXg6Mjtib3gtc2hhZG93OjAgMXB4IDVweCAjOTU5NTk1O2JvcmRlcjoxcHggc29saWQgI2NjYztiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7bWluLWhlaWdodDoyMHB4O21heC1oZWlnaHQ6NDAwcHg7b3ZlcmZsb3cteTphdXRvfS5yaWdodEFycm93e2NvbG9yOiM1NTU7cGFkZGluZy1yaWdodDowO2ZvbnQtc2l6ZToxMHB4O21hcmdpbjo0cHggM3B4IGF1dG8gYXV0bztmbG9hdDpyaWdodH0ubXVsdGlzZWxlY3RSb3d7cGFkZGluZy1sZWZ0OjRweH0uaG92ZXJIaWdobGlnaHR7YmFja2dyb3VuZC1jb2xvcjojY2NlOGZmfWlucHV0W3R5cGU9Y2hlY2tib3hde21hcmdpbi1yaWdodDo1cHh9YF0sXG4gIHByb3ZpZGVyczogW3twcm92aWRlOk5HX1ZBTFVFX0FDQ0VTU09SLHVzZUV4aXN0aW5nOk5nNk11bHRpc2VsZWN0Q29tcG9uZW50LG11bHRpOnRydWV9XVxufSlcbmV4cG9ydCBjbGFzcyBOZzZNdWx0aXNlbGVjdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgRG9DaGVjaywgQ29udHJvbFZhbHVlQWNjZXNzb3J7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZil7fVxuXG4gICAgLy9UaGUgdGl0bGUgd2hlbiB0aGUgbXVsdGlzZWxlY3QgaXMgZW1wdHlcbiAgICBASW5wdXQoKVxuICAgIGVtcHR5VGl0bGU6IHN0cmluZz1cIlNlbGVjdCBJdGVtc1wiO1xuICAgIFxuICAgIC8vVGhlIHRpdGxlIHdoZW4gdGhlIG11bHRpc2VsZWN0IGhhcyBpdGVtcy4gVGhlIGRpc3BsYXllZCB2YWx1ZSB3aWxsIGJlOlxuICAgIC8vbnVtU2VsZWN0ZWQrc2VsZWN0ZWRUaXRsZVxuICAgIEBJbnB1dCgpXG4gICAgc2VsZWN0ZWRUaXRsZTogc3RyaW5nPVwiSXRlbShzKSBTZWxlY3RlZFwiO1xuXG4gICAgLy9UaGUgYmluZGluZyBmb3IgdGhlIHNlbGVjdGVkIGRhdGEuIENvbnRhaW5zIGFuIGFycmF5IG9mIHRoZSBzZWxlY3RlZCBpZCdzXG4gICAgQElucHV0KCduZ01vZGVsJylcbiAgICBkYXRhOiBBcnJheTxzdHJpbmc+PVtdO1xuXG4gICAgLy9UaGUgZGF0YSB0byBiZSBkaXNwbGF5ZWQgZm9yIHNlbGVjdGlvbi4gSW4gdGhlIGZvcm1hdCBvZjpcbiAgICAvL1t7XCJpZFwiOlwiaWRUb1Nob3dJbkRhdGFcIixcIml0ZW1OYW1lXCI6XCJuYW1lVG9EaXNwbGF5XCIsXCJwcmltYXJ5R3JvdXBcIjpcImdyb3VwVGhpc0JlbG9uZ3NUb1wiLFwic2Vjb25kYXJ5R3JvdXBcIjpcImFTZWNvbmRhcnlHcm91cEZvclNlbGVjdGlvblwifV1cbiAgICAvL05vdGUgdGhhdCB3aGVuIGdyb3VwcyBhcmUgcHV0IGluLCB0aGUgc2VsZWN0IHdpbGwgZ2VuZXJhdGUgYSBcIlNlbGVjdCBhbGwgJGdyb3VwbmFtZVwiIFxuICAgIC8vYW5kIHRoZSBjb3JyZXNwb25kaW5nIGRlc2VsZWN0IGF0IHRoZSB0b3AsIGFzIHdlbGwgYXMgcHV0IHRoZSBpdGVtcyBpbnRvIGdyb3VwIGNhdGVnb3JpZXNcbiAgICBASW5wdXQoJ2RhdGEnKVxuICAgIGRpc3BsYXlEYXRhOiBBcnJheTxhbnk+PVtdO1xuXG4gICAgZGlzcGxheURhdGFPbGQ6IEFycmF5PGFueT49W107XG5cbiAgICAvL1RyaWdnZXJlZCBvbiBhbnkgaXRlbSBnZXR0aW5nIHNlbGVjdGVkIG9yIHVuc2VsZWN0ZWRcbiAgICBAT3V0cHV0KCdvblNlbGVjdENoYW5nZScpXG4gICAgb25TZWxlY3RDaGFuZ2U6IEV2ZW50RW1pdHRlcjxBcnJheTxzdHJpbmc+PiA9IG5ldyBFdmVudEVtaXR0ZXI8QXJyYXk8c3RyaW5nPj4oKTtcblxuICAgIC8vVHJpZ2dlcmVkIG9uIGFuIGl0ZW0gZ2V0dGluZyBzZWxlY3RlZFxuICAgIEBPdXRwdXQoJ29uU2VsZWN0JylcbiAgICBvblNlbGVjdDogRXZlbnRFbWl0dGVyPEFycmF5PHN0cmluZz4+ID0gbmV3IEV2ZW50RW1pdHRlcjxBcnJheTxzdHJpbmc+PigpO1xuXG4gICAgLy9UcmlnZ2VyZWQgb24gYSBpdGVtIGdldHRpbmcgdW5zZWxlY3RlZFxuICAgIEBPdXRwdXQoJ29uRGVzZWxlY3QnKVxuICAgIG9uRGVzZWxlY3Q6IEV2ZW50RW1pdHRlcjxBcnJheTxzdHJpbmc+PiA9IG5ldyBFdmVudEVtaXR0ZXI8QXJyYXk8c3RyaW5nPj4oKTtcblxuXG4gICAgLy9JbnRlcm5hbCB2YXJpYWJsZXMgdG8gYmUgbW9kaWZpZWQgdG8gaW5mbHVlbmNlIHRoZSB2aWV3XG4gICAgXG4gICAgLy9UaGUgbGlzdCBvZiBpdGVtcyB0byBzaG93IGluIHRoZSBzZWxlY3RcbiAgICBwdWJsaWMgZGlzcGxheUl0ZW1zOiBBcnJheTxhbnk+PVtdO1xuXG4gICAgLy9QcmltYXJ5IGdyb3VwcyBhbmQgY29udGVudHNcbiAgICBwcml2YXRlIHBncm91cHM6IGFueT17fTtcbiAgICAvL1NlY29uZGFyeSBncm91cHMgYW5kIGNvbnRlbnRzXG4gICAgcHJpdmF0ZSBzZ3JvdXBzOiBhbnk9e307XG4gICAgLy9Vbmdyb3VwZWQgaXRlbXNcbiAgICBwcml2YXRlIHVuZ3JvdXBlZDogQXJyYXk8YW55Pj1bXTtcblxuICAgIC8vaWYgdGhlIGRpdiBpcyBmb2N1c2VkXG4gICAgcHVibGljIGZvY3VzZWQ6Ym9vbGVhbj1mYWxzZTtcbiAgICAvL2lmIHRoZSBkaXYgaXMgb3BlblxuICAgIHB1YmxpYyBvcGVuOmJvb2xlYW49ZmFsc2U7XG4gICAgLy90aGUgY3VycmVudGx5IGhvdmVyZWQgaXRlbVxuICAgIHB1YmxpYyBob3ZlcmVkOiBhbnk7XG5cbiAgICAvL1RoZSBudW1iZXIgZnJvbSB0aGUgbGlzdCB0aGF0IGFyZSBzZWxlY3RlZChoYXMgdG8gYmUgY2FsY3VsYXRlZCBzaW5jZSBkYXRhIGNhbiBiZSBzaGFyZWQgYmV0d2VlbiBtdWx0aXNlbGVjdHMpXG4gICAgcHVibGljIG51bVNlbGVjdGVkPTA7XG5cbiAgICBuZ09uSW5pdCgpe1xuICAgICAgICB0aGlzLmdlbmVyYXRlRGlzcGxheUl0ZW1zKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIHRoZSBpdGVtcyB0byBzaG93IGluIHRoZSBtdWx0aXNlbGVjdFxuICAgICAqL1xuICAgIHByaXZhdGUgZ2VuZXJhdGVEaXNwbGF5SXRlbXMoKTp2b2lke1xuICAgICAgICB0aGlzLnBncm91cHM9e307XG4gICAgICAgIHRoaXMuc2dyb3Vwcz17fTtcbiAgICAgICAgdGhpcy51bmdyb3VwZWQ9W107XG4gICAgICAgIHRoaXMuZGlzcGxheUl0ZW1zPVtdO1xuICAgICAgICBsZXQgYWxsPVtdO1xuICAgICAgICBmb3IobGV0IGkgb2YgdGhpcy5kaXNwbGF5RGF0YSl7XG4gICAgICAgICAgICBhbGwucHVzaCh7dHlwZTpcIml0ZW1cIixpZDppLmlkfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy9EZXRlY3RzIGFsbCB0aGUgcHJpbWFyeSBhbmQgc2Vjb25kYXJ5IGdyb3Vwc1xuICAgICAgICBmb3IobGV0IGl0ZW0gb2YgdGhpcy5kaXNwbGF5RGF0YSl7XG4gICAgICAgICAgICBpZihpdGVtW1wicHJpbWFyeUdyb3VwXCJdKXt0aGlzLmFkZFBHcm91cChpdGVtKTt9XG4gICAgICAgICAgICBlbHNle3RoaXMuYWRkVW5ncm91cGVkKGl0ZW0pO31cbiAgICAgICAgICAgIGlmKGl0ZW1bXCJzZWNvbmRhcnlHcm91cFwiXSl0aGlzLmFkZFNHcm91cChpdGVtKTtcbiAgICAgICAgfVxuICAgICAgICAvL0FkZHMgdGhlIHNlbGVjdCBhbGwgb3B0aW9uXG4gICAgICAgIGlmKHRoaXMuaXNHcm91cFNlbGVjdGVkKGFsbCkpe1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5SXRlbXMucHVzaCh7dHlwZTpcImRlc2VsZWN0QWxsXCJ9KTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlJdGVtcy5wdXNoKHt0eXBlOlwic2VsZWN0QWxsXCJ9KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy9BZGRzIHRoZSBzZWxlY3QvZGVzZWxlY3Qgc2Vjb25kYXJ5IGdyb3VwIG9wdGlvbnNcbiAgICAgICAgZm9yKGxldCBrZXkgaW4gdGhpcy5zZ3JvdXBzKXtcbiAgICAgICAgICAgIGlmKHRoaXMuaXNHcm91cFNlbGVjdGVkKHRoaXMuc2dyb3Vwc1trZXldKSl7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5SXRlbXMucHVzaCh7dHlwZTpcImRlc2VsZWN0U1wiLFwiZ3JvdXBcIjprZXl9KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheUl0ZW1zLnB1c2goe3R5cGU6XCJzZWxlY3RTXCIsXCJncm91cFwiOmtleX0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vQWRkcyB0aGUgdW5ncm91cGVkIGl0ZW1zXG4gICAgICAgIGZvcihsZXQgaXRlbSBvZiB0aGlzLnVuZ3JvdXBlZCl7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlJdGVtcy5wdXNoKHt0eXBlOlwiaXRlbVwiLFwiaWRcIjppdGVtLmlkLFwibmFtZVwiOml0ZW0uaXRlbU5hbWUsIGNoZWNrZWQ6dGhpcy5kYXRhLmluY2x1ZGVzKGl0ZW0uaWQpfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy9MYXN0bHksIGFkZHMgdGhlIGdyb3VwcyB3aXRoIGl0ZW1zIGluIHRoZW1cbiAgICAgICAgZm9yKGxldCBrZXkgaW4gdGhpcy5wZ3JvdXBzKXtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheUl0ZW1zLnB1c2goe3R5cGU6XCJnbmFtZVwiLHRpdGxlOmtleSwgc2VsZWN0ZWQ6dGhpcy5pc0dyb3VwU2VsZWN0ZWQodGhpcy5wZ3JvdXBzW2tleV0pfSk7XG4gICAgICAgICAgICBmb3IobGV0IGl0ZW0gb2YgdGhpcy5wZ3JvdXBzW2tleV0pe1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheUl0ZW1zLnB1c2goe3R5cGU6XCJpdGVtXCIsaWQ6aXRlbS5pZCxuYW1lOml0ZW0uaXRlbU5hbWUsIGNoZWNrZWQ6dGhpcy5kYXRhLmluY2x1ZGVzKGl0ZW0uaWQpfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy9nZW5lcmF0ZSB0aGUgbnVtYmVyIG9mIGRpc3BsYXkgaXRlbXMgc2VsZWN0ZWRcbiAgICAgICAgdGhpcy5udW1TZWxlY3RlZD0wO1xuICAgICAgICBmb3IobGV0IGkgb2YgdGhpcy5kaXNwbGF5RGF0YSl7XG4gICAgICAgICAgICBpZih0aGlzLmRhdGEuaW5jbHVkZXMoaS5pZCkpdGhpcy5udW1TZWxlY3RlZCsrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdEb0NoZWNrKCl7XG4gICAgICBjb25zb2xlLmxvZyhcImNoZWNrXCIpXG4gICAgICBpZihKU09OLnN0cmluZ2lmeSh0aGlzLmRpc3BsYXlEYXRhKSE9PUpTT04uc3RyaW5naWZ5KHRoaXMuZGlzcGxheURhdGFPbGQpKXtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLmRpc3BsYXlEYXRhT2xkLHRoaXMuZGlzcGxheURhdGEpO1xuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB0aGlzLmdlbmVyYXRlRGlzcGxheUl0ZW1zKCk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vTG9vcHMgdGhyb3VnaCB0aGUgYXJyYXkgb2YgaXRlbSBpZHMgYW5kIGNoZWNrcyBpZiBhbGwgb2YgdGhlbSBhcmUgc2VsZWN0ZWQuIElmIHNvLCByZXR1cm5zIHRydWUsIG90aGVyd2lzZSBmYWxzZVxuICAgIHByaXZhdGUgaXNHcm91cFNlbGVjdGVkKGl0ZW1zOiBhbnlbXSk6IGJvb2xlYW57XG4gICAgICAgIGZvcihsZXQgaXRlbSBvZiBpdGVtcyl7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKCF0aGlzLmRhdGEuaW5jbHVkZXMoaXRlbS5pZCkpe1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTt9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy9BZGRzIGFuIGl0ZW0gdG8gdGhlIHByaW1hcnkgZ3JvdXAgbGlzdCBhbmQgYWRkcyBpdHMgZ3JvdXAgaWYgaXQgZG9zbid0IGV4aXN0XG4gICAgcHJpdmF0ZSBhZGRQR3JvdXAoaXRlbTphbnkpOnZvaWR7XG4gICAgICAgIGlmKHRoaXMucGdyb3Vwc1tpdGVtLnByaW1hcnlHcm91cF09PW51bGwpe1xuICAgICAgICAgICAgdGhpcy5wZ3JvdXBzW2l0ZW0ucHJpbWFyeUdyb3VwXT1baXRlbV07XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5wZ3JvdXBzW2l0ZW0ucHJpbWFyeUdyb3VwXS5wdXNoKGl0ZW0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy9BZGRzIGFuIGl0ZW0gdG8gdGhlIHNlY29uZGFyeSBncm91cCBsaXN0IGFuZCBhZGRzIGl0cyBncm91cCBpZiBpdCBkb3NuJ3QgZXhpc3RcbiAgICBwcml2YXRlIGFkZFNHcm91cChpdGVtOmFueSk6dm9pZHtcbiAgICAgICAgaWYodGhpcy5zZ3JvdXBzW2l0ZW0uc2Vjb25kYXJ5R3JvdXBdPT1udWxsKXtcbiAgICAgICAgICAgIHRoaXMuc2dyb3Vwc1tpdGVtLnNlY29uZGFyeUdyb3VwXT1baXRlbV07XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5zZ3JvdXBzW2l0ZW0uc2Vjb25kYXJ5R3JvdXBdLnB1c2goaXRlbSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL0FkZHMgYW4gaXRlbSB0byB0aGUgdW5ncm91cGVkIGxpc3RcbiAgICBwcml2YXRlIGFkZFVuZ3JvdXBlZChpdGVtOmFueSk6dm9pZHtcbiAgICAgICAgdGhpcy51bmdyb3VwZWQucHVzaChpdGVtKTtcbiAgICB9XG5cbiAgICAvL1doZW4gdGhlIG1haW4gYm94IGlzIGNsaWNrZWQsIHRoaXMgaXMgdHJpZ2dlcmVkXG4gICAgcHVibGljIG9uQ2xpY2tlZCgkZXZlbnQpe1xuICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB0aGlzLmZvY3VzZWQ9dHJ1ZTtcbiAgICAgICAgdGhpcy5vcGVuPSF0aGlzLm9wZW47XG4gICAgICAgIHRoaXMuaG92ZXJlZD10aGlzLmRpc3BsYXlJdGVtc1swXSB8fCBudWxsO1xuICAgIH1cblxuICAgIC8vU2V0cyB0aGUgY3VycmVudCBob3ZlcmVkIGl0ZW0odXNlZCBpbnN0ZWFkIG9mIGNzcyB0byBrZWVwIHRoZSBob3ZlciBwZXJzaXN0YW50KVxuICAgIHNldEhvdmVyKGl0ZW0pOiB2b2lke1xuICAgICAgICB0aGlzLmhvdmVyZWQ9aXRlbTtcbiAgICB9XG5cbiAgICAvL1NlbGVjdHMgdGhlIGl0ZW0gaW4gdGhlIGRhdGFcbiAgICBzZWxlY3RJdGVtKGl0ZW06IGFueSk6IHZvaWR7XG4gICAgICAgIGlmKGl0ZW0udHlwZT09J2duYW1lJyl7XG4gICAgICAgICAgICBpZihpdGVtLnNlbGVjdGVkPT10cnVlKXtcbiAgICAgICAgICAgICAgICAvL0xvb3AgdGhyb3VnaCB0aGUgaXRlbXMgaW4gdGhlIGdyb3VwXG4gICAgICAgICAgICAgICAgZm9yKGxldCBncm91cEl0ZW0gb2YgdGhpcy5wZ3JvdXBzW2l0ZW0udGl0bGVdKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLnNwbGljZSh0aGlzLmRhdGEuaW5kZXhPZihncm91cEl0ZW0uaWQpLCAxKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLm9uRGVzZWxlY3QuZW1pdCh0aGlzLmRhdGEpO1xuICAgICAgICAgICAgICAgIHRoaXMub25TZWxlY3RDaGFuZ2UuZW1pdCh0aGlzLmRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGdyb3VwSXRlbSBvZiB0aGlzLnBncm91cHNbaXRlbS50aXRsZV0pe1xuICAgICAgICAgICAgICAgICAgICBpZighdGhpcy5kYXRhLmluY2x1ZGVzKGdyb3VwSXRlbS5pZCkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLnB1c2goZ3JvdXBJdGVtLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLm9uU2VsZWN0LmVtaXQodGhpcy5kYXRhKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uU2VsZWN0Q2hhbmdlLmVtaXQodGhpcy5kYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfWVsc2UgaWYoaXRlbS50eXBlPT0nc2VsZWN0Uycpe1xuICAgICAgICAgICAgZm9yKGxldCBncm91cEl0ZW0gb2YgdGhpcy5zZ3JvdXBzW2l0ZW0uZ3JvdXBdKXtcbiAgICAgICAgICAgICAgICBpZighdGhpcy5kYXRhLmluY2x1ZGVzKGdyb3VwSXRlbS5pZCkpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEucHVzaChncm91cEl0ZW0uaWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMub25TZWxlY3QuZW1pdCh0aGlzLmRhdGEpO1xuICAgICAgICAgICAgdGhpcy5vblNlbGVjdENoYW5nZS5lbWl0KHRoaXMuZGF0YSk7XG4gICAgICAgIH1lbHNlIGlmKGl0ZW0udHlwZT09J2Rlc2VsZWN0Uycpe1xuICAgICAgICAgICAgZm9yKGxldCBncm91cEl0ZW0gb2YgdGhpcy5zZ3JvdXBzW2l0ZW0uZ3JvdXBdKXtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc3BsaWNlKHRoaXMuZGF0YS5pbmRleE9mKGdyb3VwSXRlbS5pZCksIDEpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm9uRGVzZWxlY3QuZW1pdCh0aGlzLmRhdGEpO1xuICAgICAgICAgICAgdGhpcy5vblNlbGVjdENoYW5nZS5lbWl0KHRoaXMuZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihpdGVtLnR5cGU9PVwiaXRlbVwiKXtcbiAgICAgICAgICAgIGlmKGl0ZW0uY2hlY2tlZCl7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnNwbGljZSh0aGlzLmRhdGEuaW5kZXhPZihpdGVtLmlkKSwgMSlcbiAgICAgICAgICAgICAgICB0aGlzLm9uRGVzZWxlY3QuZW1pdCh0aGlzLmRhdGEpO1xuICAgICAgICAgICAgICAgIHRoaXMub25TZWxlY3RDaGFuZ2UuZW1pdCh0aGlzLmRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEucHVzaChpdGVtLmlkKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uU2VsZWN0LmVtaXQodGhpcy5kYXRhKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uU2VsZWN0Q2hhbmdlLmVtaXQodGhpcy5kYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGl0ZW0udHlwZT09J3NlbGVjdEFsbCcpe1xuICAgICAgICAgICAgdGhpcy5kYXRhLnNwbGljZSgwLHRoaXMuZGF0YS5sZW5ndGgpO1xuICAgICAgICAgICAgZm9yKGxldCBpIG9mIHRoaXMuZGlzcGxheURhdGEpe1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5wdXNoKGkuaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5vblNlbGVjdENoYW5nZS5lbWl0KHRoaXMuZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGZvcihsZXQgaSBvZiB0aGlzLmRpc3BsYXlEYXRhKXtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc3BsaWNlKHRoaXMuZGF0YS5pbmRleE9mKGkuaWQpLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMub25TZWxlY3RDaGFuZ2UuZW1pdCh0aGlzLmRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIFxuXG4gICAgICAgIHRoaXMuZ2VuZXJhdGVEaXNwbGF5SXRlbXMoKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG4gICAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzphbnkpID0+IHZvaWQgPSBub29wO1xuXG4gICAgZ2V0IHZhbHVlKCk6IGFueXtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YTtcbiAgICB9O1xuXG4gICAgc2V0IHZhbHVlKHZhbHVlKXtcbiAgICAgICAgdGhpcy5kYXRhPXZhbHVlO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodmFsdWUpO1xuICAgIH1cblxuICAgIG9uQmx1cigpIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICAgIH1cblxuICAgIHdyaXRlVmFsdWUodmFsdWU6YW55KTogdm9pZHtcbiAgICAgICAgdGhpcy5kYXRhPXZhbHVlO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46YW55KTogdm9pZHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrPWZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOmFueSk6IHZvaWR7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2s9Zm47XG4gICAgfVxuXG4gICAgLy9EZXRlY3RzIHdoZW4gdGhlIG1vdXNlIGNsaWNrcyBvdXRzaWRlIG9mIHRoaXMgY29tcG9uZW50XG4gICAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6Y2xpY2snLFsnJGV2ZW50J10pIGNsaWNrZWRPdXRzaWRlKCRldmVudCl7XG4gICAgICAgIGlmKCF0aGlzLm9wZW4pe3RoaXMuZm9jdXNlZD1mYWxzZTt9XG4gICAgICAgIHRoaXMub3Blbj1mYWxzZTtcbiAgICAgICAgXG4gICAgfVxufSIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZzZNdWx0aXNlbGVjdENvbXBvbmVudCB9IGZyb20gJy4vbmc2LW11bHRpc2VsZWN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEJyb3dzZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIEJyb3dzZXJNb2R1bGUsXG4gICAgRm9ybXNNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbTmc2TXVsdGlzZWxlY3RDb21wb25lbnRdLFxuICBleHBvcnRzOiBbTmc2TXVsdGlzZWxlY3RDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIE5nNk11bHRpc2VsZWN0TW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbIkV2ZW50RW1pdHRlciIsInRzbGliXzEuX192YWx1ZXMiLCJDb21wb25lbnQiLCJOR19WQUxVRV9BQ0NFU1NPUiIsIkNoYW5nZURldGVjdG9yUmVmIiwiSW5wdXQiLCJPdXRwdXQiLCJIb3N0TGlzdGVuZXIiLCJOZ01vZHVsZSIsIkJyb3dzZXJNb2R1bGUiLCJGb3Jtc01vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0lBQUE7Ozs7Ozs7Ozs7Ozs7O0FBY0Esc0JBNEZ5QixDQUFDO1FBQ3RCLElBQUksQ0FBQyxHQUFHLE9BQU8sTUFBTSxLQUFLLFVBQVUsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDO1lBQUUsT0FBTyxDQUFD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