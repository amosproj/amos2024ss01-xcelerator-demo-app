import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { IxActiveModal } from '@siemens/ix-angular';

import DeleteModalComponent from './deleteModal.component';

describe('DeleteModalComponent', () => {
    let component: DeleteModalComponent;
    let fixture: ComponentFixture<DeleteModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DeleteModalComponent],
            providers: [{ provide: IxActiveModal, useValue: { data: {} } }, {
                provide: ActivatedRoute,
                useValue: {},
            }],
        }).compileComponents();

        fixture = TestBed.createComponent(DeleteModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
