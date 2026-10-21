import { CoverageEntity } from './entity/CoverageEntity';
import { CurrencyEntity } from './entity/CurrencyEntity';
import { ProviderEntity } from './entity/ProviderEntity';
import { RateEntity } from './entity/RateEntity';
export type * from './FrankfurterSdkTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { FrankfurterSdkEntityBase } from './FrankfurterSdkEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class FrankfurterSdkSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Coverage(entopts?: Record<string, any>): CoverageEntity;
    Currency(entopts?: Record<string, any>): CurrencyEntity;
    Provider(entopts?: Record<string, any>): ProviderEntity;
    Rate(entopts?: Record<string, any>): RateEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): FrankfurterSdkSDK;
    tester(testopts?: any, sdkopts?: any): FrankfurterSdkSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof FrankfurterSdkSDK;
export { stdutil, config, BaseFeature, FrankfurterSdkEntityBase, FrankfurterSdkSDK, SDK, };
export type { DirectResult };
