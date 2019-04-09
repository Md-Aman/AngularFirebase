import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmmComponent } from './pmm.component';

describe('PmmComponent', () => {
  let component: PmmComponent;
  let fixture: ComponentFixture<PmmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
