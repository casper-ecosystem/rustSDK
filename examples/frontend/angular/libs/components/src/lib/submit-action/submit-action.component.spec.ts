import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubmitActionComponent } from './submit-action.component';

describe('SubmitActionComponent', () => {
  let component: SubmitActionComponent;
  let fixture: ComponentFixture<SubmitActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitActionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SubmitActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
