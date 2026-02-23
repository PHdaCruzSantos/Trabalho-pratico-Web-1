import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestModal } from './request-modal';

describe('RequestModal', () => {
  let component: RequestModal;
  let fixture: ComponentFixture<RequestModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
