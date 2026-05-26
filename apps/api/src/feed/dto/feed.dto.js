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
exports.GetActivityFeedDto = exports.GetGlobalFeedDto = exports.GetUserFeedDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class GetUserFeedDto {
    constructor() {
        this.page = 1;
        this.limit = 20;
        this.feedType = 'all';
    }
}
exports.GetUserFeedDto = GetUserFeedDto;
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetUserFeedDto.prototype, "page", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetUserFeedDto.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['all', 'matches', 'profiles']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetUserFeedDto.prototype, "feedType", void 0);
class GetGlobalFeedDto {
    constructor() {
        this.page = 1;
        this.limit = 20;
    }
}
exports.GetGlobalFeedDto = GetGlobalFeedDto;
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetGlobalFeedDto.prototype, "page", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetGlobalFeedDto.prototype, "limit", void 0);
class GetActivityFeedDto {
    constructor() {
        this.page = 1;
        this.limit = 20;
    }
}
exports.GetActivityFeedDto = GetActivityFeedDto;
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetActivityFeedDto.prototype, "page", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetActivityFeedDto.prototype, "limit", void 0);
//# sourceMappingURL=feed.dto.js.map