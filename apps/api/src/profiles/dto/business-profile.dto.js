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
exports.GetBusinessProfilesByTeamSizeDto = exports.GetBusinessProfilesByLocationDto = exports.GetBusinessProfilesByIndustryDto = exports.SearchBusinessProfilesDto = exports.UpdateBusinessProfileDto = exports.CreateBusinessProfileDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreateBusinessProfileDto {
}
exports.CreateBusinessProfileDto = CreateBusinessProfileDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateBusinessProfileDto.prototype, "companyName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CreateBusinessProfileDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateBusinessProfileDto.prototype, "industry", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateBusinessProfileDto.prototype, "location", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateBusinessProfileDto.prototype, "teamSize", void 0);
__decorate([
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateBusinessProfileDto.prototype, "website", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateBusinessProfileDto.prototype, "services", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateBusinessProfileDto.prototype, "companyLogoUrl", void 0);
class UpdateBusinessProfileDto {
}
exports.UpdateBusinessProfileDto = UpdateBusinessProfileDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], UpdateBusinessProfileDto.prototype, "companyName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], UpdateBusinessProfileDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateBusinessProfileDto.prototype, "industry", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateBusinessProfileDto.prototype, "location", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateBusinessProfileDto.prototype, "teamSize", void 0);
__decorate([
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateBusinessProfileDto.prototype, "website", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateBusinessProfileDto.prototype, "services", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateBusinessProfileDto.prototype, "companyLogoUrl", void 0);
class SearchBusinessProfilesDto {
    constructor() {
        this.page = 1;
        this.limit = 20;
    }
}
exports.SearchBusinessProfilesDto = SearchBusinessProfilesDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchBusinessProfilesDto.prototype, "query", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], SearchBusinessProfilesDto.prototype, "page", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], SearchBusinessProfilesDto.prototype, "limit", void 0);
class GetBusinessProfilesByIndustryDto {
    constructor() {
        this.page = 1;
        this.limit = 20;
    }
}
exports.GetBusinessProfilesByIndustryDto = GetBusinessProfilesByIndustryDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetBusinessProfilesByIndustryDto.prototype, "industry", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetBusinessProfilesByIndustryDto.prototype, "page", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetBusinessProfilesByIndustryDto.prototype, "limit", void 0);
class GetBusinessProfilesByLocationDto {
    constructor() {
        this.page = 1;
        this.limit = 20;
    }
}
exports.GetBusinessProfilesByLocationDto = GetBusinessProfilesByLocationDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetBusinessProfilesByLocationDto.prototype, "location", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetBusinessProfilesByLocationDto.prototype, "page", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetBusinessProfilesByLocationDto.prototype, "limit", void 0);
class GetBusinessProfilesByTeamSizeDto {
    constructor() {
        this.page = 1;
        this.limit = 20;
    }
}
exports.GetBusinessProfilesByTeamSizeDto = GetBusinessProfilesByTeamSizeDto;
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    __metadata("design:type", Number)
], GetBusinessProfilesByTeamSizeDto.prototype, "minSize", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    __metadata("design:type", Number)
], GetBusinessProfilesByTeamSizeDto.prototype, "maxSize", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetBusinessProfilesByTeamSizeDto.prototype, "page", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetBusinessProfilesByTeamSizeDto.prototype, "limit", void 0);
//# sourceMappingURL=business-profile.dto.js.map