import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateConsolasComponent } from './create-consolas.component';

describe('CreateConsolasComponent', () => {
  let component: CreateConsolasComponent;
  let fixture: ComponentFixture<CreateConsolasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateConsolasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateConsolasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
