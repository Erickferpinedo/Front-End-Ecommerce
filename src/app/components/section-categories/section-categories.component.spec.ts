import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionCategoriesComponent } from './section-categories.component';

describe('SectionCategoriesComponent', () => {
  let component: SectionCategoriesComponent;
  let fixture: ComponentFixture<SectionCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionCategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
