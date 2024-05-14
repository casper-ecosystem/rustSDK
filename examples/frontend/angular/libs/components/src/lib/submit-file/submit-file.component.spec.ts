import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubmitFileComponent } from './submit-file.component';

describe('SubmitFileComponent', () => {
  let component: SubmitFileComponent;
  let fixture: ComponentFixture<SubmitFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitFileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SubmitFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
