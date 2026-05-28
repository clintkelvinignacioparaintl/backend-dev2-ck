"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModule = void 0;
const common_1 = require("@nestjs/common");
const chat_gateway_1 = require("./chat.gateway");
const chat_service_1 = require("./chat.service");
const chat_controller_1 = require("./chat.controller");
const prisma_module_1 = require("../prisma/prisma.module");
const seen_status_module_1 = require("../seen-status/seen-status.module");
const cache_module_1 = require("../cache/cache.module");
const seen_status_listener_1 = require("../events/seen-status.listener");
let ChatModule = class ChatModule {
};
exports.ChatModule = ChatModule;
exports.ChatModule = ChatModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, seen_status_module_1.SeenStatusModule, cache_module_1.CacheModule],
        providers: [chat_gateway_1.ChatGateway, chat_service_1.ChatService, seen_status_listener_1.SeenStatusListener],
        controllers: [chat_controller_1.ChatController],
        exports: [chat_service_1.ChatService],
    })
], ChatModule);
//# sourceMappingURL=chat.module.js.map