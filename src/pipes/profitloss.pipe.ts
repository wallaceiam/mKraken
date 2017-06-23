import { Pipe, PipeTransform } from '@angular/core';

import { Balance } from './../models/balance';
import { Ticker } from './../models/ticker';


@Pipe({
    name: 'totalprofitloss'
})
export class TotalProfiteLossPipe implements PipeTransform {
    transform(balances: Balance[], xbtGbp: Ticker): number {
        if (!balances || !xbtGbp) {
            return NaN;
        }

        let totalXbt = balances.reduce((c, b) => {
            c.totalBid += b.value * (b.ticker ? b.ticker.bid.price : 1);
            c.totalOpen += b.value * (b.ticker ? b.ticker.opening : 1);
            return c;
        }, { totalBid: 0, totalOpen: 0 });

        if (totalXbt.totalOpen !== 0) {
            return (totalXbt.totalBid * xbtGbp.bid.price) - (totalXbt.totalOpen * xbtGbp.bid.price);
        } else {
            return NaN;
        }
    }
}

@Pipe({
    name: 'totalprofitlossperc'
})
export class TotalProfiteLossPercentPipe implements PipeTransform {
    transform(balances: Balance[], xbtGbp: Ticker): number {
        if (!balances || !xbtGbp) {
            return NaN;
        }

        let totalXbt = balances.reduce((c, b) => {
            c.totalBid += b.value * (b.ticker ? b.ticker.bid.price : 1);
            c.totalOpen += b.value * (b.ticker ? b.ticker.opening : 1);
            return c;
        }, { totalBid: 0, totalOpen: 0 });

        if (totalXbt.totalOpen !== 0) {
            return ( (totalXbt.totalBid * xbtGbp.bid.price) - (totalXbt.totalOpen * xbtGbp.bid.price) ) / (totalXbt.totalOpen * xbtGbp.bid.price);
        } else {
            return NaN;
        }
    }
}


@Pipe({
    name: 'profitloss'
})
export class ProfiteLossPipe implements PipeTransform {
    transform(balance: Balance, xbtGbp: Ticker): number {
        if (!balance || !xbtGbp) {
            return NaN;
        }

        return balance.ticker ? balance.ticker.bid.price - balance.ticker.opening : xbtGbp.bid.price - xbtGbp.opening;
    }
}

@Pipe({
    name: 'profitlossperc'
})
export class ProfiteLossPercentPipe implements PipeTransform {
    transform(balance: Balance, xbtGbp: Ticker): number {
        if (!balance || !xbtGbp) {
            return NaN;
        }

        return balance.ticker ?
            (balance.ticker.bid.price - balance.ticker.opening) / balance.ticker.opening
            : (xbtGbp.bid.price - xbtGbp.opening) / xbtGbp.opening;
    }
}

