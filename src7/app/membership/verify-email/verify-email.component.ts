import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailService } from '../services/email.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
})
export class VerifyEmailComponent implements OnInit {
  verifying = true;
  verified = false;
  alreadyVerified = false;
  expired = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private emailService: EmailService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    const token = this.route.snapshot.paramMap.get('token');
    if (token) {
      this.emailService.verifyEmail(token).subscribe({
        next: async (status) => {
          this.verifying = false;
          if (status === 'success') {
            this.verified = true;
          } else if (status === 'already-verified') {
            this.alreadyVerified = true;
          } else if (status === 'expired') {
            this.expired = true;
          } else {
            this.error = 'Verification failed.';
          }
        },
        error: async (err) => {
          this.verifying = false;
          this.error = 'Verification failed.';
        },
      });
    } else {
      this.verifying = false;
      this.error = 'Invalid verification link.';
    }
  }
}
