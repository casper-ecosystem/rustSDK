import { TestBed } from '@angular/core/testing';
import { HealthComponent, buildHealthResult } from './health.component';

describe('HealthComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(HealthComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have health result with correct values', () => {
    const fixture = TestBed.createComponent(HealthComponent);
    const component = fixture.componentInstance;
    expect(component.healthResult.status).toBe('healthy');
    expect(component.healthResult.service).toBe('Casper Webclient');
    expect(component.healthResult.version).toBe('2.2.2');
  });
});

describe('buildHealthResult', () => {
  it('should return health result with correct values', () => {
    const result = buildHealthResult();
    expect(result.status).toBe('healthy');
    expect(result.service).toBe('Casper Webclient');
    expect(result.version).toBe('2.2.2');
  });
});
