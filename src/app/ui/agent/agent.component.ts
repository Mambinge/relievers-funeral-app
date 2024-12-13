import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService, API } from 'src/app/shared/services';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent {
  agents:any
  showListUsers = true;
  currentPage = 0;
  totalPages:any
  // agentsId!: number;
  id:any;
  // products:any

  constructor(private spinner: NgxSpinnerService,private route: ActivatedRoute,
    private service: ApiService, private router: Router){}


  ngOnInit(){
    this.route.params.subscribe((params : any) => {
      const agentId = params['id'];
      this.agents = +agentId

    });

    this.getAll(false)  }

  getAll(reload: boolean){
    this.spinner.show()
    this.service.getAll(`${API.CLIENTS}agents?page=${this.currentPage}&size=7`).subscribe((res)=>{
      this.agents = res.content
      this.spinner.hide()
      this.totalPages = res.totalPages;
    })
  }

  changePage(newPage: number) {
    if(newPage >= 0 && newPage < this.totalPages) {
      this.currentPage = newPage;
      this.getAll(false);
    }
  }

  deleteagents(id: string) {
    this.service.delete(`${API.CLIENTS}agents/${id}`).subscribe(() => {
      this.getAll(false);
    });
  }
  

  onagentsAdded() {
    this.getAll(false);
  }

  updateAgents(id: string) {
    this.router.navigate(['/update-agents', id]);
  }

  viewagents(id: string) {
    this.router.navigate(['/view-agents', id]);
  }

  toggleView() {
    this.showListUsers = !this.showListUsers;
  }
}
