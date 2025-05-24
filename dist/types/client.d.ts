import { OdooConfig, OdooVersion, OdooFieldsMap, SearchOptions, SearchReadOptions, OdooDomain } from './types.js';
export declare class OdooClient {
    private common;
    private object;
    private uid;
    private config;
    constructor(config: OdooConfig);
    private methodCall;
    version(): Promise<OdooVersion>;
    authenticate(): Promise<number>;
    execute<T>(model: string, method: string, args?: any[], kwargs?: object): Promise<T>;
    search(model: string, domain: OdooDomain, options?: SearchOptions): Promise<number[]>;
    searchCount(model: string, domain: OdooDomain): Promise<number>;
    read<T>(model: string, ids: number[], fields?: string[]): Promise<T[]>;
    searchRead<T>(model: string, domain: OdooDomain, options?: SearchReadOptions): Promise<T[]>;
    create<T extends object>(model: string, values: T): Promise<number>;
    write<T extends object>(model: string, ids: number[], values: T): Promise<boolean>;
    unlink(model: string, ids: number[]): Promise<boolean>;
    fieldsGet(model: string, attributes?: string[]): Promise<OdooFieldsMap>;
}
