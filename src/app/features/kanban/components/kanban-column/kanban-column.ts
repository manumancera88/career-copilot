import { Component, input, inject } from '@angular/core';
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';
import { JobApplication, ApplicationStatus } from '../../../../core/models/application.model';
import { ApplicationService } from '../../../../core/services/application.service';

@Component({
  selector: 'app-kanban-column',
  standalone: true,
  imports: [DragDropModule],
  templateUrl: './kanban-column.html',
  styleUrl: './kanban-column.scss',
})
export class KanbanColumn {
  title = input.required<string>();
  status = input.required<ApplicationStatus>();
  applications = input.required<JobApplication[]>();
  connectedTo = input<string[]>([]);

  private applicationService = inject(ApplicationService);

  drop(event: CdkDragDrop<JobApplication[]>): void {
    if (event.previousContainer === event.container) return;
    const app = event.previousContainer.data[event.previousIndex];
    this.applicationService.updateStatus(app.id, this.status());
  }
}
