import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AbTestingService {
  constructor(private prisma: PrismaService) {}

  async assignVariant(userId: string, experimentKey: string): Promise<string> {
    const hash = this.hashString(`${userId}-${experimentKey}`);
    const variants = await this.getExperimentVariants(experimentKey);
    
    if (variants.length === 0) {
      return 'control';
    }

    const variantIndex = hash % variants.length;
    const variant = variants[variantIndex];

    await this.recordAssignment(userId, experimentKey, variant);

    return variant;
  }

  async getExperimentVariants(experimentKey: string): Promise<string[]> {
    // In production, this would fetch from database or config
    const experiments: Record<string, string[]> = {
      'new-ui-design': ['control', 'variant-a', 'variant-b'],
      'pricing-page': ['control', 'variant-a'],
      'onboarding-flow': ['control', 'variant-a', 'variant-b', 'variant-c'],
    };

    return experiments[experimentKey] || ['control'];
  }

  async recordAssignment(userId: string, experimentKey: string, variant: string): Promise<void> {
    // In production, this would record to database for analytics
    console.log(`[A/B Testing] User ${userId} assigned to ${variant} in experiment ${experimentKey}`);
  }

  async trackConversion(userId: string, experimentKey: string, variant: string): Promise<void> {
    // In production, this would record conversion event
    console.log(`[A/B Testing] User ${userId} converted in ${experimentKey} with variant ${variant}`);
  }

  async getExperimentStats(experimentKey: string): Promise<any> {
    // In production, this would return actual statistics from database
    return {
      experimentKey,
      variants: await this.getExperimentVariants(experimentKey),
      // Add actual stats here
    };
  }

  private hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }
}
