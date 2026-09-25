import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { JobAnalyzerService } from '../../core/services/job-analyzer.service';

@Component({
  selector: 'app-job-analyzer',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './job-analyzer.html',
  styleUrl: './job-analyzer.scss',
})
export class JobAnalyzer {
  private fb = inject(FormBuilder);
  analyzerService = inject(JobAnalyzerService);

  form = this.fb.nonNullable.group({
    jobDescription: ['', Validators.required],
    cvSummary: [
      '4 anos de experiência em Angular, JavaScript, HTML e CSS, desenvolvimento frontend',
      Validators.required,
    ],
  });

  submit(): void {
    if (this.form.invalid) return;
    const { jobDescription, cvSummary } = this.form.getRawValue();
    this.analyzerService.analyze(jobDescription, cvSummary);
  }
}
