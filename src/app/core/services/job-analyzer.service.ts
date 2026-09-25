import { Injectable, signal } from '@angular/core';
import { JobAnalysis } from '../models/job-analysis.model';

@Injectable({ providedIn: 'root' })
export class JobAnalyzerService {
  loading = signal(false);
  error = signal<string | null>(null);
  result = signal<JobAnalysis | null>(null);

  async analyze(jobDescription: string, cvSummary: string): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    this.result.set(null);

    try {
      const res = await fetch('/api/analyze-job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription, cvSummary }),
      });

      if (!res.ok) throw new Error('Erro ao analisar a vaga');

      const data: JobAnalysis = await res.json();
      this.result.set(data);
    } catch (err) {
      this.error.set('Não foi possível analisar a vaga. Tente novamente.');
    } finally {
      this.loading.set(false);
    }
  }
}
