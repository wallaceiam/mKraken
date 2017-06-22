
export class Asset {
    assetClass: string;
    alternativeName: string;
    decimals: number;
    displayDecimals: number;

    constructor(assetClass: string = null, alternativeName: string = null, decimals: number = 10, displayDecimals: number = 5) {
        this.assetClass = assetClass;
        this.alternativeName = alternativeName;
        this.decimals = decimals;
        this.displayDecimals = displayDecimals;
    }
}

export class Assets { [id: string] : Asset; }