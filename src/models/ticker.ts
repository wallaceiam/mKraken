export class Ticker {
    // a = ask array(<price>, <whole lot volume>, <lot volume>),
    ask: TickerTradePoint;
    // b = bid array(<price>, <whole lot volume>, <lot volume>),
    bid: TickerTradePoint;
    // c = last trade closed array(<price>, <lot volume>),
    lastTradeClosed: TickerTradePoint;
    // v = volume array(<today>, <last 24 hours>),
    volume: TickerPoint;
    // p = volume weighted average price array(<today>, <last 24 hours>),
    volumeWeightedAveragePrice: TickerPoint;
    // t = number of trades array(<today>, <last 24 hours>),
    numberOfTrades: TickerPoint;
    // l = low array(<today>, <last 24 hours>),
    low: TickerPoint;
    // h = high array(<today>, <last 24 hours>),
    high: TickerPoint;
    // o = today's opening price
    opening: number;
}

export class TickerInformation { [id: string] : Ticker; }

export class TickerPoint {
    today: number;
    last24hours: number;

    constructor(today: number = 0, last24hours: number = 0) {
        this.today = today;
        this.last24hours = last24hours;
    }
}

export class TickerTradePoint {
    price: number;
    volume: number;
    wholeLotVolume?: number;

    constructor(price: number = 0, volume: number = 0, wholeLotVolume: number = 0) {
        this.price = price;
        this.volume = volume;
        this.wholeLotVolume = wholeLotVolume;
    }

}