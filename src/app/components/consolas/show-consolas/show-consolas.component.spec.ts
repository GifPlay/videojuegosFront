import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowConsolasComponent } from './show-consolas.component';

describe('ShowConsolasComponent', () => {
  let component: ShowConsolasComponent;
  let fixture: ComponentFixture<ShowConsolasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowConsolasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowConsolasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
