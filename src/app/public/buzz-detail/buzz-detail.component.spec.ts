import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuzzDetailComponent } from './buzz-detail.component';

describe('BuzzDetailComponent', () => {
  let component: BuzzDetailComponent;
  let fixture: ComponentFixture<BuzzDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuzzDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuzzDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
