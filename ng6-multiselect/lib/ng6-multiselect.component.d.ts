import { OnInit, EventEmitter, ChangeDetectorRef, DoCheck } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare class Ng6MultiselectComponent implements OnInit, DoCheck, ControlValueAccessor {
    private cd;
    constructor(cd: ChangeDetectorRef);
    emptyTitle: string;
    selectedTitle: string;
    data: Array<string>;
    displayData: Array<any>;
    displayDataOld: Array<any>;
    onSelectChange: EventEmitter<Array<string>>;
    onSelect: EventEmitter<Array<string>>;
    onDeselect: EventEmitter<Array<string>>;
    displayItems: Array<any>;
    private pgroups;
    private sgroups;
    private ungrouped;
    focused: boolean;
    open: boolean;
    hovered: any;
    numSelected: number;
    ngOnInit(): void;
    /**
     * Generates the items to show in the multiselect
     */
    private generateDisplayItems();
    ngDoCheck(): void;
    private isGroupSelected(items);
    private addPGroup(item);
    private addSGroup(item);
    private addUngrouped(item);
    onClicked($event: any): void;
    setHover(item: any): void;
    selectItem(item: any): void;
    private onTouchedCallback;
    private onChangeCallback;
    value: any;
    onBlur(): void;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    clickedOutside($event: any): void;
}
