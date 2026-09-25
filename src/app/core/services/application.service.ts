import { Injectable, signal, computed, effect } from '@angular/core';
import { JobApplication, ApplicationStatus } from '../models/application.model';

const STORAGE_KEY = 'career-copilot-applications';

@Injectable({ providedIn: 'root' })
export class ApplicationService {
  private applications = signal<JobApplication[]>(this.loadFromStorage());

  readonly all = this.applications.asReadonly();

  readonly byStatus = (status: ApplicationStatus) =>
    computed(() => this.applications().filter((a) => a.status === status));

  constructor() {
    effect(() => {
      const apps = this.applications();
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
      }
    });
  }

  add(application: Omit<JobApplication, 'id'>): void {
    const newApp: JobApplication = { ...application, id: crypto.randomUUID() };
    this.applications.update((apps) => [...apps, newApp]);
  }

  updateStatus(id: string, status: ApplicationStatus): void {
    this.applications.update((apps) => apps.map((a) => (a.id === id ? { ...a, status } : a)));
  }

  private loadFromStorage(): JobApplication[] {
    if (typeof localStorage === 'undefined') return [];
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw) as JobApplication[];
      return parsed.map((a) => ({ ...a, appliedDate: new Date(a.appliedDate) }));
    } catch {
      return [];
    }
  }
}
