import { FrankfurterSdkEntityBase } from '../FrankfurterSdkEntityBase';
import type { FrankfurterSdkSDK } from '../FrankfurterSdkSDK';
import type { Control } from '../types';
import type { Currency, CurrencyLoadMatch, CurrencyListMatch } from '../FrankfurterSdkTypes';
declare class CurrencyEntity extends FrankfurterSdkEntityBase<Currency> {
    constructor(client: FrankfurterSdkSDK, entopts: any);
    make(this: CurrencyEntity): CurrencyEntity;
    load(this: any, reqmatch?: CurrencyLoadMatch, ctrl?: Control): Promise<CurrencyEntity>;
    list(this: any, reqmatch?: CurrencyListMatch, ctrl?: Control): Promise<CurrencyEntity[]>;
}
export { CurrencyEntity };
