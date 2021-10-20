import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`Debe retornar formulario invalido`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    const currencyInput = app.myForm.controls['currencyInputCtrl'];
    currencyInput.setValue('EUR');

    const currencyOutput = app.myForm.controls['currencyOutputCtrl'];
    currencyOutput.setValue('USD');

    const amount = app.myForm.controls['amountCtrl'];
    amount.setValue('CIEN');

    expect(app.myForm.invalid).toBeTrue();
  });

  it(`Debe retornar formulario valido`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    const currencyInput = app.myForm.controls['currencyInputCtrl'];
    currencyInput.setValue('EUR');

    const currencyOutput = app.myForm.controls['currencyOutputCtrl'];
    currencyOutput.setValue('USD');

    const amount = app.myForm.controls['amountCtrl'];
    amount.setValue(100);

    expect(app.myForm.valid).toBeTrue();
  });

});
