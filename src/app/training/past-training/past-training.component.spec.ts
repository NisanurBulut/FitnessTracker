import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastTrainingComponent } from './past-training.component';

describe('PastTrainingComponent', () => {
  let component: PastTrainingComponent;
  let fixture: ComponentFixture<PastTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
