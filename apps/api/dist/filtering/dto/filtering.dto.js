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
exports.FilterMessagesDto = exports.FilterMatchesDto = exports.FilterUsersDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class FilterUsersDto {
    constructor() {
        this.page = 1;
        this.limit = 20;
    }
}
exports.FilterUsersDto = FilterUsersDto;
__decorate([
    (0, class_validator_1.IsEnum)(['PERSONAL', 'BUSINESS']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterUsersDto.prototype, "accountType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterUsersDto.prototype, "location", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], FilterUsersDto.prototype, "skills", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], FilterUsersDto.prototype, "interests", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterUsersDto.prototype, "industry", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], FilterUsersDto.prototype, "teamSizeMin", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], FilterUsersDto.prototype, "teamSizeMax", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], FilterUsersDto.prototype, "isActive", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], FilterUsersDto.prototype, "isVerified", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], FilterUsersDto.prototype, "page", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], FilterUsersDto.prototype, "limit", void 0);
class FilterMatchesDto {
    constructor() {
        this.page = 1;
        this.limit = 20;
    }
}
exports.FilterMatchesDto = FilterMatchesDto;
__decorate([
    (0, class_validator_1.IsEnum)(['ACTIVE', 'BLOCKED', 'UNMATCHED']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterMatchesDto.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], FilterMatchesDto.prototype, "page", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], FilterMatchesDto.prototype, "limit", void 0);
class FilterMessagesDto {
    constructor() {
        this.page = 1;
        this.limit = 20;
    }
}
exports.FilterMessagesDto = FilterMessagesDto;
__decorate([
    (0, class_validator_1.IsEnum)(['TEXT', 'IMAGE', 'FILE']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterMessagesDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], FilterMessagesDto.prototype, "isSeen", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], FilterMessagesDto.prototype, "page", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], FilterMessagesDto.prototype, "limit", void 0);
//# sourceMappingURL=filtering.dto.js.map