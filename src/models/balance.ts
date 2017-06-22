
import { Ticker } from './ticker';

export class Balance {
    currency: string;
    displayCurrency: string;
    value: number;
    ticker: Ticker;

    constructor(currency: string = null, displayCurrency: string = null, value: number = null) {
        this.currency = currency;
        this.displayCurrency = displayCurrency;
        this.value = value;
    }
}