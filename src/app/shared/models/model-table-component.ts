import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AppConstants } from '../../constants';
import { HasIdInterface } from './has-id.interface';
import { DataService } from '../services/data.service';
import { TableService } from '../services/table.service';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core';

export class ModelTableComponent<T1 extends HasIdInterface,
    T2 extends TableService<T1, DataService<T1>>> implements OnDestroy {

    // The subscription to the table service
    subscription: Subscription;

    // The list of model
    modelList: T1[] = [];

    // Used for Sorting
    order = 'dateModified';
    reverse = -1;

    // Used for searching
    field = '';
    match = '';

    // Used for pagination
    page = 1;
    pageSize = 15;
    collectionSize = 0;

    // Used for hide/show the loading spinner
    isLoading = true;

    constructor(public service: T2,
        public modalService: NgbModal,
        public editComponent: any) {

    }

    /**
     * This function is REQUIRED to refresh the table
     * with search, sort, and pagination options
     */
    refresh() {
        this.isLoading = true;
        this.service.refresh(
            this.field,
            this.match.trim(),
            this.order,
            this.reverse,
            this.page,
            this.pageSize
        );
    }

    /**
     * This function is REQUIRED for ngx-order-pipe Sorting
     * @param value
     */
    setOrder(value: string) {
        if (this.order === value) {
            this.reverse = this.reverse === 1 ? -1 : 1;
        }
        this.order = value;
        this.refresh();
    }

    /**
     * This function is triggered when the user clicks the table row
     * to edit the model.
     * @param model new Customer created by the user
     */
    openEditModal(model: T1, event?: MouseEvent) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        const modalRef = this.modalService.open(this.editComponent, AppConstants.MODAL_OPTIONS);
        // Pass model as a Input to ModalRef
        modalRef.componentInstance.model = model;
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
