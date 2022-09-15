import { Component, Inject, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppStore, isAdmin } from '@alfresco/aca-shared/store';
import { DestroyService } from '@contezza/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'admin-tools-home',
    templateUrl: './admin-tools-home.component.html',
    styleUrls: ['./admin-tools-home.component.scss'],
    providers: [DestroyService],
})
export class AdminToolsHomeComponent implements OnInit {
    isAdmin$: Observable<boolean>;

    constructor(readonly store: Store<AppStore>, @Inject(DestroyService) readonly destroy$: DestroyService) {}

    ngOnInit(): void {
        this.isAdmin$ = this.store.select(isAdmin).pipe(takeUntil(this.destroy$));
    }
}
