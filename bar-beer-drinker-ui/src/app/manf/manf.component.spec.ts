import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManfComponent } from './manf.component';

describe('ManfComponent', () => {
  let component: ManfComponent;
  let fixture: ComponentFixture<ManfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
