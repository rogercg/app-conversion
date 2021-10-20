import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Data } from './models/data';
import { ExchangeService } from './services/exchange.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app-conversion';

  currencyList: string[];
  myForm: FormGroup;
  amountExchange: number;
  maxDate: string;

  constructor(private formBuilder: FormBuilder, private exchangeService: ExchangeService) {
    this.amountExchange = 0;
    const today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    this.maxDate = date;

    this.currencyList = [
      "EUR",
      "USD",
      "GBP",
      "JPY"
    ];
    this.myForm = this.formBuilder.group({
      currencyInputCtrl: new FormControl('EUR', [Validators.required]),
      currencyOutputCtrl: new FormControl('USD', [Validators.required]),
      amountCtrl: new FormControl(100, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
      dateCtrl: new FormControl(date)
    });
  }

  formDetectChanges(){
    // Limpiar amountExchange
  }

  onSubmit(): void {
    this.myForm.updateValueAndValidity();
    this.myForm.markAllAsTouched();
    console.log(this.myForm);
    if (this.myForm.invalid) {
      alert("Verificar el valor de los datos ingresados");
      return;
    }
    const form = this.myForm.getRawValue();
    const symbols = form.currencyInputCtrl.concat(form.currencyOutputCtrl);
    // Validar si seconsumirá o no el API
    this.getRates(form, symbols);
  }

  getRates(form: Data, symbols: string){
    this.exchangeService.getExchange(form).subscribe(
			async (data) => {
				if(data.success){
          // Valor en EUR -> Origin -> Destiny
          this.amountExchange = this.exchangeService.calculateRates(data.rates, form);
        }
			},
			(err) => {
				if (err.status === 401 || err.status === 403) {
				}
				console.log(err);
			}
		);
  }
}
