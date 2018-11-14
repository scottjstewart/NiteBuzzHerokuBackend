import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakebuzzComponent } from './makebuzz.component';

describe('MakebuzzComponent', () => {
  let component: MakebuzzComponent;
  let fixture: ComponentFixture<MakebuzzComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakebuzzComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakebuzzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
