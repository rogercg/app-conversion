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
    // Tomamos el valor base del 1 EURO
    let valueOrigin = rates[form.currencyInputCtrl];
    let valueDestiny = rates[form.currencyOutputCtrl];
    // Convertimos el valor de 1 EUR al valor de la moneda origen
    let baseToOrigin = rates['EUR']/valueOrigin;
    // Convertimos el valor del resultado al valor de la moneda destino
    let amountOrigin = baseToOrigin * valueDestiny;
    // Multiplicamos el resultado por el monto ingresado
    return amountOrigin * form.amountCtrl;
  }

  saveRates(symbols: string, rates: any, date?: string): void{
    // Parseamos el objeto a JSON para que sea legible por el localstorage
    const json = JSON.stringify(rates);
    // Concatenamos los simbolos con la fecha para tomarlo como key y pasamos la constante json com valor
    localStorage.setItem(`${symbols}${date}`, json);
  }

  getRates(symbols: string, date: string): string{
    // Obtenemos el valor basado en al concatenación de los simbolos y la fecha seleccionada
    let result = localStorage.getItem(`${symbols}${date}`);
    // Parseamos el JSON como objeto y si el valor obtenido es nulo asignamos "{}" como valor a parsear
    const resultParse = JSON.parse(result || "{}")
    return resultParse;
  }

}
