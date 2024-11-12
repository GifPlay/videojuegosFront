import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConsolasComponent } from './edit-consolas.component';

describe('EditConsolasComponent', () => {
  let component: EditConsolasComponent;
  let fixture: ComponentFixture<EditConsolasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditConsolasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditConsolasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
