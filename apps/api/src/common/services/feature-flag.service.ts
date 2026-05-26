import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FeatureFlagService {
  private flags: Map<string, boolean> = new Map();

  constructor(private readonly configService: ConfigService) {
    this.initializeFlags();
  }

  private initializeFlags(): void {
    this.flags.set('new-dashboard', this.configService.get('FEATURE_FLAG_NEW_DASHBOARD') === 'true');
    this.flags.set('advanced-search', this.configService.get('FEATURE_FLAG_ADVANCED_SEARCH') === 'true');
    this.flags.set('real-time-chat', this.configService.get('FEATURE_FLAG_REAL_TIME_CHAT') === 'true');
    this.flags.set('video-calls', this.configService.get('FEATURE_FLAG_VIDEO_CALLS') === 'true');
    this.flags.set('ai-recommendations', this.configService.get('FEATURE_FLAG_AI_RECOMMENDATIONS') === 'true');
    this.flags.set('dark-mode', this.configService.get('FEATURE_FLAG_DARK_MODE') === 'true');
  }

  isEnabled(flagKey: string): boolean {
    return this.flags.get(flagKey) || false;
  }

  isDisabled(flagKey: string): boolean {
    return !this.isEnabled(flagKey);
  }

  setFlag(flagKey: string, enabled: boolean): void {
    this.flags.set(flagKey, enabled);
  }

  getAllFlags(): Record<string, boolean> {
    return Object.fromEntries(this.flags);
  }

  isUserEnabled(userId: string, flagKey: string): boolean {
    // In production, this could check user-specific feature flags
    // For now, just return the global flag
    return this.isEnabled(flagKey);
  }

  async getUserFlags(userId: string): Promise<Record<string, boolean>> {
    // In production, this would fetch user-specific flags from database
    return this.getAllFlags();
  }
}
