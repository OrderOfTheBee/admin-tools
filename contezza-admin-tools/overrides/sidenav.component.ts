import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { NavBarGroupRef, NavBarLinkRef } from '@alfresco/adf-extensions';
import { Store } from '@ngrx/store';
import { AppStore, getSideNavState, getUserProfile } from '@alfresco/aca-shared/store';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { AppExtensionService } from '@alfresco/aca-shared';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: { class: 'app-sidenav' },
})
export class SidenavComponent implements OnInit, OnDestroy {
    @Input()
    mode: 'collapsed' | 'expanded' = 'expanded';

    groups: Array<NavBarGroupRef> = [];
    private onDestroy$ = new Subject<boolean>();

    constructor(private store: Store<AppStore>, private extensions: AppExtensionService) {}

    ngOnInit() {
        this.store
            .select(getUserProfile) // this is overrides
            .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.onDestroy$))
            .subscribe(() => this.setGroups());

        this.store
            .select(getSideNavState) // this is overrides
            .pipe(debounceTime(400), distinctUntilChanged(), takeUntil(this.onDestroy$))
            .subscribe(() => this.setGroups());
    }

    trackByGroupId(_: number, obj: NavBarGroupRef): string {
        return obj.id;
    }

    trackByLinkId(_: number, obj: NavBarLinkRef): string {
        return obj.id;
    }

    ngOnDestroy() {
        this.onDestroy$.next(true);
        this.onDestroy$.complete();
    }

    private setGroups() {
        this.groups = this.extensions.getApplicationNavigation(this.extensions.navbar);
    }
}
