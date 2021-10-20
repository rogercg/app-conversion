import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app-conversion';

  currencyList: string[];
  myForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
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
      dateCtrl: new FormControl('')
    });
  }
}
