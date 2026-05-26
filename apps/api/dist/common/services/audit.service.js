"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditService = exports.AuditAction = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
var AuditAction;
(function (AuditAction) {
    AuditAction["LOGIN"] = "login";
    AuditAction["LOGOUT"] = "logout";
    AuditAction["REGISTER"] = "register";
    AuditAction["PROFILE_CREATE"] = "profile_create";
    AuditAction["PROFILE_UPDATE"] = "profile_update";
    AuditAction["PROFILE_DELETE"] = "profile_delete";
    AuditAction["MATCH_CREATE"] = "match_create";
    AuditAction["MATCH_DELETE"] = "match_delete";
    AuditAction["MESSAGE_SEND"] = "message_send";
    AuditAction["SWIPE"] = "swipe";
    AuditAction["ROLE_CHANGE"] = "role_change";
    AuditAction["ADMIN_ACTION"] = "admin_action";
})(AuditAction || (exports.AuditAction = AuditAction = {}));
let AuditService = class AuditService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async log(data) {
        try {
            await this.prisma.auditLog.create({
                data: {
                    userId: data.userId,
                    action: data.action,
                    resourceType: data.resourceType,
                    resourceId: data.resourceId,
                    metadata: data.metadata || {},
                    ipAddress: data.ipAddress,
                    userAgent: data.userAgent,
                    timestamp: new Date(),
                },
            });
        }
        catch (error) {
            console.error('Failed to log audit event:', error);
        }
    }
    async logLogin(userId, ipAddress, userAgent) {
        await this.log({
            userId,
            action: AuditAction.LOGIN,
            ipAddress,
            userAgent,
        });
    }
    async logLogout(userId, ipAddress, userAgent) {
        await this.log({
            userId,
            action: AuditAction.LOGOUT,
            ipAddress,
            userAgent,
        });
    }
    async logAdminAction(userId, action, resourceType, resourceId, metadata) {
        await this.log({
            userId,
            action: AuditAction.ADMIN_ACTION,
            resourceType,
            resourceId,
            metadata: { ...metadata, adminAction: action },
        });
    }
};
exports.AuditService = AuditService;
exports.AuditService = AuditService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuditService);
//# sourceMappingURL=audit.service.js.map