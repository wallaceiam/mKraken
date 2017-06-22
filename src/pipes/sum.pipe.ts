import { Pipe, PipeTransform } from '@angular/core';

import { Balance } from './../models/balance';
import { Ticker } from './../models/ticker';

@Pipe({
    name: 'sum'
})
export class SumPipe implements PipeTransform {
    transform(balances: Balance[], xbtGbp: Ticker): number {
        if(!balances || !xbtGbp) {
            return NaN;
        }

        return balances.reduce((c, b) => c += b.value * (b.ticker ? b.ticker.bid.price : 1) * xbtGbp.bid.price, 0);
    }
}