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
exports.GetRecommendedUsersDto = exports.GetRandomUsersDto = exports.DiscoverUsersDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class DiscoverUsersDto {
    constructor() {
        this.page = 1;
        this.limit = 20;
    }
}
exports.DiscoverUsersDto = DiscoverUsersDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], DiscoverUsersDto.prototype, "location", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], DiscoverUsersDto.prototype, "skills", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], DiscoverUsersDto.prototype, "interests", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['PERSONAL', 'BUSINESS']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], DiscoverUsersDto.prototype, "accountType", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], DiscoverUsersDto.prototype, "page", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], DiscoverUsersDto.prototype, "limit", void 0);
class GetRandomUsersDto {
    constructor() {
        this.count = 10;
    }
}
exports.GetRandomUsersDto = GetRandomUsersDto;
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetRandomUsersDto.prototype, "count", void 0);
class GetRecommendedUsersDto {
    constructor() {
        this.limit = 20;
    }
}
exports.GetRecommendedUsersDto = GetRecommendedUsersDto;
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetRecommendedUsersDto.prototype, "limit", void 0);
//# sourceMappingURL=discovery.dto.js.map