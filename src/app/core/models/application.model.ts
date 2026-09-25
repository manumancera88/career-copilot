export type ApplicationStatus = "applied" | "interview" | "offer" | "rejected";

export interface JobApplication {
  id: string;
  company: string;
  role: string;
  jobDescription: string;
  status: ApplicationStatus;
  appliedDate: Date;
  notes?: string;
  matchScore?: number; // generado por la feature de IA más adelante
}
