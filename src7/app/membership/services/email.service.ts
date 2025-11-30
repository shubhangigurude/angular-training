import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import emailjs from '@emailjs/browser';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor() {
    emailjs.init(environment.emailJs.publicKey);
  }

  private generateVerificationToken(): string {
    // Generate a more secure token using a combination of timestamp and random string
    const timestamp = new Date().getTime().toString(36);
    const random = Math.random().toString(36).substring(2, 15);
    return `${timestamp}.${random}`;
  }

  sendVerificationEmail(email: string, firstName: string): Observable<boolean> {
    const token = this.generateVerificationToken();
    const verificationLink = `${environment.appUrl}/verify-email/${token}`;

    const templateParams = {
      to_email: email,
      to_name: firstName,
      verification_link: verificationLink,
    };

    // Store the token in your database here
    // You should associate this token with the user's account
    this.storeVerificationToken(email, token);

    return from(
      emailjs.send(
        environment.emailJs.serviceId,
        environment.emailJs.templateId,
        templateParams
      )
    ).pipe(
      map(() => true),
      catchError((error) => {
        console.error('EmailJS Error:', error);
        throw new Error('Failed to send verification email');
      })
    );
  }

  private storeVerificationToken(email: string, token: string): void {
    // In a real application, you would store this in your database
    // For now, we'll use localStorage as a simple example
    const tokens = JSON.parse(
      localStorage.getItem('verificationTokens') || '{}'
    );
    tokens[email] = {
      token,
      created: new Date().toISOString(),
    };
    localStorage.setItem('verificationTokens', JSON.stringify(tokens));
  }

  verifyEmail(
    token: string
  ): Observable<'success' | 'already-verified' | 'expired'> {
    // In a real application, you would verify this token against your database
    const tokens = JSON.parse(
      localStorage.getItem('verificationTokens') || '{}'
    );
    const verified = JSON.parse(localStorage.getItem('verifiedEmails') || '[]');
    const entry = Object.entries(tokens).find(
      ([_, value]: [string, any]) => value.token === token
    );

    if (entry) {
      const [email, value]: [string, any] = entry;
      // Check if already verified
      if (verified.includes(email)) {
        return of('already-verified');
      }
      // Check if expired (older than 24 hours)
      const created = new Date(value.created).getTime();
      const now = Date.now();
      const hours24 = 24 * 60 * 60 * 1000;
      if (now - created > hours24) {
        // Remove expired token
        delete tokens[email];
        localStorage.setItem('verificationTokens', JSON.stringify(tokens));
        return of('expired');
      }
      // Mark as verified
      verified.push(email);
      localStorage.setItem('verifiedEmails', JSON.stringify(verified));
      // Remove the token after successful verification
      delete tokens[email];
      localStorage.setItem('verificationTokens', JSON.stringify(tokens));
      return of('success');
    }
    // If not found, check if already verified
    const email = Object.keys(tokens).find(
      (key) => verified.includes(key) && tokens[key]?.token === token
    );
    if (email) {
      return of('already-verified');
    }
    return of('expired');
  }
}
