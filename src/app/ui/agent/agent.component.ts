import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AgentService, Agent } from 'src/app/services/agent.service';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit, OnDestroy {
  agents: Agent[] = [];
  isEditModalOpen = false;
  selectedAgent: Agent | null = null;
  searchControl = new FormControl();

  private destroy$ = new Subject<void>();

  // Sorting
  sortField: string = 'name';
  sortOrder: string = 'asc';

  constructor(private agentService: AgentService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loadAgents();

    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => {
        this.spinner.show();
        return this.agentService.getAgents(0, 10, this.sortField, this.sortOrder, value);
      }),
      takeUntil(this.destroy$)
    ).subscribe(response => {
      this.agents = response.content;
      this.spinner.hide();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadAgents(): void {
    this.spinner.show();
    this.agentService.getAgents(0, 10, this.sortField, this.sortOrder, null).pipe(takeUntil(this.destroy$)).subscribe(response => {
      this.agents = response.content;
      this.spinner.hide();
    });
  }

  sort(field: string): void {
    if (this.sortField === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortOrder = 'asc';
    }
    this.loadAgents();
  }

  deleteAgent(id: string): void {
    this.agentService.deleteAgent(id).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.loadAgents();
    });
  }

  openEditModal(agent: Agent): void {
    this.selectedAgent = agent;
    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.selectedAgent = null;
  }

  onAgentUpdated(): void {
    this.loadAgents();
    this.closeEditModal();
  }
}
