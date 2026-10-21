import { FrankfurterSdkEntityBase } from '../FrankfurterSdkEntityBase';
import type { FrankfurterSdkSDK } from '../FrankfurterSdkSDK';
import type { Control } from '../types';
import type { Provider, ProviderLoadMatch, ProviderListMatch } from '../FrankfurterSdkTypes';
declare class ProviderEntity extends FrankfurterSdkEntityBase<Provider> {
    constructor(client: FrankfurterSdkSDK, entopts: any);
    make(this: ProviderEntity): ProviderEntity;
    load(this: any, reqmatch?: ProviderLoadMatch, ctrl?: Control): Promise<ProviderEntity>;
    list(this: any, reqmatch?: ProviderListMatch, ctrl?: Control): Promise<ProviderEntity[]>;
}
export { ProviderEntity };
