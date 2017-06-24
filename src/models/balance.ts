
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

export class CurrentHoldings {
    holdings: Holding[];
    xbtFiatCurrentPrice: number;
    xbtFiatOpenningPrice: number;
    xbtFiatExchangeCurrency: string;
    xbtFiatExchangeDisplayCurrency: string;

    constructor() {
        this.holdings = new Array<Holding>();
        this.xbtFiatCurrentPrice = 1;
        this.xbtFiatExchangeCurrency = 'GBP';
        this.xbtFiatExchangeDisplayCurrency = 'GBP';
        this.xbtFiatOpenningPrice = 1;
    }

    get totalValue() {
        if(!this.holdings) {
            return 0;
        }
        return this.holdings.reduce((p, h) => { p += h.value * h.currentPrice; return p; }, 0);
    }
    get totalPrice() {
        if (!this.holdings) {
            return 0;
        }
        return this.holdings.reduce((p, h) => { p += h.value * h.currentPrice; return p; }, 0) * this.xbtFiatCurrentPrice;
    }

    get totalProfitLoss() {
        if (!this.holdings) {
            return 0;
        }
        return this.holdings.reduce((p, h) => { p += (h.value * h.currentPrice) - (h.value * h.openningPrice); return p; }, 0) * this.xbtFiatCurrentPrice;
    }

    get totalProfitLossPercent() {
        if (!this.holdings) {
            return 0;
        }
        let current = this.holdings.reduce((p, h) => {
            p.current += (h.value * h.currentPrice);
            p.openning += (h.value * h.openningPrice);
            return p;
        }, { current: 0, openning: 0 });

        return (current.current - current.openning) / current.openning;
    }
}

export class Holding {
    currency: string;
    displayCurrency: string;
    value: number;

    currentPrice: number;
    openningPrice: number;
    exchangeCurrency: string;
    exchangeDisplayCurrency: string;

    get currentValue() {
        return this.value * this.currentPrice;
    }

    get profitLoss() {
        return (this.value * this.currentPrice) - (this.value * this.openningPrice);
    }

    get profitLossPercent() {
        return ((this.value * this.currentPrice) - (this.value * this.openningPrice)) / (this.value * this.openningPrice);
    }
}