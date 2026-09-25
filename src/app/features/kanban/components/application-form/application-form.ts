import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApplicationService } from '../../../../core/services/application.service';

@Component({
  selector: 'app-application-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './application-form.html',
  styleUrl: './application-form.scss',
})
export class ApplicationForm {
  private fb = inject(FormBuilder);
  private applicationService = inject(ApplicationService);

  submitted = output<void>();

  form = this.fb.nonNullable.group({
    company: ['', Validators.required],
    role: ['', Validators.required],
    jobDescription: ['', Validators.required],
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { company, role, jobDescription } = this.form.getRawValue();

    this.applicationService.add({
      company,
      role,
      jobDescription,
      status: 'applied',
      appliedDate: new Date(),
    });

    this.form.reset();
    this.submitted.emit();
  }
}
