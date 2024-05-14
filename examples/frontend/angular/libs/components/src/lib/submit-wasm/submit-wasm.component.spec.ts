import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubmitWasmComponent } from './submit-wasm.component';

describe('SubmitWasmComponent', () => {
  let component: SubmitWasmComponent;
  let fixture: ComponentFixture<SubmitWasmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitWasmComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SubmitWasmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
