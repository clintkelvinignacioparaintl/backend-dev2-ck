"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeenStatusModule = void 0;
const common_1 = require("@nestjs/common");
const seen_status_service_1 = require("./seen-status.service");
const seen_status_gateway_1 = require("./seen-status.gateway");
const cache_module_1 = require("../cache/cache.module");
let SeenStatusModule = class SeenStatusModule {
};
exports.SeenStatusModule = SeenStatusModule;
exports.SeenStatusModule = SeenStatusModule = __decorate([
    (0, common_1.Module)({
        imports: [cache_module_1.CacheModule],
        providers: [seen_status_service_1.SeenStatusService, seen_status_gateway_1.SeenStatusGateway],
        exports: [seen_status_service_1.SeenStatusService],
    })
], SeenStatusModule);
//# sourceMappingURL=seen-status.module.js.map