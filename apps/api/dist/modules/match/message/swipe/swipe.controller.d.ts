import { SwipeService } from './swipe.service';
export declare class SwipeController {
    private readonly swipeService;
    constructor(swipeService: SwipeService);
    getFeed(req: any): Promise<any>;
    swipe(req: any, body: {
        receiverId: string;
        type: 'LEFT' | 'RIGHT';
    }): Promise<{
        matched: boolean;
        match?: undefined;
    } | {
        matched: boolean;
        match: any;
    }>;
}
