import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getAdminStats(): {};
    getBusinessStats(req: any): {};
    getPersonalStats(req: any): {};
}
