import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGenerosComponent } from './create-generos.component';

describe('CreateGenerosComponent', () => {
  let component: CreateGenerosComponent;
  let fixture: ComponentFixture<CreateGenerosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateGenerosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateGenerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
