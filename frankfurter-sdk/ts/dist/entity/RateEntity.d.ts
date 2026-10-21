import { FrankfurterSdkEntityBase } from '../FrankfurterSdkEntityBase';
import type { FrankfurterSdkSDK } from '../FrankfurterSdkSDK';
import type { Control } from '../types';
import type { Rate, RateLoadMatch, RateListMatch } from '../FrankfurterSdkTypes';
declare class RateEntity extends FrankfurterSdkEntityBase<Rate> {
    constructor(client: FrankfurterSdkSDK, entopts: any);
    make(this: RateEntity): RateEntity;
    load(this: any, reqmatch?: RateLoadMatch, ctrl?: Control): Promise<RateEntity>;
    list(this: any, reqmatch?: RateListMatch, ctrl?: Control): Promise<RateEntity[]>;
}
export { RateEntity };
