
import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe, CurrencyPipe } from '@angular/common';
import { Assets } from './../models/asset';

@Pipe({
    name: 'cryptocurrency'
})

export class CryptoCurrencyPipe implements PipeTransform {

    constructor(private decimalPipe: DecimalPipe, private currencyPipe: CurrencyPipe) {

    }

    transform(value: number, ...args: any[]): any {
        let assetInfo = args.find(a => a instanceof Assets || a instanceof Object) as Assets;
        let currency = args.find(a => typeof a === "string") as string;
        let showCurrency = args.find(a => typeof a === "boolean");
        if (showCurrency === undefined) {
            showCurrency = true;
        }

        if (assetInfo && currency) {
            let asset = assetInfo[currency] ? assetInfo[currency] :
                (assetInfo['X' + currency] ? assetInfo['X' + currency] : null);
            //(assetInfo['Z' + currency] ? assetInfo['Z' + currency] : null));
            if (!asset && currency.startsWith('Z') && currency !== 'ZBT') {
                return this.currencyPipe.transform(value, currency.substring(1, currency.length), true);
            }
            else if (!asset) {
                return this.decimalPipe.transform(value, '1.5-5');
            }
            if (asset.assetClass === 'currency' && currency.startsWith('Z') && currency !== 'ZBT') {
                return this.currencyPipe.transform(value, currency.substring(1, currency.length), true);
            }
            let displayDecimals = asset.displayDecimals.toString();
            return this.decimalPipe.transform(value, '1.' + displayDecimals + '-' + displayDecimals);
        } else if (currency) {
            return this.currencyPipe.transform(value, currency.startsWith('Z') ? currency.substring(1, currency.length) : currency, true);
        }

        return this.decimalPipe.transform(value, '1.2-2');

    }
}