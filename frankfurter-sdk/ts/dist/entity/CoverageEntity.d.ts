import { FrankfurterSdkEntityBase } from '../FrankfurterSdkEntityBase';
import type { FrankfurterSdkSDK } from '../FrankfurterSdkSDK';
import type { Control } from '../types';
import type { Coverage, CoverageLoadMatch } from '../FrankfurterSdkTypes';
declare class CoverageEntity extends FrankfurterSdkEntityBase<Coverage> {
    constructor(client: FrankfurterSdkSDK, entopts: any);
    make(this: CoverageEntity): CoverageEntity;
    load(this: any, reqmatch?: CoverageLoadMatch, ctrl?: Control): Promise<CoverageEntity>;
}
export { CoverageEntity };
