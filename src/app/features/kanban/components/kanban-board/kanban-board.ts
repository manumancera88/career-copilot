import { Component, inject } from '@angular/core';
import { KanbanColumn } from '../kanban-column/kanban-column';
import { ApplicationForm } from '../application-form/application-form';
import { ApplicationService } from '../../../../core/services/application.service';

@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [KanbanColumn, ApplicationForm],
  templateUrl: './kanban-board.html',
  styleUrl: './kanban-board.scss',
})
export class KanbanBoard {
  private applicationService = inject(ApplicationService);

  applied = this.applicationService.byStatus('applied');
  interview = this.applicationService.byStatus('interview');
  offer = this.applicationService.byStatus('offer');
  rejected = this.applicationService.byStatus('rejected');

  columnIds = ['applied', 'interview', 'offer', 'rejected'];
}
