import { Injectable } from '@nestjs/common';
import { RtcRole, RtmRole, RtcTokenBuilder, RtmTokenBuilder } from 'agora-access-token';

@Injectable()
export class TokenService {
  private appId = process.env.APP_ID;
  private appCertificate = process.env.APP_CERTIFICATE;

  /**
   * Generate an RTC token
   */
  generateRtcToken(channelName: string, uid: string,role = RtcRole.PUBLISHER , expirationInSeconds = 3600) {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpireTimestamp = currentTimestamp + expirationInSeconds;


    return RtcTokenBuilder.buildTokenWithAccount(
      this.appId,
      this.appCertificate,
      channelName,
      uid,
      role,
      privilegeExpireTimestamp,
    );
  }

  /**
   * Generate an RTM token
   */
  generateRtmToken(userId: string, role = RtmRole.Rtm_User, expirationInSeconds = 3600) {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpireTimestamp = currentTimestamp + expirationInSeconds;

    return RtmTokenBuilder.buildToken(
      this.appId,
      this.appCertificate,
      userId,
      role,
      privilegeExpireTimestamp,
    );
  }
}
