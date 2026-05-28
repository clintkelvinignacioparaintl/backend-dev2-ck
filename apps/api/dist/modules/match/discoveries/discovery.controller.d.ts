import { DiscoveryService } from './discovery.service';
export declare class DiscoveryController {
    private readonly service;
    constructor(service: DiscoveryService);
    feed(userId: string): Promise<any>;
}
