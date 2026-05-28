"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const server_1 = require("next/server");
const auth_1 = require("@repo/db/src/auth");
const client_1 = require("../../../../../../packages/db/generated/client");
const prisma = new client_1.PrismaClient();
function slugify(value) {
    return value
        .trim()
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}
async function POST(req) {
    try {
        const user = await (0, auth_1.verifyAccessToken)(req.headers.get('authorization')?.replace('Bearer ', ''));
        if (!user?.id) {
            return server_1.NextResponse.json({
                message: 'Unauthorized',
            }, {
                status: 401,
            });
        }
        const userId = user.id;
        const body = await req.json();
        if (typeof body !== 'object' || body === null || !('interests' in body)) {
            return server_1.NextResponse.json({
                message: 'Invalid payload',
            }, {
                status: 400,
            });
        }
        const rawInterests = body.interests;
        if (!Array.isArray(rawInterests)) {
            return server_1.NextResponse.json({
                message: 'Interests must be an array',
            }, {
                status: 400,
            });
        }
        const interests = [
            ...new Set(rawInterests
                .filter((item) => typeof item === 'string')
                .map((item) => item.trim())
                .filter(Boolean)),
        ];
        if (interests.length > 25) {
            return server_1.NextResponse.json({
                message: 'Maximum of 25 interests allowed',
            }, {
                status: 400,
            });
        }
        await prisma.$transaction(async (tx) => {
            await tx.userInterest.deleteMany({
                where: {
                    userId,
                },
            });
            for (const item of interests) {
                const slug = slugify(item);
                const interest = await tx.interest.upsert({
                    where: {
                        slug,
                    },
                    update: {},
                    create: {
                        name: item,
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
        return server_1.NextResponse.json({
            success: true,
            interests,
        });
    }
    catch (error) {
        console.error('[USER_INTERESTS_POST]', error);
        return server_1.NextResponse.json({
            message: 'Internal Server Error',
        }, {
            status: 500,
        });
    }
}
//# sourceMappingURL=route.js.map