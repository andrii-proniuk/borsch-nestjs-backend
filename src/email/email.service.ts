import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { EmailConfig } from '../config/configuration.types';

@Injectable()
export class EmailService {
  private email: nodemailer.Transporter;

  constructor(configService: ConfigService) {
    const { clientId, clientSecret, defaultFrom, refreshToken } =
      configService.get<EmailConfig>('email');

    // const oauth2Client = new google.auth.OAuth2(
    //   clientId,
    //   clientSecret,
    //   'https://developers.google.com/oauthplayground',
    // );

    // oauth2Client.setCredentials({
    //   refresh_token: process.env.REFRESH_TOKEN,
    // });

    // new Promise((resolve, reject) => {
    //   oauth2Client.getAccessToken((err, token) => {
    //     if (err) {
    //       reject('Failed to create access token :(');
    //     }
    //     resolve(token);
    //   });
    // }).then((accessToken) => {
    this.email = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: defaultFrom,
        clientId,
        clientSecret,
        refreshToken,
      },
      from: defaultFrom,
    });
    // });
  }

  async sendEmailVerificationCode(to: string, code: string): Promise<any> {
    return this.email.sendMail({
      to,
      subject: 'Borsch App - Email Verification',
      text: `Your verification code: ${code}`,
    });
  }
}
