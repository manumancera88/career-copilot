import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { KanbanBoard } from './features/kanban/components/kanban-board/kanban-board';
import { JobAnalyzer } from './features/job-analyzer/job-analyzer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, KanbanBoard, JobAnalyzer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'career-copilot';
}
