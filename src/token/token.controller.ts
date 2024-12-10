import { Controller, Get, Query } from '@nestjs/common';
import { TokenService } from './token.service';

@Controller('agora-token')
export class TokenController {
  constructor(private readonly agoraTokenService: TokenService) {}

  @Get('rtc-token')
  generateRtcToken(
    @Query('channelName') channelName: string,
    @Query('uid') uid: string,
    @Query('role') role: number = 1,
  ) {
    return {
      RTC_token: this.agoraTokenService.generateRtcToken(channelName, uid, role),
    };
  }

  @Get('rtm-token')
  generateRtmToken(@Query('userId') userId: string) {
    return {
      token: this.agoraTokenService.generateRtmToken(userId),
    };
  }
}
