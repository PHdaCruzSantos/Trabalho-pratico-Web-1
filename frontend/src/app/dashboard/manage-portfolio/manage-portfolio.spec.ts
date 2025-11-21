import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePortfolio } from './manage-portfolio';

describe('ManagePortfolio', () => {
  let component: ManagePortfolio;
  let fixture: ComponentFixture<ManagePortfolio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagePortfolio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagePortfolio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
