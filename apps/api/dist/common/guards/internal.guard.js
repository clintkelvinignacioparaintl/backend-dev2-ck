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
exports.Internal = exports.InternalGuard = exports.INTERNAL_KEY = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
exports.INTERNAL_KEY = 'internal';
let InternalGuard = class InternalGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const isInternal = this.reflector.getAllAndOverride(exports.INTERNAL_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!isInternal) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const internalKey = request.headers['x-internal-key'];
        if (internalKey !== process.env.INTERNAL_API_KEY) {
            throw new common_1.ForbiddenException('Internal API access denied');
        }
        return true;
    }
};
exports.InternalGuard = InternalGuard;
exports.InternalGuard = InternalGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], InternalGuard);
const Internal = () => (0, common_1.SetMetadata)(exports.INTERNAL_KEY, true);
exports.Internal = Internal;
//# sourceMappingURL=internal.guard.js.map