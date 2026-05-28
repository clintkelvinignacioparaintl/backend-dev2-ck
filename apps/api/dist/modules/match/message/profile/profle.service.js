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
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ProfileService = class ProfileService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async saveInterests(userId, interests) {
        const cleanedInterests = [
            ...new Set(interests
                .filter((i) => typeof i === 'string')
                .map((i) => i.trim())
                .filter(Boolean)),
        ];
        await this.prisma.$transaction(async (tx) => {
            await tx.userInterest.deleteMany({
                where: {
                    userId,
                },
            });
            for (const interestName of cleanedInterests) {
                const slug = interestName.toLowerCase().replace(/\s+/g, '-');
                const interest = await tx.interest.upsert({
                    where: {
                        slug,
                    },
                    update: {},
                    create: {
                        name: interestName,
                        slug,
                    },
                });
                await tx.userInterest.create({
                    data: {
                        userId,
                        interestId: interest.id,
                    },
                });
            }
            await tx.user.update({
                where: {
                    id: userId,
                },
                data: {
                    profileCompleted: true,
                },
            });
        });
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProfileService);
//# sourceMappingURL=profle.service.js.map