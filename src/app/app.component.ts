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
    // Reiniciamos este valor para utilizarlo en la estructura condicional de nuestro HTML
    this.amountExchange = 0;
  }

  onSubmit(): void {
    this.myForm.updateValueAndValidity();
    this.myForm.markAllAsTouched();
    if (this.myForm.invalid){
      alert("Verificar el valor de los datos ingresados");
      return;
    }
    // Preparamos la data a utilizar
    const form = this.myForm.getRawValue();
    const symbols = form.currencyInputCtrl.concat(form.currencyOutputCtrl);
    const result = this.exchangeService.getRates(symbols, form.dateCtrl);
    // El objeto obtenido no esta vacio ?
    if(Object.keys(result).length > 0){
      // No consumimos el API y obtenemos la información de localstorage
      this.amountExchange = this.exchangeService.calculateRates(result, form);
    } else{
      // Consumimo el API y guardamos la respuesta en localstorage
      this.getRates(form, symbols);
    }
  }

  getRates(form: Data, symbols: string){
    this.exchangeService.getExchange(form).subscribe(
			async (data) => {
				if(data.success){
          // Asignamos el resultado del calculo a "amountExchange"
          this.amountExchange = this.exchangeService.calculateRates(data.rates, form);
          // Guardar rates en localstorage
          this.exchangeService.saveRates(symbols, data.rates, form.dateCtrl);
        }
			},
			(err) => {
				console.log(err);
			}
		);
  }
}
