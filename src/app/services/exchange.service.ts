import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Data } from '../models/data';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  constructor(private http: HttpClient) { }

  getExchange(form: Data): Observable<any> {
    return this.http.get<any>(
      `${environment.api}${form.dateCtrl}?access_key=${environment.keyExchange}&symbols=EUR,${form.currencyInputCtrl},${form.currencyOutputCtrl}`
		);
  }

  calculateRates(rates: any, form: Data): number{
    let valueOrigin = rates[form.currencyInputCtrl];
    let valueDestiny = rates[form.currencyOutputCtrl];
    let baseToOrigin = rates['EUR']/valueOrigin;
    let amountOrigin = baseToOrigin * valueDestiny;
    return amountOrigin * form.amountCtrl;
  }

}
